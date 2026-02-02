import { useEffect } from 'react';

/**
 * Google Analytics 4 component
 * Add your GA4 Measurement ID to enable tracking
 * 
 * Usage: Add <GoogleAnalytics /> to your app root (main.jsx or App.jsx)
 */

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 Measurement ID

const GoogleAnalytics = () => {
    useEffect(() => {
        // Don't load analytics in development
        if (import.meta.env.DEV) {
            console.log('[GA4] Analytics disabled in development');
            return;
        }

        // Don't load if measurement ID is not set
        if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
            console.warn('[GA4] Please set your GA4 Measurement ID in GoogleAnalytics.jsx');
            return;
        }

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

/**
 * Track page views on route change
 * Call this in your route change handler or useEffect
 */
export const trackPageView = (path, title) => {
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
            page_path: path,
            page_title: title,
        });
    }
};

/**
 * Track custom events
 * @param {string} eventName - Name of the event
 * @param {object} params - Event parameters
 */
export const trackEvent = (eventName, params = {}) => {
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
    }
};

export default GoogleAnalytics;
