import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../common/SEO';
import styles from './FeaturedProjectDetail.module.css';

export default function FeaturedProjectDetail({ project }) {
  const rowRefs = useRef([]);

  // Fade-in rows on scroll via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    rowRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const hero = project.media[0];
  const total = project.media.length;

  return (
    <>
      <SEO
        title={`${project.title} | Canyon State Enterprises`}
        description={project.blurb
          ? project.blurb.split('\n\n')[0]
          : `${project.title} — a Canyon State Enterprises ${project.trade} project in ${project.location}.`}
        canonical={`https://canyonstateaz.com/portfolio/${project.id}`}
      />

      {/* ── Hero ────────────────────────────────────────── */}
      <section className={styles.hero}>
        <img
          src={hero.src}
          alt={project.title}
          className={styles.heroImg}
          width="1920"
          height="1080"
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroMeta}>
          <div className={styles.heroText}>
            <h1>{project.title}</h1>
            <p>{project.location}</p>
          </div>
          {project.trade && (
            <span className={styles.tradeBadge}>{project.trade}</span>
          )}
        </div>
      </section>

      {/* ── Back button ─────────────────────────────────── */}
      <Link to="/portfolio/commercial" className={styles.backBtn}>
        ← Back to Portfolio
      </Link>

      {/* ── Intro blurb ─────────────────────────────────── */}
      {project.blurb && (
        <section className={styles.intro}>
          <div className={styles.introInner}>
            <span className={styles.introLabel}>About This Project</span>
            <div className={styles.introDivider} />
            <p className={styles.introText}>{project.blurb}</p>
          </div>
        </section>
      )}

      {/* ── Alternating Photo / Text Rows ───────────────── */}
      <section className={styles.rowSection}>
        {project.media.map((item, index) => {
          const isEven = index % 2 === 1;
          return (
            <div
              key={index}
              ref={el => rowRefs.current[index] = el}
              className={`${styles.row} ${isEven ? styles.rowReverse : ''}`}
            >
              <img
                src={item.src}
                alt={`${project.title} — photo ${index + 1} of ${total}`}
                className={styles.rowImg}
                loading="lazy"
                width="1024"
                height="576"
              />
              <div className={styles.rowText}>
                <span className={styles.rowCaption}>Project Photography</span>
                <div className={styles.rowIdx}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <p className={styles.rowCaptionText}>
                  {item.caption || `Photo ${index + 1} of ${total}`}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── Video Section ───────────────────────────────── */}
      {project.videos && project.videos.length > 0 && (
        <section className={styles.videoSection}>
          <h2 className={styles.videoHeading}>Project Video</h2>
          <div className={styles.videoHeadingLine} />
          {project.videos.map((src, i) => (
            <div key={i} className={styles.videoWrap}>
              <video
                src={src}
                controls
                muted
                loop
                playsInline
              />
            </div>
          ))}
        </section>
      )}
    </>
  );
}
