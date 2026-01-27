import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import styles from '../styles/PortfolioLanding.module.css';

// Placeholder images - user will replace these
import commercialPlaceholder from '../assets/portfolio/commercial-placeholder.jpg';
import residentialPlaceholder from '../assets/portfolio/residential-placeholder.jpg';

const PortfolioLanding = () => {
    return (
        <>
            <SEO
                title="Project Portfolio"
                description="Explore our commercial and residential construction projects across Arizona"
            />
            <div className={styles.container}>
                <h1 className={styles.title}>CANYON STATE PROJECT PORTFOLIO</h1>

                <div className={styles.grid}>
                    <Link to="/portfolio/commercial" className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <img
                                src={commercialPlaceholder}
                                alt="Commercial Projects"
                                className={styles.image}
                            />
                        </div>
                        <h2 className={styles.cardTitle}>Commercial</h2>
                    </Link>

                    <Link to="/portfolio/residential" className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <img
                                src={residentialPlaceholder}
                                alt="Residential Projects"
                                className={styles.image}
                            />
                        </div>
                        <h2 className={styles.cardTitle}>Residential</h2>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default PortfolioLanding;
