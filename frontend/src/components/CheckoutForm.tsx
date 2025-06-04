import { useCheckout, PaymentElement } from '@stripe/react-stripe-js'
import Button from '../styled_components/Button'
import useCartInfo from '../hooks/CartInfo'
import { useState } from 'react'

function CheckoutForm() {
  const checkout = useCheckout()

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    const result = await checkout.confirm({ email })

    if (result.type === 'error') {
      console.log(result.error.message)
    }
  }

  const { sum } = useCartInfo()
  const [email, setEmail] = useState('')

  return (
    <>
      <form style={{ display: 'flex', flexDirection: 'column', margin: 'auto', gap: '2em', width: '50vw' }} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>Att betala: {sum} kr</h2>
        <input
          type='email'
          required
          placeholder='Skriv in din e-postadress'
          style={{ height: '15px', fontSize: '0.9em', padding: '1em' }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PaymentElement />
        <Button style={{ alignSelf: 'center' }} type='submit'>
          Godkänn betalning
        </Button>
      </form>
    </>
  )
}

export default CheckoutForm
