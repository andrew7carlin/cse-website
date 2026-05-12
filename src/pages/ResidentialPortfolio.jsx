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
          {filtered.map(project => (
            <Link key={project.id} to={`/portfolio/${project.id}`} className={styles.card}>
              <div className={styles.cardImageWrap}>
                <img
                  src={project.src}
                  alt={`${project.name} — ${project.location}`}
                  className={styles.cardImage}
                  loading="lazy"
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
