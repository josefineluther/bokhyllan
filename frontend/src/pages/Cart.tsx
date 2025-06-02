import { useState, useEffect } from 'react'
import styled from 'styled-components'
import type { BookType } from '../types'
import { apiUrl } from '../Api'
import { Link } from 'react-router-dom'
import P from '../styled_components/P'
import Button from '../styled_components/Button'
import Img from '../styled_components/Img'

const CartDiv = styled.div`
  margin: 0;

  @media only screen and (min-width: 992px) {
    margin: 2em 5em;
  }
`

const BookInCart = styled.div`
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'remove remove'
    'img info'
    'img amount'
    'price price';
  gap: 0.5em;

  @media only screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr 2fr;
    grid-template-areas:
      'img info remove'
      'img amount price';
  }

  @media only screen and (min-width: 992px) {
    grid-template-columns: 1fr 1fr 4fr;
    grid-template-areas:
      'img info remove'
      'img amount price';
  }
`

const AmountDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 0.5px solid #787878;
  width: 5em;
  height: 2em;
`

function Cart() {
  const [cart, setCart] = useState<BookType[]>([])

  function getCart() {
    fetch(`${apiUrl}/api/cart`)
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

    cheapestBooks.forEach((book) => {
      discount += book.price
      const existing = groupedCart.find((bookInGrouped) => bookInGrouped.book.book_id === book.book_id)
      if (existing) {
        existing.booksForFree += 1
      }
    })

    return discount
  }
  const totalDiscount = computeTotalDiscount()

  function removeFromCart(id: number) {
    fetch(`${apiUrl}/api/cart/${id}`, {
      method: 'DELETE'
    }).then(() => getCart())
  }

  function addToCart(bookId: number) {
    fetch(`${apiUrl}/api/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId })
    }).then(() => getCart())
  }

  function decreaseCart(id: number) {
    fetch(`${apiUrl}/api/decrease/${id}`, {
      method: 'DELETE'
    }).then(() => getCart())
  }

  useEffect(getCart, [])

  return (
    <>
      <h1 style={{ margin: '0' }}>Varukorg</h1>
      <CartDiv>
        {groupedCart.length > 0 ? (
          <>
            {groupedCart.map(({ book, count, booksForFree }) => (
              <div key={book.book_id}>
                <BookInCart>
                  <Link to={`/bookinfo/${book.book_id}`} className='bookInCart' style={{ gridArea: 'img' }}>
                    <Img src={book.img} alt={book.title} />
                  </Link>

                  <Link to={`/bookinfo/${book.book_id}`} style={{ gridArea: 'info' }}>
                    <p>
                      <b>{book.title}</b>
                    </p>
                    <p>{book.author}</p>
                  </Link>

                  <AmountDiv style={{ gridArea: 'amount' }}>
                    <p style={{ cursor: 'pointer', padding: '1em' }} onClick={() => decreaseCart(book.book_id)}>
                      -
                    </p>
                    <p>
                      <b>{count}</b>
                    </p>
                    <p style={{ cursor: 'pointer', padding: '1em' }} onClick={() => addToCart(book.book_id)}>
                      +
                    </p>
                  </AmountDiv>

                  <i
                    onClick={() => removeFromCart(book.book_id)}
                    style={{ cursor: 'pointer', fontSize: '1.5em', textAlign: 'right', gridArea: 'remove' }}
                    className='bi bi-x'
                  ></i>

                  <div style={{ gridArea: 'price', textAlign: 'right' }}>
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
            <div style={{ textAlign: 'right', marginTop: '2em', marginBottom: '3em' }}>
              <P>Produkter: {sum} kr</P>
              {totalDiscount === 0 ? <P>Rabatt: {totalDiscount} kr</P> : <P>Rabatt: -{totalDiscount} kr</P>}
              <h3>Summa: {sum - totalDiscount} kr</h3>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button>Till kassan</Button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
            <p>Din varukorg är tom</p>
          </div>
        )}
      </CartDiv>
    </>
  )
}

export default Cart
