import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faCode, faCertificate, faEarth } from "@fortawesome/free-solid-svg-icons";
import photo from '../assets/image copy.png'
import Reveal from './Reveal.jsx'
const AboutMe = () => {
    const achievements = [
        { title: "Projects Completed", value: 15, desc: "Successfully delivered a variety of software projects.", icon: faCode },
        { title: "Years of Experience", value: 3, desc: "Dedicated to continuous learning and professional growth.", icon: faEarth },
        { title: "Certifications", value: 10, desc: "Obtained industry-recognized certifications.", icon: faCertificate },
    ];
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div id='about' className='flex flex-col items-center mt-10 scroll-mt-20 px-2 text-center md:text-left'>
            <h3 className='text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-indigo-500 via-purple-500 to-fuchsia-400 bg-clip-text text-transparent'>About Me</h3>
            <p className='text-sm text-gray-400 mt-4'>tranforming the digital landscape through innovative software solutions.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-2 mt-8 w-full items-center'>
                <Reveal direction='left' className="order-2 md:order-1">
                    <h1 className='text-3xl sm:text-4xl md:text-5xl py-2 font-bold bg-linear-to-r from-indigo-500 via-purple-500 to-fuchsia-400 bg-clip-text text-transparent'>Hello, My name's</h1>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white'>Rat Daro</h1>
                    <p className='text-gray-600 py-2'>
                        I am a Year 3 Software Engineering student at the Cambodia Academy of Digital Technology (CADT), passionate about developing modern and scalable software solutions.
                        I have experience in web development, backend systems, database design,
                        and building full-stack applications using technologies such as React.js, Node.js, Express.js, MySQL, and Tailwind CSS.

                    </p>
                    <div className='flex flex-wrap justify-center md:justify-start gap-5 p-2'>
                        <a
                            href='/resume.pdf'
                            download
                            style={{ "--glow-color": "rgba(139,92,246,0.65)" }}
                            className='hover-glow hover-shine transition-all hover:cursor-pointer bg-linear-to-r text-white font-bold py-2 px-4 rounded-sm from-indigo-600 via-purple-600 to-fuchsia-500 inline-flex items-center'
                        >
                            <FontAwesomeIcon icon={faDownload} className='pr-2' />
                            Download Resume
                        </a>
                        <button
                            onClick={() => scrollTo("portfolio")}
                            style={{ "--glow-color": "rgba(255,255,255,0.5)" }}
                            className='hover-glow transition-all hover:cursor-pointer bg-transparent border border-white/10 text-white font-bold py-2 px-4 rounded-sm hover:bg-white/10'
                        >
                            <FontAwesomeIcon icon={faCode} className='pr-2' />
                            View Projects
                        </button>
                    </div>
                </Reveal>
                <Reveal direction='right' className="order-1 md:order-2 flex justify-center md:justify-end items-center">
                    <img
                        src={photo}
                        alt="profile"
                        className="object-cover object-top rounded-full w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-float"
                    />
                </Reveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-15 w-full">
                {achievements.map((achievement, index) => (
                    <Reveal
                        key={index}
                        delay={index * 120}
                        className="hover:cursor-pointer bg-white/5 border border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] backdrop-blur-md py-2 px-4 rounded-2xl w-full flex flex-col hover:scale-105 ease-in-out transition duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-blue-500/20 p-4 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                                <FontAwesomeIcon
                                    icon={achievement.icon}
                                    className="text-blue-400 text-xl"
                                />
                            </div>

                            <div className="text-4xl font-bold text-white">
                                {achievement.value}
                            </div>
                        </div>

                        <div>
                            <p className="text-white font-semibold text-lg">
                                {achievement.title}
                            </p>

                            <p className="text-gray-500 text-sm mt-1">
                                {achievement.desc}
                            </p>
                        </div>
                    </Reveal>
                ))}
            </div>

        </div>
    )
}

export default AboutMe
