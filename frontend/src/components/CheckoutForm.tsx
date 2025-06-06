import { useCheckout, PaymentElement } from '@stripe/react-stripe-js'
import Button from '../styled_components/Button'
import useCartInfo from '../hooks/CartInfo'
import { useState } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 2em;
  width: 80vw;

  @media only screen and (min-width: 600px) {
    width: 50vw;
  }
`

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
      <Form onSubmit={handleSubmit}>
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
      </Form>
    </>
  )
}

export default CheckoutForm
