import React from 'react';
import ContactForm from '../components/ui/ContactForm';
import SEO from '../components/common/SEO';

const Contact = () => {
    return (
        <div style={{ paddingTop: 'var(--header-height)' }}>
            <SEO
                title="Contact Us - Get a Free Quote"
                description="Request a free quote from Canyon State Enterprises for roofing, stucco, HVAC, or full construction. Serving AZ, NV, UT & NM. ROC licensed and insured."
                canonical="https://canyonstateaz.com/contact"
            />
            {/* Visually hidden h1 — present for SEO and screen readers */}
            <h1 style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
                Contact Canyon State Enterprises
            </h1>
            {/* Reusing the robust form module as the main page content */}
            <ContactForm />

            <div className="container section" style={{ borderTop: '1px solid #eee' }}>
                <h2 className="text-h2" style={{ marginBottom: '2rem' }}>Service Areas</h2>
                <div className="grid-cols-2">
                    <div>
                        <h3 className="text-h3">Arizona (HQ)</h3>
                        <p style={{ color: '#666' }}>Serving the entire Phoenix Valley, Tucson, and Northern Arizona.</p>
                    </div>
                    <div>
                        <h3 className="text-h3">Nevada & Utah</h3>
                        <p style={{ color: '#666' }}>By appointment and major project basis.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
