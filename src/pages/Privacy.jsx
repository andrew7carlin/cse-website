import SEO from '../components/common/SEO';
import styles from './About.module.css';

const Privacy = () => {
    return (
        <div className={styles.page}>
            <SEO
                title="Privacy Policy"
                description="Canyon State Enterprises privacy policy. Learn how we collect, use, and protect your information."
                canonical="https://canyonstateaz.com/privacy"
            />

            <section className={styles.hero} style={{ minHeight: '40vh' }}>
                <div className={styles.heroContent}>
                    <h1 className="text-h1">Privacy Policy</h1>
                    <p className={styles.subtitle}>Last updated: February 2, 2026</p>
                </div>
            </section>

            <section className={styles.content} style={{ padding: 'var(--spacing-3xl) var(--spacing-lg)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2>Information We Collect</h2>
                    <p>When you use our contact form, we collect the following information:</p>
                    <ul>
                        <li>Name and company name</li>
                        <li>Email address and phone number</li>
                        <li>City and state</li>
                        <li>Project details and timeline</li>
                    </ul>

                    <h2>How We Use Your Information</h2>
                    <p>We use the information you provide to:</p>
                    <ul>
                        <li>Respond to your inquiries and project requests</li>
                        <li>Connect you with the appropriate office location</li>
                        <li>Provide estimates and project information</li>
                        <li>Communicate about your projects</li>
                    </ul>

                    <h2>Information Sharing</h2>
                    <p>We do not sell, trade, or otherwise transfer your personal information to outside parties. Your information may be shared internally between our Kingman, Phoenix, and Las Vegas offices to best serve your needs.</p>

                    <h2>Data Security</h2>
                    <p>We implement appropriate security measures to protect your personal information. All form submissions are transmitted securely and stored with industry-standard protections.</p>

                    <h2>Cookies</h2>
                    <p>Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings.</p>

                    <h2>Third-Party Services</h2>
                    <p>We use the following third-party services:</p>
                    <ul>
                        <li><strong>Resend</strong> - For email delivery</li>
                        <li><strong>Netlify</strong> - For website hosting</li>
                        <li><strong>Google Analytics</strong> - For website analytics (when enabled)</li>
                    </ul>

                    <h2>Contact Us</h2>
                    <p>If you have questions about this privacy policy, please contact us:</p>
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

export default Privacy;
