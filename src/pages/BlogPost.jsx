import { Suspense, lazy } from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts, getPost } from '../data/blog';
import SEO from '../components/common/SEO';
import styles from './BlogPost.module.css';

/**
 * /blog/:slug — Individual article page.
 *
 * Looks up the post metadata from src/data/blog.js, lazy-loads the article
 * body component referenced by its `contentLoader`, and renders the standard
 * article chrome (hero, byline, body, footer nav).
 *
 * Lazy components are built once at module load (slug → LazyComponent map)
 * rather than per render — keeps Fast Refresh and Suspense happy and
 * satisfies the react-hooks/static-components rule.
 */

const LAZY_BODIES = Object.fromEntries(
    posts.map((p) => [p.slug, lazy(p.contentLoader)])
);

const formatDate = (iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const ArticleLoader = () => (
    <div className={styles.loader} aria-hidden="true">
        <div className={styles.spinner} />
    </div>
);

const BlogPost = () => {
    const { slug } = useParams();
    const post = getPost(slug);
    const ArticleBody = post ? LAZY_BODIES[post.slug] : null;

    if (!post) {
        return (
            <main className={styles.notFound}>
                <SEO
                    title="Post Not Found"
                    description="The article you were looking for has been moved or doesn't exist."
                    canonical="https://canyonstateaz.com/blog"
                    noindex
                />
                <h1>Post Not Found</h1>
                <p>The article you were looking for has been moved or doesn&rsquo;t exist.</p>
                <Link to="/blog" className={styles.backLink}>← Back to Insights</Link>
            </main>
        );
    }

    return (
        <main className={styles.page}>
            <SEO
                title={post.seoTitle || post.title}
                description={post.seoDescription || post.excerpt}
                canonical={`https://canyonstateaz.com/blog/${post.slug}`}
                image={post.heroImage}
            />

            {/* JSON-LD article schema for SEO — article-specific signals
                supplement the site-wide LocalBusiness schema. */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: post.title,
                        description: post.excerpt,
                        datePublished: post.date,
                        author: { '@type': 'Organization', name: post.author },
                        publisher: {
                            '@type': 'Organization',
                            name: 'Canyon State Enterprises',
                            logo: {
                                '@type': 'ImageObject',
                                url: 'https://canyonstateaz.com/logo-full.png',
                            },
                        },
                        image: `https://canyonstateaz.com${post.heroImage}`,
                        mainEntityOfPage: {
                            '@type': 'WebPage',
                            '@id': `https://canyonstateaz.com/blog/${post.slug}`,
                        },
                    }),
                }}
            />

            {/* ── Hero ── */}
            <section className={styles.hero}>
                <img
                    src={post.heroImage}
                    alt={post.heroImageAlt}
                    className={styles.heroImg}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                />
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <span className={styles.heroEyebrow}>{post.category}</span>
                    <h1 className={styles.heroTitle}>{post.title}</h1>
                    <div className={styles.heroMeta}>
                        <span>{post.author}</span>
                        <span className={styles.metaDot}>·</span>
                        <span>{formatDate(post.date)}</span>
                        <span className={styles.metaDot}>·</span>
                        <span>{post.readingTime}</span>
                    </div>
                </div>
            </section>

            {/* ── Body ── */}
            <article className={styles.article}>
                <div className={styles.container}>
                    <Suspense fallback={<ArticleLoader />}>
                        <ArticleBody />
                    </Suspense>
                </div>
            </article>

            {/* ── Footer nav ── */}
            <section className={styles.postFooter}>
                <div className={styles.container}>
                    <Link to="/blog" className={styles.backLink}>← All Insights</Link>
                </div>
            </section>
        </main>
    );
};

export default BlogPost;
