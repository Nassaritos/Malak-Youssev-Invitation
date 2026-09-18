import { motion } from 'framer-motion'
import Flora from './Flora.jsx'
import { FLOWERS } from '../data/flowers.js'
import { EVENT } from '../data/event.js'
import './closing.css'

const ease = [0.22, 1, 0.36, 1]

export default function Closing() {
  return (
    <footer className="closing section" aria-label="With love">
      <div className="closing__wash" aria-hidden="true" />

      <div className="flora-layer">
        {/* top framing */}
        <Flora
          src={FLOWERS.eucalyptus}
          place={{ top: '2%', left: '1%', width: 'clamp(104px, 15vw, 200px)' }}
          rotate={-20}
          opacity={0.75}
          blur={0.5}
          delay={0.2}
        />
        <Flora
          src={FLOWERS.roseBlush}
          place={{ top: '5%', left: '6%', width: 'clamp(64px, 9vw, 116px)' }}
          rotate={14}
          delay={0.35}
        />
        <Flora
          src={FLOWERS.babysBreath}
          place={{ top: '3%', right: '4%', width: 'clamp(72px, 9vw, 128px)' }}
          rotate={6}
          opacity={0.8}
          delay={0.4}
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
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
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
    </footer>
  )
}
