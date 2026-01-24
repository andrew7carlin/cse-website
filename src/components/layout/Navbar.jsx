import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

import logoWhite from '../../assets/logos/logo-white.png';

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
                    <div className={styles.navItem}>
                        <button className={styles.navLink}>Trades +</button>
                        <div className={styles.dropdown}>
                            <Link to="/services">All Services</Link>
                            <Link to="/services/roofing">Roofing</Link>
                            <Link to="/services/stucco">Stucco</Link>
                            <Link to="/services/hvac">HVAC</Link>
                            <Link to="/services/construction">Construction</Link>
                        </div>
                    </div>
                    <div className={styles.navItem}>
                        <button className={styles.navLink}>Portfolio +</button>
                        <div className={styles.dropdown}>
                            <Link to="/portfolio">All Projects</Link>
                            <Link to="/portfolio?cat=commercial">Commercial</Link>
                            <Link to="/portfolio?cat=residential">Residential</Link>
                        </div>
                    </div>
                    <Link to="/about" className={styles.navLink}>About</Link>
                    <Link to="/contact" className={styles.navLink}>Contact</Link>
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
                    <Link to="/contact" className={styles.mobileNavLink}>Contact</Link>
                    <Link to="/contact" className={styles.mobileCta}>Let's Talk</Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
