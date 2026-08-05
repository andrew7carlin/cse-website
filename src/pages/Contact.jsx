import React from 'react';
import ContactForm from '../components/ui/ContactForm';
import SEO from '../components/common/SEO';

// ContactPage JSON-LD (Aug 2026 SEO spec) — mainEntity references the
// site-wide #organization node rather than duplicating it.
const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': 'https://canyonstateaz.com/contact#webpage',
    url: 'https://canyonstateaz.com/contact',
    name: 'Contact Canyon State',
    description:
        'Contact Canyon State for commercial and residential construction services. Request a quote or speak with our team about your next project.',
    mainEntity: { '@id': 'https://canyonstateaz.com/#organization' },
    inLanguage: 'en-US',
};

const Contact = () => {
    return (
        <div style={{ paddingTop: 'var(--header-height)' }}>
            <SEO
                title="Contact Canyon State | Request a Construction Quote Today"
                description="Contact Canyon State for commercial and residential construction services across AZ, NV, UT & CO. Request a free quote or speak with our team today."
                canonical="https://canyonstateaz.com/contact"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
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
