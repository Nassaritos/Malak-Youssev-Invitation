import { useEffect, useState } from 'react'

/**
 * Counts down to a target date. Returns whole days / hours / minutes /
 * seconds plus an `isPast` flag. Updates once per second.
 */
export default function useCountdown(target) {
  const targetTime = target instanceof Date ? target.getTime() : new Date(target).getTime()

  const compute = () => {
    const diff = targetTime - Date.now()
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
    }
    const days = Math.floor(diff / 86400000)
    const hours = Math.floor((diff % 86400000) / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    return { days, hours, minutes, seconds, isPast: false }
  }

  const [time, setTime] = useState(compute)

  useEffect(() => {
    const id = setInterval(() => setTime(compute()), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetTime])

  return time
}
