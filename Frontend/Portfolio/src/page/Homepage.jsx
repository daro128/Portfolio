import React, { useState } from 'react'
import Nav from '../component/Nav.jsx'
import ShowSection from '../component/ShowSection.jsx'
import AboutMe from '../component/AboutMe.jsx'
import Portfolio from '../component/Portfolio.jsx'
import Contact from '../component/Contact.jsx'
import Reveal from '../component/Reveal.jsx'
import ProjectDetail from './ProjectDetail.jsx'

const Homepage = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  const handleSelectProject = (project) => {
    setSelectedProject(project)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBack = () => {
    setSelectedProject(null)
  }

  return (
    <div className='max-w-7xl mx-auto px-6 space-y-5'>
      <Nav />
      {selectedProject ? (
        <Reveal key={selectedProject.slug}>
          <ProjectDetail project={selectedProject} onBack={handleBack} />
        </Reveal>
      ) : (
        <>
          <Reveal>
            <ShowSection />
          </Reveal>
          <Reveal delay={100}>
            <AboutMe />
          </Reveal>
          <Reveal delay={100}>
            <Portfolio onSelectProject={handleSelectProject} />
          </Reveal>
          <Reveal delay={100}>
            <Contact />
          </Reveal>
        </>
      )}
    </div>
  )
}

export default Homepage
