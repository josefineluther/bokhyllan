import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { apiUrl } from '../Api'
import type { BookType } from '../types'
import BookDiv from '../components/BookDiv'
import P from '../components/P'
import Button from '../components/Button'
import BookImg from '../components/BookImg'

function BookInfo() {
  const { id } = useParams()
  const bookId = Number(id)
  const [book, setBook] = useState<BookType | null>(null)

  useEffect(() => {
    function getBook() {
      fetch(`${apiUrl}/bookinfo/${bookId}`)
        .then((response) => response.json())
        .then((result) => {
          setBook(result[0])
        })
    }
    getBook()
  }, [bookId])

  function addToCart() {
    fetch(`${apiUrl}/addtocart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId })
    }).then(() => console.log('Lagt till bok i varukorgen'))
  }

  return (
    <>
      {book && (
        <BookDiv>
          <div style={{ gridArea: 'image' }}>
            <BookImg src={`/${book.img}`} />
          </div>
          <div style={{ gridArea: 'productInfo' }}>
            <P>
              <b>Förlag:</b> {book.publisher}
            </P>
            <P>
              <b>Kategori:</b> {book.genre}
            </P>
          </div>
          <div style={{ gridArea: 'title' }}>
            <h1>{book.title}</h1>
            <h3>{book.author}</h3>
            <P>
              {book.format}, {book.language}, {book.year}
            </P>
          </div>
          <div style={{ gridArea: 'description' }}>
            <P>
              <b>Beskrivning</b>
            </P>
            <P>{book.description}</P>
            <h2>{book.price} kr</h2>
            <Button onClick={addToCart}>LÄGG I VARUKORG</Button>
          </div>
        </BookDiv>
      )}
    </>
  )
}

export default BookInfo
