import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import styles from './ThankYou.module.css';

/**
 * Form-submission confirmation page.
 *
 * The contact form does a full-page navigation to /thank-you on success
 * (window.location.assign, not React Router) so that GTM's PAGEVIEW
 * trigger fires — the "Form Request" trigger in container GTM-NDBJ277C
 * watches for page_path starting with /thank-you, which in turn fires
 * the GA4 form_request event plus the two Google Ads conversion tags.
 *
 * Set `noindex` so this confirmation page never shows up in search.
 */
const ThankYou = () => {
    return (
        <main className={styles.page}>
            <SEO
                title="Thank You — We'll Be in Touch | Canyon State Enterprises"
                description="Thanks for reaching out to Canyon State Enterprises. A team member will respond within one business day."
                canonical="https://canyonstateaz.com/thank-you"
                noindex
            />
            <div className={styles.container}>
                <div className={styles.iconWrap} aria-hidden="true">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                <span className={styles.eyebrow}>Message Sent</span>
                <h1 className={styles.headline}>Thanks — we&rsquo;ll be in touch.</h1>
                <p className={styles.subline}>
                    A real human from the office closest to you will respond within one business day.
                    Need an answer sooner? Call{' '}
                    <a href="tel:9287579003" className={styles.phoneLink}>(928) 757-9003</a>.
                </p>

                <div className={styles.divider} aria-hidden="true" />

                <div className={styles.actions}>
                    <Link to="/" className={styles.btnPrimary}>Return Home</Link>
                    <Link to="/portfolio" className={styles.btnSecondary}>Browse Our Work</Link>
                </div>
            </div>
        </main>
    );
};

export default ThankYou;
