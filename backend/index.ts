import dotenv from 'dotenv'
import { Client } from 'pg'
import express from 'express'
import path from 'path'

dotenv.config()
const app = express()

const client = new Client({
  connectionString: process.env.PGURI
})

client.connect()
console.log('Ansluten till databas')

app.use(express.static(path.join(path.resolve(), 'dist')))

app.listen(3000, () => {
  console.log('Redo på http://localhost:3000')
})
