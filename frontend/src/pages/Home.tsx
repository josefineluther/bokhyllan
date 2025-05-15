import { useEffect, useState } from 'react'
import WomanReading from '../assets/IMG/woman_reading.jpg'
import { apiUrl } from '../Api'

function Home() {
  const [summerBooks, setSummerBooks] = useState([])

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
        <img src={WomanReading} />
        <div className='offer'>
          <h2>SOMMAR-REA</h2>
          <h2>3 för 2 på allt!</h2>
        </div>
      </section>
      <h3>Boktips inför semestern</h3>
      <div style={{ display: 'flex' }}>
        {summerBooks.map((book) => (
          <div style={{ margin: '1rem' }}>
            <img src={book.img} style={{ height: '20rem', width: '13rem' }} />
            <p>{book.title}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
