import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from '../Api'
import type { BookType } from '../types'
import GalleryDiv from '../components/GalleryDiv'
import Img from '../components/Img'
import BookInGallery from '../components/BookInGallery'

function Books() {
  const [books, setBooks] = useState<BookType[]>([])

  function getBooks() {
    fetch(`${apiUrl}/api/books`)
      .then((response) => response.json())
      .then((result) => {
        setBooks(result)
      })
  }

  useEffect(getBooks, [])

  return (
    <>
      <h1>Böcker</h1>
      <GalleryDiv>
        {books.map((book) => (
          <Link to={`/bookinfo/${book.book_id}`} key={book.book_id}>
            <BookInGallery>
              <Img src={book.img} />
              <p>
                <b>{book.title}</b>
              </p>
              <p>{book.author}</p>
              <p>
                <b>{book.price} kr</b>
              </p>
            </BookInGallery>
          </Link>
        ))}
      </GalleryDiv>
    </>
  )
}

export default Books
