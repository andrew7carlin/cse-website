import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLocation } from '../data/locations';
import SEO from '../components/common/SEO';
import styles from './LocationPage.module.css';

// Hero images per location
import heroKingman      from '../assets/portfolio/commercial/Hualapai_Mountain_Campus.webp';
import heroPhoenix      from '../assets/portfolio/commercial/Greenprint_Apartments_Phoenix_AZ.webp';
import heroBullhead     from '../assets/portfolio/commercial/Spirit_Mountain_Casino.webp';
import heroLasVegas     from '../assets/portfolio/commercial/Bettys_Village_Cover_Las_Vegas_NV.webp';
import heroHavasu       from '../assets/portfolio/residential/Northpoint_Community.webp';

const HERO_IMAGES = {
  kingman:  heroKingman,
  phoenix:  heroPhoenix,
  bullhead: heroBullhead,
  lasvegas: heroLasVegas,
  havasu:   heroHavasu,
};

const LocationPage = () => {
  const { locationId } = useParams();
  const loc = getLocation(locationId);

  if (!loc) {
    return (
      <div className={styles.notFound}>
        <h1>Location Not Found</h1>
        <Link to="/where">← Back to Where We Work</Link>
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <SEO
        title={`${loc.city}, ${loc.abbrev} — ${loc.role} | Canyon State Enterprises`}
        description={loc.description}
        canonical={`https://canyonstateaz.com/locations/${loc.id}`}
      />

      {/* ── Hero ── */}
      <section
        className={styles.hero}
        style={HERO_IMAGES[loc.heroImage] ? {
          backgroundImage: `url(${HERO_IMAGES[loc.heroImage]})`,
          backgroundSize: 'cover',
          backgroundPosition: loc.heroPosition || 'center center',
        } : {}}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Canyon State Enterprises</span>
          <h1 className={styles.city}>{loc.city}, {loc.abbrev}</h1>
          <span className={styles.role}>{loc.role}</span>
        </div>
      </section>

      {/* ── Content ── */}
      <section className={styles.content}>
        <div className={styles.container}>

          {/* About this office */}
          <div className={styles.grid}>
            <div className={styles.mainCol}>
              <h2 className={styles.sectionTitle}>About This Office</h2>
              <p className={styles.description}>{loc.description}</p>

              <h3 className={styles.subTitle}>Coverage Area</h3>
              <div className={styles.tagList}>
                {loc.coverage.map(c => (
                  <span key={c} className={styles.tag}>{c}</span>
                ))}
              </div>

              <h3 className={styles.subTitle}>Services Offered</h3>
              <div className={styles.serviceGrid}>
                {loc.services.map(s => (
                  <div key={s} className={styles.serviceItem}>
                    <span className={styles.dot} />
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.infoCard}>
                <div className={styles.infoCardHeader}>Office Info</div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Location</span>
                  <span className={styles.infoValue}>{loc.city}, {loc.state}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Role</span>
                  <span className={styles.infoValue}>{loc.role}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Phone</span>
                  <a href={`tel:${loc.phone.replace(/\D/g, '')}`} className={styles.infoLink}>{loc.phone}</a>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Region</span>
                  <span className={styles.infoValue}>{loc.region}</span>
                </div>
              </div>

              {/* CTA Card */}
              <div className={styles.ctaCard}>
                <h3 className={styles.ctaTitle}>Ready to get started?</h3>
                <p className={styles.ctaText}>Our {loc.city} team is standing by. No sales pitch — just straight answers.</p>
                <Link to="/contact" className={styles.ctaBtn}>Contact This Office</Link>
                <Link to="/where" className={styles.backLink}>← All Locations</Link>
              </div>
            </aside>
          </div>

        </div>
      </section>
    </main>
  );
};

export default LocationPage;
