import React, { useState } from 'react';
import styles from './ContactForm.module.css';

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
        message: ''
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
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    company: '',
                    email: '',
                    phone: '',
                    city: '',
                    state: 'AZ',
                    closestOffice: '',
                    projectType: 'Commercial',
                    timeline: 'ASAP',
                    message: ''
                });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Submit error:', error);
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
                                <h4>Headquarters</h4>
                                <p>2959 Rhoades Ave<br />Kingman, AZ 86409</p>
                            </div>
                            <div className={styles.detailItem}>
                                <h4>Phone</h4>
                                <p>(928) 757-5380</p>
                            </div>
                            <div className={styles.detailItem}>
                                <h4>Email</h4>
                                <p>office@canyonstateaz.com</p>
                            </div>
                        </div>
                    </div>

                    <form className={styles.formCol} onSubmit={handleSubmit}>
                        {/* Success Message */}
                        {submitStatus === 'success' && (
                            <div className={styles.successMessage}>
                                <span>✓</span> Thank you! We'll be in touch shortly.
                            </div>
                        )}

                        {/* Error Message */}
                        {submitStatus === 'error' && (
                            <div className={styles.errorMessage}>
                                Something went wrong. Please try again or call us directly.
                            </div>
                        )}

                        {/* Closest Office - REQUIRED */}
                        <div className={styles.group}>
                            <label>Which office is closest to you? *</label>
                            <select
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
                            </select>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label>Name *</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                            </div>
                            <div className={styles.group}>
                                <label>Company</label>
                                <input type="text" name="company" value={formData.company} onChange={handleChange} />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label>Email *</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleChange} />
                            </div>
                            <div className={styles.group}>
                                <label>Phone *</label>
                                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label>City *</label>
                                <input type="text" name="city" required value={formData.city} onChange={handleChange} />
                            </div>
                            <div className={styles.group}>
                                <label>State *</label>
                                <select name="state" value={formData.state} onChange={handleChange}>
                                    <option value="AZ">Arizona</option>
                                    <option value="NV">Nevada</option>
                                    <option value="UT">Utah</option>
                                    <option value="NM">New Mexico</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label>Project Type *</label>
                                <select name="projectType" value={formData.projectType} onChange={handleChange}>
                                    <option>Commercial</option>
                                    <option>Residential</option>
                                    <option>Industrial</option>
                                </select>
                            </div>
                            <div className={styles.group}>
                                <label>Timeline</label>
                                <select name="timeline" value={formData.timeline} onChange={handleChange}>
                                    <option>ASAP</option>
                                    <option>30-60 Days</option>
                                    <option>60-90 Days</option>
                                    <option>Planning Phase</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.group}>
                            <label>Message *</label>
                            <textarea name="message" rows="4" required value={formData.message} onChange={handleChange}></textarea>
                        </div>

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
