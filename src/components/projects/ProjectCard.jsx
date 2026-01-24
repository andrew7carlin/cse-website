import { motion } from 'framer-motion';
import watermarkLogo from '../../assets/logos/logo-tan.png';

const ProjectCard = ({ project, onClick }) => {
    // Use the first media item as the thumbnail
    const thumbnail = project.media[0];

    return (
        <motion.div
            layoutId={`project-${project.id}`}
            onClick={() => onClick(project)}
            className="group relative h-80 w-full cursor-pointer overflow-hidden bg-gray-900 border border-[#b87333] shadow-lg"
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            {/* Background Image/Video */}
            <div className="h-full w-full overflow-hidden">
                {thumbnail.type === 'video' ? (
                    <video
                        src={thumbnail.src}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        muted
                    />
                ) : (
                    <img
                        src={thumbnail.src}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                )}
            </div>

            {/* Watermark Logo (Top Right) */}
            <div className="absolute top-4 right-4 z-10 opacity-60 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100">
                <img src={watermarkLogo} alt="" className="w-24 h-auto object-contain" />
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Content (Bottom Left) */}
            <div className="absolute bottom-6 left-6 w-full pr-6">
                <div className="flex items-center gap-3">
                    <h3 className="font-outfit text-xl font-bold text-white uppercase tracking-wider">
                        {project.title}
                    </h3>
                    <span className="text-[#b87333] font-light text-xl">|</span>
                    <p className="font-roboto text-sm font-medium tracking-wide text-gray-300 uppercase">
                        {project.location}
                    </p>
                </div>
            </div>

            {/* Photo Count Badge (Minimal Top Left) */}
            {project.media.length > 1 && (
                <span className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white/80 text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-sm border border-white/10">
                    +{project.media.length - 1} Media
                </span>
            )}
        </motion.div>
    );
};

export default ProjectCard;
