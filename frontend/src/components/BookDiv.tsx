import styled from 'styled-components'

const BookDiv = styled.div`
  padding: 2em;
  display: grid;
  grid-template-areas:
    'image'
    'title'
    'description'
    'productInfo'
    'price';

  @media only screen and (min-width: 600px) {
    column-gap: 4em;
    grid-template-areas:
      'image title'
      'image description'
      'productInfo description';
    grid-template-rows: auto auto 1fr;
  }

  @media only screen and (min-width: 992px) {
    margin: 0 9em;
    column-gap: 4em;
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
      'image title'
      'image description'
      'productInfo description';
  }
`

export default BookDiv
