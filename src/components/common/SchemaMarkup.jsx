import { Helmet } from 'react-helmet-async';

/**
 * Schema.org structured data component for LocalBusiness + Organization
 * This helps search engines understand our business entity and improves rich results
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
                "areaServed": [
                    {
                        "@type": "State",
                        "name": "Arizona"
                    },
                    {
                        "@type": "State",
                        "name": "Nevada"
                    },
                    {
                        "@type": "State",
                        "name": "Utah"
                    },
                    {
                        "@type": "State",
                        "name": "New Mexico"
                    }
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
                "foundingDate": "2005",
                "numberOfEmployees": {
                    "@type": "QuantitativeValue",
                    "value": "50-200"
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
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

export default SchemaMarkup;
