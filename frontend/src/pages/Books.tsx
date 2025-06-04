import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from '../Api'
import type { BookType } from '../types'
import GalleryDiv from '../styled_components/GalleryDiv'
import Img from '../styled_components/Img'
import BookInGallery from '../styled_components/BookInGallery'
import '../styles/Books.css'
import SelectGenre from '../components/SelectGenre'

function Books() {
  const [books, setBooks] = useState<BookType[]>([])

  function getBooks(genre = 'Alla genrer') {
    const url = genre === 'Alla genrer' ? `${apiUrl}/api/books` : `${apiUrl}/api/books?genre=${genre}`
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setBooks(result)
      })
  }

  useEffect(getBooks, [])

  return (
    <>
      <div className='titleDiv'>
        <h1>Böcker</h1>
        <SelectGenre onSelect={getBooks} />
      </div>
      <GalleryDiv>
        {books.map((book) => (
          <Link to={`/bookinfo/${book.book_id}`} key={book.book_id}>
            <BookInGallery>
              <Img src={book.img} alt={book.title} />
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
