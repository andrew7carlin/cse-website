import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/common/SEO';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './FAQ.module.css';

// ─── FAQ Data ────────────────────────────────────────────────────────────────

const categories = [
    {
        label: 'General',
        questions: [
            {
                q: 'What types of projects does Canyon State Enterprises handle?',
                a: 'We handle commercial, industrial, and high-end residential construction. Our portfolio spans retail buildouts, tenant improvements, ground-up commercial construction, HOA neighborhoods, custom homes, and large-scale industrial facilities — all self-performed across 12+ trades.',
            },
            {
                q: 'How long has Canyon State Enterprises been in business?',
                a: 'Canyon State Enterprises has over 20 years of operation and a deep history in the Southwest. We\'ve built a strong reputation with general contractors, property managers, and developers across Arizona, Nevada, and Utah.',
            },
            {
                q: 'Are you licensed and insured?',
                a: 'Yes. We hold Arizona ROC license #353683 and carry specific licenses for all trades we self-perform. We are fully bonded and insured with comprehensive general liability and workers\' compensation coverage.',
            },
            {
                q: 'Do you serve both residential and commercial clients?',
                a: 'Yes. Our commercial division specializes in large-scale tenant improvements, multi-trade buildouts, and ground-up commercial construction. Our residential team handles custom homes, HOA communities, and repair & maintenance projects.',
            },
        ],
    },
    {
        label: 'Services & Trades',
        questions: [
            {
                q: 'What trades do you self-perform?',
                a: 'We self-perform 12+ trades in-house, including roofing (TPO, PVC, shingle, tile, metal), stucco, HVAC, plumbing, electrical rough-in, framing, masonry, concrete flatwork, metal panel systems, paint & coatings, and general construction management.',
            },
            {
                q: 'Do you offer design-build services?',
                a: 'Yes. We offer full design-build and construction management services. Our pre-construction team works with you from concept through permitting, budgeting, and sequencing — ensuring no surprises at groundbreaking.',
            },
            {
                q: 'Can you handle roof repairs as well as full reroof projects?',
                a: 'Absolutely. We offer single-trade roof repairs, emergency leak response, coating applications, and complete tear-off/replacement projects. Our crews are certified applicators for Carlisle, GAF, Certainteed, Firestone, and other leading manufacturers.',
            },
            {
                q: 'Do you work as a subcontractor for general contractors?',
                a: 'Yes. A significant portion of our work is as a subcontractor to major GCs including Willmeng, Kitchell, Lusardi, and others. We have the bonding capacity, safety record, and self-performing capability that tier-one GCs require.',
            },
        ],
    },
    {
        label: 'Service Area',
        questions: [
            {
                q: 'What geographic areas do you serve?',
                a: 'Our headquarters is in Kingman, AZ. We serve the entire state of Arizona (Phoenix Valley, Tucson, Northern Arizona) and have active operations in Nevada (Las Vegas metro) and Utah. We take on select projects in New Mexico as well.',
            },
            {
                q: 'Do you have multiple office locations?',
                a: 'Yes. Our main office is in Kingman, AZ at 2959 Rhoades Ave. We operate field offices and project-based crews throughout the southwestern U.S. Contact us to discuss coverage for your specific area.',
            },
            {
                q: 'Can you travel for larger projects outside your primary region?',
                a: 'For larger projects or long-term clients, we frequently travel outside our primary service area. Call us to discuss your project — scope, timeline, and logistics all factor into our ability to commit.',
            },
        ],
    },
    {
        label: 'Getting Started',
        questions: [
            {
                q: 'How do I request a quote?',
                a: 'The fastest way is to fill out our Contact form with as much detail as possible (location, scope, timeline, project type). Our estimating department typically responds within 1–2 business days.',
            },
            {
                q: 'What information should I have ready when requesting a bid?',
                a: 'The more detail the better: project address, scope of work, any existing drawings or specs, desired start date, and your general timeline. For roofing, knowing the square footage and existing roof system helps us get you an accurate ballpark up front.',
            },
            {
                q: 'What is your typical project timeline from quote to start?',
                a: 'It varies by scope. Small maintenance jobs can often start within days of acceptance. Large commercial projects go through budgeting, permitting, and scheduling — often 4–12 weeks from signed contract to mobilization.',
            },
            {
                q: 'Do you offer emergency or urgent response services?',
                a: 'Yes. We have crews available for urgent situations including roof leaks, storm damage, and facility emergency repairs. Contact our main office line at (928) 757-9003 for urgent requests.',
            },
        ],
    },
];

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FAQItem({ q, a }) {
    const [open, setOpen] = useState(false);

    return (
        <div className={`${styles.item} ${open ? styles.itemOpen : ''}`}>
            <button
                className={styles.trigger}
                onClick={() => setOpen(o => !o)}
                aria-expanded={open}
            >
                <span className={styles.question}>{q}</span>
                <span className={styles.chevron} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </button>
            <div
                className={styles.panel}
                style={{ maxHeight: open ? '600px' : '0' }}
                aria-hidden={!open}
            >
                <div className={styles.panelInner}>
                    <p>{a}</p>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState(0);
    const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({ threshold: 0.1 });
    const { ref: bodyRef, isVisible: bodyVisible } = useScrollReveal({ threshold: 0.05 });

    return (
        <div className={styles.page}>
            <SEO
                title="FAQ – Frequently Asked Questions"
                description="Get answers to common questions about Canyon State Enterprises — services, licensing, service areas, how to get a quote, and what to expect when working with us."
                canonical="https://canyonstateaz.com/faq"
            />

            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": categories.flatMap(cat =>
                            cat.questions.map(item => ({
                                "@type": "Question",
                                "name": item.q,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": item.a
                                }
                            }))
                        )
                    })}
                </script>
            </Helmet>

            {/* ── Hero ─────────────────────────────────────────────────── */}
            <section className={styles.hero}>
                <div
                    ref={heroRef}
                    className={`${styles.heroContent} reveal ${heroVisible ? 'visible' : ''}`}
                >
                    <p className={styles.eyebrow}>Help &amp; Resources</p>
                    <h1 className={styles.headline}>Frequently Asked<br />Questions</h1>
                    <p className={styles.subheadline}>
                        Can't find what you're looking for?{' '}
                        <a href="/contact" className={styles.heroLink}>Contact our team directly →</a>
                    </p>
                </div>
            </section>

            {/* ── Category Tabs ─────────────────────────────────────────── */}
            <div className={styles.tabsWrap}>
                <div className={styles.tabs}>
                    {categories.map((cat, i) => (
                        <button
                            key={cat.label}
                            className={`${styles.tab} ${activeCategory === i ? styles.tabActive : ''}`}
                            onClick={() => setActiveCategory(i)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Q&A Panel ─────────────────────────────────────────────── */}
            <section
                ref={bodyRef}
                className={`${styles.body} reveal ${bodyVisible ? 'visible' : ''}`}
            >
                <div className={styles.container}>
                    <div className={styles.accordionList}>
                        {categories[activeCategory].questions.map((item, i) => (
                            <FAQItem key={i} q={item.q} a={item.a} />
                        ))}
                    </div>

                    {/* ── CTA Card ── */}
                    <div className={styles.cta}>
                        <div className={styles.ctaContent}>
                            <h3>Still have questions?</h3>
                            <p>Our team is available Monday–Friday, 7 AM–5 PM Arizona time.</p>
                        </div>
                        <div className={styles.ctaActions}>
                            <a href="/contact" className={styles.ctaBtn}>Request a Quote</a>
                            <a href="tel:9287579003" className={styles.ctaBtnSecondary}>(928) 757-9003</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
