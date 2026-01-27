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
];

const PartnersSection = () => {
    const { ref: headingRef, isVisible: headingVisible } = useScrollReveal({ threshold: 0.2 });
    const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.1 });

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

                {/* Partner Logos Grid */}
                <div
                    ref={gridRef}
                    className={`${styles.logosGrid} reveal-stagger ${gridVisible ? 'visible' : ''}`}
                >
                    {partners.map((partner, index) => (
                        <a
                            key={index}
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
        </section>
    );
};

export default PartnersSection;
