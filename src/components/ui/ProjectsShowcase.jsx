import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { loadProjectAssets } from '../../utils/assetLoader';
import styles from './ProjectsShowcase.module.css';

const ProjectsShowcase = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const trackRef = useRef(null);

    // Load real projects and shuffle for variety
    const projects = useMemo(() => {
        const allProjects = loadProjectAssets();
        // Shuffle array
        const shuffled = [...allProjects].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 8); // Show up to 8 projects
    }, []);

    if (projects.length === 0) return null;

    const currentProject = projects[currentIndex];
    const nextProject = projects[(currentIndex + 1) % projects.length];

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const goPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.heading}>Our Projects</h2>
                    <div className={styles.filters}>
                        <Link to="/portfolio" className={styles.filterBtn}>
                            <span>Choose a Category</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </Link>
                        <Link to="/portfolio" className={styles.allProjectsBtn}>
                            All Projects
                        </Link>
                    </div>
                </div>

                {/* Main Showcase */}
                <div className={styles.showcase}>
                    {/* Featured Project */}
                    <div className={styles.featured}>
                        <div className={styles.featuredImage}>
                            <img
                                src={currentProject.media[0]?.src}
                                alt={currentProject.title}
                            />
                        </div>
                    </div>

                    {/* Project Info Center */}
                    <div className={styles.projectInfo}>
                        <h3 className={styles.projectTitle}>{currentProject.title}</h3>
                        <p className={styles.projectType}>Commercial Build</p>

                        {/* Navigation */}
                        <div className={styles.navigation}>
                            <button className={styles.navBtn} onClick={goPrev} aria-label="Previous project">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                            <div className={styles.indicator}>
                                <div className={styles.indicatorDot}></div>
                            </div>
                            <button className={styles.navBtn} onClick={goNext} aria-label="Next project">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>

                        <p className={styles.projectLocation}>{currentProject.location}</p>
                    </div>

                    {/* Next Project Preview */}
                    <div className={styles.nextPreview}>
                        <div className={styles.nextImage}>
                            <img
                                src={nextProject.media[0]?.src}
                                alt={nextProject.title}
                            />
                            <div className={styles.nextOverlay}></div>
                        </div>
                    </div>
                </div>

                {/* Progress Dots */}
                <div className={styles.progressDots}>
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to project ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsShowcase;
