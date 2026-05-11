import { useEffect } from 'react';

/**
 * Google Analytics 4 — only loads in production, after the user accepts cookies.
 * The Measurement ID is public (it's embedded in the gtag.js URL on every page),
 * so committing it is fine. VITE_GA_ID can still override in CI / staging.
 */
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID || 'G-1JMQS8GK6G';

const GoogleAnalytics = () => {
    useEffect(() => {
        if (import.meta.env.DEV) return;
        if (localStorage.getItem('cookie_consent') !== 'accepted') return;

        // Load gtag.js script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, {
            page_title: document.title,
            page_location: window.location.href,
        });

        return () => {
            // Cleanup script on unmount (unlikely to happen)
            document.head.removeChild(script);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default GoogleAnalytics;
