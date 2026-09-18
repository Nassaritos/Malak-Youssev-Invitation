import { motion } from 'framer-motion'
import Flora from './Flora.jsx'
import { FLOWERS, MONOGRAM } from '../data/flowers.js'
import { EVENT } from '../data/event.js'
import './closing.css'

const ease = [0.22, 1, 0.36, 1]

export default function Closing() {
  return (
    <footer className="closing section" aria-label="With love">
      <div className="closing__wash" aria-hidden="true" />

      <div className="flora-layer">
        {/* a little greenery up top — the emblem is the crown here */}
        <Flora
          src={FLOWERS.eucalyptus}
          place={{ top: '2%', left: '1%', width: 'clamp(96px, 13vw, 176px)' }}
          rotate={-20}
          opacity={0.85}
          delay={0.2}
        />
        {/* bottom framing */}
        <Flora
          src={FLOWERS.roseWhite}
          place={{ bottom: '3%', right: '3%', width: 'clamp(84px, 11vw, 148px)' }}
          rotate={-10}
          delay={0.45}
        />
        <Flora
          src={FLOWERS.lavender}
          place={{ bottom: '4%', right: '15%', width: 'clamp(46px, 6vw, 84px)' }}
          rotate={10}
          opacity={0.85}
          delay={0.55}
        />
        <Flora
          src={FLOWERS.rosebud}
          place={{ bottom: '6%', left: '6%', width: 'clamp(40px, 5vw, 66px)' }}
          rotate={-24}
          delay={0.5}
        />
      </div>

      <div className="section__inner closing__inner">
        <motion.img
          src={MONOGRAM}
          className="closing__crest"
          alt="Malak and Youssef monogram"
          width="685"
          height="900"
          initial={{ opacity: 0, y: 18, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.3, ease }}
        />

        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.15 }}
        >
          With all our love
        </motion.p>

        <motion.h2
          className="closing__names serif"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease, delay: 0.1 }}
        >
          {EVENT.groom}
          <span className="closing__amp"> &amp; </span>
          {EVENT.bride}
        </motion.h2>

        <motion.p
          className="closing__line"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease, delay: 0.25 }}
        >
          We can’t wait to celebrate with you.
        </motion.p>

        <motion.p
          className="closing__meta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          {EVENT.dayName}, {EVENT.dateLabel} · {EVENT.timeShort} · {EVENT.venue}
        </motion.p>
      </div>

      <p className="closing__credit">
        Made with <span className="closing__credit-love">love</span> by Ibraheem Nassar
      </p>
    </footer>
  )
}
