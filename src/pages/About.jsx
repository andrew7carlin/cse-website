import { useMemo } from 'react';
import Hero from '../components/ui/Hero';
import { loadProjectAssets } from '../utils/assetLoader';

const About = () => {
    const heroImage = useMemo(() => {
        const assets = loadProjectAssets();
        if (assets.length > 8) return assets[8].media[0].src;
        if (assets.length > 0) return assets[0].media[0].src;
        return '';
    }, []);

    return (
        <div className="about-page">
            <Hero
                headline="Built on Integrity."
                subheadline="Serving Arizona since 19XX. Family owned, corporate capabilities."
                imageUrl={heroImage}
                variant="split"
                primaryCtaText="Contact Us"
                secondaryCtaLink="/contact"
            />

            <div className="container section">
                <div className="grid-cols-2">
                    <div>
                        <h2 className="text-h2">Our Story</h2>
                    </div>
                    <div>
                        <p style={{ fontSize: '1.25rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
                            Canyon State Enterprises was founded on a simple principle: do good work, and treat people right.
                            What started as a small local operation has grown into a multi-trade powerhouse serving the entire Southwest.
                            <br /><br />
                            We believe in the power of "One Team." By self-performing many of our trades, we control the schedule,
                            the quality, and the safety of every project.
                        </p>
                    </div>
                </div>
            </div>

            <div style={{ background: 'var(--color-light-gray)' }} className="section">
                <div className="container">
                    <h2 className="text-h2" style={{ marginBottom: '3rem' }}>Leadership</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
                        {/* Mock Team Members - TODO: Get real photos */}
                        {/* 
                        {[1, 2, 3, 4].map(i => (
                            <div key={i}>
                                <div style={{ height: '300px', background: '#333', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>Photo</div>
                                <h3 className="text-h3">John Doe</h3>
                                <p style={{ color: 'var(--color-copper)' }}>Managing Partner</p>
                            </div>
                        ))} 
                        */}
                        <p className="text-gray-500">Leadership team photos coming soon.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
