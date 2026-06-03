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
                description="Browse Canyon State Enterprises' commercial and residential construction portfolio. Roofing, stucco, HVAC, and multi-trade projects across Arizona, Nevada, and Utah."
                canonical="https://canyonstateaz.com/portfolio"
            />
            <div className={styles.container}>
                <h1 className={styles.title}>CANYON STATE PROJECT PORTFOLIO</h1>

                <p style={{ maxWidth: '760px', margin: '0 auto 2.5rem', textAlign: 'center', lineHeight: 1.7, color: 'var(--color-text-muted, #6b7280)' }}>
                    Two decades of self-performed work across the Southwest, from
                    dealerships, hotels, and medical facilities to custom homes and
                    full community developments. Every project below was built by
                    Canyon State crews performing the roofing, stucco, metals, and
                    more in house. Choose a category to explore the work.
                </p>

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

                <p style={{ maxWidth: '760px', margin: '2.5rem auto 0', textAlign: 'center', lineHeight: 1.7, color: 'var(--color-text-muted, #6b7280)' }}>
                    Our commercial portfolio spans hospitality, medical, dealership,
                    government, multi-family, restaurant, retail, and industrial work
                    across Arizona, Nevada, and beyond. On the residential side, you
                    will find custom homes, model homes, and community developments
                    built to the same standard. Looking for something specific?{' '}
                    <Link to="/contact" style={{ color: 'var(--color-copper)', fontWeight: 600 }}>Get in touch</Link>{' '}
                    and we will point you to the most relevant work.
                </p>
            </div>
        </>
    );
};

export default PortfolioLanding;
