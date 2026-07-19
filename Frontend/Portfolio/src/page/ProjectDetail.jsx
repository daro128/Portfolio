import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCode, faLayerGroup, faExternalLink, faPlay } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const ProjectDetail = ({ project, onBack }) => {
  const [playing, setPlaying] = useState(false)

  if (!project) return null

  const { title, description, image, video, liveDemo, github, technologies = [], keyFeatures = [] } = project

  return (
    <div className='mt-6'>
      <div className='flex items-center gap-2 text-sm text-gray-400 mb-8'>
        <button
          onClick={onBack}
          style={{ "--glow-color": "rgba(255,255,255,0.4)" }}
          className='hover-glow flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white hover:bg-white/10 transition-all'
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
        <span className='ml-2'>Projects</span>
        <span>{'>'}</span>
        <span className='text-white'>{title}</span>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        <div>
          <h1 className='text-4xl md:text-5xl font-bold bg-linear-to-r from-indigo-500 via-purple-500 to-fuchsia-400 bg-clip-text text-transparent'>
            {title}
          </h1>
          <div className='h-1 w-16 mt-3 mb-6 rounded bg-linear-to-r from-indigo-500 to-fuchsia-400' />

          <p className='text-gray-400 leading-relaxed'>{description}</p>

          <div className='grid grid-cols-2 gap-4 mt-6 max-w-sm'>
            <div className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3'>
              <FontAwesomeIcon icon={faCode} className='text-blue-400' />
              <div>
                <p className='text-white font-bold leading-none'>{technologies.length}</p>
                <p className='text-xs text-gray-500 mt-1'>Total Technologies</p>
              </div>
            </div>
            <div className='bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3'>
              <FontAwesomeIcon icon={faLayerGroup} className='text-purple-400' />
              <div>
                <p className='text-white font-bold leading-none'>{keyFeatures.length}</p>
                <p className='text-xs text-gray-500 mt-1'>Key Features</p>
              </div>
            </div>
          </div>

          <div className='flex flex-wrap gap-4 mt-6'>
            <a
              href={liveDemo}
              target='_blank'
              rel='noreferrer'
              style={{ "--glow-color": "rgba(168,85,247,0.6)" }}
              className='hover-glow hover-shine flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-fuchsia-500 px-5 py-2.5 text-white font-semibold transition-all'
            >
              <FontAwesomeIcon icon={faExternalLink} />
              Live Demo
            </a>
            <a
              href={github}
              target='_blank'
              rel='noreferrer'
              style={{ "--glow-color": "rgba(255,255,255,0.4)" }}
              className='hover-glow flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-white font-semibold hover:bg-white/10 transition-all'
            >
              <FontAwesomeIcon icon={faGithub} />
              Github
            </a>
          </div>

          <div className='mt-8'>
            <h3 className='flex items-center gap-2 text-white font-semibold mb-3'>
              <FontAwesomeIcon icon={faCode} className='text-blue-400' />
              Technologies Used
            </h3>
            <div className='flex flex-wrap gap-2'>
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className='px-3 py-1.5 rounded-full text-sm bg-white/5 border border-white/10 text-gray-200'
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-6'>
          <div className='relative rounded-2xl overflow-hidden border border-white/10 bg-[#111827] aspect-video shadow-[0_0_30px_rgba(59,130,246,0.2)]'>
            {video && playing ? (
              <video src={video} controls autoPlay className='w-full h-full object-cover' />
            ) : (
              <>
                <img src={image} alt={title} className='w-full h-full object-cover' />
                {video && (
                  <button
                    onClick={() => setPlaying(true)}
                    aria-label='Play preview'
                    className='absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all'
                  >
                    <span className='flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#111827] shadow-lg'>
                      <FontAwesomeIcon icon={faPlay} className='ml-1' size='lg' />
                    </span>
                  </button>
                )}
              </>
            )}
          </div>

          <div className='bg-white/5 border border-white/10 rounded-2xl p-6'>
            <h3 className='flex items-center gap-2 text-white font-semibold mb-4'>
              <FontAwesomeIcon icon={faLayerGroup} className='text-purple-400' />
              Key Features
            </h3>
            <ul className='flex flex-col gap-3'>
              {keyFeatures.map((feature, index) => (
                <li key={index} className='flex items-start gap-3 text-sm text-gray-300'>
                  <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400' />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
