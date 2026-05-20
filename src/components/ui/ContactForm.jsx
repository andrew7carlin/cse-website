import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import { trackEvent } from '../common/analytics';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        city: '',
        state: 'AZ',
        closestOffice: '',
        projectType: 'Commercial',
        timeline: 'ASAP',
        message: '',
        website: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/.netlify/functions/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Push the dataLayer event BEFORE navigation so GTM has a
                // chance to capture form context (office, project_type) tied
                // to this conversion.
                trackEvent('form_submit', {
                    form_name: 'contact_quote',
                    office: formData.closestOffice,
                    project_type: formData.projectType
                });
                // Full-page navigation (not React Router) so GTM's PAGEVIEW
                // trigger for /thank-you fires reliably — this is what
                // activates the three Form Request conversion tags in the
                // GTM-NDBJ277C container.
                window.location.assign('/thank-you');
                return;
            }
            setSubmitStatus('error');
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={styles.section} id="contact">
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.infoCol}>
                        <h2 className="text-h2">Let's Talk.</h2>
                        <p className={styles.intro}>Ready to start your project? Tell us a bit about your needs and we'll connect you with the right team.</p>

                        <div className={styles.contactDetails}>
                            <div className={styles.detailItem}>
                                <h3>Headquarters</h3>
                                <p>2959 Rhoades Ave<br />Kingman, AZ 86409</p>
                            </div>
                            <div className={styles.detailItem}>
                                <h3>Phone</h3>
                                <p>(928) 757-9003</p>
                            </div>
                            <div className={styles.detailItem}>
                                <h3>Email</h3>
                                <p>office@canyonstateaz.com</p>
                            </div>
                        </div>
                    </div>

                    <form className={styles.formCol} onSubmit={handleSubmit}>
                        {/* Honeypot — hidden from real users; bots fill it and we silently drop the submission */}
                        <div className={styles.honeypot} aria-hidden="true">
                            <label htmlFor="cf-website">Website (leave blank)</label>
                            <input
                                type="text"
                                id="cf-website"
                                name="website"
                                tabIndex={-1}
                                autoComplete="off"
                                value={formData.website}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Success path: we redirect to /thank-you (full-page),
                            so no inline success state to render here. */}

                        {/* Error Message */}
                        {submitStatus === 'error' && (
                            <div className={styles.errorMessage}>
                                Something went wrong. Please try again or call us directly.
                            </div>
                        )}

                        {/* Closest Office - REQUIRED */}
                        <div className={styles.group}>
                            <label htmlFor="cf-closestOffice">Which office is closest to you? *</label>
                            <select
                                id="cf-closestOffice"
                                name="closestOffice"
                                value={formData.closestOffice}
                                onChange={handleChange}
                                required
                                className={styles.officeSelect}
                            >
                                <option value="">-- Please Select --</option>
                                <option value="kingman">Kingman, AZ (Headquarters)</option>
                                <option value="phoenix">Phoenix, AZ</option>
                                <option value="lasvegas">Las Vegas, NV</option>
                                <option value="unknown">I Don't Know</option>
                            </select>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label htmlFor="cf-name">Name *</label>
                                <input id="cf-name" type="text" name="name" required autoComplete="name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className={styles.group}>
                                <label htmlFor="cf-company">Company</label>
                                <input id="cf-company" type="text" name="company" autoComplete="organization" value={formData.company} onChange={handleChange} />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label htmlFor="cf-email">Email *</label>
                                <input id="cf-email" type="email" name="email" required autoComplete="email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className={styles.group}>
                                <label htmlFor="cf-phone">Phone *</label>
                                <input id="cf-phone" type="tel" name="phone" required autoComplete="tel" value={formData.phone} onChange={handleChange} />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label htmlFor="cf-city">City *</label>
                                <input id="cf-city" type="text" name="city" required autoComplete="address-level2" value={formData.city} onChange={handleChange} />
                            </div>
                            <div className={styles.group}>
                                <label htmlFor="cf-state">State *</label>
                                <select id="cf-state" name="state" value={formData.state} onChange={handleChange} autoComplete="address-level1">
                                    <option value="AZ">Arizona</option>
                                    <option value="NV">Nevada</option>
                                    <option value="UT">Utah</option>
                                    <option value="NM">New Mexico</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label htmlFor="cf-projectType">Project Type *</label>
                                <select id="cf-projectType" name="projectType" value={formData.projectType} onChange={handleChange}>
                                    <option>Commercial</option>
                                    <option>Residential</option>
                                    <option>Industrial</option>
                                </select>
                            </div>
                            <div className={styles.group}>
                                <label htmlFor="cf-timeline">Timeline</label>
                                <select id="cf-timeline" name="timeline" value={formData.timeline} onChange={handleChange}>
                                    <option>ASAP</option>
                                    <option>30-60 Days</option>
                                    <option>60-90 Days</option>
                                    <option>Planning Phase</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.group}>
                            <label htmlFor="cf-message">Message *</label>
                            <textarea id="cf-message" name="message" rows="4" required value={formData.message} onChange={handleChange}></textarea>
                        </div>

                        {/* Sets expectations for the lead — what happens next, response time,
                            and a fallback phone option if the user wants to skip the form. */}
                        <p className={styles.formMeta}>
                            A real human from the office closest to you will reply within one business day.
                            Need an answer sooner? Call <a href="tel:9287579003">(928) 757-9003</a>.
                        </p>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
