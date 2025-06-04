import { CheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from '../components/CheckoutForm'
import { apiUrl } from '../Api'
import useCartInfo from '../hooks/CartInfo'
import type { BookType } from '../types'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!)

function Checkout() {
  const { groupedCart } = useCartInfo()

  const cartData = groupedCart.map((book: { book: BookType; count: number; booksForFree: number }) => ({
    price_data: {
      currency: 'SEK',
      product_data: {
        name: book.book.title
      },
      unit_amount: book.book.price * 100
    },
    quantity: book.count - book.booksForFree
  }))

  const fetchClientSecret = () => {
    return fetch(`${apiUrl}/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartData })
    })
      .then((response) => response.json())
      .then((json) => json.checkoutSessionClientSecret)
  }

  return (
    groupedCart.length > 0 && (
      <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <CheckoutForm />
      </CheckoutProvider>
    )
  )
}

export default Checkout
