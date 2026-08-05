import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLocation } from '../data/locations';
import { locationContent } from '../data/locationContent';
import { allProjects } from '../data/projects';
import SEO from '../components/common/SEO';
import styles from './LocationPage.module.css';

// Hero images per location
import heroKingman      from '../assets/portfolio/commercial/Hualapai_Mountain_Campus.webp';
import heroPhoenix      from '../assets/portfolio/commercial/Greenprint_Apartments_Phoenix_AZ.webp';
import heroBullhead     from '../assets/portfolio/commercial/Holiday Inn Express_Bullhead City AZ.webp';
import heroLasVegas     from '../assets/portfolio/commercial/Bettys_Village_Cover_Las_Vegas_NV.webp';
import heroHavasu       from '../assets/portfolio/commercial/Bradley_Ford_Lake_Havasu_City_Az.webp';

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

  // Resolve featuredProjects (array of project IDs) → full project objects.
  // Drops any IDs that don't match — guards against typos in locations.js.
  const featured = (loc?.featuredProjects || [])
    .map(id => allProjects.find(p => p.id === id))
    .filter(Boolean);

  const content = loc ? locationContent[loc.id] : null;

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
        title={loc.seoTitle || `${loc.city} Construction, ${loc.abbrev}`}
        description={loc.metaDescription || loc.description}
        canonical={`https://canyonstateaz.com/locations/${loc.id}`}
      />

      {/* Per-location schema (Aug 2026 SEO spec). Staffed offices (isOffice)
          are HomeAndConstructionBusiness entities; service-area pages carry
          the same shape but are named as service areas and never claim a
          street address — Google penalizes location claims it can't verify.
          Kingman (the HQ) additionally carries the full street address, geo,
          and opening hours. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HomeAndConstructionBusiness',
            '@id': `https://canyonstateaz.com/locations/${loc.id}#localbusiness`,
            name: loc.schemaName || `Canyon State — ${loc.city}`,
            url: `https://canyonstateaz.com/locations/${loc.id}`,
            telephone: `+1-${loc.phone.replace(/\D/g, '')}`,
            email: 'office@canyonstateaz.com',
            description: loc.description,
            parentOrganization: { '@id': 'https://canyonstateaz.com/#organization' },
            address: {
              '@type': 'PostalAddress',
              ...(loc.id === 'kingman-az' && {
                streetAddress: '2959 Rhoades Ave',
                postalCode: '86409',
              }),
              addressLocality: loc.city,
              addressRegion: loc.abbrev,
              addressCountry: 'US',
            },
            ...(loc.id === 'kingman-az' && {
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 35.1896,
                longitude: -114.0529,
              },
              openingHours: 'Mo-Fr 08:00-17:00',
            }),
            areaServed: (loc.schemaAreaServed || loc.coverage).map((name) => ({
              '@type': 'City',
              name,
            })),
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Construction Services',
              itemListElement: loc.services.map((svc) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: svc },
              })),
            },
          }),
        }}
      />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        {HERO_IMAGES[loc.heroImage] && (
          /* Real <img> so the preload scanner discovers the LCP image. */
          <img
            className={styles.heroImg}
            src={HERO_IMAGES[loc.heroImage]}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            style={{ objectPosition: loc.heroPosition || 'center center' }}
          />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Canyon State Enterprises</span>
          <h1 className={styles.city}>{loc.h1 || `${loc.city}, ${loc.abbrev}`}</h1>
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

              {loc.localContext && (
                <>
                  <h3 className={styles.subTitle}>Built for {loc.city}</h3>
                  <p className={styles.description}>{loc.localContext}</p>
                </>
              )}

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

              {featured.length > 0 && (
                <>
                  <h3 className={styles.subTitle}>Recent Work in {loc.city}</h3>
                  <div className={styles.projectGrid}>
                    {featured.map(p => (
                      <Link
                        key={p.id}
                        to={`/portfolio/${p.id}`}
                        className={styles.projectCard}
                      >
                        <div className={styles.projectImgWrap}>
                          <img
                            src={p.src}
                            alt={`${p.name} — ${p.location}`}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className={styles.projectMeta}>
                          <span className={styles.projectName}>{p.name}</span>
                          <span className={styles.projectTrade}>{p.trade}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {content && (
                <>
                  <h2 className={styles.sectionTitle} style={{ marginTop: '3rem' }}>
                    Construction Services in {loc.city}
                  </h2>
                  <p className={styles.description}>{content.services}</p>

                  <h2 className={styles.sectionTitle} style={{ marginTop: '3rem' }}>
                    Why {loc.city} Builds with Canyon State
                  </h2>
                  <p className={styles.description}>{content.commitment}</p>
                </>
              )}
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
                <p className={styles.ctaText}>Our {loc.city} team is standing by. No sales pitch, just straight answers.</p>
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
