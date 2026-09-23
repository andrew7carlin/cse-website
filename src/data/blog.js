/**
 * Blog/Insights post metadata.
 *
 * Each post:
 *   - slug          → URL at /blog/{slug}
 *   - title         → headline
 *   - excerpt       → 1-2 sentence preview (used on /blog index + meta description)
 *   - date          → ISO yyyy-mm-dd (sorted desc on the index)
 *   - author        → display name shown on the article
 *   - heroImage     → imported asset, used as the index card + article hero
 *   - heroImageAlt  → accessibility text for the hero
 *   - readingTime   → "5 min read" – informational, not auto-calculated
 *   - contentLoader → () => import('../content/blog/{slug}.jsx')
 *
 * The contentLoader pattern keeps post bodies out of the main bundle.
 * Each article ships as its own lazy chunk.
 *
 * To add a new post:
 *   1. Add a new entry to the `posts` array (newest first).
 *   2. Create the matching JSX file at src/content/blog/{slug}.jsx.
 *   3. The sitemap generator (scripts/generate-sitemap.mjs) auto-includes it
 *      on the next build.
 */

import heroBettysVillage from '../assets/portfolio/commercial/Bettys_Village_Cover_Las_Vegas_NV.webp';
import heroKingOfTheDesert from '../assets/blog/king-of-the-desert-classic/hero-1600.webp';

export const posts = [
    {
        slug: 'king-of-the-desert-classic',
        title: 'King of the Desert Classic: A Big Thank-You to Our Partners',
        // Client-supplied SEO title already carries the brand, so SEO.jsx
        // won't append the suffix a second time.
        seoTitle: 'King of the Desert Classic: Partner Appreciation | Canyon State',
        seoDescription:
            "We got together for golf at the King of the Desert Classic to thank our partners. Here's a look at the event and the people we're glad to work with.",
        excerpt:
            "We got together for golf at the King of the Desert Classic to thank our partners. Here's a look at the event and the people we're glad to work with.",
        // Publication date only — the article intentionally states no event date.
        date: '2026-09-18',
        author: 'Canyon State Enterprises',
        heroImage: heroKingOfTheDesert,
        heroImageAlt:
            'A large group poses on a golf green beside a pond, with trees and desert hills in the background.',
        readingTime: '2 min read',
        category: 'Partner Appreciation',
        contentLoader: () => import('../content/blog/king-of-the-desert-classic.jsx'),
        // Full photo set lives on /blog/{slug}/photos (see galleryRoutes below).
        gallery: {
            title: 'King of the Desert Classic Photos',
            subline: 'All {count} photos from the course — the group on the green, the carts, the tee boxes and the swings.',
            seoTitle: 'King of the Desert Classic Photos | Canyon State',
            seoDescription:
                'All 65 photos from the King of the Desert Classic, our partner-appreciation golf outing. A look at the people we are glad to work with.',
            count: 65,
            loader: () => import('../content/blog/king-of-the-desert-classic.gallery.js'),
        },
    },
    {
        slug: 'building-bettys-village-north-opportunity-village',
        title: "Building Betty's Village North: 30 Buildings, 18 Months, and the Most Worthwhile Job We've Done This Year",
        // Concise SEO title/description for <head> meta (the full headline +
        // excerpt above are too long for meta tags). seoTitle keeps the
        // brand suffix room (SEO.jsx appends " | Canyon State Enterprises").
        seoTitle: "Building Betty's Village North",
        seoDescription:
            "Canyon State is the roofing, stucco, and metals contractor on Opportunity Village's Betty's Village North in Las Vegas. The story behind the build.",
        excerpt:
            "We're the roofing, stucco, and metals contractor on the second phase of Opportunity Village's housing community for adults with disabilities. Here's the human story behind it, the construction problems we're solving, and why this one's gotten under our crews' skin.",
        date: '2026-05-21',
        author: 'Canyon State Enterprises',
        heroImage: heroBettysVillage,
        heroImageAlt:
            "Aerial view of Betty's Village North under construction in Las Vegas, with multiple residential buildings, the central clubhouse with its standing-seam waterfall roof, and the Opportunity Village campus taking shape.",
        readingTime: '6 min read',
        category: 'Project Spotlight',
        contentLoader: () => import('../content/blog/building-bettys-village-north-opportunity-village.jsx'),
    },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug) || null;

// Extra routes under a post (currently only photo galleries). Kept as a
// literal array so scripts/prerender.mjs and scripts/generate-sitemap.mjs
// can scrape it without importing this module.
export const galleryRoutes = [
    '/blog/king-of-the-desert-classic/photos',
];
