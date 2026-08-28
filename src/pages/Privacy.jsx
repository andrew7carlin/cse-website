import SEO from '../components/common/SEO';
import styles from './Legal.module.css';

const Privacy = () => {
    return (
        <div className={styles.page}>
            <SEO
                title="Privacy Policy"
                description="Canyon State Enterprises privacy policy. Learn how we collect, use, and protect your information."
                canonical="https://canyonstateaz.com/privacy"
            />

            <section className={styles.hero}>
                <h1 className={`text-h1 ${styles.heroTitle}`}>Privacy Policy</h1>
                <p className={styles.updated}>Last updated: February 2, 2026</p>
            </section>

            <section className={styles.content}>
                <div>
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

                    {/* SMS carrier-registration disclosure. The carrier compliance
                        reviewer is an automated crawler that scans this page for
                        this exact language — do NOT paraphrase or reword it,
                        especially the middle paragraph. */}
                    <h2>Text Messaging and Mobile Information</h2>
                    <p>Canyon State may send text messages to customers and tenants who provide a mobile phone number. Messages relate to your account or tenancy, such as portal sign-in invitations, appointment and service updates, rent reminders, past-due notices, and maintenance status. We collect only the mobile number you provide and a record of your consent.</p>
                    <p>No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Information sharing to subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.</p>
                    <p>You may stop receiving messages at any time by replying STOP to any message, or reply HELP for assistance. Message frequency varies. Message and data rates may apply.</p>
                </div>
            </section>
        </div>
    );
};

export default Privacy;
