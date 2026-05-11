/**
 * GA4 helpers — separated from the component file so fast-refresh stays clean.
 * The <GoogleAnalytics /> component is responsible for installing window.gtag.
 */

export const trackPageView = (path, title) => {
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
            page_path: path,
            page_title: title,
        });
    }
};

export const trackEvent = (eventName, params = {}) => {
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
    }
};
