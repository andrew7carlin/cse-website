import { useEffect, useRef } from 'react';
import SEO from '../components/common/SEO';
import styles from '../styles/PortfolioGallery.module.css';

// Direct Import Sanitization - High-Fidelity Commercial Portfolio
import andersonChevrolet from '../assets/portfolio/commercial/Anderson_Chevrolet_Kingman_Az.webp';
import aquilaPlace from '../assets/portfolio/commercial/Aquila_Place_Apache_Junction.webp';
import arizonaFinancial from '../assets/portfolio/commercial/Arizona_Financial_Kingman_Az.webp';
import bjBrewhouseQueenCreek from '../assets/portfolio/commercial/BJ_Brewhouse_Queen_Creek_Az.webp';
import bjBrewhousePhoenix from '../assets/portfolio/commercial/BJ_Brewhouse_Phoenix_Az.webp';
import freseniusMedical from '../assets/portfolio/commercial/Fresenius_Medical_Care_Kingman_Az.webp';
import greenprintApartments from '../assets/portfolio/commercial/Greenprint_Apartments_Phoenix_AZ.webp';
import historicalDowntownBuilding from '../assets/portfolio/commercial/Historical_Downtown_Building_Kingman_Az.webp';
import historicalDowntown from '../assets/portfolio/commercial/Historical_Downtown_Kingman_Az.webp';
import hondaDealership from '../assets/portfolio/commercial/Honda_Dealership_Kingman_Az.webp';
import hyundaiGilbert from '../assets/portfolio/commercial/Hyundai_Gilbert_Gilbert_Az.webp';
import jimmyJohns from '../assets/portfolio/commercial/Jimmy_Johns_Kingman_Az.webp';
import kmrcMainCampus from '../assets/portfolio/commercial/KMRC_Medical_Center_Main_Campus_Kingman_Az.webp';
import krmcHualapaiMountain from '../assets/portfolio/commercial/KRMC_Hualapai_Mountain_Campus_Kingman_Az.webp';
import krmcMedicalMain from '../assets/portfolio/commercial/KRMC_Medical_Center_Main_Kingman_Az.webp';
import laQuintaHotel from '../assets/portfolio/commercial/La_Quinta_Hotel_Kingman_Az.webp';
import ldsChurch from '../assets/portfolio/commercial/LDS_Church_Addition_Litchfield_Park_Az.webp';
import medicalFacility from '../assets/portfolio/commercial/Medical_Facility_Kingman_Az.webp';

const images = [
    { id: 1, src: andersonChevrolet, alt: 'Anderson Chevrolet - Kingman, Arizona' },
    { id: 2, src: aquilaPlace, alt: 'Aquila Place - Apache Junction, Arizona' },
    { id: 3, src: arizonaFinancial, alt: 'Arizona Financial - Kingman, Arizona' },
    { id: 4, src: bjBrewhouseQueenCreek, alt: 'BJ Brewhouse - Queen Creek, Arizona' },
    { id: 5, src: bjBrewhousePhoenix, alt: 'BJ Brewhouse - Phoenix, Arizona' },
    { id: 6, src: freseniusMedical, alt: 'Fresenius Medical Care - Kingman, Arizona' },
    { id: 7, src: greenprintApartments, alt: 'Greenprint Apartments - Phoenix, Arizona' },
    { id: 8, src: historicalDowntownBuilding, alt: 'Historical Downtown Building - Kingman, Arizona' },
    { id: 9, src: historicalDowntown, alt: 'Historical Downtown - Kingman, Arizona' },
    { id: 10, src: hondaDealership, alt: 'Honda Dealership - Kingman, Arizona' },
    { id: 11, src: hyundaiGilbert, alt: 'Hyundai Gilbert - Gilbert, Arizona' },
    { id: 12, src: jimmyJohns, alt: 'Jimmy Johns - Kingman, Arizona' },
    { id: 13, src: kmrcMainCampus, alt: 'KMRC Medical Center Main Campus - Kingman, Arizona' },
    { id: 14, src: krmcHualapaiMountain, alt: 'KRMC Hualapai Mountain Campus - Kingman, Arizona' },
    { id: 15, src: krmcMedicalMain, alt: 'KRMC Medical Center Main - Kingman, Arizona' },
    { id: 16, src: laQuintaHotel, alt: 'La Quinta Hotel - Kingman, Arizona' },
    { id: 17, src: ldsChurch, alt: 'LDS Church Addition - Litchfield Park, Arizona' },
    { id: 18, src: medicalFacility, alt: 'Medical Facility - Kingman, Arizona' },
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
