import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import type { StylesConfig } from 'react-select'
import { apiUrl } from '../Api'
import type { BookType } from '../types'
import GalleryDiv from '../styled_components/GalleryDiv'
import Img from '../styled_components/Img'
import BookInGallery from '../styled_components/BookInGallery'

type OptionType = { value: string; label: string }

const customStyles: StylesConfig<OptionType, false> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: '#ffffff',
    border: state.isFocused ? '0px' : '0px',
    boxShadow: state.isFocused ? '0px' : '0px',
    fontFamily: 'Arial',
    borderRadius: '0px',
    padding: '0em'
  }),
  option: (base, state) => ({
    ...base,
    fontFamily: 'Arial',
    backgroundColor: state.isSelected ? '#ffe74f' : state.isFocused ? '#ffe74f' : 'white',
    color: '#333333'
  }),
  menu: (base) => ({
    ...base,
    boxShadow: '0px',
    borderRadius: '0px'
  })
}

const genre: OptionType[] = [
  { value: 'Alla genrer', label: 'Alla genrer' },
  { value: 'Samtida skönlitteratur', label: 'Samtida skönlitteratur' },
  { value: 'Deckare', label: 'Deckare' },
  { value: 'Klassiker', label: 'Klassiker' },
  { value: 'Romantik', label: 'Romantik' },
  { value: 'Fantasy', label: 'Fantasy' },
  { value: 'Skräck', label: 'Skräck' }
]

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
        <Select
          options={genre}
          isSearchable={false}
          styles={customStyles}
          defaultValue={genre[0]}
          onChange={(selected) => {
            const selectedValue = selected?.value
            getBooks(selectedValue)
          }}
        />
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
