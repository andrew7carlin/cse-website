import watermarkLogo from '../../assets/logos/logo-tan.webp';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project, onClick }) => {
    // Use the first media item as the thumbnail
    const thumbnail = project.media[0];

    return (
        <div
            onClick={() => onClick(project)}
            className={styles.card}
        >
            {/* Background Image/Video */}
            <div className={styles.mediaWrapper}>
                {thumbnail.type === 'video' ? (
                    <video
                        src={thumbnail.src}
                        className={styles.media}
                        muted
                    />
                ) : (
                    <img
                        src={thumbnail.src}
                        alt={project.title}
                        className={styles.media}
                        loading="lazy"
                    />
                )}
            </div>

            {/* Watermark Logo (Top Right) */}
            <div className={styles.watermark}>
                <img src={watermarkLogo} alt="" />
            </div>

            {/* Overlay Gradient */}
            <div className={styles.overlay} />

            {/* Content (Bottom Left) */}
            <div className={styles.content}>
                <div className={styles.titleRow}>
                    <h3 className={styles.title}>{project.title}</h3>
                    <span className={styles.divider}>|</span>
                    <p className={styles.location}>{project.location}</p>
                </div>
            </div>

            {/* Photo Count Badge (Minimal Top Left) */}
            {project.media.length > 1 && (
                <span className={styles.badge}>
                    +{project.media.length - 1} Media
                </span>
            )}
        </div>
    );
};

export default ProjectCard;
