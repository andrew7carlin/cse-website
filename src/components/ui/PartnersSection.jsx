import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './PartnersSection.module.css';

// Trusted By - Client Partners
import arMays from '../../assets/Partners/AR Mays.webp';
import rAndO from '../../assets/Partners/R and O.webp';
import lusardi from '../../assets/Partners/Lusardi.webp';
import homeDepot from '../../assets/Partners/the-home-depot-1-logo-black-and-white.webp';
import eosFitness from '../../assets/Partners/EOS Fitness.webp';
import saladAndGo from '../../assets/Partners/Salad and go.webp';
import willmeng from '../../assets/Partners/Willmeng.webp';
import kitchell from '../../assets/Partners/Kitchell.webp';
import pathConstruction from '../../assets/Partners/Path Construction.webp';
import canyonBuilding from '../../assets/Partners/Canyon Building.webp';
import pacificap from '../../assets/Partners/Pacificap.webp';
import overland from '../../assets/Partners/Overland.webp';
import wadman from '../../assets/Partners/Wadman.webp';
import opportunityVillage from '../../assets/Partners/Opportunity Village.webp';

// Certified By - Industry Partners
import qxo from '../../assets/Partners/QXO.webp';
import carlisle from '../../assets/Partners/Carlisle.webp';
import certainteed from '../../assets/Partners/Certainteed.webp';
import eagleTile from '../../assets/Partners/Eagle tile.webp';
import firestone from '../../assets/Partners/Firestone-Building-Products.webp';
import gaf from '../../assets/Partners/GAF.webp';
import karnak from '../../assets/Partners/Karnak.webp';
import mbci from '../../assets/Partners/MBCI.webp';
import triAlliance from '../../assets/Partners/TRI-alliance.webp';
import taylorMetal from '../../assets/Partners/Taylor metal products.webp';
import carlisleSyntec from '../../assets/Partners/carlisle_syntec.webp';
import dryvit from '../../assets/Partners/dryvit.webp';
import eagleRoofing from '../../assets/Partners/eagle_roofing.webp';
import omega from '../../assets/Partners/omega.webp';
import petersen from '../../assets/Partners/petersen_aluminum_corporation_logo.webp';
import versico from '../../assets/Partners/versico-certified-contractor.webp';

// Watermark logo
import iconDark from '../../assets/logos/icon-dark.png';

// All partners combined from Partnerships page
const partners = [
    // Trusted By - Client Partners
    { name: 'EOS Fitness', logo: eosFitness, url: 'https://www.eosfitness.com/' },
    { name: 'Salad and Go', logo: saladAndGo, url: 'https://www.saladandgo.com/' },
    { name: 'Home Depot', logo: homeDepot, url: 'https://www.homedepot.com/' },
    { name: 'AR Mays', logo: arMays, url: 'https://www.armays.com/' },
    { name: 'R and O', logo: rAndO, url: 'https://www.randoconstruction.com/' },
    { name: 'Lusardi Construction', logo: lusardi, url: 'https://www.lusardi.com/' },
    { name: 'Willmeng Construction', logo: willmeng, url: 'https://www.willmeng.com/' },
    { name: 'Kitchell', logo: kitchell, url: 'https://www.kitchell.com/' },
    { name: 'Path Construction', logo: pathConstruction, url: 'https://www.pathcc.com/' },
    { name: 'Canyon Building & Design', logo: canyonBuilding, url: 'https://www.canyonbd.com/' },
    { name: 'Pacificap Construction', logo: pacificap, url: 'https://www.pacificapconstruction.com/' },
    { name: 'Overland Construction', logo: overland, url: 'https://www.overlandconstruction.com/' },
    { name: 'Wadman Construction', logo: wadman, url: 'https://www.wadman.com/' },
    { name: 'Opportunity Village', logo: opportunityVillage, url: 'https://www.opportunityvillage.org/' },
    // Certified By - Industry Partners
    { name: 'QXO', logo: qxo, url: 'https://www.qxo.com/' },
    { name: 'Carlisle', logo: carlisle, url: 'https://www.carlislesyntec.com/' },
    { name: 'Certainteed', logo: certainteed, url: 'https://www.certainteed.com/' },
    { name: 'Eagle Tile', logo: eagleTile, url: 'https://eagleroofing.com/' },
    { name: 'Firestone', logo: firestone, url: 'https://www.firestonebpco.com/' },
    { name: 'GAF', logo: gaf, url: 'https://www.gaf.com/' },
    { name: 'Karnak', logo: karnak, url: 'https://www.karnak.com/' },
    { name: 'MBCI', logo: mbci, url: 'https://www.mbci.com/' },
    { name: 'TRI Alliance', logo: triAlliance, url: 'https://www.tileroofing.org/' },
    { name: 'Taylor Metal Products', logo: taylorMetal, url: 'https://www.taylormetalproducts.com/' },
    { name: 'Carlisle Syntec', logo: carlisleSyntec, url: 'https://www.carlislesyntec.com/' },
    { name: 'Dryvit', logo: dryvit, url: 'https://www.dryvit.com/' },
    { name: 'Eagle Roofing', logo: eagleRoofing, url: 'https://eagleroofing.com/' },
    { name: 'Omega Flex', logo: omega, url: 'https://www.omegaflex.com/' },
    { name: 'Petersen Aluminum', logo: petersen, url: 'https://www.pac-clad.com/' },
    { name: 'Versico', logo: versico, url: 'https://www.versico.com/' },
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
