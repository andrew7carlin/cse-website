import { useEffect, useRef } from 'react';
import styles from './SafetyStats.module.css';

const SafetyStats = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className={styles.container} ref={sectionRef}>
            <div className={styles.content}>
                <div className={styles.badge}>
                    <div className={styles.badgeInner}>
                        <div className={styles.label}>Experience Modification Rate</div>
                        <div className={styles.rating}>0.74</div>
                        <div className={styles.subtext}>EMR</div>
                    </div>
                </div>

                <div className={styles.info}>
                    <h2 className={styles.headline}>Safety First, Always</h2>
                    <p className={styles.description}>
                        Our 0.74 EMR means we've experienced <strong>26% fewer safety incidents</strong> than the average contractor.
                        This exceptional rating qualifies us for projects others can't bid on and saves our clients thousands in insurance costs.
                    </p>
                    <div className={styles.comparison}>
                        <div className={styles.comparisonItem}>
                            <span className={styles.comparisonValue}>26%</span>
                            <span className={styles.comparisonLabel}>Fewer Incidents</span>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.comparisonItem}>
                            <span className={styles.comparisonValue}>Top 15%</span>
                            <span className={styles.comparisonLabel}>National Ranking</span>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.comparisonItem}>
                            <span className={styles.comparisonValue}>$1000s</span>
                            <span className={styles.comparisonLabel}>Client Savings</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SafetyStats;
