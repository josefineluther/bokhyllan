import { useEffect, useState } from 'react'
import { apiUrl } from '../Api'
import type { BookType } from '../types'
import getUserId from '../user_id'

export default function useCartInfo() {
  const [cart, setCart] = useState<BookType[]>([])

  function getCart() {
    fetch(`${apiUrl}/api/cart?user=${getUserId()}`)
      .then((response) => response.json())
      .then((result: (BookType & { cart_id: number })[]) => {
        result.sort((a, b) => a.cart_id - b.cart_id)
        setCart(result)
      })
  }

  function computeProductPrice() {
    let productPrice = 0
    cart.forEach((book) => {
      productPrice += book.price
    })
    return productPrice
  }
  const productPrice = computeProductPrice()

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
