import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CookieBanner.module.css';

/**
 * Cookie consent banner.
 *
 * Persists the user's choice in localStorage under `cookie_consent`
 * (values: 'accepted' | 'declined'). The same key is read by
 * `GoogleAnalytics.jsx` — GA only loads when consent === 'accepted'.
 *
 * Renders nothing if a choice has already been made.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !localStorage.getItem('cookie_consent');
  });

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={styles.banner}
      role="region"
      aria-label="Cookie consent"
    >
      <p className={styles.message}>
        We use cookies to understand site traffic and improve your experience.{' '}
        <Link
          to="/privacy"
          className={styles.link}
          aria-label="Read our privacy policy"
        >
          Privacy policy
        </Link>
        .
      </p>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={decline}
          className={`${styles.btn} ${styles.btnSecondary}`}
        >
          Decline
        </button>
        <button
          type="button"
          onClick={accept}
          className={`${styles.btn} ${styles.btnPrimary}`}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
