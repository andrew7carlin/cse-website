import { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
      background: '#0a0a0a', borderTop: '1px solid rgba(184,115,51,0.3)',
      padding: '1rem 2rem', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
    }}>
      <p style={{ margin: 0, fontSize: '0.875rem', color: '#d1d5db', maxWidth: '600px', lineHeight: 1.5 }}>
        We use cookies to analyze site traffic and improve your experience.{' '}
        <Link
          to="/privacy"
          aria-label="Learn more about our cookie and privacy policy"
          style={{ color: '#b87333', textDecoration: 'underline' }}
        >
          Read our privacy policy
        </Link>
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
        <button onClick={decline} style={{
          padding: '0.5rem 1.25rem', fontSize: '0.8125rem', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer',
          background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
          color: '#9ca3af', borderRadius: '2px'
        }}>
          Decline
        </button>
        <button onClick={accept} style={{
          padding: '0.5rem 1.25rem', fontSize: '0.8125rem', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer',
          background: '#b87333', border: '1px solid #b87333',
          color: '#fff', borderRadius: '2px'
        }}>
          Accept
        </button>
      </div>
    </div>
  );
}
