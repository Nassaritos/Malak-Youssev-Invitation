import Navigation from './components/Navigation.jsx'
import Hero from './components/Hero.jsx'
import Journey from './components/Journey.jsx'
import Details from './components/Details.jsx'
import Rsvp from './components/Rsvp.jsx'
import Closing from './components/Closing.jsx'

export default function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Details />
        <Journey />
        <Rsvp />
        <Closing />
      </main>
    </>
  )
}
