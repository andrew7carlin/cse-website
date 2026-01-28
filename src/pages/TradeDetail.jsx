import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './TradeDetail.module.css';

// Import project images for service headers
import roofingImage from '../assets/projects/La Quinta Hotel_ KIngman Az.webp';
import stuccoImage from '../assets/projects/Greenprint Apartments_Phoenix AZ.webp';

// Data Mock - In a real app this might come from a CMS or config file
const tradeData = {
    roofing: {
        title: "Roofing",
        description: "We've been putting roofs over people's heads for years—tile, single-ply, foam, metal, you name it. Whether you need a brand new roof, a repair, or just someone to take a look and tell it to you straight, we've got you covered.",
        image: roofingImage,
        expertise: ["Tile Roofing", "Single-Ply Systems", "Foam Roofing", "Metal Roofing", "Shingle Systems", "New Construction", "Re-roofing", "Repairs & Maintenance", "Roof Coatings", "Inspections & Assessments"],
        cta: "Let's Talk About Your Roof"
    },
    stucco: {
        title: "Stucco & EIFS",
        description: "Stucco isn't just about slapping some plaster on a wall—it's a craft. We do everything from old-school 3-coat systems to modern EIFS, and we make sure it's done right so it lasts.",
        image: stuccoImage,
        expertise: ["Traditional 3-Coat Stucco", "EIFS Systems", "Synthetic Stucco", "Lath & Plaster", "Texture Matching", "Repair & Patching", "Color Matching", "Waterproofing"],
        cta: "Let's Get Plastered"
    },
    // Default fallback for others
    default: {
        title: "Specialized Construction Service",
        description: "Whatever you need built, fixed, or maintained—we've probably done it before. Let's talk about your project.",
        image: "https://images.unsplash.com/photo-1535732820275-9ffd998cac22?auto=format&fit=crop&q=80&w=2670",
        expertise: ["Commercial Projects", "Residential Work", "Industrial Construction"],
        cta: "Start a Conversation"
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

                        <h3 className="text-h3" style={{ marginTop: '3rem', marginBottom: '1rem' }}>Our Expertise</h3>
                        <div className={styles.expertiseScroller}>
                            <ul className={styles.expertiseList}>
                                {/* Duplicate items for seamless infinite scroll */}
                                {[...data.expertise, ...data.expertise].map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={styles.sidebar}>
                        <div className={styles.ctaCard}>
                            <h3>Ready to Get Started?</h3>
                            <p>Let's talk about what you need. No sales pitch—just honest advice.</p>
                            <Link to="/contact" className={styles.btn}>{data.cta}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TradeDetail;
