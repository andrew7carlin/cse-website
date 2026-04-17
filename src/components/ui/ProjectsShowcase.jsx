import { useMemo, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadProjectAssets } from '../../utils/assetLoader';
import styles from './ProjectsShowcase.module.css';

const ProjectsShowcase = () => {
    const sectionRef = useRef(null);
    const [visibleItems, setVisibleItems] = useState(new Set());

    // Load and shuffle projects - increased for denser mosaic
    const projects = useMemo(() => {
    // Curated showcase — fixed order, no shuffle
    const allProjects = loadProjectAssets();
    const curatedIds = [
        'spirit-mountain-casino',
        'kmrc-main-campus',
        'bettys-village',
        'greenprint-apartments',
        'embassy-suites-houston',
        'chilis-kingman',
        'good-gather-phoenix',
        '28th-sunrise-las-vegas',
        'aquila-place',
        'mohave-eye-center',
        'surprise-custom-home',
        'canyon-palms-kingman',
        'town-home-bullhead',
        'century-complete-pahrump',
        'laughlin-ranch-1',
        'golf-home-kingman',
        'farm-crest-home-kingman',
        'laughlin-ranch-2',
        'custom-home-scottsdale',
    ];
    return curatedIds
        .map(id => allProjects.find(p => p.id === id))
        .filter(Boolean);
    }, []);

    // Scroll-triggered reveal effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.dataset.index);
                        setVisibleItems((prev) => new Set([...prev, index]));
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '50px 0px'
            }
        );

        const items = document.querySelectorAll(`.${styles.gridItem}`);
        items.forEach((item) => observer.observe(item));

        return () => observer.disconnect();
    }, [projects]);

    if (projects.length === 0) return null;

    // More dramatic size variations for masonry
    const getSizeClass = (index) => {
        // Pattern for varied sizes: large, small, medium, small, large, small, medium, medium, small, large, small, medium
        const sizes = ['xlarge', 'small', 'medium', 'small', 'large', 'small', 'medium', 'medium', 'small', 'xlarge', 'small', 'medium'];
        return sizes[index % sizes.length];
    };

    // Rotating accent colors: copper, turquoise, tan, brown
    const getAccentColor = (index) => {
        const colors = ['copper', 'turquoise', 'tan', 'brown'];
        return colors[index % 4];
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
                        const sizeClass = getSizeClass(index);
                        const accentColor = getAccentColor(index);
                        const isVisible = visibleItems.has(index);
                        const delay = (index % 4) * 0.1; // Staggered animation

                        return (
                            <Link
                                key={project.id}
                                to={`/portfolio/${project.id}`}
                                data-index={index}
                                data-accent={accentColor}
                                className={`${styles.gridItem} ${styles[sizeClass]} ${isVisible ? styles.visible : ''}`}
                                style={{ transitionDelay: `${delay}s`, textDecoration: 'none' }}
                            >
                                <div className={styles.imageWrapper}>
                                    <img
                                        src={project.media[0]?.src}
                                        alt={project.title}
                                        className={styles.projectImage}
                                        loading="lazy"
                                        width="1024"
                                        height="576"
                                    />
                                    <div className={styles.overlay}>
                                        <div className={styles.projectInfo}>
                                            <h3 className={styles.projectTitle}>{project.title}</h3>
                                            <p className={styles.projectLocation}>{project.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProjectsShowcase;
