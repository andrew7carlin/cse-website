/**
 * Schema.org JSON-LD for LocalBusiness + WebSite.
 * Rendered as a plain <script type="application/ld+json">; React 19 hoists it
 * into the document <head> automatically.
 *
 * AGGREGATE RATING POLICY
 * -----------------------
 * `AGGREGATE_RATING` below is intentionally null. Google requires
 * AggregateRating to be sourced from an audit-able review system (Google
 * Business Profile, a reviews platform, etc.) and applies manual penalties
 * for self-supplied or fabricated ratings. Wire this in ONLY when:
 *   1. The values come from a verifiable source (e.g. exporting current
 *      counts from Google Business Profile or a reviews platform).
 *   2. The reviews are visible on-page somewhere so a human auditor can
 *      cross-check the schema against the rendered DOM.
 * Until both are true, leave it null — the schema will simply omit the
 * field and remain valid LocalBusiness markup.
 *
 * To turn it on, replace null with:
 *   { ratingValue: '4.9', reviewCount: 87 }
 *  (Numbers must be strings or numbers per Google's validator; reviewCount
 *  is the total individual reviews, not aggregated star buckets.)
 */
const AGGREGATE_RATING = null;

const SchemaMarkup = () => {
    // Build the org node first so aggregateRating can be conditionally added
    // without affecting the rest of the @graph.
    // Per the Aug 2026 SEO spec: HomeAndConstructionBusiness type, short brand
    // name, office@ email, AZ/NV/UT/CO service area, and real offices listed as
    // departments. Spec corrections applied: the @id stays #organization (every
    // page-level schema references it), asset URLs are this site's real files
    // (not the spec's wp-content paths), and only the three staffed offices
    // (Kingman HQ, Phoenix, Las Vegas) are departments — Bullhead City and Lake
    // Havasu City are service areas, not physical offices.
    const organization = {
        "@type": "HomeAndConstructionBusiness",
        "@id": "https://canyonstateaz.com/#organization",
        "name": "Canyon State",
        "url": "https://canyonstateaz.com",
        "logo": {
            "@type": "ImageObject",
            "url": "https://canyonstateaz.com/logo-full.png",
            "width": 300,
            "height": 60
        },
        "image": "https://canyonstateaz.com/og-image.jpg",
        "description": "Canyon State provides residential and commercial roofing, restoration, and construction services throughout Arizona, Nevada, Utah, and Colorado.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "2959 Rhoades Ave",
            "addressLocality": "Kingman",
            "addressRegion": "AZ",
            "postalCode": "86409",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 35.1894,
            "longitude": -114.0531
        },
        "telephone": "+1-928-757-9003",
        "email": "office@canyonstateaz.com",
        "priceRange": "$$",
        "openingHours": "Mo-Fr 08:00-17:00",
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "+1-928-757-9003",
                "contactType": "Customer Service",
                "areaServed": "Arizona",
                "availableLanguage": "English"
            },
            {
                "@type": "ContactPoint",
                "telephone": "+1-602-527-6050",
                "contactType": "Phoenix Office",
                "areaServed": "Phoenix Metro",
                "availableLanguage": "English"
            },
            {
                "@type": "ContactPoint",
                "telephone": "+1-702-659-2819",
                "contactType": "Nevada Office",
                "areaServed": "Nevada",
                "availableLanguage": "English"
            }
        ],
        "areaServed": [
            { "@type": "State", "name": "Arizona" },
            { "@type": "State", "name": "Nevada" },
            { "@type": "State", "name": "Utah" },
            { "@type": "State", "name": "Colorado" }
        ],
        "department": [
            {
                "@type": "HomeAndConstructionBusiness",
                "name": "Corporate Headquarters",
                "telephone": "+1-928-757-9003",
                "openingHours": "Mo-Fr 08:00-17:00",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "2959 Rhoades Ave",
                    "addressLocality": "Kingman",
                    "addressRegion": "AZ",
                    "postalCode": "86409",
                    "addressCountry": "US"
                }
            },
            {
                "@type": "HomeAndConstructionBusiness",
                "name": "Phoenix Metro Office",
                "telephone": "+1-602-527-6050",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Phoenix",
                    "addressRegion": "AZ",
                    "addressCountry": "US"
                }
            },
            {
                "@type": "HomeAndConstructionBusiness",
                "name": "Nevada Operations",
                "telephone": "+1-702-659-2819",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Las Vegas",
                    "addressRegion": "NV",
                    "addressCountry": "US"
                }
            }
        ],
        "serviceType": [
            "Roofing",
            "Stucco & EIFS",
            "General Contracting",
            "HVAC",
            "Plumbing",
            "Residential Construction",
            "Commercial Construction",
            "Specialty Metals",
            "Masonry",
            "Fencing",
            "Seamless Gutters",
            "Land Development"
        ],
        "foundingDate": "2001",
        "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "minValue": 50,
            "maxValue": 200
        },
        "slogan": "One Team. Multiple Trades. Zero Excuses.",
        "sameAs": [
            "https://www.facebook.com/canyonstateaz",
            "https://www.linkedin.com/company/canyon-state-enterprises"
        ]
    };

    // Only attach AggregateRating when real data is present. See policy
    // comment at top of file — fabricated ratings violate Google's
    // structured-data guidelines and trigger manual penalties.
    if (AGGREGATE_RATING && AGGREGATE_RATING.ratingValue && AGGREGATE_RATING.reviewCount) {
        organization.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": AGGREGATE_RATING.ratingValue,
            "reviewCount": AGGREGATE_RATING.reviewCount,
            "bestRating": "5",
            "worstRating": "1",
        };
    }

    const website = {
        "@type": "WebSite",
        "@id": "https://canyonstateaz.com/#website",
        "url": "https://canyonstateaz.com",
        "name": "Canyon State Enterprises",
        "publisher": {
            "@id": "https://canyonstateaz.com/#organization"
        }
    };

    const schema = {
        "@context": "https://schema.org",
        "@graph": [organization, website],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default SchemaMarkup;
