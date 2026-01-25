import { Link } from 'react-router-dom';
import logoTan from '../../assets/logos/logo-tan.png';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand Column */}
                    <div className={styles.logoCol}>
                        <img src={logoTan} alt="Canyon State Enterprises" className={styles.logo} />
                        <p className={styles.tagline}>
                            Building the future of the west coast with extensive experience across commercial, residential, and industrial sectors.
                        </p>
                    </div>

                    {/* Links Column */}
                    <div>
                        <span className={styles.colTitle}>Company</span>
                        <div className={styles.linksList}>
                            <Link to="/about" className={styles.link}>About Us</Link>
                            <Link to="/services" className={styles.link}>Our Services</Link>
                            <Link to="/portfolio" className={styles.link}>Portfolio</Link>
                            <Link to="/contact" className={styles.link}>Contact</Link>
                        </div>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <span className={styles.colTitle}>Get in Touch</span>
                        <div className={styles.contactInfo}>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>Address</span>
                                <span className={styles.contactValue}>2959 Rhoades Ave<br />Kingman, AZ 86409</span>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>Phone</span>
                                <div className={styles.phoneRow}>
                                    <span className={styles.phoneLocation}>Main</span>
                                    <a href="tel:9287579003" className={styles.contactValue}>(928) 757-9003</a>
                                </div>
                                <div className={styles.phoneRow}>
                                    <span className={styles.phoneLocation}>Nevada</span>
                                    <a href="tel:7026592819" className={styles.contactValue}>(702) 659-2819</a>
                                </div>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>Email</span>
                                <a href="mailto:office@canyonstateaz.com" className={styles.contactValue}>office@canyonstateaz.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottom}>
                    <span>&copy; {new Date().getFullYear()} Canyon State Enterprises. All rights reserved.</span>
                    <span>ROC #353683 | Bonded & Insured</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
