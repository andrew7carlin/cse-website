/**
 * GTM dataLayer helpers.
 *
 * With Google Tag Manager (container GTM-NDBJ277C) as the sole tag loader,
 * the dataLayer is the contract between the React app and any tags
 * configured inside GTM. We never call window.gtag directly — GTM owns
 * gtag, fires GA4, and pushes Google Ads conversions on its own triggers.
 *
 * For SPA route changes, RouteTracker in App.jsx calls trackPageView on
 * every history navigation. The initial pageview is handled by GTM's
 * built-in All Pages trigger; subsequent SPA navigations need a Custom
 * Event trigger named "page_view" inside GTM (one-time setup in the
 * GTM web UI) for the GA4 tag to fire on them.
 */

const push = (payload) => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
};

export const trackPageView = (path, title) => {
    push({
        event: 'page_view',
        page_path: path,
        page_title: title,
        page_location: typeof window !== 'undefined' ? window.location.href : undefined,
    });
};

export const trackEvent = (eventName, params = {}) => {
    push({ event: eventName, ...params });
};
