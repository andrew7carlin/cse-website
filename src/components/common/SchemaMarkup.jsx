/**
 * Schema.org JSON-LD for LocalBusiness + WebSite.
 * Rendered as a plain <script type="application/ld+json">; React 19 hoists it
 * into the document <head> automatically.
 */
const SchemaMarkup = () => {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "GeneralContractor",
                "@id": "https://canyonstateaz.com/#organization",
                "name": "Canyon State Enterprises",
                "url": "https://canyonstateaz.com",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://canyonstateaz.com/logo-full.png",
                    "width": 300,
                    "height": 60
                },
                "image": "https://canyonstateaz.com/og-image.jpg",
                "description": "Arizona's trusted multi-trade construction company. Roofing, stucco, HVAC, plumbing, and more across the Southwest.",
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
                "email": "info@canyonstateaz.com",
                "priceRange": "$$-$$$",
                "contactPoint": [
                    {
                        "@type": "ContactPoint",
                        "telephone": "+1-928-757-9003",
                        "contactType": "customer service",
                        "areaServed": ["AZ", "UT", "NM"],
                        "availableLanguage": "English"
                    },
                    {
                        "@type": "ContactPoint",
                        "telephone": "+1-602-527-6050",
                        "contactType": "customer service",
                        "areaServed": "Phoenix Metro",
                        "availableLanguage": "English"
                    },
                    {
                        "@type": "ContactPoint",
                        "telephone": "+1-702-659-2819",
                        "contactType": "customer service",
                        "areaServed": "NV",
                        "availableLanguage": "English"
                    }
                ],
                "areaServed": [
                    { "@type": "State", "name": "Arizona" },
                    { "@type": "State", "name": "Nevada" },
                    { "@type": "State", "name": "Utah" },
                    { "@type": "State", "name": "New Mexico" }
                ],
                "serviceType": [
                    "Roofing",
                    "Stucco & EIFS",
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
            },
            {
                "@type": "WebSite",
                "@id": "https://canyonstateaz.com/#website",
                "url": "https://canyonstateaz.com",
                "name": "Canyon State Enterprises",
                "publisher": {
                    "@id": "https://canyonstateaz.com/#organization"
                }
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default SchemaMarkup;
