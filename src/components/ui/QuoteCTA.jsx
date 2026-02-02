import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './QuoteCTA.module.css';

const QuoteCTA = () => {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });

    return (
        <section ref={ref} className={`${styles.section} reveal ${isVisible ? 'visible' : ''}`}>
            {/* Circle Ring Element - Connects to section above */}
            <div className={styles.circleContainer}>
                <div className={styles.circleRing}>
                    <div className={styles.circleInner}></div>
                </div>
            </div>

            {/* Content */}
            <div className={styles.content}>
                <h2 className={styles.heading}>Sick of subcontractor headaches?</h2>
                <p className={styles.subheading}>Let us fix that</p>
                <Link to="/contact" className={styles.button} data-magnetic data-cursor="cta">
                    Get Started
                </Link>
            </div>

            {/* Diamond plate texture overlay */}
            <div className={styles.textureOverlay}></div>
        </section>
    );
};

export default QuoteCTA;
