import React from 'react';
import ContactForm from '../components/ui/ContactForm';

const Contact = () => {
    return (
        <div style={{ paddingTop: 'var(--header-height)' }}>
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
