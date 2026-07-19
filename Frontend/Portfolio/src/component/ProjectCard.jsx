import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faExternalLink } from "@fortawesome/free-solid-svg-icons";

const ProjectCard = ({ image, title, description, liveDemo, onDetails }) => {
    return (
        <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105 transition-all duration-500">
            <img src={image} alt={title} className="w-full h-44 object-cover" />

            <div className="p-4">
                <h3 className="text-white font-bold text-lg">{title}</h3>

                <p className="text-gray-400 text-sm mt-2 line-clamp-2">{description}</p>

                <div className="flex justify-between items-center mt-6">
                    <a href={liveDemo} target="_blank" rel="noreferrer" className="text-blue-400 text-sm flex items-center gap-2 hover:text-blue-300">
                        Live Demo
                        <FontAwesomeIcon icon={faExternalLink} />
                    </a>

                    <button
                        onClick={onDetails}
                        style={{ "--glow-color": "rgba(59,130,246,0.6)" }}
                        className="hover-glow text-white text-sm flex items-center gap-2 p-2 bg-[#111827] border border-white/10 rounded-lg transition-all"
                    >
                        Details
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard