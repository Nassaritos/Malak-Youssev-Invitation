import { motion, useReducedMotion } from 'framer-motion'
import './nile.css'

/**
 * An atmospheric — not literal — evocation of the Nile at dusk.
 * Layered water bands in ivory / lavender / blush, gentle ripple lines,
 * and a single felucca drifting slowly across toward the far bank.
 */
export default function NileScene() {
  const reduce = useReducedMotion()

  return (
    <div className="nile" aria-hidden="true">
      <svg
        className="nile__svg"
        viewBox="0 0 1440 360"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="nileSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffdfb" />
            <stop offset="55%" stopColor="#fbf1f2" />
            <stop offset="100%" stopColor="#f3eef8" />
          </linearGradient>
          <linearGradient id="nileWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f3e2e6" />
            <stop offset="30%" stopColor="#e9dcee" />
            <stop offset="100%" stopColor="#d7c3d2" />
          </linearGradient>
          <linearGradient id="nileGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f8e7ec" stopOpacity="0" />
            <stop offset="50%" stopColor="#f4dbc9" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#e8e0f0" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* dusk sky */}
        <rect x="0" y="0" width="1440" height="220" fill="url(#nileSky)" />
        {/* low sun glow smear across the horizon */}
        <ellipse cx="720" cy="182" rx="640" ry="66" fill="url(#nileGlow)" />

        {/* water body */}
        <path d="M0 176 H1440 V360 H0 Z" fill="url(#nileWater)" />
        {/* a soft warm reflection just below the horizon */}
        <rect x="0" y="176" width="1440" height="40" fill="#f4dbc9" opacity="0.28" />

        {/* soft ripple lines */}
        <g stroke="#fffdfb" strokeWidth="1.4" fill="none" opacity="0.5" strokeLinecap="round">
          <motion.path
            d="M120 250 q40 -8 80 0 t80 0 t80 0"
            animate={reduce ? undefined : { x: [0, 18, 0], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M760 286 q46 -9 92 0 t92 0 t92 0"
            animate={reduce ? undefined : { x: [0, -22, 0], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M300 320 q52 -10 104 0 t104 0 t104 0"
            animate={reduce ? undefined : { x: [0, 16, 0], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </g>

        {/* far bank hint */}
        <path
          d="M0 173 H1440 V179 H0 Z"
          fill="#c99aad"
          opacity="0.3"
        />
      </svg>

      {/* the felucca, drifting across toward Taracina */}
      <motion.div
        className="nile__boat"
        initial={{ x: '4vw' }}
        animate={reduce ? undefined : { x: ['4vw', '62vw'], y: [0, -6, 0, 4, 0] }}
        transition={{
          x: { duration: 26, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <Felucca />
      </motion.div>
    </div>
  )
}

function Felucca() {
  return (
    <svg viewBox="0 0 150 150" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffdfb" />
          <stop offset="100%" stopColor="#f6e6ea" />
        </linearGradient>
      </defs>
      {/* mast */}
      <line x1="75" y1="14" x2="75" y2="104" stroke="#b79aa6" strokeWidth="1.6" />
      {/* two soft triangular sails */}
      <path d="M75 16 C55 44 44 74 40 100 L74 100 Z" fill="url(#sail)" stroke="#e3c7d0" strokeWidth="1" />
      <path d="M78 24 C96 48 104 74 108 100 L78 100 Z" fill="#fbeef1" stroke="#e6cdd5" strokeWidth="0.8" opacity="0.92" />
      {/* hull — a slender crescent */}
      <path
        d="M24 106 C48 122 102 122 128 106 C116 118 96 124 76 124 C56 124 36 118 24 106 Z"
        fill="#6f5566"
      />
      <path d="M32 108 C54 118 98 118 120 108" stroke="#fbeef1" strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  )
}
