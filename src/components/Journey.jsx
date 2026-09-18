import { motion } from 'framer-motion'
import NileScene from './NileScene.jsx'
import Flora from './Flora.jsx'
import { FLOWERS } from '../data/flowers.js'
import './journey.css'

const ease = [0.22, 1, 0.36, 1]

const STEPS = [
  {
    n: '01',
    title: 'Park at the Corniche',
    body: 'Leave your car along the Corniche and make your way, unhurried, down to the water.',
  },
  {
    n: '02',
    title: 'Take the boat',
    body: 'A boat will be waiting for you at the water’s edge — no need to wait, no need to rush.',
  },
  {
    n: '03',
    title: 'Cross the Nile',
    body: 'Step aboard and let the river carry you across to Taracina as the evening softens.',
  },
  {
    n: '04',
    title: 'Arrive & celebrate',
    body: 'And there, on the other side, we’ll be waiting for you.',
  },
]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-12% 0px' },
    transition: { duration: 1, ease, delay },
  }
}

export default function Journey() {
  return (
    <section id="journey" className="journey section" aria-label="The journey to us">
      <div className="flora-layer">
        <Flora
          src={FLOWERS.eucalyptus}
          place={{ top: '3%', left: '1%', width: 'clamp(96px, 14vw, 190px)' }}
          rotate={-24}
          opacity={0.85}
          delay={0.2}
        />
        <Flora
          src={FLOWERS.lavender}
          place={{ top: '6%', right: '2%', width: 'clamp(54px, 7vw, 104px)' }}
          rotate={-10}
          opacity={0.8}
          delay={0.35}
        />
      </div>

      <div className="section__inner journey__intro">
        <motion.p className="index-mark" {...fadeUp(0)}>
          02 — The Journey
        </motion.p>
        <motion.h2 className="journey__title serif" {...fadeUp(0.1)}>
          A little journey to us
        </motion.h2>
        <motion.p className="journey__lede" {...fadeUp(0.2)}>
          Our celebration begins before you arrive. Join us by the Nile, where a short boat ride
          will carry you across to Taracina.
        </motion.p>
      </div>

      {/* atmospheric river band */}
      <motion.div
        className="journey__river"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.4, ease }}
      >
        <span className="journey__bank journey__bank--left serif">Corniche</span>
        <NileScene />
        <span className="journey__bank journey__bank--right serif">Taracina</span>
      </motion.div>

      {/* arrival steps */}
      <div className="section__inner">
        <ol className="journey__steps">
          {STEPS.map((s, i) => (
            <motion.li key={s.n} className="journey__step" {...fadeUp(0.1 + i * 0.12)}>
              <span className="journey__step-marker" aria-hidden="true" />
              <span className="journey__step-n">{s.n}</span>
              <h3 className="journey__step-title serif">{s.title}</h3>
              <p className="journey__step-body">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
