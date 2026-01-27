import React from 'react';
import styles from './Where.module.css';
import TopoMap from '../components/ui/TopoMap';
import SEO from '../components/common/SEO';

const serviceAreas = [
    {
        id: 'arizona',
        state: 'Arizona',
        abbrev: 'AZ',
        tagline: 'Home Base',
        description: 'Full-service coverage across the entire state. From Phoenix metro to Flagstaff, Tucson to Kingman — we\'re your local partner.',
        coverage: 'Statewide',
        hq: {
            city: 'Kingman',
            address: '2959 Rhoades Ave',
            zip: 'Kingman, AZ 86409',
        },
        satellite: 'Phoenix office by appointment',
    },
    {
        id: 'nevada',
        state: 'Nevada',
        abbrev: 'NV',
        tagline: 'Full Coverage',
        description: 'Complete service throughout Nevada. Las Vegas, Reno, Henderson, and everywhere in between.',
        coverage: 'Statewide',
        hq: null,
        satellite: 'Las Vegas office by appointment',
    },
    {
        id: 'newmexico',
        state: 'New Mexico',
        abbrev: 'NM',
        tagline: 'By Appointment',
        description: 'Serving New Mexico clients with scheduled project consultations. Contact us to arrange a site visit.',
        coverage: 'By Appointment',
        hq: null,
        satellite: null,
    },
    {
        id: 'utah',
        state: 'Utah',
        abbrev: 'UT',
        tagline: 'By Appointment',
        description: 'Serving Utah clients with scheduled project consultations. Contact us to arrange a site visit.',
        coverage: 'By Appointment',
        hq: null,
        satellite: null,
    },
];

const Where = () => {
    return (
        <main className={styles.page}>
            <SEO
                title="Where We Work - Service Areas"
                description="Canyon State Enterprises serves Arizona, Nevada, New Mexico, and Utah with comprehensive construction services"
            />

            {/* Hero Header */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.eyebrow}>Service Areas</span>
                    <h1 className={styles.title}>Where We Work</h1>
                    <p className={styles.subtitle}>
                        Four states. One standard of excellence.
                    </p>
                </div>
            </section>

            {/* Topographic Map */}
            <TopoMap data={serviceAreas} />

            {/* Quick Reference Grid */}
            <section className={styles.gridSection}>
                <div className={styles.gridContainer}>
                    <h3 className={styles.gridTitle}>At a Glance</h3>
                    <div className={styles.grid}>
                        {serviceAreas.map((area) => (
                            <div key={area.id} className={styles.gridCard}>
                                <span className={styles.gridAbbrev}>{area.abbrev}</span>
                                <span className={styles.gridState}>{area.state}</span>
                                <span className={`${styles.gridBadge} ${area.coverage === 'Statewide' ? styles.gridBadgeFull : ''}`}>
                                    {area.coverage}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Where;
