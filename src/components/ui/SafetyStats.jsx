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
                        <div className={styles.rating}>0.72</div>
                        <div className={styles.subtext}>EMR</div>
                    </div>
                </div>

                <div className={styles.info}>
                    <h2 className={styles.headline}>Safety First, Always</h2>
                    <p className={styles.description}>
                        Our 0.72 EMR rating is 28% better than the construction industry average of 1.0,
                        reflecting our unwavering commitment to workplace safety and exceptional project execution.
                    </p>
                    <div className={styles.comparison}>
                        <div className={styles.comparisonItem}>
                            <span className={styles.comparisonLabel}>Canyon State</span>
                            <span className={styles.comparisonValue}>0.72</span>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.comparisonItem}>
                            <span className={styles.comparisonLabel}>Industry Average</span>
                            <span className={styles.comparisonValue}>1.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SafetyStats;
