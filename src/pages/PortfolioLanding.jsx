import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import styles from '../styles/PortfolioLanding.module.css';

// Portfolio card images
import commercialImage from '../assets/portfolio/commercial/28th_Sunrise_Las_Vegas_Nv_6.webp';
import residentialImage from '../assets/portfolio/residential/Surprise_Custom_Home_Surprise_Az.webp';

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
                                src={commercialImage}
                                alt="Commercial Projects"
                                className={styles.image}
                            />
                        </div>
                        <h2 className={styles.cardTitle}>Commercial</h2>
                    </Link>

                    <Link to="/portfolio/residential" className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <img
                                src={residentialImage}
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
