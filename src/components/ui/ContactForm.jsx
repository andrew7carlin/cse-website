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
        service: [],
        projectType: 'Commercial',
        timeline: 'ASAP',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Fom submitted:', formData);
        alert('Thank you! We will be in touch shortly.');
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
                                <p>1234 Construction Way<br />Phoenix, AZ 85034</p>
                            </div>
                            <div className={styles.detailItem}>
                                <h4>Phone</h4>
                                <p>(602) 555-0123</p>
                            </div>
                            <div className={styles.detailItem}>
                                <h4>Email</h4>
                                <p>info@canyonstateaz.com</p>
                            </div>
                        </div>
                    </div>

                    <form className={styles.formCol} onSubmit={handleSubmit}>
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

                        <button type="submit" className={styles.submitBtn}>Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
