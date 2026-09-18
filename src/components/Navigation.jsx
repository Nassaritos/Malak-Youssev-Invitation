import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import './navigation.css'

const LINKS = [
  { id: 'invitation', label: 'Invitation' },
  { id: 'journey', label: 'Journey' },
  { id: 'details', label: 'Details' },
  { id: 'rsvp', label: 'RSVP' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const reduce = useReducedMotion()

  // Fade the nav in only after the hero has had its moment.
  useEffect(() => {
    const onScroll = () => setRevealed(window.scrollY > window.innerHeight * 0.4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Desktop: minimal centred word-list that appears past the hero */}
      <motion.nav
        className="nav-desktop"
        aria-label="Invitation sections"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : -8 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ pointerEvents: revealed ? 'auto' : 'none' }}
      >
        <ul>
          {LINKS.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={(e) => go(e, l.id)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Mobile: a small floating trigger */}
      <button
        className={`nav-trigger ${open ? 'is-open' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <ul>
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.08, duration: 0.5, ease: 'easeOut' }}
                >
                  <a href={`#${l.id}`} onClick={(e) => go(e, l.id)}>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
