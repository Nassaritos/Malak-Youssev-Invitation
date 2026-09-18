import { motion, useReducedMotion } from 'framer-motion'
import './flora.css'

/**
 * A single floral element, placed like a real pressed flower on top of the
 * invitation. Absolutely positioned inside a `.flora-layer` wrapper.
 *
 * The entrance (soft fade + rise) lives on an outer wrapper; the endless,
 * extremely subtle sway lives on the inner image — keeping the two from
 * fighting each other.
 *
 * Props:
 *  - src      : image path (from the FLOWERS manifest)
 *  - place    : { top,left,right,bottom,width } positioning
 *  - rotate   : base rotation in degrees
 *  - opacity  : target opacity
 *  - sway     : floating amplitude in px (0 disables)
 *  - blur     : optional px blur for depth (background blooms)
 *  - z        : z-index within the layer
 *  - delay    : entrance delay
 *  - flip     : mirror horizontally
 */
export default function Flora({
  src,
  alt = '',
  place = {},
  rotate = 0,
  opacity = 1,
  sway = 7,
  blur = 0,
  z = 1,
  delay = 0,
  flip = false,
  duration = 1.7,
}) {
  const reduce = useReducedMotion()

  const swayKeyframes =
    reduce || sway === 0
      ? {}
      : { y: [0, -sway, 0] }

  return (
    <motion.span
      className="flora-wrap"
      aria-hidden="true"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        zIndex: z,
        pointerEvents: 'none',
        ...place,
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="flora"
        draggable="false"
        loading="lazy"
        animate={swayKeyframes}
        transition={{
          duration: 8 + (delay % 3),
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        }}
        style={{
          width: '100%',
          opacity,
          filter: blur ? `blur(${blur}px)` : 'none',
          transform: `rotate(${rotate}deg)${flip ? ' scaleX(-1)' : ''}`,
        }}
      />
    </motion.span>
  )
}
