import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './PartnersSection.module.css';

// Partner logos
import arMays from '../../assets/Partners/AR Mays.webp';
import carlisle from '../../assets/Partners/Carlisle.webp';
import qxo from '../../assets/Partners/QXO.webp';
import rAndO from '../../assets/Partners/R and O.webp';
import lusardi from '../../assets/Partners/Lusardi.png';
import homeDepot from '../../assets/Partners/the-home-depot-1-logo-black-and-white.webp';
import certainteed from '../../assets/Partners/Certainteed.webp';
import eagleTile from '../../assets/Partners/Eagle tile.webp';
import eosFitness from '../../assets/Partners/EOS Fitness.webp';
import saladAndGo from '../../assets/Partners/Salad and go.webp';
import willmeng from '../../assets/Partners/Willmeng.png';
import kitchell from '../../assets/Partners/Kitchell.png';
import pathConstruction from '../../assets/Partners/Path Construction.png';
import canyonBuilding from '../../assets/Partners/Canyon Building.png';
import pacificap from '../../assets/Partners/Pacificap.jpg';
import overland from '../../assets/Partners/Overland.jpg';
import wadman from '../../assets/Partners/Wadman.jpg';
import opportunityVillage from '../../assets/Partners/Opportunity Village.jpg';

// Watermark logo
import iconDark from '../../assets/logos/icon-dark.png';

const partners = [
    { name: 'AR Mays', logo: arMays, url: 'https://www.armays.com/' },
    { name: 'Carlisle', logo: carlisle, url: 'https://www.carlisleconstructionmaterials.com/' },
    { name: 'Certainteed', logo: certainteed, url: 'https://www.certainteed.com/' },
    { name: 'Eagle Tile', logo: eagleTile, url: 'https://www.eagleroofing.com/' },
    { name: 'EOS Fitness', logo: eosFitness, url: 'https://www.eosfitness.com/' },
    { name: 'QXO', logo: qxo, url: 'https://www.qxo.com/' },
    { name: 'R and O', logo: rAndO, url: 'https://www.randoco.com/' },
    { name: 'Lusardi Construction', logo: lusardi, url: 'https://www.lusardi.com/' },
    { name: 'Home Depot', logo: homeDepot, url: 'https://www.homedepot.com/' },
    { name: 'Salad and Go', logo: saladAndGo, url: 'https://www.saladandgo.com/' },
    { name: 'Willmeng Construction', logo: willmeng, url: 'https://www.willmeng.com/' },
    { name: 'Kitchell', logo: kitchell, url: 'https://www.kitchell.com/' },
    { name: 'Path Construction', logo: pathConstruction, url: 'https://www.pathcc.com/' },
    { name: 'Canyon Building & Design', logo: canyonBuilding, url: 'https://www.canyonbd.com/' },
    { name: 'Pacificap Construction', logo: pacificap, url: 'https://www.pacificapconstruction.com/' },
    { name: 'Overland Construction', logo: overland, url: 'https://www.overlandconstruction.com/' },
    { name: 'Wadman Construction', logo: wadman, url: 'https://www.wadman.com/' },
    { name: 'Opportunity Village', logo: opportunityVillage, url: 'https://www.opportunityvillage.org/' },
];

const PartnersSection = () => {
    const { ref: headingRef, isVisible: headingVisible } = useScrollReveal({ threshold: 0.2 });

    return (
        <section className={styles.section}>
            {/* Watermark Logo */}
            <div className={styles.watermark}>
                <img src={iconDark} alt="" aria-hidden="true" />
            </div>

            <div className={styles.container}>
                {/* Left Content */}
                <div
                    ref={headingRef}
                    className={`${styles.heading} reveal ${headingVisible ? 'visible' : ''}`}
                >
                    <h2>We Are<br />Trusted by</h2>
                </div>

                {/* Auto-scrolling Partner Logos Carousel */}
                <div className={styles.carouselContainer}>
                    <div className={styles.carouselTrack}>
                        {/* First set of logos */}
                        {partners.map((partner, index) => (
                            <a
                                key={`first-${index}`}
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.logoItem}
                            >
                                <img src={partner.logo} alt={partner.name} loading="lazy" />
                            </a>
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {partners.map((partner, index) => (
                            <a
                                key={`second-${index}`}
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.logoItem}
                            >
                                <img src={partner.logo} alt={partner.name} loading="lazy" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
