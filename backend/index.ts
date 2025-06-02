import dotenv from 'dotenv'
import { Client } from 'pg'
import express from 'express'
import path from 'path'
import cors from 'cors'
import type { BookType } from '../frontend/src/types'

dotenv.config()
const app = express()

const client = new Client({
  connectionString: process.env.PGURI
})

client.connect()
console.log('Ansluten till databas')

app.use(express.static(path.join(path.resolve(), 'dist')))

app.use(cors())

app.use(express.json())

app.get('/api/books', async (_request, response) => {
  const { rows }: { rows: BookType[] } = await client.query('SELECT * FROM books')
  response.json(rows)
})

app.get('/api/summerbooks', async (_request, response) => {
  const { rows }: { rows: BookType[] } = await client.query('SELECT * FROM books WHERE home_page=$1', [true])
  response.json(rows)
})

app.get('/api/bookinfo/:id', async (request, response) => {
  const { rows }: { rows: BookType[] } = await client.query('SELECT * FROM books WHERE book_id=$1', [request.params.id])
  response.json(rows)
})

app.post('/api/cart', async (request, response) => {
  const { bookId } = request.body

  await client.query('INSERT INTO cart (book_id) VALUES ($1)', [bookId])
  response.status(201).send('Bok tillagd i varukorgen!')
})

app.get('/api/cart', async (_request, response) => {
  const { rows }: { rows: BookType[] } = await client.query('SELECT books.*, cart.cart_id FROM cart INNER JOIN books ON cart.book_id = books.book_id')
  response.json(rows)
})

app.delete('/api/cart/:id', async (request, response) => {
  await client.query('DELETE FROM cart WHERE book_id=$1', [request.params.id])
  response.status(204).send('Bok borttagen från varukorgen!')
})

app.delete('/api/decrease/:id', async (request, response) => {
  await client.query(
    `WITH latest_row AS (
      SELECT cart_id
      FROM cart
      WHERE book_id = $1
      ORDER BY cart_id DESC
      LIMIT 1
    )
      DELETE FROM cart
      WHERE cart_id IN (SELECT cart_id FROM latest_row)`,
    [request.params.id]
  )
  response.status(204).send('Bok borttagen från varukorgen!')
})

app.use((_request, response) => {
  response.sendFile(path.join(path.resolve(), 'dist/index.html'))
})

app.listen(3000, () => {
  console.log('Redo på http://localhost:3000')
})
