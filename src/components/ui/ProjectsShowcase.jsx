import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { loadProjectAssets } from '../../utils/assetLoader';
import styles from './ProjectsShowcase.module.css';

const ProjectsShowcase = () => {
    // Load and shuffle projects
    const projects = useMemo(() => {
        const allProjects = loadProjectAssets();
        const shuffled = [...allProjects].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 9); // Show 9 projects in masonry grid
    }, []);

    if (projects.length === 0) return null;

    // Assign varying heights for masonry effect
    const heightClasses = ['tall', 'medium', 'short'];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.heading}>Our Projects</h2>
                    <Link to="/portfolio" className={styles.allProjectsBtn}>
                        All Projects →
                    </Link>
                </div>

                {/* Masonry Grid */}
                <div className={styles.masonryGrid}>
                    {projects.map((project, index) => {
                        const heightClass = heightClasses[index % 3];

                        return (
                            <div
                                key={project.id}
                                className={`${styles.gridItem} ${styles[heightClass]}`}
                            >
                                <div className={styles.imageWrapper}>
                                    <img
                                        src={project.media[0]?.src}
                                        alt={project.title}
                                        className={styles.projectImage}
                                    />
                                    <div className={styles.overlay}>
                                        <div className={styles.projectInfo}>
                                            <h3 className={styles.projectTitle}>{project.title}</h3>
                                            <p className={styles.projectLocation}>{project.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProjectsShowcase;
