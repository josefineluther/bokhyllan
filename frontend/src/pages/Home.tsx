import { useEffect, useState } from 'react'
import WomanReading from '../assets/IMG/woman_reading.jpg'
import { apiUrl } from '../Api'
import type { BookType } from '../types'
import Img from '../components/Img'
import GalleryDiv from '../components/GalleryDiv'
import { Link } from 'react-router-dom'
import BookInGallery from '../components/BookInGallery'

function Home() {
  const [summerBooks, setSummerBooks] = useState<BookType[]>([])

  function getSummerBooks() {
    fetch(`${apiUrl}/summerbooks`)
      .then((response) => response.json())
      .then((result) => {
        setSummerBooks(result)
      })
  }

  useEffect(getSummerBooks, [])

  return (
    <>
      <section className='hero'>
        <img id='heroImage' src={WomanReading} />
        <div className='offer'>
          <h2>SOMMAR-REA</h2>
          <h2>3 för 2 på allt!</h2>
        </div>
      </section>
      <h3>Boktips inför semestern</h3>
      <GalleryDiv>
        {summerBooks.map((book) => (
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

export default Home
