import styled from 'styled-components'

const GalleryDiv = styled.div`
  padding: 2em 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2em;

  @media only screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media only screen and (min-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`

export default GalleryDiv
