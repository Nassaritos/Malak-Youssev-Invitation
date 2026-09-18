import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Flora from './Flora.jsx'
import { FLOWERS } from '../data/flowers.js'
import './rsvp.css'

const ease = [0.22, 1, 0.36, 1]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-12% 0px' },
    transition: { duration: 1, ease, delay },
  }
}

export default function Rsvp() {
  const [form, setForm] = useState({
    name: '',
    guests: '1',
    attendance: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | error | done
  const [errorField, setErrorField] = useState(null)

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errorField === key) setErrorField(null)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setErrorField('name')
      setStatus('error')
      return
    }
    if (!form.attendance) {
      setErrorField('attendance')
      setStatus('error')
      return
    }
    // No backend wired up — the response is kept locally and echoed back
    // gracefully. Swap this block for a real endpoint (fetch/POST) later.
    try {
      const saved = JSON.parse(localStorage.getItem('ym_rsvps') || '[]')
      saved.push({ ...form, at: new Date().toISOString() })
      localStorage.setItem('ym_rsvps', JSON.stringify(saved))
    } catch {
      /* storage may be unavailable — the thank-you still shows */
    }
    setStatus('done')
  }

  const accepting = form.attendance === 'yes'

  return (
    <section id="rsvp" className="rsvp section" aria-label="Répondez s'il vous plaît">
      <div className="flora-layer">
        <Flora
          src={FLOWERS.roseWhite}
          place={{ top: '2%', left: '3%', width: 'clamp(66px, 9vw, 120px)' }}
          rotate={-12}
          opacity={0.9}
          delay={0.2}
        />
        <Flora
          src={FLOWERS.rosebud}
          place={{ top: '9%', left: '15%', width: 'clamp(38px, 5vw, 62px)' }}
          rotate={20}
          opacity={0.9}
          delay={0.35}
        />
        <Flora
          src={FLOWERS.lavender}
          place={{ bottom: '3%', right: '4%', width: 'clamp(48px, 6vw, 88px)' }}
          rotate={-8}
          opacity={0.85}
          delay={0.3}
        />
        <Flora
          src={FLOWERS.eucalyptus}
          place={{ bottom: '2%', right: '1%', width: 'clamp(94px, 13vw, 170px)' }}
          rotate={150}
          opacity={0.7}
          blur={0.5}
          delay={0.25}
        />
      </div>

      <div className="section__inner rsvp__inner">
        <motion.p className="index-mark" {...fadeUp(0)}>
          04 — Will You Join Us
        </motion.p>
        <motion.h2 className="rsvp__title serif" {...fadeUp(0.08)}>
          Will you join us?
        </motion.h2>
        <motion.p className="rsvp__lede" {...fadeUp(0.16)}>
          We’d love to celebrate this beautiful evening with you. Kindly let us know by
          <span className="rsvp__nowrap"> the 1st of October.</span>
        </motion.p>

        <AnimatePresence mode="wait">
          {status === 'done' ? (
            <motion.div
              key="thanks"
              className="rsvp__thanks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <span className="rsvp__thanks-mark" aria-hidden="true">
                &amp;
              </span>
              <h3 className="serif">
                {accepting ? 'We can’t wait to see you.' : 'You’ll be dearly missed.'}
              </h3>
              <p>
                {accepting
                  ? `Thank you, ${form.name.split(' ')[0]}. Your place by the Nile is saved.`
                  : `Thank you for letting us know, ${form.name.split(' ')[0]}. You’ll be with us in spirit.`}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="rsvp__form"
              onSubmit={onSubmit}
              noValidate
              {...fadeUp(0.24)}
            >
              <div className="rsvp__field">
                <label htmlFor="rsvp-name">Full name</label>
                <input
                  id="rsvp-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  aria-invalid={errorField === 'name'}
                  placeholder="Your name"
                />
              </div>

              <div className="rsvp__field">
                <label htmlFor="rsvp-guests">Number of guests</label>
                <div className="rsvp__select-wrap">
                  <select id="rsvp-guests" value={form.guests} onChange={update('guests')}>
                    {['1', '2', '3', '4', '5', '6+'].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <span className="rsvp__chevron" aria-hidden="true" />
                </div>
              </div>

              <fieldset
                className="rsvp__field rsvp__field--wide"
                aria-invalid={errorField === 'attendance'}
              >
                <legend>Will you be there?</legend>
                <div className="rsvp__choices">
                  <label className={`rsvp__choice ${form.attendance === 'yes' ? 'is-active' : ''}`}>
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={form.attendance === 'yes'}
                      onChange={update('attendance')}
                    />
                    <span>Joyfully accepts</span>
                  </label>
                  <label className={`rsvp__choice ${form.attendance === 'no' ? 'is-active' : ''}`}>
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={form.attendance === 'no'}
                      onChange={update('attendance')}
                    />
                    <span>Regretfully declines</span>
                  </label>
                </div>
              </fieldset>

              <div className="rsvp__field rsvp__field--wide">
                <label htmlFor="rsvp-message">A message to the couple <em>(optional)</em></label>
                <textarea
                  id="rsvp-message"
                  rows="2"
                  value={form.message}
                  onChange={update('message')}
                  placeholder="A few words, a wish, a memory…"
                />
              </div>

              {status === 'error' && (
                <p className="rsvp__error" role="alert">
                  {errorField === 'name'
                    ? 'Please share your name so we know who’s coming.'
                    : 'Please let us know if you’ll be joining us.'}
                </p>
              )}

              <button type="submit" className="rsvp__submit">
                Send my reply
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
