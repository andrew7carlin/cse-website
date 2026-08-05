import Hero from '../components/ui/Hero';
import TradeGrid from '../components/ui/TradeGrid';
import Accordion from '../components/ui/Accordion';
import SEO from '../components/common/SEO';
import { Link } from 'react-router-dom';

// Hero image
import heroImage from '../assets/projects/28th and Sunrise_Las Vegas Nv.webp';

// Service JSON-LD for the services hub (Aug 2026 SEO spec).
const SERVICES_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://canyonstateaz.com/services#service',
    name: 'Construction Services',
    serviceType: 'Commercial & Residential Construction Services',
    url: 'https://canyonstateaz.com/services',
    description:
        'Canyon State provides commercial and residential construction services, including roofing, stucco, EIFS, general contracting, HVAC, plumbing, masonry, specialty metals, fencing, seamless gutters, and land development across Arizona, Nevada, Utah, and Colorado.',
    provider: { '@id': 'https://canyonstateaz.com/#organization' },
    areaServed: [
        { '@type': 'State', name: 'Arizona' },
        { '@type': 'State', name: 'Nevada' },
        { '@type': 'State', name: 'Utah' },
        { '@type': 'State', name: 'Colorado' },
    ],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Construction Services',
        itemListElement: [
            'Roofing', 'Stucco & EIFS', 'General Contracting', 'HVAC', 'Plumbing',
            'Residential Construction', 'Commercial Construction', 'Specialty Metals',
            'Masonry', 'Fencing', 'Seamless Gutters', 'Land Development',
        ].map((name) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name },
        })),
    },
    inLanguage: 'en-US',
};

const Services = () => {

    return (
        <div>
            <SEO
                title="Construction Services in AZ, NV, UT & CO | Canyon State Enterprises"
                description="Explore Canyon State's roofing, HVAC, plumbing, stucco, masonry, land development, and construction services across AZ, NV, UT & CO."
                canonical="https://canyonstateaz.com/services"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_SCHEMA) }}
            />
            <Hero
                headline="Complete Construction Services."
                subheadline="From pre-construction to closeout, we handle every phase with precision."
                imageUrl={heroImage}
                variant="split"
                primaryCtaText="Get a Proposal"
                secondaryCtaText=""
            />

            <TradeGrid />

            <div className="container section" style={{ maxWidth: '820px' }}>
                <h2 className="text-h2" style={{ marginBottom: '1.25rem' }}>One Team, Every Trade</h2>
                <p style={{ marginBottom: '1.5rem', lineHeight: 1.7 }}>
                    Most contractors sell you a trade and then broker the rest of the
                    work to whoever bids cheapest that week. Canyon State is different:
                    we self-perform more than a dozen trades in house, from roofing,
                    stucco, and specialty metals to HVAC, plumbing, masonry, fencing,
                    and full general contracting. That means one crew structure, one
                    schedule, and one accountable team across the whole project, instead
                    of three layers of subcontractors pointing fingers when something
                    goes wrong. It is the single biggest reason our work holds up and
                    our projects stay on schedule.
                </p>

                <h2 className="text-h2" style={{ marginBottom: '1.25rem' }}>Built for the Southwest</h2>
                <p style={{ marginBottom: '1.5rem', lineHeight: 1.7 }}>
                    Construction in Arizona and Nevada is its own discipline. Sustained
                    desert heat, intense UV, and monsoon-driven wind and water punish
                    roof assemblies, wall systems, and mechanical equipment that were
                    specified for a milder climate. Canyon State details every system
                    for the conditions it actually has to survive, and our crews carry
                    the inspector relationships and manufacturer partnerships that come
                    from working these markets every day. From a single-trade repair to
                    a ground-up commercial build, we bring the same standards from
                    pre-construction through closeout.
                </p>

                <h2 className="text-h2" style={{ marginBottom: '1.25rem' }}>Commercial and Residential</h2>
                <p style={{ lineHeight: 1.7 }}>
                    We work at every scale. On the commercial side that means
                    dealerships, hotels, medical facilities, restaurants, retail,
                    government buildings, and multi-family communities, often on
                    fast-track schedules where the open date is fixed. On the
                    residential side it means custom homes, additions, renovations, and
                    full developments built with the same accountability. With offices
                    in Kingman, Phoenix, Bullhead City, Lake Havasu City, and Las Vegas,
                    a Canyon State crew is rarely far from your project, and the company
                    yard, equipment, and self-performed trades come with them. Explore
                    the trades above, then tell us what you are building.
                </p>
            </div>

            <Accordion />

            <div className="container section" style={{ textAlign: 'center' }}>
                <h2 className="text-h2" style={{ marginBottom: '2rem' }}>Ready to start?</h2>
                <Link to="/contact" className="btn-primary" style={{
                    background: 'var(--color-copper)',
                    color: 'white',
                    padding: '1rem 3rem',
                    display: 'inline-block',
                    fontWeight: 600
                }}>Contact Us</Link>
            </div>
        </div>
    );
};

export default Services;
