import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { commercialProjects, COMMERCIAL_CATEGORIES } from '../data/projects';
import styles from '../styles/PortfolioGallery.module.css';

export default function CommercialPortfolio() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? commercialProjects
    : commercialProjects.filter(p => p.category === activeCategory);

  return (
    <>
      <SEO
        title="Commercial Projects | Canyon State Enterprises"
        description="View Canyon State Enterprises' commercial construction projects — dealerships, medical facilities, restaurants, hotels, and multi-trade builds across Arizona and the Southwest."
        canonical="https://canyonstateaz.com/portfolio/commercial"
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Commercial Projects</h1>

        <div className={styles.filterBar}>
          {COMMERCIAL_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.filterActive : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map(project => (
            <Link key={project.id} to={`/portfolio/${project.id}`} className={styles.card}>
              <div className={styles.cardImageWrap}>
                <img
                  src={project.src}
                  alt={`${project.name} — ${project.location}`}
                  className={styles.cardImage}
                  loading="lazy"
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
