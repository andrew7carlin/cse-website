import React, { useState, useEffect, useMemo } from 'react';
import styles from './Partnerships.module.css';

// Partner logos
import arMays from '../assets/Partners/AR Mays.png';
import carlisle from '../assets/Partners/Carlisle.png';
import qxo from '../assets/Partners/QXO.png';
import rAndO from '../assets/Partners/R and O.png';
import saladAndGo from '../assets/Partners/Salad and go.png';
import homeDepot from '../assets/Partners/the-home-depot-1-logo-black-and-white.png';
import certainteed from '../assets/Partners/Certainteed.png';
import eagleTile from '../assets/Partners/Eagle tile.png';
import eosFitness from '../assets/Partners/EOS Fitness.png';

const partnerLogos = [
    { name: 'AR Mays', logo: arMays },
    { name: 'Carlisle', logo: carlisle },
    { name: 'Certainteed', logo: certainteed },
    { name: 'Eagle Tile', logo: eagleTile },
    { name: 'EOS Fitness', logo: eosFitness },
    { name: 'QXO', logo: qxo },
    { name: 'R and O', logo: rAndO },
    { name: 'Salad and Go', logo: saladAndGo },
    { name: 'Home Depot', logo: homeDepot },
];

const Partnerships = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ subject: '', message: '' });
    const [formStatus, setFormStatus] = useState('');
    const [logoOrder, setLogoOrder] = useState([...Array(partnerLogos.length).keys()]);

    // Shuffle logos every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setLogoOrder((prev) => {
                const shuffled = [...prev].sort(() => Math.random() - 0.5);
                return shuffled;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');

        try {
            // Send email via mailto (opens default email client)
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

                        {/* Right Side - Animated Partner Logos */}
                        <div className={styles.logosSection}>
                            <div className={styles.logosGrid}>
                                {logoOrder.map((orderIndex, visualIndex) => {
                                    const partner = partnerLogos[orderIndex];
                                    return (
                                        <div
                                            key={partner.name}
                                            className={styles.logoItem}
                                            style={{
                                                order: visualIndex,
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
