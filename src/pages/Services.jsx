import Hero from '../components/ui/Hero';
import TradeGrid from '../components/ui/TradeGrid';
import Accordion from '../components/ui/Accordion';
import SEO from '../components/common/SEO';
import { Link } from 'react-router-dom';

// Hero image
import heroImage from '../assets/projects/28th and Sunrise_Las Vegas Nv.webp';

const Services = () => {

    return (
        <div>
            <SEO
                title="Trades & Construction Services"
                description="12+ self-performed trades under one roof: roofing, stucco, HVAC, plumbing, masonry, metals, and full construction across Arizona, Nevada, and the Southwest."
                canonical="https://canyonstateaz.com/services"
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
                <p style={{ lineHeight: 1.7 }}>
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
