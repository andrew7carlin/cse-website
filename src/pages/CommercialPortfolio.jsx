import { useEffect, useRef } from 'react';
import SEO from '../components/common/SEO';
import styles from '../styles/PortfolioGallery.module.css';

// Placeholder images - user will add their commercial project photos
const images = [
    { id: 1, src: '/placeholder-1.jpg', alt: 'Commercial Project 1' },
    { id: 2, src: '/placeholder-2.jpg', alt: 'Commercial Project 2' },
    { id: 3, src: '/placeholder-3.jpg', alt: 'Commercial Project 3' },
    { id: 4, src: '/placeholder-4.jpg', alt: 'Commercial Project 4' },
    { id: 5, src: '/placeholder-5.jpg', alt: 'Commercial Project 5' },
    { id: 6, src: '/placeholder-6.jpg', alt: 'Commercial Project 6' },
];

const CommercialPortfolio = () => {
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
                title="Commercial Portfolio"
                description="Explore our commercial construction projects across Arizona"
            />
            <div className={styles.container}>
                <h1 className={styles.title}>Commercial Projects</h1>

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
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CommercialPortfolio;
