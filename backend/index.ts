import dotenv from 'dotenv'
import { Client } from 'pg'
import express from 'express'
import path from 'path'
import cors from 'cors'
import type { BookType } from '../frontend/src/types'
import Stripe from 'stripe'

dotenv.config()
const app = express()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil' as any
})

const client = new Client({
  connectionString: process.env.PGURI
})

client.connect()
console.log('Ansluten till databas')

app.use(express.static(path.join(path.resolve(), 'dist')))

app.use(cors())

app.use(express.json())

app.get('/api/books', async (req, res) => {
  const genre = req.query.genre
  if (genre) {
    const { rows }: { rows: BookType[] } = await client.query('SELECT * FROM books WHERE genre = $1', [genre])
    res.json(rows)
  } else {
    const { rows }: { rows: BookType[] } = await client.query('SELECT * FROM books')
    res.json(rows)
  }
})

app.get('/api/summerbooks', async (_req, res) => {
  const { rows }: { rows: BookType[] } = await client.query('SELECT * FROM books WHERE home_page=$1', [true])
  res.json(rows)
})

app.get('/api/bookinfo/:id', async (req, res) => {
  const { rows }: { rows: BookType[] } = await client.query('SELECT * FROM books WHERE book_id=$1', [req.params.id])
  res.json(rows)
})

app.post('/api/cart', async (req, res) => {
  const { bookId, userId } = req.body

  await client.query('INSERT INTO cart (book_id, user_id) VALUES ($1, $2)', [bookId, userId])
  res.status(201).send('Bok tillagd i varukorgen!')
})

app.get('/api/cart', async (req, res) => {
  const userId = req.query.user
  const { rows }: { rows: BookType[] } = await client.query(
    'SELECT books.*, cart.cart_id FROM cart INNER JOIN books ON cart.book_id = books.book_id WHERE user_id = $1',
    [userId]
  )
  res.json(rows)
})

app.delete('/api/checkout', async (req, res) => {
  const userId = req.query.user
  await client.query('DELETE FROM cart WHERE user_id=$1', [userId])
  res.status(204).send('Alla böcker borttagna från varukorgen!')
})

app.delete('/api/cart/:id', async (req, res) => {
  const userId = req.query.user
  await client.query('DELETE FROM cart WHERE book_id=$1 AND user_id=$2', [req.params.id, userId])
  res.status(204).send('Bok borttagen från varukorgen!')
})

app.delete('/api/decrease/:id', async (req, res) => {
  const userId = req.query.user
  await client.query(
    `WITH latest_row AS (
      SELECT cart_id
      FROM cart
      WHERE book_id=$1
      AND user_id=$2
      ORDER BY cart_id DESC
      LIMIT 1
    )
      DELETE FROM cart
      WHERE cart_id IN (SELECT cart_id FROM latest_row)`,
    [req.params.id, userId]
  )
  res.status(204).send('Bok borttagen från varukorgen!')
})

app.post('/create-checkout-session', async (req, res) => {
  const data = req.body
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: data.cartData,
      mode: 'payment',
      ui_mode: 'custom',
      return_url: `${req.headers.origin}/confirmation`
    })

    res.json({ checkoutSessionClientSecret: session.client_secret })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Något gick fel vid skapande av betalning.' })
  }
})

app.use((_req, res) => {
  res.sendFile(path.join(path.resolve(), 'dist/index.html'))
})

app.listen(3000, () => {
  console.log('Redo på http://localhost:3000')
})
