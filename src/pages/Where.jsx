import React, { useRef, useEffect, useState } from 'react';
import styles from './Where.module.css';

const serviceAreas = [
    {
        id: 'arizona',
        state: 'Arizona',
        abbrev: 'AZ',
        tagline: 'Home Base',
        description: 'Full-service coverage across the entire state. From Phoenix metro to Flagstaff, Tucson to Kingman — we\'re your local partner.',
        coverage: 'Statewide',
        hq: {
            city: 'Kingman',
            address: '2959 Rhoades Ave',
            zip: 'Kingman, AZ 86409',
        },
        satellite: 'Phoenix office by appointment',
        gradient: 'linear-gradient(135deg, #A04921 0%, #c45827 50%, #d4713a 100%)',
    },
    {
        id: 'nevada',
        state: 'Nevada',
        abbrev: 'NV',
        tagline: 'Full Coverage',
        description: 'Complete service throughout Nevada. Las Vegas, Reno, Henderson, and everywhere in between.',
        coverage: 'Statewide',
        hq: null,
        satellite: 'Las Vegas office by appointment',
        gradient: 'linear-gradient(135deg, #1B150F 0%, #2a211a 50%, #3d2f24 100%)',
    },
    {
        id: 'newmexico',
        state: 'New Mexico',
        abbrev: 'NM',
        tagline: 'By Appointment',
        description: 'Serving New Mexico clients with scheduled project consultations. Contact us to arrange a site visit.',
        coverage: 'By Appointment',
        hq: null,
        satellite: null,
        gradient: 'linear-gradient(135deg, #008080 0%, #00a0a0 50%, #00b8b8 100%)',
    },
    {
        id: 'utah',
        state: 'Utah',
        abbrev: 'UT',
        tagline: 'By Appointment',
        description: 'Serving Utah clients with scheduled project consultations. Contact us to arrange a site visit.',
        coverage: 'By Appointment',
        hq: null,
        satellite: null,
        gradient: 'linear-gradient(135deg, #B48F73 0%, #c9a78b 50%, #ddbfa3 100%)',
    },
];

const Where = () => {
    const scrollContainerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;
            const progress = scrollLeft / maxScroll;
            setScrollProgress(progress);

            const slideWidth = container.clientWidth;
            const newIndex = Math.round(scrollLeft / slideWidth);
            setActiveIndex(Math.min(newIndex, serviceAreas.length - 1));
        };

        // Mouse wheel horizontal scroll
        const handleWheel = (e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        };

        container.addEventListener('scroll', handleScroll);
        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('scroll', handleScroll);
            container.removeEventListener('wheel', handleWheel);
        };
    }, []);

    const scrollToSlide = (index) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const slideWidth = container.clientWidth;
        container.scrollTo({
            left: slideWidth * index,
            behavior: 'smooth',
        });
    };

    const goNext = () => {
        if (activeIndex < serviceAreas.length - 1) {
            scrollToSlide(activeIndex + 1);
        }
    };

    const goPrev = () => {
        if (activeIndex > 0) {
            scrollToSlide(activeIndex - 1);
        }
    };

    return (
        <main className={styles.page}>
            {/* Hero Header */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.eyebrow}>Service Areas</span>
                    <h1 className={styles.title}>Where We Work</h1>
                    <p className={styles.subtitle}>
                        Four states. One standard of excellence.
                    </p>
                </div>
            </section>

            {/* Horizontal Scroll Journey */}
            <section className={styles.journeySection}>
                {/* Progress Bar */}
                <div className={styles.progressTrack}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${(scrollProgress * 100) || 25}%` }}
                    />
                </div>

                {/* Arrow Navigation */}
                <button
                    className={`${styles.navArrow} ${styles.navArrowLeft} ${activeIndex === 0 ? styles.navArrowDisabled : ''}`}
                    onClick={goPrev}
                    aria-label="Previous state"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <button
                    className={`${styles.navArrow} ${styles.navArrowRight} ${activeIndex === serviceAreas.length - 1 ? styles.navArrowDisabled : ''}`}
                    onClick={goNext}
                    aria-label="Next state"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>

                {/* Navigation Dots */}
                <div className={styles.navDots}>
                    {serviceAreas.map((area, index) => (
                        <button
                            key={area.id}
                            className={`${styles.navDot} ${activeIndex === index ? styles.navDotActive : ''}`}
                            onClick={() => scrollToSlide(index)}
                            aria-label={`Go to ${area.state}`}
                        >
                            <span className={styles.dotLabel}>{area.abbrev}</span>
                        </button>
                    ))}
                </div>

                {/* Scrollable Container */}
                <div ref={scrollContainerRef} className={styles.scrollContainer}>
                    {serviceAreas.map((area, index) => (
                        <article
                            key={area.id}
                            className={styles.slide}
                            style={{ '--slide-gradient': area.gradient }}
                        >
                            <div className={styles.slideBackground} />
                            <div className={styles.slideContent}>
                                <div className={styles.stateHeader}>
                                    <span className={styles.stateAbbrev}>{area.abbrev}</span>
                                    <div className={styles.stateInfo}>
                                        <h2 className={styles.stateName}>{area.state}</h2>
                                        <span className={styles.stateTagline}>{area.tagline}</span>
                                    </div>
                                </div>

                                <p className={styles.stateDescription}>{area.description}</p>

                                <div className={styles.coverageBadge}>
                                    <span className={styles.coverageIcon}>◉</span>
                                    <span>{area.coverage}</span>
                                </div>

                                {area.hq && (
                                    <div className={styles.hqCard}>
                                        <span className={styles.hqLabel}>Headquarters</span>
                                        <p className={styles.hqCity}>{area.hq.city}</p>
                                        <p className={styles.hqAddress}>{area.hq.address}</p>
                                        <p className={styles.hqAddress}>{area.hq.zip}</p>
                                    </div>
                                )}

                                {area.satellite && (
                                    <div className={styles.satelliteInfo}>
                                        <span className={styles.satelliteIcon}>📍</span>
                                        <span>{area.satellite}</span>
                                    </div>
                                )}

                                <a href="/contact" className={styles.ctaBtn}>
                                    Get a Quote in {area.state} →
                                </a>
                            </div>

                            {/* Slide Number */}
                            <div className={styles.slideNumber}>
                                <span className={styles.current}>{String(index + 1).padStart(2, '0')}</span>
                                <span className={styles.divider}>/</span>
                                <span className={styles.total}>{String(serviceAreas.length).padStart(2, '0')}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Quick Reference Grid */}
            <section className={styles.gridSection}>
                <div className={styles.gridContainer}>
                    <h3 className={styles.gridTitle}>At a Glance</h3>
                    <div className={styles.grid}>
                        {serviceAreas.map((area) => (
                            <div key={area.id} className={styles.gridCard}>
                                <span className={styles.gridAbbrev}>{area.abbrev}</span>
                                <span className={styles.gridState}>{area.state}</span>
                                <span className={`${styles.gridBadge} ${area.coverage === 'Statewide' ? styles.gridBadgeFull : ''}`}>
                                    {area.coverage}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Where;
