import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import styles from './Legal.module.css';

// This page exists to corroborate the rental / property-management side of
// the business for the SMS carrier registry (a human reviewer checks the
// application against the website). Copy is the client's wording — keep the
// phrases "property management", "tenants", the office phone, the tenant
// portal link, and the Terms/Privacy pointer intact.
const TENANT_PORTAL_URL = 'https://clearconnect-app.netlify.app';

const rentalsSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://canyonstateaz.com/rentals#service',
    name: 'Residential Property Management',
    serviceType: 'Property Management',
    url: 'https://canyonstateaz.com/rentals',
    description:
        'Canyon State manages residential rental properties in Kingman, Arizona, handling leasing, rent collection, and maintenance, with an online tenant portal for payments and maintenance requests.',
    provider: { '@id': 'https://canyonstateaz.com/#organization' },
    areaServed: { '@type': 'City', name: 'Kingman', containedInPlace: { '@type': 'State', name: 'Arizona' } },
    audience: { '@type': 'Audience', audienceType: 'Tenants' },
    inLanguage: 'en-US',
};

const Rentals = () => {
    return (
        <div className={styles.page}>
            <SEO
                title="Property Management in Kingman, AZ | Canyon State"
                description="Canyon State manages residential rental properties in Kingman, Arizona. Tenants can pay rent, view their balance, and submit maintenance requests through our online tenant portal."
                canonical="https://canyonstateaz.com/rentals"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(rentalsSchema) }}
            />

            <section className={styles.hero}>
                <h1 className={`text-h1 ${styles.heroTitle}`}>Property Management</h1>
                <p className={styles.updated}>Residential rentals in Kingman, Arizona</p>
            </section>

            <section className={styles.content}>
                <div>
                    <p>
                        Alongside our contracting work, Canyon State manages residential rental
                        properties in Kingman, Arizona. We handle leasing, rent collection, and
                        maintenance for the homes in our portfolio.
                    </p>

                    <h2>Tenant Portal</h2>
                    <p>
                        Current tenants can use our{' '}
                        <a href={TENANT_PORTAL_URL} target="_blank" rel="noopener noreferrer">
                            online tenant portal
                        </a>{' '}
                        to view their balance, make payments, and submit maintenance requests at
                        any time.
                    </p>

                    <h2>Text Messages</h2>
                    <p>
                        Tenants who provide a mobile number and opt in may receive text messages
                        about their tenancy — portal invitations, rent reminders, and maintenance
                        updates. Message and data rates may apply. Reply <strong>STOP</strong> to
                        opt out. See our <Link to="/terms">Terms</Link> and{' '}
                        <Link to="/privacy">Privacy Policy</Link> for details.
                    </p>

                    <h2>Questions About a Rental?</h2>
                    <p>
                        Call our office at <a href="tel:9287579003">928-757-9003</a>.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Rentals;
