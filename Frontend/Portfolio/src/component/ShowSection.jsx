import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faCode, faLaptopCode, faArrowRight, faDownload, faMessage } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faTelegram } from "@fortawesome/free-brands-svg-icons";
import image from '../assets/image.png'
import Reveal from './Reveal.jsx'

const ShowSection = () => {
  const skills = ["React", "JavaScript", "Node.js", "Tailwind", "MySQL", "Java", "C", "C++"]
  const platforms = [
    { name: "GitHub", icon: faGithub },
    { name: "LinkedIn", icon: faLinkedin },
    { name: "telegram", icon: faTelegram }
  ]

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div id='home' className='relative grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-10 md:gap-20 overflow-hidden scroll-mt-20'>

      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full bg-blue-600/20 blur-[180px] -z-10'></div>

      <div className='absolute right-10 bottom-10 w-[300px] h-[300px] rounded-full bg-violet-600/20 blur-[150px] -z-10'></div>

      <Reveal direction='left' className='col-span-1 order-2 md:order-1 p-4 md:p-8'>
        <img src={image} alt="showcase" className='w-full h-64 sm:h-80 md:h-100 object-cover rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-float' />
      </Reveal>

      <Reveal direction='right' className='col-span-1 order-1 md:order-2 flex flex-col gap-5 p-4 md:p-8 text-center md:text-left items-center md:items-start'>

        <div className='bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.3)] backdrop-blur-md p-2 rounded-full w-fit px-5 flex items-center gap-2 animate-pulse-glow'>
          <FontAwesomeIcon icon={faRocket} className='text-blue-400' />
          <p className='text-gray-300'>Ready to Innovate</p>
        </div>

        <div>
          <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white'>Software</h2>
          <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold text-blue-500'>Engineering</h2>
          <h3 className='text-lg text-gray-400 py-4'>Creating innovative solutions for the digital world</h3>
          <p className='text-gray-500 py-2'>I am a passionate software engineer with experience in building scalable and maintainable applications.</p>
        </div>

        <div className='flex flex-wrap justify-center md:justify-start gap-3'>
          {skills.map((skill, index) => (
            <span
              key={index}
              style={{ "--glow-color": "rgba(59,130,246,0.55)" }}
              className='hover-glow px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all'
            >
              {skill}
            </span>
          ))}
        </div>

        <div className='flex flex-wrap justify-center md:justify-start gap-5 mt-2'>
          <button
            onClick={() => scrollTo("portfolio")}
            style={{ "--glow-color": "rgba(59,130,246,0.6)" }}
            className='hover-glow hover-shine px-8 py-3 rounded-xl bg-[#111827] border border-white/10 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all'
          >
            Projects
            <FontAwesomeIcon icon={faArrowRight} className='ml-2' />
          </button>

          <button
            onClick={() => scrollTo("contact")}
            style={{ "--glow-color": "rgba(139,92,246,0.6)" }}
            className='hover-glow hover-shine px-8 py-3 rounded-xl bg-[#111827] border border-white/10 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all'
          >
            Contact
            <FontAwesomeIcon icon={faMessage} className='ml-2' />
          </button>
        </div>
        <div className='flex flex-wrap justify-center md:justify-start gap-5 mt-5'>
          {platforms.map((platform, index) => (
            <a
              key={index}
              href="#"
              style={{ "--glow-color": "rgba(59,130,246,0.6)" }}
              className='hover-glow bg-transparent p-2 transition-colors rounded-xl border border-white/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)]'
            >
              <FontAwesomeIcon icon={platform.icon} size="xl" />
            </a>
          ))}
        </div>

      </Reveal>

      <button
        onClick={() => scrollTo("about")}
        aria-label="Scroll to About section"
        className='hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-white/30 transition-colors animate-bounce-slow'
      >
        <FontAwesomeIcon icon={faArrowRight} className='rotate-90' />
      </button>

    </div>
  )
}

export default ShowSection