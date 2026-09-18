import { motion } from 'framer-motion'
import Flora from './Flora.jsx'
import { FLOWERS } from '../data/flowers.js'
import { EVENT } from '../data/event.js'
import './hero.css'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <header id="invitation" className="hero" aria-label="The invitation">
      {/* very soft pastel wash + faint water shimmer */}
      <div className="hero__wash" aria-hidden="true" />
      <div className="hero__shimmer" aria-hidden="true" />

      {/* floral framing — sparse, entering from two corners */}
      <div className="flora-layer">
        {/* top-right cluster */}
        <Flora
          src={FLOWERS.eucalyptus}
          place={{ top: '2%', right: '1%', width: 'clamp(120px, 18vw, 240px)' }}
          rotate={18}
          opacity={0.9}
          blur={0.4}
          z={1}
          delay={0.5}
        />
        <Flora
          src={FLOWERS.roseBlush}
          place={{ top: '5%', right: '4%', width: 'clamp(84px, 11vw, 150px)' }}
          rotate={-8}
          z={3}
          delay={0.7}
        />
        <Flora
          src={FLOWERS.rosebud}
          place={{ top: '13%', right: '16%', width: 'clamp(44px, 6vw, 78px)' }}
          rotate={26}
          z={2}
          delay={0.95}
        />
        <Flora
          src={FLOWERS.babysBreath}
          place={{ top: '3%', right: '17%', width: 'clamp(74px, 9vw, 132px)' }}
          rotate={-6}
          opacity={0.9}
          z={2}
          delay={1.05}
        />

        {/* bottom-left cluster — the fuller arrangement */}
        <Flora
          src={FLOWERS.eucalyptus}
          place={{ bottom: '2%', left: '1%', width: 'clamp(120px, 18vw, 240px)' }}
          rotate={-150}
          opacity={0.85}
          blur={0.5}
          z={1}
          delay={0.55}
        />
        <Flora
          src={FLOWERS.roseWhite}
          place={{ bottom: '3%', left: '3%', width: 'clamp(100px, 13vw, 180px)' }}
          rotate={12}
          z={3}
          delay={0.75}
        />
        <Flora
          src={FLOWERS.roseBlush}
          place={{ bottom: '9%', left: '13%', width: 'clamp(76px, 10vw, 132px)' }}
          rotate={-14}
          z={2}
          delay={0.9}
        />
        <Flora
          src={FLOWERS.lavender}
          place={{ bottom: '4%', left: '9%', width: 'clamp(56px, 7vw, 104px)' }}
          rotate={8}
          opacity={0.92}
          z={2}
          delay={1.0}
        />
        <Flora
          src={FLOWERS.babysBreath}
          place={{ bottom: '11%', left: '2%', width: 'clamp(72px, 9vw, 132px)' }}
          rotate={10}
          opacity={0.9}
          z={2}
          delay={1.1}
        />
      </div>

      <div className="hero__inner">
        <motion.p
          className="eyebrow hero__eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.15 }}
        >
          Together with their families
        </motion.p>

        <h1 className="hero__names">
          <motion.span
            className="hero__name"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, ease, delay: 0.3 }}
          >
            {EVENT.groom}
          </motion.span>

          <motion.span
            className="hero__amp"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.6 }}
            aria-hidden="true"
          >
            &amp;
          </motion.span>

          <motion.span
            className="hero__name"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, ease, delay: 0.75 }}
          >
            {EVENT.bride}
          </motion.span>
        </h1>

        <motion.p
          className="hero__invite"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.95 }}
        >
          invite you to celebrate their engagement
        </motion.p>

        <motion.div
          className="hero__meta"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 1.15 }}
        >
          <span className="hero__date">
            {EVENT.dayName}, {EVENT.dateLabel}
            <span className="hero__dot">·</span>
            {EVENT.timeShort}
          </span>
          <span className="hero__venue serif">{EVENT.venue}</span>
        </motion.div>
      </div>

      <motion.a
        href="#journey"
        className="hero__scroll"
        aria-label="Begin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.6 }}
      >
        <span>Begin</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </motion.a>
    </header>
  )
}
