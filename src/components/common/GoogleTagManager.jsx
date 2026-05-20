import { useEffect } from 'react';

/**
 * Google Tag Manager loader.
 *
 * Container GTM-NDBJ277C is the single source of truth for all analytics
 * and advertising tags on the site:
 *   - GA4 (G-1JMQS8GK6G)
 *   - Google Ads conversion linker + remarketing
 *   - Phone-click, email-click, link-click, button-click GA4 events
 *   - Form-request conversions (GA4 + Google Ads + Kingman GAds)
 *
 * All tag/trigger/variable changes happen in the GTM web UI — this file
 * never needs to change unless we swap container IDs.
 *
 * Gated by the same `cookie_consent === 'accepted'` localStorage flag
 * that the previous direct gtag.js install used. Skipped in dev so we
 * don't pollute production analytics from localhost.
 */
const GTM_CONTAINER_ID = import.meta.env.VITE_GTM_ID || 'GTM-NDBJ277C';

const GoogleTagManager = () => {
    useEffect(() => {
        if (import.meta.env.DEV) return;
        if (localStorage.getItem('cookie_consent') !== 'accepted') return;
        // StrictMode mounts effects twice in dev; production is unaffected
        // but the guard is cheap and prevents double-injection if anything
        // ever re-renders the root.
        if (window.__gtmLoaded) return;
        window.__gtmLoaded = true;

        // Bootstrap dataLayer with the GTM start event. This is the
        // standard install snippet, just rewritten in modern JS so it
        // reads as code instead of as a minified one-liner.
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start': Date.now(),
            event: 'gtm.js',
        });

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
        document.head.appendChild(script);
    }, []);

    return null;
};

export default GoogleTagManager;
