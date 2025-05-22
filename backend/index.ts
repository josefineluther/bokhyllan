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

app.get('/books', async (request, response) => {
  const { rows }: { rows: BookType[] } = await client.query('SELECT * FROM books')
  response.json(rows)
})

/* typa rows */

app.get('/summerbooks', async (request, response) => {
  const { rows }: { rows: BookType[] } = await client.query('SELECT * FROM books WHERE home_page=$1', [true])
  response.json(rows)
})

app.get('/bookinfo/:id', async (request, response) => {
  const { rows }: { rows: BookType[] } = await client.query('SELECT * FROM books WHERE book_id=$1', [request.params.id])
  response.json(rows)
})

app.post('/addtocart', async (request, response) => {
  const { bookId } = request.body

  await client.query('INSERT INTO cart (book_id) VALUES ($1)', [bookId])
  response.status(201).send('Bok tillagd i varukorgen!')
})

app.get('/cart', async (request, response) => {
  response.send('')
})

app.listen(3000, () => {
  console.log('Redo på http://localhost:3000')
})
