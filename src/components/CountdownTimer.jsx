import React, { useEffect, useState } from 'react'

// Live countdown to a target date. Used by timer-based offer banners
// (managed from the admin Banners page via startDate / endDate).
const pad = (n) => String(n).padStart(2, '0')

const CountdownTimer = ({ endDate, className = '' }) => {
  const target = endDate ? new Date(endDate).getTime() : 0
  const [left, setLeft] = useState(Math.max(0, target - Date.now()))

  useEffect(() => {
    if (!target) return
    const id = setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000)
    return () => clearInterval(id)
  }, [target])

  if (!target || left <= 0) return null
  const d = Math.floor(left / 86400000)
  const h = Math.floor((left % 86400000) / 3600000)
  const m = Math.floor((left % 3600000) / 60000)
  const s = Math.floor((left % 60000) / 1000)

  const Cell = ({ v, l }) => (
    <div className='flex flex-col items-center'>
      <span className='min-w-[2.5rem] px-2 py-1 rounded-lg bg-white/95 text-black text-lg font-bold tabular-nums shadow'>{pad(v)}</span>
      <span className='mt-1 text-[10px] uppercase tracking-widest text-white/90'>{l}</span>
    </div>
  )

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {d > 0 && <Cell v={d} l='Days' />}
      <Cell v={h} l='Hrs' />
      <Cell v={m} l='Min' />
      <Cell v={s} l='Sec' />
    </div>
  )
}

export default CountdownTimer
