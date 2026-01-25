import Hero from '../components/ui/Hero';
import TradeGrid from '../components/ui/TradeGrid';
import Accordion from '../components/ui/Accordion';

// Hero image
import heroImage from '../assets/projects/28th and Sunrise_Las Vegas Nv.jpg';

const Services = () => {

    return (
        <div>
            <Hero
                headline="Complete Construction Services."
                subheadline="From pre-construction to closeout, we handle every phase with precision."
                imageUrl={heroImage}
                variant="split"
                primaryCtaText="Get a Proposal"
                secondaryCtaText=""
            />

            <TradeGrid />

            <Accordion />

            <div className="container section" style={{ textAlign: 'center' }}>
                <h2 className="text-h2" style={{ marginBottom: '2rem' }}>Ready to start?</h2>
                <a href="/contact" className="btn-primary" style={{
                    background: 'var(--color-copper)',
                    color: 'white',
                    padding: '1rem 3rem',
                    display: 'inline-block',
                    fontWeight: 600
                }}>Contact Us</a>
            </div>
        </div>
    );
};

export default Services;
