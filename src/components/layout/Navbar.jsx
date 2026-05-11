import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

import logoWhite from '../../assets/logos/logo-white.png';
import cactusImg from '../../assets/logos/cactus.png';

const TRADES = [
    { label: 'Roofing',                  path: '/services/roofing' },
    { label: 'Stucco & EIFS',            path: '/services/stucco' },
    { label: 'General Contracting',      path: '/services/general-contracting' },
    { label: 'HVAC',                     path: '/services/hvac' },
    { label: 'Plumbing',                 path: '/services/plumbing' },
    { label: 'Residential Construction', path: '/services/res-const' },
    { label: 'Commercial Construction',  path: '/services/com-const' },
    { label: 'Specialty Metals',         path: '/services/metals' },
    { label: 'Masonry',                  path: '/services/masonry' },
    { label: 'Fencing',                  path: '/services/fencing' },
    { label: 'Seamless Gutters',         path: '/services/gutters' },
    { label: 'Land Development',         path: '/services/land-dev' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileTradesOpen, setIsMobileTradesOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change.
    // React docs endorse useEffect for "resetting state when a prop changes"; the
    // alternative (keying the Navbar on pathname) would remount and drop scroll state.
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
                    <Link to="/" className={styles.navLink} data-cursor="link">
                        <span className={styles.navLinkText}>Home</span>
                        <img src={cactusImg} alt="" className={styles.cactusDecor} />
                    </Link>
                    <div className={styles.navItem}>
                        <Link to="/services" className={styles.navLink} data-cursor="link">
                            <span className={styles.navLinkText}>Trades</span>
                            <img src={cactusImg} alt="" className={styles.cactusDecor} />
                        </Link>
                        <div className={styles.dropdown}>
                            <div className={styles.dropdownHeader}>Our Trades</div>
                            <div className={styles.dropdownGrid}>
                                {TRADES.map(t => (
                                    <Link key={t.path} to={t.path} className={styles.dropdownLink}>
                                        <span className={styles.dropdownDot} />{t.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Link to="/portfolio" className={styles.navLink} data-cursor="link">
                        <span className={styles.navLinkText}>Portfolio</span>
                        <img src={cactusImg} alt="" className={styles.cactusDecor} />
                    </Link>
                    <Link to="/about" className={styles.navLink} data-cursor="link">
                        <span className={styles.navLinkText}>About</span>
                        <img src={cactusImg} alt="" className={styles.cactusDecor} />
                    </Link>
                    <div className={styles.navItem}>
                        <Link to="/where" className={styles.navLink} data-cursor="link">
                            <span className={styles.navLinkText}>Where</span>
                            <img src={cactusImg} alt="" className={styles.cactusDecor} />
                        </Link>
                        <div className={styles.dropdown}>
                            <div className={styles.dropdownHeader}>Coverage Areas</div>
                            <div className={styles.dropdownGrid}>
                                <Link to="/where#arizona" className={styles.dropdownLink}><span className={styles.dropdownDot} />Arizona — Full Coverage</Link>
                                <Link to="/where#nevada" className={styles.dropdownLink}><span className={styles.dropdownDot} />Nevada — Full Coverage</Link>
                                <Link to="/where#utah" className={styles.dropdownLink}><span className={styles.dropdownDot} />Utah — Active Projects</Link>
                                <Link to="/where#colorado" className={styles.dropdownLink}><span className={styles.dropdownDot} />Colorado — Expanding</Link>
                            </div>
                            <div className={styles.dropdownHeader} style={{ marginTop: '0.75rem' }}>Our Offices</div>
                            <div className={styles.dropdownGrid}>
                                <Link to="/locations/kingman-az" className={styles.dropdownLink}><span className={styles.dropdownDot} />Kingman, AZ — HQ</Link>
                                <Link to="/locations/phoenix-az" className={styles.dropdownLink}><span className={styles.dropdownDot} />Phoenix, AZ</Link>
                                <Link to="/locations/bullhead-city-az" className={styles.dropdownLink}><span className={styles.dropdownDot} />Bullhead City, AZ</Link>
                                <Link to="/locations/las-vegas-nv" className={styles.dropdownLink}><span className={styles.dropdownDot} />Las Vegas, NV</Link>
                                <Link to="/locations/lake-havasu-city-az" className={styles.dropdownLink}><span className={styles.dropdownDot} />Lake Havasu City, AZ</Link>
                            </div>
                        </div>
                    </div>
                    <Link to="/partnerships" className={styles.navLink} data-cursor="link">
                        <span className={styles.navLinkText}>Partnerships</span>
                        <img src={cactusImg} alt="" className={styles.cactusDecor} />
                    </Link>
                    <Link to="/contact" className={styles.navLink} data-cursor="link">
                        <span className={styles.navLinkText}>Contact</span>
                        <img src={cactusImg} alt="" className={styles.cactusDecor} />
                    </Link>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <nav className={styles.mobileNav}>
                    <Link to="/" className={styles.mobileNavLink}>Home</Link>
                    <div className={styles.mobileTradesGroup}>
                        <button
                            className={styles.mobileNavLink}
                            onClick={() => setIsMobileTradesOpen(o => !o)}
                            aria-expanded={isMobileTradesOpen}
                        >
                            Trades <span className={styles.mobileTradesChevron}>{isMobileTradesOpen ? '▲' : '▼'}</span>
                        </button>
                        {isMobileTradesOpen && (
                            <div className={styles.mobileTradesList}>
                                {TRADES.map(t => (
                                    <Link key={t.path} to={t.path} className={styles.mobileTradeLink}>{t.label}</Link>
                                ))}
                            </div>
                        )}
                    </div>
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
