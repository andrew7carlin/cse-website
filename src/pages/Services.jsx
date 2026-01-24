import { useMemo } from 'react';
import Hero from '../components/ui/Hero';
import TradeGrid from '../components/ui/TradeGrid';
import Accordion from '../components/ui/Accordion';
import { loadProjectAssets } from '../utils/assetLoader';

const Services = () => {
    const heroImage = useMemo(() => {
        const assets = loadProjectAssets();
        if (assets.length > 3) return assets[3].media[0].src;
        if (assets.length > 0) return assets[0].media[0].src;
        return '';
    }, []);

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
