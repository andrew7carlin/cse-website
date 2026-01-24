import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { loadProjectAssets } from '../../utils/assetLoader';
import styles from './PortfolioCarousel.module.css';

const PortfolioCarousel = () => {
    // Load real projects
    const projects = useMemo(() => {
        const allProjects = loadProjectAssets();
        // If we have fewer than 3, just repeat them to fill the space visually
        if (allProjects.length === 0) return [];
        if (allProjects.length < 3) return [...allProjects, ...allProjects, ...allProjects].slice(0, 3);
        return allProjects.slice(0, 3); // Just show first 3 recent ones
    }, []);

    if (projects.length === 0) return null; // Hide if no assets at all

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className="text-h2">Featured Projects</h2>
                    <Link to="/portfolio" className={styles.viewAllBtn}>View Full Portfolio</Link>
                </div>

                <div className={styles.carouselTrack}>
                    {projects.map((project, index) => (
                        // detailed link to portfolio detail
                        <Link key={`${project.id}-${index}`} to={`/portfolio/${project.id}`} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                {project.media[0].type === 'video' ? (
                                    <video src={project.media[0].src} className={styles.image} muted playsInline />
                                ) : (
                                    <img src={project.media[0].src} alt={project.title} className={styles.image} />
                                )}
                                <div className={styles.overlay}>
                                    <span className={styles.viewLabel}>View Project</span>
                                </div>
                            </div>
                            <div className={styles.meta}>
                                <h3 className={styles.title}>{project.title}</h3>
                                <div className={styles.details}>
                                    <span>{project.location}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PortfolioCarousel;
