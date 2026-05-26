import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { commercialProjects } from '../data/projects';
import styles from '../styles/PortfolioGallery.module.css';

export default function CommercialPortfolio() {
  /* FILTERS DISABLED — re-enable when ready */
  // const [activeCategory, setActiveCategory] = useState('all');
  // const filtered = activeCategory === 'all'
  //   ? commercialProjects
  //   : commercialProjects.filter(p => p.category === activeCategory);

  const featuredProjects = commercialProjects.filter(p => p.featured);
  // Stable sort: keep array order within each group, push comingSoon to the
  // bottom of the "All Projects" grid so completed work leads.
  const allProjects = [...commercialProjects].sort(
    (a, b) => Number(a.comingSoon || false) - Number(b.comingSoon || false)
  );

  return (
    <>
      <SEO
        title="Commercial Projects"
        description="View Canyon State Enterprises' commercial construction projects: dealerships, medical facilities, restaurants, hotels, and multi-trade builds across Arizona and the Southwest."
        canonical="https://canyonstateaz.com/portfolio/commercial"
      />

      {/* ItemList schema — gives Google a structured inventory of the
          commercial portfolio so rich results (carousel, list snippets)
          become eligible. Limited to 50 entries to keep payload reasonable. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            '@id': 'https://canyonstateaz.com/portfolio/commercial#itemlist',
            name: 'Canyon State Enterprises — Commercial Projects',
            url: 'https://canyonstateaz.com/portfolio/commercial',
            numberOfItems: allProjects.length,
            itemListElement: allProjects.slice(0, 50).map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `https://canyonstateaz.com/portfolio/${p.id}`,
              name: `${p.name} — ${p.location}`,
            })),
          }),
        }}
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Commercial Projects</h1>

        {/* FILTERS DISABLED — re-enable when ready */}
        {/* <div className={styles.filterBar}>
          {COMMERCIAL_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.filterActive : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div> */}

        {/* ── Featured Projects ── */}
        {featuredProjects.length > 0 && (
          <section className={styles.featuredSection}>
            <h2 className={styles.featuredHeading}>Featured Projects</h2>
            <div className={styles.featuredGrid}>
              {featuredProjects.map((project, idx) => (
                <Link
                  key={project.id}
                  to={`/portfolio/${project.id}`}
                  className={styles.featuredCard}
                >
                  <div className={styles.featuredImageWrap}>
                    <span className={styles.featuredBadge}>Featured</span>
                    <img
                      src={project.src}
                      alt={`${project.name}, ${project.location}`}
                      className={styles.cardImage}
                      // First featured tile is the LCP candidate on /portfolio/commercial;
                      // load eagerly with high priority, lazy-load the rest.
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      fetchPriority={idx === 0 ? 'high' : 'auto'}
                      width="1024"
                      height="576"
                    />
                    <div className={styles.featuredOverlay}>
                      <span className={styles.featuredViewLabel}>View Project →</span>
                    </div>
                  </div>
                  <div className={styles.featuredCaption}>
                    <h3 className={styles.cardName}>{project.name}</h3>
                    <p className={styles.cardLocation}>{project.location}</p>
                    <p className={styles.featuredTrade}>{project.trade}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── All Projects ── */}
        <div className={styles.grid}>
          {allProjects.map(project => (
            <Link
              key={project.id}
              to={`/portfolio/${project.id}`}
              className={`${styles.card} ${project.comingSoon ? styles.cardComingSoon : ''}`}
            >
              <div className={styles.cardImageWrap}>
                {project.comingSoon && (
                  <span className={styles.comingSoonBadge}>Coming Soon</span>
                )}
                <img
                  src={project.src}
                  alt={`${project.name}, ${project.location}`}
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
