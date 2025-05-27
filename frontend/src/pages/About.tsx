import styled from 'styled-components'
import P from '../styled_components/P'
import Books from '../assets/IMG/books.jpg'
import Img from '../styled_components/Img'
import Button from '../styled_components/Button'
import { Link } from 'react-router-dom'

const AboutDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2em;
  margin: 1em;

  @media only screen and (min-width: 992px) {
    grid-template-columns: 2fr 1fr;
    margin: 2em;
    gap: 7em;
  }
`

function About() {
  return (
    <>
      <h1>Om oss</h1>
      <AboutDiv>
        <div>
          <P>
            <b>
              Bokhyllan är en bokhandel för dig som älskar ord, berättelser och doften av en riktigt bra bok. Vi tror på kraften i läsning – att en bok kan
              öppna nya världar, väcka tankar, och få oss att känna oss lite mer hemma i oss själva.
            </b>
          </P>
          <P>
            Hos oss hittar du ett handplockat sortiment av både nya och klassiska titlar – skönlitteratur, fackböcker, barnböcker och mycket mer. Vi vill att
            Bokhyllan ska vara en plats där du upptäcker något du inte visste att du letade efter.
          </P>
          <P>
            Bakom Bokhyllan står ett litet team med stor kärlek till böcker. Vi drivs av nyfikenhet, läslust och en vilja att skapa en bokhandel som känns
            personlig, inspirerande och varm.
          </P>
          <P> Välkommen att utforska vår bokhylla – vi hoppas du hittar något att förälska dig i.</P>
          <Link to='/books'>
            <Button style={{ margin: '4em auto', display: 'block' }}>Utforska vårt utbud!</Button>
          </Link>
        </div>
        <Img src={Books} />
      </AboutDiv>
    </>
  )
}

export default About
