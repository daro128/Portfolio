import { useEffect, useRef, useState } from 'react'

const DIRECTIONS = {
  up: { hidden: 'opacity-0 translate-y-10', visible: 'opacity-100 translate-y-0' },
  down: { hidden: 'opacity-0 -translate-y-10', visible: 'opacity-100 translate-y-0' },
  left: { hidden: 'opacity-0 -translate-x-16', visible: 'opacity-100 translate-x-0' },
  right: { hidden: 'opacity-0 translate-x-16', visible: 'opacity-100 translate-x-0' },
}

const Reveal = ({ children, className = '', delay = 0, direction = 'up', once = false, as: Tag = 'div' }) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const { hidden, visible: visibleClasses } = DIRECTIONS[direction] || DIRECTIONS.up

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${visible ? visibleClasses : hidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export default Reveal
