import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

/**
 * SEO component for per-page meta tags
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.canonical - Canonical URL (optional — auto-derived from current route if omitted)
 * @param {string} props.image - OG image URL (optional)
 */
const SEO = ({
    title = 'Canyon State Enterprises',
    description = 'Arizona\'s trusted multi-trade construction company. Roofing, stucco, HVAC, plumbing, and more across the Southwest.',
    canonical,
    image = '/og-image.jpg'
}) => {
    const location = useLocation();
    const siteUrl = 'https://canyonstateaz.com';
    const resolvedCanonical = canonical || `${siteUrl}${location.pathname}`;

    const fullTitle = title === 'Canyon State Enterprises'
        ? 'Canyon State Enterprises | Multi-Trade Contractor AZ, NV, UT'
        : `${title} | Canyon State Enterprises`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={resolvedCanonical} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${siteUrl}${image}`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Canyon State Enterprises" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={resolvedCanonical} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${siteUrl}${image}`} />

            {/* Canonical — always exactly one, always correct for the current route */}
            <link rel="canonical" href={resolvedCanonical} />
        </Helmet>
    );
};

export default SEO;
