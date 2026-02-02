import SEO from '../components/common/SEO';
import styles from './About.module.css';

const Terms = () => {
    return (
        <div className={styles.page}>
            <SEO
                title="Terms of Service"
                description="Canyon State Enterprises terms of service. Terms and conditions for using our website and services."
                canonical="https://canyonstateaz.com/terms"
            />

            <section className={styles.hero} style={{ minHeight: '40vh' }}>
                <div className={styles.heroContent}>
                    <h1 className="text-h1">Terms of Service</h1>
                    <p className={styles.subtitle}>Last updated: February 2, 2026</p>
                </div>
            </section>

            <section className={styles.content} style={{ padding: 'var(--spacing-3xl) var(--spacing-lg)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2>Agreement to Terms</h2>
                    <p>By accessing and using the Canyon State Enterprises website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

                    <h2>Use of Website</h2>
                    <p>This website is provided for informational purposes about Canyon State Enterprises and our construction services. You may use this site to:</p>
                    <ul>
                        <li>Learn about our services and capabilities</li>
                        <li>View our portfolio of completed projects</li>
                        <li>Contact us regarding potential projects</li>
                        <li>Find our office locations and contact information</li>
                    </ul>

                    <h2>Intellectual Property</h2>
                    <p>All content on this website, including text, images, logos, and design elements, is the property of Canyon State Enterprises and is protected by copyright laws. You may not reproduce, distribute, or use any content without written permission.</p>

                    <h2>Project Estimates</h2>
                    <p>Any estimates or quotes provided through this website or subsequent communications are preliminary and subject to change based on detailed project assessment. Final pricing will be provided in a formal written proposal.</p>

                    <h2>Limitation of Liability</h2>
                    <p>Canyon State Enterprises makes no warranties about the accuracy or completeness of the information on this website. We shall not be liable for any damages arising from the use of this website.</p>

                    <h2>Governing Law</h2>
                    <p>These terms shall be governed by the laws of the State of Arizona. Any disputes shall be resolved in the courts of Mohave County, Arizona.</p>

                    <h2>Changes to Terms</h2>
                    <p>We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date.</p>

                    <h2>Contact</h2>
                    <p>For questions about these terms, contact us:</p>
                    <p>
                        <strong>Canyon State Enterprises</strong><br />
                        2959 Rhoades Ave<br />
                        Kingman, AZ 86409<br />
                        Phone: (928) 757-9003<br />
                        Email: office@canyonstateaz.com
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Terms;
