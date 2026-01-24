import styles from './PartnersSection.module.css';

// Partner logos
import arMays from '../../assets/Partners/AR Mays.png';
import carlisle from '../../assets/Partners/Carlisle.png';
import qxo from '../../assets/Partners/QXO.png';
import rAndO from '../../assets/Partners/R and O.png';
import saladAndGo from '../../assets/Partners/Salad and go.png';
import homeDepot from '../../assets/Partners/the-home-depot-1-logo-black-and-white.png';

// Watermark logo
import iconDark from '../../assets/logos/icon-dark.png';

const partners = [
    { name: 'AR Mays', logo: arMays },
    { name: 'Carlisle', logo: carlisle },
    { name: 'QXO', logo: qxo },
    { name: 'R and O', logo: rAndO },
    { name: 'Salad and Go', logo: saladAndGo },
    { name: 'Home Depot', logo: homeDepot },
];

const PartnersSection = () => {
    return (
        <section className={styles.section}>
            {/* Watermark Logo */}
            <div className={styles.watermark}>
                <img src={iconDark} alt="" aria-hidden="true" />
            </div>

            <div className={styles.container}>
                {/* Left Content */}
                <div className={styles.heading}>
                    <h2>We Are<br />Trusted by</h2>
                </div>

                {/* Partner Logos Grid */}
                <div className={styles.logosGrid}>
                    {partners.map((partner, index) => (
                        <div key={index} className={styles.logoItem}>
                            <img src={partner.logo} alt={partner.name} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
