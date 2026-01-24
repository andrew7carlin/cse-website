import React from 'react';

const faqs = [
    { q: "Do you handle residential and commercial projects?", a: "Yes, we have dedicated divisions for both. Our residential team handles everything from custom homes to repairs, while our commercial team takes on large-scale tenant improvements and ground-up builds." },
    { q: "Are you licensed and insured?", a: "Absolutely. We hold specific licenses for all trades we perform and carry comprehensive liability and workers' compensation insurance." },
    { q: "What areas do you service?", a: "We primarily serve the Greater Phoenix area but travel statewide for Arizona. We also have operations in Nevada and Utah for select projects." },
    { q: "How do I get a quote?", a: "The best way is to use our 'Request a Quote' form on the Contact page. Provide as much detail as possible, and our estimating team will reach out." }
];

const FAQ = () => {
    return (
        <div style={{ paddingTop: 'var(--header-height)' }} className="section">
            <div className="container">
                <h1 className="text-h1" style={{ marginBottom: '3rem' }}>Frequently Asked Questions</h1>

                <div style={{ maxWidth: '800px' }}>
                    {faqs.map((item, i) => (
                        <div key={i} style={{ marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '2rem' }}>
                            <h3 className="text-h3" style={{ marginBottom: '0.5rem' }}>{item.q}</h3>
                            <p style={{ lineHeight: '1.6', color: 'var(--color-text-muted)' }}>{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
