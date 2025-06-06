import { useEffect, useMemo, useState } from 'react'
import { apiUrl } from '../Api'
import type { BookType } from '../types'
import getUserId from '../user_id'

function useCartInfo() {
  const [cart, setCart] = useState<BookType[]>([])

  function getCart() {
    fetch(`${apiUrl}/api/cart?user=${getUserId()}`)
      .then((response) => response.json())
      .then((result: (BookType & { cart_id: number })[]) => {
        result.sort((a, b) => a.cart_id - b.cart_id)
        setCart(result)
      })
  }

  const productPrice = useMemo(() => {
    let productPrice = 0
    cart.forEach((book) => {
      productPrice += book.price
    })
    return productPrice
  }, [cart])

  const { groupedCart, totalDiscount } = useMemo(() => {
    const groupedCart: { count: number; book: BookType; booksForFree: number }[] = []
    cart.forEach((book) => {
      const existing = groupedCart.find((bookInGrouped) => bookInGrouped.book.book_id === book.book_id)
      if (existing) {
        existing.count += 1
      } else {
        groupedCart.push({ count: 1, book, booksForFree: 0 })
      }
    })

    let totalDiscount = 0
    const freeBooks = Math.floor(cart.length / 3)
    const newCart = [...cart]
    const cheapestBooks = newCart.sort((a, b) => a.price - b.price).slice(0, freeBooks)

    cheapestBooks.forEach((book) => {
      totalDiscount += book.price
      const existing = groupedCart.find((bookInGrouped) => bookInGrouped.book.book_id === book.book_id)
      if (existing) {
        existing.booksForFree += 1
      }
    })

    return { groupedCart, totalDiscount }
  }, [cart])

  function removeFromCart(id: number) {
    fetch(`${apiUrl}/api/cart/${id}?user=${getUserId()}`, {
      method: 'DELETE'
    }).then(() => getCart())
  }

  function addToCart(bookId: number) {
    fetch(`${apiUrl}/api/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId, userId: getUserId() })
    }).then(() => getCart())
  }

  function decreaseCart(id: number) {
    fetch(`${apiUrl}/api/decrease/${id}?user=${getUserId()}`, {
      method: 'DELETE'
    }).then(() => getCart())
  }

  const sum = productPrice - totalDiscount

  useEffect(getCart, [])

  return { groupedCart, productPrice, sum, totalDiscount, addToCart, removeFromCart, decreaseCart }
}

export default useCartInfo
