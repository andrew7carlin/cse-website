import React, { useState, useEffect, useMemo } from 'react';
import styles from './Partnerships.module.css';

// Partner logos - categorized
import arMays from '../assets/Partners/AR Mays.webp';
import carlisle from '../assets/Partners/Carlisle.webp';
import qxo from '../assets/Partners/QXO.webp';
import rAndO from '../assets/Partners/R and O.webp';
import saladAndGo from '../assets/Partners/Salad and go.webp';
import homeDepot from '../assets/Partners/the-home-depot-1-logo-black-and-white.webp';
import certainteed from '../assets/Partners/Certainteed.webp';
import eagleTile from '../assets/Partners/Eagle tile.webp';
import eosFitness from '../assets/Partners/EOS Fitness.webp';
import lusardi from '../assets/Partners/Lusardi.webp';
import willmeng from '../assets/Partners/Willmeng.webp';
import kitchell from '../assets/Partners/Kitchell.webp';
import pathConstruction from '../assets/Partners/Path Construction.webp';
import canyonBuilding from '../assets/Partners/Canyon Building.webp';
import pacificap from '../assets/Partners/Pacificap.webp';
import overland from '../assets/Partners/Overland.webp';
import wadman from '../assets/Partners/Wadman.webp';
import opportunityVillage from '../assets/Partners/Opportunity Village.webp';

// Certification partner logos
import firestone from '../assets/Partners/Firestone-Building-Products.webp';
import gaf from '../assets/Partners/GAF.webp';
import karnak from '../assets/Partners/Karnak.webp';
import mbci from '../assets/Partners/MBCI.webp';
import triAlliance from '../assets/Partners/TRI-alliance.webp';
import taylorMetal from '../assets/Partners/Taylor metal products.webp';
import carlisleSyntec from '../assets/Partners/carlisle_syntec.webp';
import dryvit from '../assets/Partners/dryvit.webp';
import eagleRoofing from '../assets/Partners/eagle_roofing.webp';
import omega from '../assets/Partners/omega.webp';
import petersenAluminum from '../assets/Partners/petersen_aluminum_corporation_logo.webp';
import versico from '../assets/Partners/versico-certified-contractor.webp';

// Trusted By - Client Partners with URLs
const trustedByPartners = [
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
];

// Certified By - Industry Certifications/Partners with URLs
const certifiedByPartners = [
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
    { name: 'Petersen Aluminum', logo: petersenAluminum, url: 'https://www.pac-clad.com/' },
    { name: 'Versico', logo: versico, url: 'https://www.versico.com/' },
];

const Partnerships = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ subject: '', message: '' });
    const [formStatus, setFormStatus] = useState('');
    const [visibleTrustedBy, setVisibleTrustedBy] = useState([]);
    const [visibleCertifiedBy, setVisibleCertifiedBy] = useState([]);
    const [showHeaders, setShowHeaders] = useState(false);

    // Random starting positions for each logo
    const trustedByAnimations = useMemo(() => {
        return trustedByPartners.map(() => {
            const edges = ['top', 'right', 'bottom', 'left'];
            const edge = edges[Math.floor(Math.random() * edges.length)];
            let startX = 0, startY = 0;

            switch (edge) {
                case 'top':
                    startX = Math.random() * 100 - 50;
                    startY = -150;
                    break;
                case 'right':
                    startX = 150;
                    startY = Math.random() * 100 - 50;
                    break;
                case 'bottom':
                    startX = Math.random() * 100 - 50;
                    startY = 150;
                    break;
                case 'left':
                    startX = -150;
                    startY = Math.random() * 100 - 50;
                    break;
            }
            return { startX, startY };
        });
    }, []);

    const certifiedByAnimations = useMemo(() => {
        return certifiedByPartners.map(() => {
            const edges = ['top', 'right', 'bottom', 'left'];
            const edge = edges[Math.floor(Math.random() * edges.length)];
            let startX = 0, startY = 0;

            switch (edge) {
                case 'top':
                    startX = Math.random() * 100 - 50;
                    startY = -150;
                    break;
                case 'right':
                    startX = 150;
                    startY = Math.random() * 100 - 50;
                    break;
                case 'bottom':
                    startX = Math.random() * 100 - 50;
                    startY = 150;
                    break;
                case 'left':
                    startX = -150;
                    startY = Math.random() * 100 - 50;
                    break;
            }
            return { startX, startY };
        });
    }, []);

    // Alternating logo fly-in effect - one from each column every 2 seconds
    useEffect(() => {
        const maxPairs = Math.max(trustedByPartners.length, certifiedByPartners.length);

        // Show first pair immediately
        const initialTimeout = setTimeout(() => {
            if (trustedByPartners.length > 0) setVisibleTrustedBy([0]);
            if (certifiedByPartners.length > 0) setVisibleCertifiedBy([0]);
        }, 500);

        // Show subsequent pairs every 2 seconds, alternating columns
        const timeouts = [];
        for (let i = 1; i < maxPairs; i++) {
            const delay = 500 + i * 2000;

            // Add to Trusted By if index exists
            if (i < trustedByPartners.length) {
                timeouts.push(setTimeout(() => {
                    setVisibleTrustedBy(prev => [...prev, i]);
                }, delay));
            }

            // Add to Certified By if index exists
            if (i < certifiedByPartners.length) {
                timeouts.push(setTimeout(() => {
                    setVisibleCertifiedBy(prev => [...prev, i]);
                }, delay));
            }
        }

        // Show headers after all animations
        const headerTimeout = setTimeout(() => {
            setShowHeaders(true);
        }, 500 + maxPairs * 2000 + 1000);

        return () => {
            clearTimeout(initialTimeout);
            clearTimeout(headerTimeout);
            timeouts.forEach(clearTimeout);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');

        try {
            const mailtoLink = `mailto:pat@canyonstateaz.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
            window.location.href = mailtoLink;
            setFormStatus('success');
            setFormData({ subject: '', message: '' });
            setTimeout(() => setFormStatus(''), 3000);
        } catch (error) {
            setFormStatus('error');
        }
    };

    return (
        <main className={styles.page}>
            {/* Main Content Section */}
            <section className={styles.heroSection}>
                <div className={styles.container}>
                    <div className={styles.contentGrid}>
                        {/* Left Side - Text Content */}
                        <div className={styles.textContent}>
                            <span className={styles.eyebrow}>Partnerships</span>
                            <h1 className={styles.heading}>Building Success Together</h1>

                            <div className={styles.description}>
                                <p>
                                    At Canyon State Enterprises, we understand that exceptional results are born from
                                    exceptional partnerships. Our collaborative approach with industry leaders,
                                    suppliers, and contractors enables us to deliver comprehensive solutions that
                                    exceed expectations.
                                </p>
                                <p>
                                    Strategic partnerships are the cornerstone of our success. By aligning with
                                    organizations that share our commitment to quality, integrity, and innovation,
                                    we create synergies that benefit every project we undertake. Whether you're a
                                    manufacturer, distributor, or fellow contractor, we believe in fostering
                                    relationships built on mutual respect and shared goals.
                                </p>
                                <p>
                                    Join our network of trusted partners and discover how collaboration drives
                                    superior outcomes. Together, we don't just complete projects—we build lasting
                                    legacies across the Southwest.
                                </p>
                            </div>

                            <button
                                className={styles.inquireBtn}
                                onClick={() => setShowForm(true)}
                            >
                                Inquire About a Partnership
                            </button>
                        </div>

                        {/* Right Side - Two Columns of Partner Logos */}
                        <div className={styles.logosSection}>
                            {/* Trusted By Column */}
                            <div className={styles.logoColumn}>
                                <div className={`${styles.columnHeader} ${showHeaders ? styles.headerVisible : ''}`}>
                                    <span>Trusted By</span>
                                </div>
                                <div className={styles.logosGrid}>
                                    {trustedByPartners.map((partner, index) => {
                                        const isVisible = visibleTrustedBy.includes(index);
                                        const anim = trustedByAnimations[index];

                                        return (
                                            <div
                                                key={partner.name}
                                                className={`${styles.logoItem} ${isVisible ? styles.logoVisible : ''}`}
                                                style={{
                                                    '--start-x': `${anim.startX}%`,
                                                    '--start-y': `${anim.startY}%`,
                                                }}
                                            >
                                                <a href={partner.url} target="_blank" rel="noopener noreferrer">
                                                    <img src={partner.logo} alt={partner.name} />
                                                </a>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Certified By Column */}
                            <div className={styles.logoColumn}>
                                <div className={`${styles.columnHeader} ${showHeaders ? styles.headerVisible : ''}`}>
                                    <span>Certified By</span>
                                </div>
                                <div className={styles.logosGrid}>
                                    {certifiedByPartners.map((partner, index) => {
                                        const isVisible = visibleCertifiedBy.includes(index);
                                        const anim = certifiedByAnimations[index];

                                        return (
                                            <div
                                                key={partner.name}
                                                className={`${styles.logoItem} ${isVisible ? styles.logoVisible : ''}`}
                                                style={{
                                                    '--start-x': `${anim.startX}%`,
                                                    '--start-y': `${anim.startY}%`,
                                                }}
                                            >
                                                <a href={partner.url} target="_blank" rel="noopener noreferrer">
                                                    <img src={partner.logo} alt={partner.name} />
                                                </a>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inquiry Form Modal */}
            {showForm && (
                <div className={styles.modalOverlay} onClick={() => setShowForm(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={() => setShowForm(false)}>
                            ×
                        </button>
                        <h2 className={styles.modalTitle}>Partnership Inquiry</h2>
                        <p className={styles.modalSubtitle}>
                            Tell us about your organization and how we can work together.
                        </p>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    placeholder="Partnership opportunity with..."
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Tell us about your organization and the partnership you have in mind..."
                                    rows={6}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={formStatus === 'sending'}
                            >
                                {formStatus === 'sending' ? 'Opening Email...' : 'Send Message'}
                            </button>

                            {formStatus === 'success' && (
                                <p className={styles.successMsg}>Your email client should open shortly.</p>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Partnerships;
