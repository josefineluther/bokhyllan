import dotenv from 'dotenv'
import { Client } from 'pg'
import express from 'express'
import path from 'path'
import cors from 'cors'

dotenv.config()
const app = express()

const client = new Client({
  connectionString: process.env.PGURI
})

client.connect()
console.log('Ansluten till databas')

app.use(express.static(path.join(path.resolve(), 'dist')))

app.use(cors())

app.get('/summerbooks', async (request, response) => {
  const { rows } = await client.query('SELECT * FROM books WHERE home_page=$1', [true])
  response.json(rows)
})

app.listen(3000, () => {
  console.log('Redo på http://localhost:3000')
})
