import { Link } from 'react-router-dom';
import { posts } from '../data/blog';
import SEO from '../components/common/SEO';
import styles from './Blog.module.css';

/**
 * /blog — Insights index. Lists every post from src/data/blog.js, newest first.
 * Each card links to /blog/{slug}, which is handled by BlogPost.jsx.
 */

const formatDate = (iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const Blog = () => {
    // Sort by date desc; the data file is already ordered but this guarantees it.
    const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

    return (
        <main className={styles.page}>
            <SEO
                title="Insights from the Field"
                description="Stories from Canyon State Enterprises jobsites: project spotlights, the construction problems we solve, and what we're learning across the trades."
                canonical="https://canyonstateaz.com/blog"
            />

            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.heroInner}>
                        <span className={styles.eyebrow}>Insights</span>
                        <h1 className={styles.headline}>Stories from the field.</h1>
                        <div className={styles.divider} aria-hidden="true" />
                        <p className={styles.subline}>
                            Project spotlights, construction problems and how we solve
                            them, and what we&rsquo;re learning across the trades.
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {sorted.map((post) => (
                            <Link
                                key={post.slug}
                                to={`/blog/${post.slug}`}
                                className={styles.card}
                            >
                                <div className={styles.cardImageWrap}>
                                    <img
                                        src={post.heroImage}
                                        alt={post.heroImageAlt}
                                        className={styles.cardImage}
                                        loading="lazy"
                                        decoding="async"
                                        width="1600"
                                        height="900"
                                    />
                                </div>
                                <div className={styles.cardBody}>
                                    <div className={styles.cardMeta}>
                                        <span className={styles.cardCategory}>{post.category}</span>
                                        <span className={styles.cardDot}>·</span>
                                        <span className={styles.cardDate}>{formatDate(post.date)}</span>
                                    </div>
                                    <h2 className={styles.cardTitle}>{post.title}</h2>
                                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                                    <span className={styles.cardCta}>Read the story →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Blog;
