import { motion } from 'framer-motion'
import Countdown from './Countdown.jsx'
import Flora from './Flora.jsx'
import { FLOWERS } from '../data/flowers.js'
import { EVENT } from '../data/event.js'
import './details.css'

const ease = [0.22, 1, 0.36, 1]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-12% 0px' },
    transition: { duration: 1, ease, delay },
  }
}

export default function Details() {
  return (
    <section id="details" className="details section" aria-label="The evening">
      <div className="flora-layer">
        <Flora
          src={FLOWERS.roseBlush}
          place={{ top: '4%', right: '2%', width: 'clamp(66px, 9vw, 124px)' }}
          rotate={16}
          opacity={0.85}
          delay={0.2}
        />
        <Flora
          src={FLOWERS.babysBreath}
          place={{ bottom: '4%', left: '2%', width: 'clamp(74px, 10vw, 132px)' }}
          rotate={0}
          opacity={0.7}
          delay={0.3}
        />
      </div>

      <div className="section__inner details__inner">
        <motion.p className="index-mark" {...fadeUp(0)}>
          03 — The Evening
        </motion.p>

        <motion.h2 className="details__names serif" {...fadeUp(0.08)}>
          {EVENT.groom} <span className="details__amp">&amp;</span> {EVENT.bride}
        </motion.h2>

        <motion.p className="details__tag" {...fadeUp(0.12)}>
          Are getting engaged
        </motion.p>

        <motion.div className="details__grid" {...fadeUp(0.16)}>
          <div className="details__cell">
            <span className="details__k">Day</span>
            <span className="details__v serif">{EVENT.dayName}</span>
          </div>
          <span className="details__divider" aria-hidden="true" />
          <div className="details__cell">
            <span className="details__k">Date</span>
            <span className="details__v serif">{EVENT.dateLabel}</span>
          </div>
          <span className="details__divider" aria-hidden="true" />
          <div className="details__cell">
            <span className="details__k">Time</span>
            <span className="details__v serif">{EVENT.timeLabel}</span>
          </div>
        </motion.div>

        <motion.p className="details__venue serif" {...fadeUp(0.24)}>
          {EVENT.venue}
        </motion.p>
        <motion.p className="details__venue-note" {...fadeUp(0.3)}>
          Reached by boat, across the Nile.
        </motion.p>

        <motion.div className="hairline details__hairline" {...fadeUp(0.34)} />

        <motion.div className="details__countdown" {...fadeUp(0.4)}>
          <p className="details__countdown-label eyebrow">Counting the moments</p>
          <Countdown />
        </motion.div>
      </div>
    </section>
  )
}
