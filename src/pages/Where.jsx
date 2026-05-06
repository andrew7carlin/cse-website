import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Where.module.css';
import SEO from '../components/common/SEO';
import ServiceAreaMap from '../components/ui/ServiceAreaMap';
import { locations } from '../data/locations';

// ── State coverage data ────────────────────────────────────────────────────
const states = [
  {
    id: 'arizona',
    state: 'Arizona',
    abbrev: 'AZ',
    tagline: 'Home Base',
    badge: 'Full Coverage',
    badgeFull: true,
    cities: [
      'Kingman', 'Bullhead City', 'Lake Havasu City', 'Flagstaff',
      'Phoenix', 'Mesa', 'Glendale', 'Scottsdale', 'Tempe',
      'Chandler', 'Gilbert', 'Peoria', 'Apache Junction', 'Queen Creek',
      'Tucson', 'Marana', 'Oro Valley', 'Sahuarita', 'Show Low',
    ],
  },
  {
    id: 'nevada',
    state: 'Nevada',
    abbrev: 'NV',
    tagline: 'Full Coverage',
    badge: 'Full Coverage',
    badgeFull: true,
    cities: ['Las Vegas', 'Henderson', 'Laughlin', 'Pahrump', 'Mesquite', 'Reno'],
  },
  {
    id: 'utah',
    state: 'Utah',
    abbrev: 'UT',
    tagline: 'Active Projects',
    badge: 'Active Projects',
    badgeFull: false,
    cities: ['St. George', 'Hurricane', 'Salt Lake City', 'Spanish Fork'],
  },
  {
    id: 'colorado',
    state: 'Colorado',
    abbrev: 'CO',
    tagline: 'Expanding Now',
    badge: 'Expanding Now',
    badgeFull: false,
    cities: ['Denver', 'Colorado Springs', 'Grand Junction'],
  },
];

const stats = [
  { number: '4',   label: 'States' },
  { number: '30+', label: 'Cities' },
  { number: '1',   label: 'Standard' },
  { number: '25',  label: 'Years' },
];

// ── JSON-LD LocalBusiness schema ───────────────────────────────────────────
const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  name: 'Canyon State Enterprises',
  url: 'https://canyonstateaz.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2959 Rhoades Ave',
    addressLocality: 'Kingman',
    addressRegion: 'AZ',
    postalCode: '86409',
    addressCountry: 'US',
  },
  areaServed: [
    'Kingman, AZ', 'Bullhead City, AZ', 'Lake Havasu City, AZ',
    'Phoenix, AZ', 'Mesa, AZ', 'Glendale, AZ', 'Scottsdale, AZ',
    'Tempe, AZ', 'Chandler, AZ', 'Gilbert, AZ', 'Peoria, AZ',
    'Apache Junction, AZ', 'Queen Creek, AZ', 'Flagstaff, AZ',
    'Tucson, AZ', 'Marana, AZ', 'Oro Valley, AZ', 'Sahuarita, AZ',
    'Show Low, AZ', 'Las Vegas, NV', 'Henderson, NV', 'Laughlin, NV',
    'Pahrump, NV', 'Mesquite, NV', 'Reno, NV', 'St. George, UT',
    'Hurricane, UT', 'Salt Lake City, UT', 'Spanish Fork, UT',
    'Denver, CO', 'Colorado Springs, CO', 'Grand Junction, CO',
  ],
};

// ── Component ──────────────────────────────────────────────────────────────
const Where = () => {
  return (
    <main className={styles.page}>
      <SEO
        title="Where We Work | Canyon State Enterprises"
        description="Canyon State Enterprises serves roofing, stucco, and construction across Arizona, Nevada, Utah, and Colorado. Active projects in 30+ cities across the Southwest."
        canonical="https://canyonstateaz.com/where"
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Service Areas</span>
          <h1 className={styles.title}>Building the Southwest</h1>
          <p className={styles.subtitle}>
            Active projects across Arizona, Nevada, Utah, and Colorado —<br />
            with more on the way.
          </p>
        </div>
      </section>

      {/* ── Map ───────────────────────────────────────────────────────── */}
      <section className={styles.mapSection}>
        <div className={styles.mapEyebrow}>
          <span className={styles.eyebrow}>Where We Work</span>
        </div>
        <ServiceAreaMap />
        <p className={styles.mapSubtitle}>
          Pins represent Canyon State projects. Office locations marked in turquoise.
        </p>
      </section>

      {/* ── State Cards ───────────────────────────────────────────────── */}
      <section className={styles.stateSection}>
        <div className={styles.stateGrid}>
          {states.map((s) => (
            <div key={s.id} className={styles.stateCard}>
              <div className={styles.stateCardTop}>
                <span className={styles.stateAbbrev}>{s.abbrev}</span>
                <span className={`${styles.stateBadge} ${s.badgeFull ? styles.stateBadgeFull : ''}`}>
                  {s.badge}
                </span>
              </div>
              <h3 className={styles.stateName}>{s.state}</h3>
              <span className={styles.stateTagline}>{s.tagline}</span>
              <p className={styles.cityList}>{s.cities.join(', ')}</p>
              {/* Office page links for states that have offices */}
              {locations.filter(l => l.abbrev === s.abbrev).length > 0 && (
                <div className={styles.officeLinks}>
                  {locations.filter(l => l.abbrev === s.abbrev).map(l => (
                    <Link key={l.id} to={`/locations/${l.id}`} className={styles.officeLink}>
                      {l.city} →
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Beyond the Southwest ──────────────────────────────────────── */}
      <section className={styles.beyondSection}>
        <div className={styles.beyondHeader}>
          <h2 className={styles.beyondTitle}>Beyond the Southwest</h2>
          <p className={styles.beyondSubtext}>Canyon State has completed projects across the country.</p>
        </div>
        <div className={styles.beyondGrid}>
          <div className={styles.beyondCard}>
            <span className={styles.beyondRegion}>Southeast</span>
            <div className={styles.beyondMarket}>
              <span className={styles.beyondState}>North Carolina</span>
              <span className={styles.beyondCities}>Asheville</span>
            </div>
            <div className={styles.beyondMarket}>
              <span className={styles.beyondState}>Tennessee</span>
              <span className={styles.beyondCities}>Memphis</span>
            </div>
          </div>
          <div className={styles.beyondCard}>
            <span className={styles.beyondRegion}>Other Markets</span>
            <div className={styles.beyondMarket}>
              <span className={styles.beyondState}>Texas</span>
              <span className={styles.beyondCities}>Austin, Houston, Galveston, Del Rio, El Paso</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <section className={styles.statsRow}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statItem}>
            <span className={styles.statNumber}>{s.number}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Working in your area?</h2>
        <p className={styles.ctaSubtext}>
          Get a free estimate from the team that's already there.
        </p>
        <Link to="/quote" className={styles.ctaButton}>
          Get a Quote
        </Link>
      </section>
    </main>
  );
};

export default Where;
