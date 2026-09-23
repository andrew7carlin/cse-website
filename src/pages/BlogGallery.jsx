import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost } from '../data/blog';
import SEO from '../components/common/SEO';
import PhotoGallery from '../components/ui/PhotoGallery';
import blogStyles from './Blog.module.css';
import styles from './BlogGallery.module.css';

/**
 * /blog/:slug/photos — full photo gallery for a post.
 *
 * Only posts with a `gallery` field in src/data/blog.js have this page. The
 * gallery module (93 asset URLs for the golf post) is lazy-loaded here so it
 * never weighs on the article or the Insights index.
 */
const BlogGallery = () => {
    const { slug } = useParams();
    const post = getPost(slug);
    const loader = post?.gallery?.loader;
    const [items, setItems] = useState(null);

    useEffect(() => {
        let cancelled = false;
        if (!loader) return undefined;
        loader().then((mod) => {
            if (!cancelled) setItems(mod.default);
        });
        return () => { cancelled = true; };
    }, [loader]);

    if (!post || !loader) {
        return (
            <main className={styles.notFound}>
                <SEO
                    title="Gallery Not Found"
                    description="This photo gallery doesn't exist."
                    canonical="https://canyonstateaz.com/blog"
                    noindex
                />
                <h1>Gallery Not Found</h1>
                <Link to="/blog" className={styles.backLink}>← Back to Insights</Link>
            </main>
        );
    }

    const g = post.gallery;
    const count = items ? items.length : g.count;

    return (
        <main className={blogStyles.page}>
            <SEO
                title={g.seoTitle}
                description={g.seoDescription}
                canonical={`https://canyonstateaz.com/blog/${post.slug}/photos`}
                image={post.heroImage}
            />

            <section className={blogStyles.hero}>
                <div className={blogStyles.heroContent}>
                    <div className={blogStyles.heroInner}>
                        <span className={blogStyles.eyebrow}>{post.category}</span>
                        <h1 className={blogStyles.headline}>{g.title}</h1>
                        <div className={blogStyles.divider} />
                        <p className={blogStyles.subline}>{g.subline.replace('{count}', count)}</p>
                        <Link to={`/blog/${post.slug}`} className={styles.backLink}>
                            ← Back to the story
                        </Link>
                    </div>
                </div>
            </section>

            <section className={styles.galleryWrap}>
                {items ? (
                    <PhotoGallery items={items} label={`${g.title} photos`} />
                ) : (
                    <div className={styles.loader} aria-hidden="true"><div className={styles.spinner} /></div>
                )}
            </section>

            <section className={styles.footer}>
                <Link to={`/blog/${post.slug}`} className={styles.backLink}>← Back to the story</Link>
            </section>
        </main>
    );
};

export default BlogGallery;
