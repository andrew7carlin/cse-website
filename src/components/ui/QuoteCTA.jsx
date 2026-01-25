import { Link } from 'react-router-dom';
import styles from './QuoteCTA.module.css';

const QuoteCTA = () => {
    return (
        <section className={styles.section}>
            {/* Circle Ring Element - Connects to section above */}
            <div className={styles.circleContainer}>
                <div className={styles.circleRing}>
                    <div className={styles.circleInner}></div>
                </div>
            </div>

            {/* Content */}
            <div className={styles.content}>
                <h2 className={styles.heading}>Request a Quote</h2>
                <Link to="/contact" className={styles.button}>
                    Get Started
                </Link>
            </div>

            {/* Diamond plate texture overlay */}
            <div className={styles.textureOverlay}></div>
        </section>
    );
};

export default QuoteCTA;
