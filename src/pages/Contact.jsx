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
                <h2 className="text-h2" style={{ marginBottom: '1.25rem' }}>Get a Quote</h2>
                <p style={{ color: '#666', maxWidth: '720px', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                    Tell us about your project and the office closest to you will respond
                    within one business day. Canyon State self-performs roofing, stucco,
                    HVAC, plumbing, masonry, metals, and full construction, so whether you
                    need a single trade or a general contractor for a ground-up build, you
                    are talking to the team that will actually do the work. Reach our
                    Kingman headquarters at (928) 757-9003, Phoenix at (602) 527-6050, or
                    our Nevada office at (702) 659-2819.
                </p>

                <h2 className="text-h2" style={{ marginBottom: '2rem' }}>Service Areas</h2>
                <div className="grid-cols-2">
                    <div>
                        <h3 className="text-h3">Arizona (HQ)</h3>
                        <p style={{ color: '#666' }}>Serving Kingman and Mohave County, the Phoenix Valley, Lake Havasu City, Bullhead City, and Northern Arizona.</p>
                    </div>
                    <div>
                        <h3 className="text-h3">Nevada &amp; Utah</h3>
                        <p style={{ color: '#666' }}>Las Vegas, Henderson, and Southern Nevada, plus Utah on a major-project basis.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
