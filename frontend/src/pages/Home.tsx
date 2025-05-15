import WomanReading from '../assets/IMG/woman_reading.jpg'

function Home() {
  return (
    <>
      <section className='hero'>
        <img src={WomanReading} />
        <div className='offer'>
          <h2>SOMMAR-REA</h2>
          <h2>3 för 2 på allt!</h2>
        </div>
      </section>
      <h3>Boktips inför semestern</h3>
    </>
  )
}

export default Home
