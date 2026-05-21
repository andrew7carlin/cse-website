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

export const posts = [
    {
        slug: 'building-bettys-village-north-opportunity-village',
        title: "Building Betty's Village North: 30 Buildings, 18 Months, and the Most Worthwhile Job We've Done This Year",
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
