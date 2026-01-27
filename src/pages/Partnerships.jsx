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

// Trusted By - Client Partners
const trustedByPartners = [
    { name: 'EOS Fitness', logo: eosFitness },
    { name: 'Salad and Go', logo: saladAndGo },
    { name: 'Home Depot', logo: homeDepot },
    { name: 'AR Mays', logo: arMays },
    { name: 'R and O', logo: rAndO },
];

// Certified By - Industry Certifications/Partners
const certifiedByPartners = [
    { name: 'QXO', logo: qxo },
    { name: 'Carlisle', logo: carlisle },
    { name: 'Certainteed', logo: certainteed },
    { name: 'Eagle Tile', logo: eagleTile },
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
                                                <img src={partner.logo} alt={partner.name} />
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
                                                <img src={partner.logo} alt={partner.name} />
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
