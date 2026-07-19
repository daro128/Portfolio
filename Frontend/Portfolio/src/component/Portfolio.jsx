import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faCertificate, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import ProjectCard from './ProjectCard.jsx'
import projects from '../data/projects.js'
import Reveal from './Reveal.jsx'

const Portfolio = ({ onSelectProject }) => {
    const portfolioItems = [
        { title: "Project", icon: faCode },
        { title: "Certification", icon: faCertificate },
        { title: "Tech Stack", icon: faLayerGroup },
    ];

    const certifications = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo6-3t3BSBBmBFu_vTgK_Hsx7AurV6E7g4UP-1PCGQ9w&s=10",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo6-3t3BSBBmBFu_vTgK_Hsx7AurV6E7g4UP-1PCGQ9w&s=10",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo6-3t3BSBBmBFu_vTgK_Hsx7AurV6E7g4UP-1PCGQ9w&s=10"
    ];
    const techStacks = [
        { title: "React", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo6-3t3BSBBmBFu_vTgK_Hsx7AurV6E7g4UP-1PCGQ9w&s=10" },
        { title: "Node.js", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo6-3t3BSBBmBFu_vTgK_Hsx7AurV6E7g4UP-1PCGQ9w&s=10" },
        { title: "MySQL", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo6-3t3BSBBmBFu_vTgK_Hsx7AurV6E7g4UP-1PCGQ9w&s=10" },
        { title: "Tailwind CSS", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo6-3t3BSBBmBFu_vTgK_Hsx7AurV6E7g4UP-1PCGQ9w&s=10" },
        { title: "Java", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo6-3t3BSBBmBFu_vTgK_Hsx7AurV6E7g4UP-1PCGQ9w&s=10" },
        { title: "C++", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo6-3t3BSBBmBFu_vTgK_Hsx7AurV6E7g4UP-1PCGQ9w&s=10" },
        { title: "C", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo6-3t3BSBBmBFu_vTgK_Hsx7AurV6E7g4UP-1PCGQ9w&s=10" }
    ];

    const [activeItem, setActiveItem] = useState("Project");
    const [openItem, setOpenItem] = useState("Project");

    function Onclick(item) {
        setActiveItem(item.title);
        setOpenItem(item.title);
    }

    return (
        <div id='portfolio' className='flex flex-col items-center justify-center mt-20 scroll-mt-20 px-2 text-center'>
            <h1 className='text-2xl sm:text-3xl font-bold text-white'>My Portfolio Showcase</h1>
            <p className='text-white/70 mt-2'>Welcome to my portfolio! Here you can find a collection of my work and projects.</p>

            <div className='grid grid-cols-1 sm:grid-cols-3 mt-5 w-full gap-5 p-5'>
                {portfolioItems.map((item, index) => (
                    <button
                        key={index}
                        style={{ "--glow-color": "rgba(59,130,246,0.6)" }}
                        className={`hover-glow flex flex-col items-center justify-center px-8 py-3 rounded-xl bg-[#111827] border border-white/10 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 ${activeItem === item.title ? 'bg-blue-500' : ''}`}
                        onClick={() => Onclick(item)}
                    >
                        <FontAwesomeIcon icon={item.icon} className='mr-2 text-xl py-1' />
                        {item.title}
                    </button>
                ))}
            </div>

            {openItem === "Project" && (
                <Reveal key="Project" delay={0} className="grid w-full grid-cols-1 md:grid-cols-3 gap-6 mt-5">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            image={project.image}
                            title={project.title}
                            description={project.shortDescription}
                            liveDemo={project.liveDemo}
                            onDetails={() => onSelectProject?.(project)}
                        />
                    ))}
                </Reveal>
            )}

            {openItem === "Certification" && (
                <Reveal key="Certification" delay={0} className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
                    {certifications.map((certification, index) => (
                        <img key={index} src={certification} alt={`Certification ${index + 1}`} className="w-full h-full object-cover border-4 rounded-2xl border-white" />
                    ))}
                </Reveal>
            )}
            {openItem === "Tech Stack" && (
                <Reveal key="Tech Stack" delay={0} className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 mt-5 px-2 sm:px-10 md:px-20">
                    {techStacks.map((tech, index) => (
                        <div key={index} className="flex flex-col items-center justify-center bg-[#111827] border border-white/10 rounded-xl p-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105 transition-all duration-500">
                            <img src={tech.image} alt={tech.title} className="w-20 h-20 object-contain mb-2" />
                            <p className="text-white font-semibold">{tech.title}</p>
                        </div>
                    ))}
                </Reveal>
            )}
        </div>
    )
}

export default Portfolio