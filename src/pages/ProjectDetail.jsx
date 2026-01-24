import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadProjectAssets } from '../utils/assetLoader';
import watermarkIcon from '../assets/logos/logo-tan.png';

const ProjectDetail = () => {
    const { projectId } = useParams();

    // Load all projects and find the matching one
    // Note: In a larger app, we'd pass this via context or state, but for <30 projects, re-scanning is instant
    const projects = useMemo(() => loadProjectAssets(), []);

    const project = projects.find(p => p.id === projectId);

    if (!project) {
        return (
            <div className="flex h-screen items-center justify-center bg-black text-white">
                <div className="text-center">
                    <h2 className="mb-4 text-2xl font-bold">Project Not Found</h2>
                    <Link to="/portfolio" className="text-orange-500 hover:text-orange-400">Back to Portfolio</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen">
            {/* Header Image (First one) */}
            <div className="relative h-[60vh] w-full border-b-4 border-[#b87333]">
                {project.media[0].type === 'video' ? (
                    <video src={project.media[0].src} className="h-full w-full object-cover" controls />
                ) : (
                    <img
                        src={project.media[0].src}
                        alt={project.title}
                        className="h-full w-full object-cover"
                    />
                )}
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <div className="container mx-auto">
                        <span className="text-sm md:text-base text-[#b87333] font-bold tracking-[0.3em] uppercase block mb-2">
                            Project Overview
                        </span>
                        <h1 className="text-4xl md:text-7xl font-bold text-white mb-2 font-outfit uppercase tracking-wide">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wider uppercase border-l-4 border-[#b87333] pl-4 mt-4">
                            {project.location}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <Link to="/portfolio" className="inline-block mb-8 text-[#b87333] hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">
                    &larr; Back to Portfolio
                </Link>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {project.media.map((item, index) => (
                        <div key={index} className="group relative rounded-lg overflow-hidden bg-gray-900 border-2 border-[#b87333] shadow-2xl hover:shadow-[0_0_20px_rgba(184,115,51,0.2)] transition-shadow duration-300">
                            {/* Watermark */}
                            <div className="absolute top-4 right-4 z-10 opacity-60 mix-blend-overlay pointer-events-none">
                                <img src={watermarkIcon} alt="" className="w-24 h-auto object-contain" />
                            </div>

                            {item.type === 'video' ? (
                                <video
                                    src={item.src}
                                    className="w-full h-auto"
                                    controls
                                    playsInline
                                />
                            ) : (
                                <img
                                    src={item.src}
                                    alt={`${project.title} ${index + 1}`}
                                    className="w-full h-auto hover:scale-105 transition-transform duration-700 cursor-pointer"
                                    loading="lazy"
                                />
                            )}
                            <div className="bg-[#1a1a1a] p-3 border-t border-[#b87333]/30 flex justify-between items-center">
                                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                                    img_0{index + 1}
                                </span>
                                <span className="text-[10px] text-[#b87333] uppercase tracking-widest font-bold">
                                    Canyon State
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
