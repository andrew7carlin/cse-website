import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { trackEvent } from '../components/common/analytics';
import styles from './Careers.module.css';

const FIELD_ROLES = [
    'Roofing', 'Stucco & EIFS', 'HVAC', 'Plumbing',
    'Masonry', 'Specialty Metals', 'Fencing', 'Seamless Gutters',
    'Land Development', 'Concrete', 'Framing', 'Foreman / Crew Lead',
];

const OFFICE_ROLES = [
    'Project Manager', 'Estimator', 'Superintendent',
    'Safety Manager', 'Operations / Scheduling', 'Accounting / AP-AR',
    'HR / Recruiting', 'Business Development', 'Administrative Support',
];

const BENEFITS = [
    { title: 'Competitive Pay', desc: 'Compensation aligned with experience and trade, plus performance bonuses on qualifying projects.' },
    { title: 'Medical Insurance', desc: 'Health coverage for you and your family, available after a short waiting period.' },
    { title: 'Paid Time Off & Holidays', desc: 'Time to rest, time with family, time to take care of life outside of work.' },
    { title: 'Cross-Trade Training', desc: 'We self-perform 12 trades. Learn a second or third skill and earn more on the truck.' },
    { title: 'Steady Work, Year-Round', desc: '5 offices across 4 states means crews stay busy when one market slows down.' },
    { title: 'Safety You Can Feel', desc: 'EMR 0.75, top 15% nationally. We mean it when we say everyone goes home safe.' },
    { title: 'Real Career Paths', desc: 'Apprentice → journeyman → foreman → superintendent. Office-side, the ladder is just as real.' },
];

const Careers = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        track: 'Field & Trades',
        position: '',
        message: '',
        website: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Route career inquiries through the existing contact handler to HQ.
            const response = await fetch('/.netlify/functions/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    company: '',
                    email: formData.email,
                    phone: formData.phone,
                    city: '',
                    state: '',
                    closestOffice: 'kingman',
                    projectType: `Career Inquiry: ${formData.track}${formData.position ? ` (${formData.position})` : ''}`,
                    timeline: 'N/A',
                    message: formData.message || 'Interested in joining the team.',
                    website: formData.website,
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                trackEvent('form_submit', { form_name: 'careers', track: formData.track });
                setFormData({
                    name: '', email: '', phone: '',
                    track: 'Field & Trades', position: '', message: '', website: '',
                });
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.page}>
            <SEO
                title="Careers - Join Canyon State"
                description="Build a real career at Canyon State Enterprises. We run 12 self-performed trades across Arizona, Nevada, Utah, and Colorado. Hiring crews and office talent."
                canonical="https://canyonstateaz.com/careers"
            />

            {/* ── Hero ───────────────────────────────────────────────── */}
            <section className={styles.hero}>
                <div className={styles.heroContainer}>
                    <span className={styles.eyebrow}>Careers at Canyon State</span>
                    <h1 className={styles.heroTitle}>
                        Build a real career.<br />
                        <em>Not a punch list.</em>
                    </h1>
                    <p className={styles.heroSub}>
                        We run 12 self-performed trades across the Southwest. Roofing torches to roof
                        decks, project schedules to job sites. If you want to do good work for people
                        who care about doing it right, we want to hear from you.
                    </p>
                    <div className={styles.heroCtas}>
                        <a href="#apply" className={styles.btnPrimary}>Apply Now</a>
                        <a href="#paths" className={styles.btnSecondary}>See the Paths</a>
                    </div>
                </div>
            </section>

            {/* ── Stat Strip ─────────────────────────────────────────── */}
            <section className={styles.statsStrip} aria-label="Why work at Canyon State">
                <div className={styles.statsGrid}>
                    <div>
                        <div className={styles.statValue}>0.75</div>
                        <div className={styles.statLabel}>EMR · Top 15% Nationally</div>
                    </div>
                    <div>
                        <div className={styles.statValue}>12</div>
                        <div className={styles.statLabel}>Trades Self-Performed</div>
                    </div>
                    <div>
                        <div className={styles.statValue}>5</div>
                        <div className={styles.statLabel}>Offices · 4 States</div>
                    </div>
                    <div>
                        <div className={styles.statValue}>2001</div>
                        <div className={styles.statLabel}>Founded · 25 Years Building</div>
                    </div>
                </div>
            </section>

            {/* ── Two Paths ──────────────────────────────────────────── */}
            <section id="paths" className={styles.paths}>
                <div className={styles.pathsContainer}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Two Ways to Build a Career Here</h2>
                        <p className={styles.sectionSub}>
                            Whether your tools are a torch and a tape or a laptop and a spreadsheet,
                            there's a seat for you on the truck.
                        </p>
                    </div>

                    <div className={styles.pathsGrid}>
                        {/* Field & Trades */}
                        <div className={styles.pathCard}>
                            <span className={styles.pathBadge}>Field &amp; Trades</span>
                            <h3 className={styles.pathTitle}>If you can build it, we've got the work.</h3>
                            <p className={styles.pathBlurb}>
                                We hire across all 12 trades, from apprentices to journeymen to foremen.
                                Want to learn a second trade? We pay you to. Our crews don't ride pine
                                between projects.
                            </p>
                            <ul className={styles.pathList}>
                                {FIELD_ROLES.map(r => <li key={r}>{r}</li>)}
                            </ul>
                            <div className={styles.pathFooter}>
                                <a href="#apply" className={styles.btnPrimary}>Apply for Field Work</a>
                            </div>
                        </div>

                        {/* Office & Management */}
                        <div className={styles.pathCard}>
                            <span className={styles.pathBadge}>Office &amp; Management</span>
                            <h3 className={styles.pathTitle}>The people behind the trucks.</h3>
                            <p className={styles.pathBlurb}>
                                Estimators who know the difference between Carlisle and Versico.
                                PMs who can read a roof plan and run a P&amp;L. Safety folks who
                                stop work when it needs stopping. We're hiring.
                            </p>
                            <ul className={styles.pathList}>
                                {OFFICE_ROLES.map(r => <li key={r}>{r}</li>)}
                            </ul>
                            <div className={styles.pathFooter}>
                                <a href="#apply" className={styles.btnPrimary}>Apply for Office Work</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Benefits ───────────────────────────────────────────── */}
            <section className={styles.benefits}>
                <div className={styles.benefitsContainer}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>What You Get</h2>
                        <p className={styles.sectionSub}>
                            The stuff that lets you do this work for a career, not just a season.
                        </p>
                    </div>

                    <div className={styles.benefitsGrid}>
                        {BENEFITS.map(b => (
                            <div key={b.title} className={styles.benefitCard}>
                                <div className={styles.benefitTitle}>{b.title}</div>
                                <p className={styles.benefitDesc}>{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Apply ──────────────────────────────────────────────── */}
            <section id="apply" className={styles.apply}>
                <div className={styles.applyContainer}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Get In Touch</h2>
                        <p className={styles.sectionSub}>
                            Tell us a bit about you. We'll route your note to the right person and
                            be in touch within a few business days.
                        </p>
                    </div>

                    <form className={styles.applyForm} onSubmit={handleSubmit}>
                        {/* Honeypot — hidden from real users */}
                        <div className={styles.honeypot} aria-hidden="true">
                            <label htmlFor="cr-website">Website (leave blank)</label>
                            <input
                                type="text" id="cr-website" name="website"
                                tabIndex={-1} autoComplete="off"
                                value={formData.website} onChange={handleChange}
                            />
                        </div>

                        {submitStatus === 'success' && (
                            <div className={styles.successMessage}>
                                Thanks. We got it. Someone will be in touch soon.
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className={styles.errorMessage}>
                                Something went wrong. Please email us directly or try again.
                            </div>
                        )}

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="cr-name">Name *</label>
                                <input
                                    type="text" id="cr-name" name="name" required
                                    value={formData.name} onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="cr-phone">Phone *</label>
                                <input
                                    type="tel" id="cr-phone" name="phone" required
                                    value={formData.phone} onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="cr-email">Email *</label>
                                <input
                                    type="email" id="cr-email" name="email" required
                                    value={formData.email} onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="cr-track">Track *</label>
                                <select
                                    id="cr-track" name="track" required
                                    value={formData.track} onChange={handleChange}
                                >
                                    <option>Field &amp; Trades</option>
                                    <option>Office &amp; Management</option>
                                    <option>Not Sure / Open</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                            <label htmlFor="cr-position">Position of Interest (optional)</label>
                            <input
                                type="text" id="cr-position" name="position"
                                placeholder="e.g. Roofing foreman, project manager, estimator…"
                                value={formData.position} onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup} style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="cr-message">Tell us a bit about yourself</label>
                            <textarea
                                id="cr-message" name="message" rows="4"
                                placeholder="Trades you've worked, years of experience, where you're based…"
                                value={formData.message} onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                            {isSubmitting ? 'Sending…' : 'Send'}
                        </button>

                        <div className={styles.resumeNote}>
                            <strong>Have a resume?</strong> Email it to{' '}
                            <a href="mailto:office@canyonstateaz.com?subject=Career%20Inquiry%3A%20Resume">
                                office@canyonstateaz.com
                            </a>{' '}
                            with your name and the position you're interested in in the subject line.
                        </div>
                    </form>

                    <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>
                        Prefer to ask a question first?{' '}
                        <Link to="/contact" style={{ color: 'var(--color-copper)', fontWeight: 600 }}>
                            Reach out through our general contact form
                        </Link>.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Careers;
