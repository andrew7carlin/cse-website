import { useEffect, useRef } from 'react';
import SEO from '../components/common/SEO';
import styles from '../styles/PortfolioGallery.module.css';

// Direct Import Sanitization - High-Fidelity Residential Portfolio
import customHome3 from '../assets/portfolio/residential/Custom_Home_Kingman_Az_3.webp';
import customHome4 from '../assets/portfolio/residential/Custom_Home_Kingman_Az_4.webp';
import customHome5 from '../assets/portfolio/residential/Custom_Home_Kingman_Az_5.webp';
import customHome6 from '../assets/portfolio/residential/Custom_Home_Kingman_Az_6.webp';
import hospiceHome from '../assets/portfolio/residential/Hospice_Home_Kingman_Az.webp';
import surpriseHome from '../assets/portfolio/residential/Surprise_Custom_Home_Surprise_Az.webp';

const images = [
    { id: 1, src: customHome3, name: 'Custom Home', location: 'Kingman, Arizona', alt: 'Custom Home - Kingman, Arizona' },
    { id: 2, src: customHome4, name: 'Custom Home', location: 'Kingman, Arizona', alt: 'Custom Home - Kingman, Arizona' },
    { id: 3, src: customHome5, name: 'Custom Home', location: 'Kingman, Arizona', alt: 'Custom Home - Kingman, Arizona' },
    { id: 4, src: customHome6, name: 'Custom Home', location: 'Kingman, Arizona', alt: 'Custom Home - Kingman, Arizona' },
    { id: 5, src: hospiceHome, name: 'Hospice Home', location: 'Kingman, Arizona', alt: 'Hospice Home - Kingman, Arizona' },
    { id: 6, src: surpriseHome, name: 'Surprise Custom Home', location: 'Surprise, Arizona', alt: 'Custom Home - Surprise, Arizona' },
];

const ResidentialPortfolio = () => {
    const imageRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    }
                });
            },
            { threshold: 0.2 }
        );

        imageRefs.current.forEach((img) => {
            if (img) observer.observe(img);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <SEO
                title="Residential Portfolio"
                description="Explore our residential construction projects across Arizona"
            />
            <div className={styles.container}>
                <h1 className={styles.title}>Residential Projects</h1>

                <div className={styles.gallery}>
                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            ref={(el) => (imageRefs.current[index] = el)}
                            className={`${styles.imageItem} ${index % 2 === 0 ? styles.left : styles.right}`}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className={styles.image}
                                loading="lazy"
                            />
                            <div className={styles.caption}>
                                <h3 className={styles.projectName}>{image.name}</h3>
                                <p className={styles.projectLocation}>{image.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ResidentialPortfolio;
