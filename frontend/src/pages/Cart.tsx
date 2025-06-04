import styled from 'styled-components'
import { Link } from 'react-router-dom'
import P from '../styled_components/P'
import Button from '../styled_components/Button'
import Img from '../styled_components/Img'
import '../styles/Cart.css'
import useCartInfo from '../hooks/CartInfo'

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
  const { groupedCart, productPrice, sum, totalDiscount, addToCart, removeFromCart, decreaseCart } = useCartInfo()

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
              <P>Produkter: {productPrice} kr</P>
              {totalDiscount === 0 ? <P>Rabatt: {totalDiscount} kr</P> : <P>Rabatt: -{totalDiscount} kr</P>}
              <h3>Summa: {sum} kr</h3>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link to='/checkout'>
                <Button>Till kassan</Button>
              </Link>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
            <P>
              <b>Din varukorg är tom</b>
            </P>
          </div>
        )}
      </CartDiv>
    </>
  )
}

export default Cart
