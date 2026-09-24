import { motion } from 'framer-motion'
import NileScene from './NileScene.jsx'
import Flora from './Flora.jsx'
import { FLOWERS } from '../data/flowers.js'
import './journey.css'

const ease = [0.22, 1, 0.36, 1]

const STEPS = [
  {
    n: '01',
    title: 'By the Corniche',
    body: 'Leave your car along the Corniche and stroll, unhurried, down to the water’s edge.',
  },
  {
    n: '02',
    title: 'Aboard the boat',
    body: 'A boat awaits you at the landing, ready to set sail the moment you step aboard.',
  },
  {
    n: '03',
    title: 'Across the Nile',
    body: 'Let the river carry you gently to Taracina as the evening light softens.',
  },
  {
    n: '04',
    title: 'Into the celebration',
    body: 'And on the far shore, we will be waiting to welcome you.',
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
          hideOnMobile
        />
        <Flora
          src={FLOWERS.lavender}
          place={{ top: '6%', right: '2%', width: 'clamp(54px, 7vw, 104px)' }}
          rotate={-10}
          opacity={0.8}
          delay={0.35}
          hideOnMobile
        />
      </div>

      <div className="section__inner journey__intro">
        <motion.p className="index-mark" {...fadeUp(0)}>
          03 — The Journey
        </motion.p>
        <motion.h2 className="journey__title serif" {...fadeUp(0.1)}>
          A little journey to us
        </motion.h2>
        <motion.p className="journey__lede" {...fadeUp(0.2)}>
          Our celebration begins before you arrive. Meet us by the Nile, where a short passage by
          boat will carry you across to Taracina.
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

        <motion.p className="journey__note" {...fadeUp(0.2)}>
          Throughout the evening, our boat remains at your service — it sets out with every guest,
          never waiting for its seats to fill, and stands ready to return you to the shore whenever
          you wish to take your leave.
        </motion.p>
      </div>
    </section>
  )
}
