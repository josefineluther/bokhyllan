import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { apiUrl } from '../Api'
import type { BookType } from '../types'
import BookDiv from '../components/BookDiv'
import P from '../components/P'
import Button from '../components/Button'
import Img from '../components/Img'
import { Link } from 'react-router-dom'

function BookInfo() {
  const { id } = useParams()
  const bookId = Number(id)
  const [book, setBook] = useState<BookType | null>(null)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    function getBook() {
      fetch(`${apiUrl}/api/bookinfo/${bookId}`)
        .then((response) => response.json())
        .then((result) => {
          setBook(result[0])
        })
    }
    getBook()
  }, [bookId])

  function addToCart() {
    fetch(`${apiUrl}/api/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId })
    }).then(() => setAddedToCart(true))
  }

  function close() {
    setAddedToCart(false)
  }

  return (
    <>
      {book && (
        <>
          {addedToCart && (
            <div style={{ textAlign: 'right' }}>
              <i className='bi bi-x' onClick={close} style={{ fontSize: '1.5em', cursor: 'pointer', marginRight: '2em' }}></i>
              <div style={{ textAlign: 'center' }}>
                <P>
                  <b>{book.title}</b> är tillagd i varukorgen!
                </P>
                <Link to='/books'>
                  <Button style={{ margin: '1em' }}>Fortsätt handla</Button>
                </Link>
                <Link to='/cart'>
                  <Button style={{ margin: '1em' }}>Till varukorgen</Button>
                </Link>
                <hr style={{ margin: '3em' }}></hr>
              </div>
            </div>
          )}
          <BookDiv>
            <div style={{ gridArea: 'image' }}>
              <Img src={`/${book.img}`} />
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
        </>
      )}
    </>
  )
}

export default BookInfo
