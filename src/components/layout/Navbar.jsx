import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

import logoWhite from '../../assets/logos/logo-white.png';
import cactusImg from '../../assets/logos/cactus.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navClass = `${styles.navbar} ${isScrolled || !isHome ? styles.scrolled : ''}`;

    return (
        <header className={navClass}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    <img
                        src={logoWhite}
                        alt="Canyon State"
                        style={{ height: '50px', width: 'auto', maxWidth: '180px', objectFit: 'contain' }}
                    />
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>

                {/* Desktop Nav */}
                <nav className={styles.navLinks}>
                    <Link to="/services" className={styles.navLink}>
                        <span className={styles.navLinkText}>Trades</span>
                        <img src={cactusImg} alt="" className={styles.cactusDecor} />
                    </Link>
                    <Link to="/portfolio" className={styles.navLink}>
                        <span className={styles.navLinkText}>Portfolio</span>
                        <img src={cactusImg} alt="" className={styles.cactusDecor} />
                    </Link>
                    <Link to="/about" className={styles.navLink}>
                        <span className={styles.navLinkText}>About</span>
                        <img src={cactusImg} alt="" className={styles.cactusDecor} />
                    </Link>
                    <Link to="/where" className={styles.navLink}>
                        <span className={styles.navLinkText}>Where</span>
                        <img src={cactusImg} alt="" className={styles.cactusDecor} />
                    </Link>
                    <Link to="/partnerships" className={styles.navLink}>
                        <span className={styles.navLinkText}>Partnerships</span>
                        <img src={cactusImg} alt="" className={styles.cactusDecor} />
                    </Link>
                    <Link to="/contact" className={styles.navLink}>
                        <span className={styles.navLinkText}>Contact</span>
                        <img src={cactusImg} alt="" className={styles.cactusDecor} />
                    </Link>
                </nav>

                <div className={styles.actions}>
                    <Link to="/contact" className="btn-primary">Let's Talk</Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <nav className={styles.mobileNav}>
                    <Link to="/services" className={styles.mobileNavLink}>Services</Link>
                    <Link to="/portfolio" className={styles.mobileNavLink}>Portfolio</Link>
                    <Link to="/about" className={styles.mobileNavLink}>About</Link>
                    <Link to="/where" className={styles.mobileNavLink}>Where</Link>
                    <Link to="/partnerships" className={styles.mobileNavLink}>Partnerships</Link>
                    <Link to="/contact" className={styles.mobileNavLink}>Contact</Link>
                    <Link to="/contact" className={styles.mobileCta}>Let's Talk</Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
