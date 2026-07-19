import { useEffect, useState } from 'react'

const MIN_DURATION = 1600
const MAX_WAIT = 4000

export default function Loader({ onFinish }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const start = Date.now()

    const finish = () => {
      const remaining = Math.max(MIN_DURATION - (Date.now() - start), 0)
      setTimeout(() => setExiting(true), remaining)
    }

    let done = false
    const safeFinish = () => {
      if (done) return
      done = true
      finish()
    }

    if (document.readyState === 'complete') {
      safeFinish()
    } else {
      window.addEventListener('load', safeFinish)
    }
    const maxWaitTimer = setTimeout(safeFinish, MAX_WAIT)

    return () => {
      window.removeEventListener('load', safeFinish)
      clearTimeout(maxWaitTimer)
    }
  }, [])

  useEffect(() => {
    if (!exiting) return
    document.body.style.overflow = ''
    const timeout = setTimeout(onFinish, 600)
    return () => clearTimeout(timeout)
  }, [exiting, onFinish])

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#030014] transition-opacity duration-500 ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 rounded-full border-2 border-white/10" />
          <span className="absolute inset-0 rounded-full border-2 border-t-transparent border-purple-400 animate-spin" />
          <span className="h-3 w-3 rounded-full bg-linear-to-r from-indigo-500 to-fuchsia-400 animate-pulse-glow" />
        </div>

        <div className="text-center px-6">
          <p className="bg-linear-to-r from-[#c084fc] to-[#6366f1] bg-clip-text text-2xl sm:text-3xl font-bold text-transparent">
            Welcome to my Portfolio
          </p>
          <p className="mt-2 text-sm text-gray-500">Loading experience...</p>
        </div>
      </div>
    </div>
  )
}
