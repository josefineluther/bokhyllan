import { useState, useEffect } from 'react'
import type { BookType } from '../types'
import { apiUrl } from '../Api'
import { Link } from 'react-router-dom'
import BookInCart from '../components/BookInCart'
import P from '../components/P'
import Button from '../components/Button'

function Cart() {
  const [cart, setCart] = useState<BookType[]>([])

  function getCart() {
    fetch(`${apiUrl}/cart`)
      .then((response) => response.json())
      .then((result: (BookType & { cart_id: number })[]) => {
        result.sort((a, b) => a.cart_id - b.cart_id)
        setCart(result)
      })
  }

  function computeSum() {
    let sum = 0
    cart.forEach((book) => {
      sum += book.price
    })
    return sum
  }
  const sum = computeSum()

  function computeGroupedCart() {
    const groupedCart: { count: number; book: BookType; booksForFree: number }[] = []
    cart.forEach((book) => {
      const existing = groupedCart.find((bookInGrouped) => bookInGrouped.book.book_id === book.book_id)
      if (existing) {
        existing.count += 1
      } else {
        groupedCart.push({ count: 1, book, booksForFree: 0 })
      }
    })
    return groupedCart
  }
  const groupedCart = computeGroupedCart()

  function computeTotalDiscount() {
    let discount = 0
    const freeBooks = Math.floor(cart.length / 3)
    const newCart = [...cart]
    const cheapestBooks = newCart.sort((a, b) => a.price - b.price).slice(0, freeBooks)
    if (cart.length >= 3) {
      cheapestBooks.forEach((book) => {
        discount += book.price
        const existing = groupedCart.find((bookInGrouped) => bookInGrouped.book.book_id === book.book_id)
        if (existing) {
          existing.booksForFree += 1
        }
      })
    }
    return discount
  }
  const totalDiscount = computeTotalDiscount()

  function removeFromCart(id: number) {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    }).then(() => getCart())
  }

  function addToCart(bookId: number) {
    fetch(`${apiUrl}/addtocart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId })
    }).then(() => getCart())
  }

  function decreaseCart(id: number) {
    fetch(`${apiUrl}/decrease/${id}`, {
      method: 'DELETE'
    }).then(() => getCart())
  }

  useEffect(getCart, [])

  return (
    <>
      <h1>Varukorg</h1>
      {groupedCart.length > 0 ? (
        <div style={{ margin: '2em 5em' }}>
          {groupedCart.map(({ book, count, booksForFree }) => (
            <div key={book.book_id}>
              <BookInCart>
                <div style={{ display: 'flex' }}>
                  <Link to={`/bookinfo/${book.book_id}`}>
                    <img src={book.img} style={{ marginRight: '3em', width: '7em' }} />
                  </Link>
                  <div>
                    <Link to={`/bookinfo/${book.book_id}`}>
                      <p>
                        <b>{book.title}</b>
                      </p>
                      <p>{book.author}</p>
                    </Link>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        border: '0.5px solid #787878',
                        width: '5em',
                        height: '2em'
                      }}
                    >
                      <p style={{ cursor: 'pointer', padding: '1em' }} onClick={() => decreaseCart(book.book_id)}>
                        -
                      </p>
                      <p>
                        <b>{count}</b>
                      </p>
                      <p style={{ cursor: 'pointer', padding: '1em' }} onClick={() => addToCart(book.book_id)}>
                        +
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'right' }}>
                  <p onClick={() => removeFromCart(book.book_id)} style={{ cursor: 'pointer' }}>
                    <i className='bi bi-x' style={{ fontSize: '1.5em' }}></i>
                  </p>
                  {booksForFree ? (
                    <p>
                      <s>{book.price * count} kr</s>
                      <b> {book.price * (count - booksForFree)} kr</b>
                    </p>
                  ) : (
                    <p>
                      <b>{book.price * count} kr</b>
                    </p>
                  )}
                </div>
              </BookInCart>
              <hr></hr>
            </div>
          ))}
          <P style={{ textAlign: 'right' }}>Produkter: {sum} kr</P>
          {totalDiscount === 0 ? (
            <P style={{ textAlign: 'right' }}>Rabatt: {totalDiscount} kr</P>
          ) : (
            <P style={{ textAlign: 'right' }}>Rabatt: -{totalDiscount} kr</P>
          )}
          <h3 style={{ textAlign: 'right' }}>Summa: {sum - totalDiscount} kr</h3>
          <div style={{ textAlign: 'center' }}>
            <Button>Till kassan</Button>
          </div>
        </div>
      ) : (
        <p>Din varukorg är tom</p>
      )}
    </>
  )
}

export default Cart
