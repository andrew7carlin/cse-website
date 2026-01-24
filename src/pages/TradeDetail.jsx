import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './TradeDetail.module.css';

// Import project images for service headers
import roofingImage from '../assets/projects/Home2Suites_ Kingman Az.jpg';

// Data Mock - In a real app this might come from a CMS or config file
const tradeData = {
    roofing: {
        title: "Commercial & Residential Roofing",
        description: "Experts in TPO, foam, metal, and shingle roofing systems. We provide comprehensive roof asset management, repairs, and new installation.",
        image: roofingImage,
        capabilities: ["New Construction", "Re-roofing", "Repairs & Maintenance", "Coatings", "Inspections"]
    },
    stucco: {
        title: "Stucco & EIFS",
        description: "Precision stucco application for durability and aesthetic appeal. We handle everything from traditional 3-coat systems to modern EIFS.",
        image: "https://images.unsplash.com/photo-1594895689127-14e92a40498b?auto=format&fit=crop&q=80&w=2670",
        capabilities: ["Traditional Stucco", "EIFS Systems", "Lath & Plaster", "Repair & Patching"]
    },
    // Default fallback for others
    default: {
        title: "Specialized Construction Service",
        description: "Canyon State delivers high-quality execution in this trade. Contact us for specific capabilities and past performance.",
        image: "https://images.unsplash.com/photo-1535732820275-9ffd998cac22?auto=format&fit=crop&q=80&w=2670",
        capabilities: ["Commercial", "Residential", "Industrial"]
    }
};

const TradeDetail = () => {
    const { tradeId } = useParams();
    const data = tradeData[tradeId] || tradeData.default;

    return (
        <div className={styles.page}>
            <div className={styles.hero} style={{ backgroundImage: `url(${data.image})` }}>
                <div className={styles.heroOverlay}>
                    <div className={styles.container}>
                        <span className={styles.eyebrow}>Services / {tradeId}</span>
                        <h1 className={styles.title}>{data.title}</h1>
                    </div>
                </div>
            </div>

            <div className={`${styles.container} ${styles.contentSection}`}>
                <div className={styles.grid}>
                    <div className={styles.mainContent}>
                        <h2 className="text-h2">Overview</h2>
                        <p className={styles.description}>{data.description}</p>

                        <h3 className="text-h3" style={{ marginTop: '3rem', marginBottom: '1rem' }}>Capabilities</h3>
                        <ul className={styles.list}>
                            {data.capabilities.map((cap, i) => (
                                <li key={i}>{cap}</li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.sidebar}>
                        <div className={styles.ctaCard}>
                            <h3>Need {data.title}?</h3>
                            <p>Get a quote for your project today.</p>
                            <Link to="/contact" className={styles.btn}>Request Quote</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TradeDetail;
