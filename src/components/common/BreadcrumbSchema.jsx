import { useLocation } from 'react-router-dom';
import { getLocation } from '../../data/locations';
import { allProjects } from '../../data/projects';
import { getPost } from '../../data/blog';

/**
 * Site-wide BreadcrumbList JSON-LD.
 *
 * Mounts inside Layout so every route ships a breadcrumb derived from the
 * current pathname. Returns null on the home page (a single-item breadcrumb
 * has no SEO value) and on /thank-you (noindex page — schema would just be
 * dead weight).
 *
 * Display labels come from three sources:
 *   1. STATIC_LABELS — fixed display names for known path segments
 *      (e.g. "about" → "About Us", "where" → "Where We Work").
 *   2. TRADE_LABELS — pretty names for the per-trade slugs under /services.
 *   3. Data-file lookups — project IDs, location IDs, and blog slugs are
 *      resolved against locations.js / projects.js / blog.js so the
 *      breadcrumb mirrors the actual page <h1>.
 *
 * Each item URL is absolute (https://canyonstateaz.com/...) because Google's
 * structured-data requirements treat relative URLs as malformed.
 */

const SITE = 'https://canyonstateaz.com';

// Display labels for static path segments. Maps the URL slug to what the
// breadcrumb (and Google's SERP rich result) should show.
const STATIC_LABELS = {
    about:        'About Us',
    services:     'Trades & Services',
    portfolio:    'Portfolio',
    commercial:   'Commercial Portfolio',
    residential:  'Residential Portfolio',
    where:        'Where We Work',
    locations:    'Where We Work',
    partnerships: 'Partnerships',
    faq:          'FAQ',
    contact:      'Contact',
    careers:      'Careers',
    privacy:      'Privacy Policy',
    terms:        'Terms of Service',
    blog:         'Blog',
};

// Pretty names for the per-trade routes. Mirrors tradeData in TradeDetail.jsx
// — keep these in sync if a new trade is added.
const TRADE_LABELS = {
    'roofing':            'Roofing',
    'stucco':             'Stucco & EIFS',
    'general-contracting':'General Contracting',
    'hvac':               'HVAC',
    'plumbing':           'Plumbing',
    'res-const':          'Residential Construction',
    'com-const':          'Commercial Construction',
    'metals':             'Specialty Metals',
    'masonry':            'Masonry',
    'fencing':            'Fencing',
    'gutters':            'Seamless Gutters',
    'land-dev':           'Land Development',
};

/**
 * Map /locations/:id to a parent of /where so the breadcrumb reads
 * Home > Where We Work > [City, ST]. Without this, the literal
 * /locations segment would surface (and /locations is not a real page).
 */
const PARENT_OVERRIDES = {
    locations: { label: 'Where We Work', href: '/where' },
};

/**
 * Resolve a path segment to its display label. Handles the dynamic
 * segments — trade IDs, project IDs, location IDs, blog slugs — by
 * looking them up in the data files. Falls back to a humanized version
 * of the slug if no match is found (typo guard).
 */
function labelForSegment(segment, parentSegment) {
    // /services/:tradeId
    if (parentSegment === 'services' && TRADE_LABELS[segment]) {
        return TRADE_LABELS[segment];
    }
    // /locations/:locationId
    if (parentSegment === 'locations') {
        const loc = getLocation(segment);
        if (loc) return `${loc.city}, ${loc.abbrev}`;
    }
    // /blog/:slug
    if (parentSegment === 'blog') {
        const post = getPost(segment);
        if (post) return post.title;
    }
    // /portfolio/:projectId — note that /portfolio/commercial and
    // /portfolio/residential are handled by STATIC_LABELS above.
    if (parentSegment === 'portfolio') {
        const project = allProjects.find((p) => p.id === segment);
        if (project) return project.name;
    }
    // Fallback: humanize the slug (kebab → Title Case)
    return segment
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

const BreadcrumbSchema = () => {
    const { pathname } = useLocation();

    // Strip trailing slash + split. Empty string → home page.
    const cleanPath = pathname.replace(/\/+$/, '');
    if (cleanPath === '' || cleanPath === '/') return null;

    // /thank-you is noindex — emitting breadcrumb there is wasted work.
    if (cleanPath === '/thank-you') return null;

    const segments = cleanPath.split('/').filter(Boolean);

    // Build the trail starting with Home.
    const items = [{ name: 'Home', url: `${SITE}/` }];

    let runningPath = '';
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const parent  = i > 0 ? segments[i - 1] : null;

        // If this segment has a parent override (e.g. /locations/:id should
        // breadcrumb under /where instead of /locations), inject the parent
        // crumb before continuing.
        const override = PARENT_OVERRIDES[segment];
        if (override && i === 0) {
            items.push({ name: override.label, url: `${SITE}${override.href}` });
            // Then skip emitting the literal /locations crumb — fall through
            // to the next segment after recording the running path correctly.
            runningPath += `/${segment}`;
            continue;
        }

        runningPath += `/${segment}`;
        const name = STATIC_LABELS[segment] || labelForSegment(segment, parent);
        items.push({ name, url: `${SITE}${runningPath}` });
    }

    const schema = {
        '@context': 'https://schema.org',
        '@type':    'BreadcrumbList',
        itemListElement: items.map((item, idx) => ({
            '@type':    'ListItem',
            position:   idx + 1,
            name:       item.name,
            item:       item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default BreadcrumbSchema;
