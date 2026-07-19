import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const navItems = ["Home", "About", "Portfolio", "Contact"]

const Nav = () => {
  const [activeItem, setActiveItem] = useState("Home")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sectionIds = navItems.map((item) => (item === "Home" ? "home" : item.toLowerCase()))
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          const id = visible.target.id
          const match = navItems.find((item) => (item === "Home" ? "home" : item.toLowerCase()) === id)
          if (match) setActiveItem(match)
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleClick = (item) => {
    setActiveItem(item)
    setMenuOpen(false)
  }

  return (
    <div className='nav sticky top-0 z-50 bg-transparent rounded-2xl backdrop-blur-md h-20 w-full flex justify-between items-center text-white px-2'>
      <div>
        <h2 className='text-white text-3xl font-extrabold'>Rat Daro</h2>
      </div>

      <ul className='hidden md:flex gap-10 text-white'>
        {navItems.map((item, index) => (
          <li key={index}>
            <a
              href={`#${item.toLowerCase()}`}
              className={`relative pb-1 transition-colors duration-300 hover:text-blue-400 after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300 ${
                activeItem === item ? 'text-blue-500 after:w-full' : 'after:w-0'
              }`}
              onClick={() => handleClick(item)}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <button
        className='md:hidden text-white text-2xl p-2 transition-transform duration-300 active:scale-90'
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className='transition-transform duration-300' />
      </button>

      <div
        className={`md:hidden absolute top-20 left-0 w-full overflow-hidden border-t border-white/10 bg-[#0b0f1a]/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className='flex flex-col gap-4 py-6 px-6 text-white'>
          {navItems.map((item, index) => (
            <li key={index} className='hover:cursor-pointer'>
              <a
                href={`#${item.toLowerCase()}`}
                className={`transition-colors duration-300 hover:text-blue-400 ${activeItem === item ? 'text-blue-500 underline' : ''}`}
                onClick={() => handleClick(item)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Nav
