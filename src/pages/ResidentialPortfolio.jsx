import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { residentialProjects, RESIDENTIAL_CATEGORIES } from '../data/projects';
import styles from '../styles/PortfolioGallery.module.css';

export default function ResidentialPortfolio() {
  const [activeCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? residentialProjects
    : residentialProjects.filter(p => p.category === activeCategory);

  return (
    <>
      <SEO
        title="Residential Projects | Canyon State Enterprises"
        description="View Canyon State Enterprises' residential construction projects: custom homes, roofing, stucco, and full-service builds across Arizona and the Southwest."
        canonical="https://canyonstateaz.com/portfolio/residential"
      />

      {/* ItemList schema for the residential portfolio — same pattern as
          the commercial gallery so Google can render rich result lists. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            '@id': 'https://canyonstateaz.com/portfolio/residential#itemlist',
            name: 'Canyon State Enterprises — Residential Projects',
            url: 'https://canyonstateaz.com/portfolio/residential',
            numberOfItems: residentialProjects.length,
            itemListElement: residentialProjects.slice(0, 50).map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `https://canyonstateaz.com/portfolio/${p.id}`,
              name: `${p.name} — ${p.location}`,
            })),
          }),
        }}
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Residential Projects</h1>

        {/* Filter hidden — show all residential projects
        <div className={styles.filterBar}>
          {RESIDENTIAL_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.filterActive : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
        */}

        <div className={styles.grid}>
          {filtered.map((project, idx) => (
            <Link key={project.id} to={`/portfolio/${project.id}`} className={styles.card}>
              <div className={styles.cardImageWrap}>
                <img
                  src={project.src}
                  alt={`${project.name}, ${project.location}`}
                  className={styles.cardImage}
                  // First card is the LCP candidate; load eagerly with high priority
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                  width="1024"
                  height="576"
                />
              
              </div>
              <div className={styles.cardCaption}>
                <h3 className={styles.cardName}>{project.name}</h3>
                <p className={styles.cardLocation}>{project.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
