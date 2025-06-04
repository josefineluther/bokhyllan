import { useEffect } from 'react'
import { apiUrl } from '../Api'
import Button from '../styled_components/Button'
import getUserId from '../user_id'
import { Link } from 'react-router-dom'

function Confirmation() {
  function deleteCart() {
    fetch(`${apiUrl}/api/checkout?user=${getUserId()}`, {
      method: 'DELETE'
    })
  }

  useEffect(deleteCart, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 'auto', gap: '2em', width: '50vw', height: '50vh' }}>
      <h2 style={{ textAlign: 'center' }}>Tack för din order!</h2>
      <Link style={{ alignSelf: 'center' }} to='/'>
        <Button>Tillbaka till startsidan</Button>
      </Link>
    </div>
  )
}

export default Confirmation
