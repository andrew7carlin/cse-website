import { useMemo, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadProjectAssets } from '../../utils/assetLoader';
import styles from './ProjectsShowcase.module.css';

const ProjectsShowcase = () => {
    const sectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Load and shuffle projects
    const projects = useMemo(() => {
        const allProjects = loadProjectAssets();
        const shuffled = [...allProjects].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 9); // Show 9 projects in masonry grid
    }, []);

    // Parallax scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate progress from 0 to 1 as section scrolls through viewport
            const progress = Math.max(0, Math.min(1,
                (windowHeight - rect.top) / (windowHeight + rect.height)
            ));

            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (projects.length === 0) return null;

    // Assign varying heights for masonry effect
    const heightClasses = ['tall', 'medium', 'short'];

    // Calculate parallax offset for each item based on its index
    const getParallaxStyle = (index) => {
        // Different speeds for different items create depth
        const speeds = [0.15, 0.1, 0.05, 0.12, 0.08, 0.18, 0.06, 0.14, 0.09];
        const speed = speeds[index % speeds.length];
        const offset = (scrollProgress - 0.5) * 100 * speed;

        return {
            transform: `translateY(${offset}px)`,
            transition: 'transform 0.1s ease-out'
        };
    };

    return (
        <section className={styles.section} ref={sectionRef}>
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
                                style={getParallaxStyle(index)}
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
