import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Flora from './Flora.jsx'
import { FLOWERS } from '../data/flowers.js'
import { RSVP_ENDPOINT } from '../data/event.js'
import './rsvp.css'

const ENDPOINT_READY =
  typeof RSVP_ENDPOINT === 'string' && RSVP_ENDPOINT.startsWith('https://script.google.com/')

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
  const [status, setStatus] = useState('idle') // idle | sending | error | done
  const [errorField, setErrorField] = useState(null)

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errorField === key) setErrorField(null)
    if (status === 'error') setStatus('idle')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

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

    // Keep a local backup regardless, so a reply is never lost.
    try {
      const saved = JSON.parse(localStorage.getItem('ym_rsvps') || '[]')
      saved.push({ ...form, at: new Date().toISOString() })
      localStorage.setItem('ym_rsvps', JSON.stringify(saved))
    } catch {
      /* storage may be unavailable — the flow still continues */
    }

    // If no Google Sheet endpoint is configured yet, just show the thank-you.
    if (!ENDPOINT_READY) {
      setStatus('done')
      return
    }

    setStatus('sending')
    setErrorField(null)

    const body = new URLSearchParams({
      name: form.name.trim(),
      guests: form.guests,
      attendance: form.attendance,
      message: form.message.trim(),
      submittedAt: new Date().toISOString(),
    })

    // Try a few times — Apps Script can be briefly flaky.
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch(RSVP_ENDPOINT, { method: 'POST', body })
        if (res.ok) {
          setStatus('done')
          return
        }
      } catch (err) {
        // Network/CORS hiccup — the row may still have been written.
        console.error('RSVP submission error:', err)
      }
    }

    setErrorField('submit')
    setStatus('error')
  }

  const accepting = form.attendance === 'yes'
  const sending = status === 'sending'

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
          hideOnMobile
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
          opacity={0.85}
          delay={0.25}
          hideOnMobile
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
          We’d love to celebrate this beautiful evening with you. 
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
                    : errorField === 'attendance'
                    ? 'Please let us know if you’ll be joining us.'
                    : 'Something went wrong sending your reply. Please try again.'}
                </p>
              )}

              <button type="submit" className="rsvp__submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send my reply'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
