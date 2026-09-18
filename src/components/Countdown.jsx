import useCountdown from '../hooks/useCountdown.js'
import { EVENT } from '../data/event.js'
import './countdown.css'

const pad = (n) => String(n).padStart(2, '0')

export default function Countdown() {
  const { days, hours, minutes, seconds, isPast } = useCountdown(EVENT.datetime)

  if (isPast) {
    return (
      <p className="countdown countdown--past serif">
        With all our love — thank you for celebrating with us.
      </p>
    )
  }

  const units = [
    { value: days, label: days === 1 ? 'Day' : 'Days' },
    { value: pad(hours), label: 'Hours' },
    { value: pad(minutes), label: 'Minutes' },
    { value: pad(seconds), label: 'Seconds' },
  ]

  return (
    <div className="countdown" role="timer" aria-live="off" aria-label="Time until the celebration">
      {units.map((u, i) => (
        <span className="countdown__unit" key={u.label}>
          <span className="countdown__value serif">{u.value}</span>
          <span className="countdown__label">{u.label}</span>
          {i < units.length - 1 && <span className="countdown__sep" aria-hidden="true">·</span>}
        </span>
      ))}
    </div>
  )
}
