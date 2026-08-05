import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './TradeDetail.module.css';
import SEO from '../components/common/SEO';
import { allProjects } from '../data/projects';
import { tradeContent } from '../data/tradeContent';

// Import project images for service headers
import roofingImage from '../assets/projects/Abbot Apartments_Bullhead City AZ.webp';
import stuccoImage from '../assets/projects/Greenprint Apartments_Phoenix AZ.webp';
import hvacImage from '../assets/trades/hvac-hero.webp';
import plumbingImage from '../assets/projects/KRMC Medical Center Main_ Kingman Az.webp';
import resConstImage from '../assets/trades/custom-home-scottsdale-az.webp';
import comConstImage from '../assets/projects/BJ Brewhouse_  Queen Creek Az.webp';
import metalsImage from '../assets/trades/metals-hero.webp';
import masonryImage from '../assets/trades/fencing-hero.webp';
import fencingImage from '../assets/trades/fencing-hero.webp';
import guttersImage from '../assets/trades/gutters-hero.webp';
import landDevImage from '../assets/trades/land-dev-hero.webp';
import generalContractingImage from '../assets/trades/general-contracting-hero.webp';

// Data Mock - In a real app this might come from a CMS or config file
const tradeData = {
    roofing: {
        title: "Roofing",
        description: "We've been putting roofs over people's heads for years. Tile, single-ply, foam, metal, you name it. Whether you need a brand new roof, a repair, or just someone to take a look and tell it to you straight, we've got you covered.",
        image: roofingImage,
        expertise: ["Tile Roofing", "Single-Ply Systems", "Foam Roofing", "Metal Roofing", "Shingle Systems", "New Construction", "Re-roofing", "Repairs & Maintenance", "Roof Coatings", "Inspections & Assessments"],
        cta: "Let's Talk About Your Roof"
    },
    stucco: {
        title: "Stucco & EIFS",
        description: "Roofing built our foundation. Stucco built our reputation. Canyon State brought the same relentless standards to stucco that made us one of the most trusted roofing crews in the Southwest, and the results speak for themselves. From traditional 3-coat systems to modern EIFS, we finish at volume without sacrificing the craft. We also specialize in custom texture and finish work that most crews won't attempt. If you can imagine it, we can put it on a wall.",
        image: stuccoImage,
        expertise: ["Traditional 3-Coat Stucco", "EIFS Systems", "Synthetic Stucco", "Lath & Plaster", "Texture Matching", "Repair & Patching", "Color Matching", "Waterproofing"],
        cta: "Let's Get Plastered"
    },
    "general-contracting": {
        title: "General Contracting",
        description: "From concept to completion, we manage every phase of construction with precision and accountability. Our experienced team coordinates trades, schedules, and subcontractors so your project runs on time and on budget. No surprises.",
        image: generalContractingImage,
        expertise: ["Pre-Construction Planning", "Project Management", "Trade Coordination", "Budget Management", "Scheduling", "Quality Control", "Subcontractor Management", "Owner Representation", "Value Engineering", "Project Closeout"],
        cta: "Let's Build Together"
    },
    hvac: {
        title: "HVAC",
        description: "Nobody thinks about their HVAC until it stops working. We keep the air moving, the temps right, and your energy bills from getting out of hand. Installs, repairs, maintenance. We do it all.",
        image: hvacImage,
        expertise: ["AC Installation", "Heating Systems", "Ductwork", "Preventive Maintenance", "Energy Audits", "Zone Control", "Commercial HVAC", "Emergency Repairs", "Smart Thermostats", "Indoor Air Quality"],
        cta: "Fix My Climate"
    },
    plumbing: {
        title: "Plumbing",
        description: "From rough-in to finish work, we handle plumbing the way it should be done. Code compliant, leak-free, and built to last. No shortcuts, no surprises.",
        image: plumbingImage,
        expertise: ["Rough-In Plumbing", "Fixture Installation", "Water Lines", "Drain & Sewer", "Gas Lines", "Backflow Prevention", "Repiping", "Commercial Plumbing", "Leak Detection", "Emergency Service"],
        cta: "Stop the Leaks"
    },
    "res-const": {
        title: "Residential Construction",
        description: "Custom homes, renovations, additions. We build where you live. Whether it's ground-up or a major remodel, we bring the same detail and accountability to every residential project.",
        image: resConstImage,
        expertise: ["Custom Homes", "Home Additions", "Renovations", "Kitchen & Bath Remodels", "Multi-Family Units", "ADUs", "Luxury Homes", "Design-Build", "Finish Carpentry", "Green Building"],
        cta: "Build My Dream"
    },
    "com-const": {
        title: "Commercial Construction",
        description: "Retail, hospitality, industrial. We build commercial spaces that work. Fast timelines, tight budgets, zero drama. That's the Canyon State difference.",
        image: comConstImage,
        expertise: ["Tenant Improvements", "Ground-Up Construction", "Retail Build-Outs", "Office Spaces", "Hospitality Projects", "Industrial Facilities", "Design-Build", "Fast-Track Delivery", "Value Engineering", "Post-Occupancy Support"],
        cta: "Go Big"
    },
    metals: {
        title: "Specialty Metals",
        description: "Panel systems, standing seam, coping. We fabricate and install architectural aluminum that looks sharp and lasts. Custom work is our specialty.",
        image: metalsImage,
        expertise: ["Standing Seam Panels", "Aluminum Coping", "Panel Systems", "Custom Fabrication", "Fascia & Trim", "Sunshades", "Canopy Systems", "Architectural Metals", "Color Matching", "Commercial Applications"],
        cta: "Work with Aluminum"
    },
    masonry: {
        title: "Masonry",
        description: "Brick, block, stone. Masonry is as much art as it is trade. We lay every unit with precision and pride, building structures that stand the test of time.",
        image: masonryImage,
        expertise: ["Brick Laying", "Block Construction", "Stone Veneer", "Retaining Walls", "CMU Walls", "Pavers & Hardscaping", "Fireplaces", "Restoration", "Tuckpointing", "Decorative Block"],
        cta: "Lay Some Brick"
    },
    fencing: {
        title: "Fencing",
        description: "Good fences make good neighbors, and we make good fences. Commercial perimeter, residential privacy, or decorative work, we do it clean and we do it fast.",
        image: fencingImage,
        expertise: ["Chain Link", "Wrought Iron", "Wood Fencing", "Vinyl Fencing", "Privacy Fencing", "Decorative Fencing", "Gates & Operators", "Security Fencing", "Pool Fencing", "Commercial Perimeter"],
        cta: "Fence It In"
    },
    gutters: {
        title: "Seamless Gutters",
        description: "We roll gutters on-site, custom fit to your building. No seams, no leaks, no headaches. Just clean water management that actually works.",
        image: guttersImage,
        expertise: ["Seamless Aluminum Gutters", "Custom Fabrication", "Gutter Guards", "Downspouts", "Fascia Repair", "Commercial Systems", "Color Matching", "Soffit Installation", "Drip Edge", "Drainage Solutions"],
        cta: "Get Seamless Gutters"
    },
    "land-dev": {
        title: "Land Development",
        description: "From dirt to destination. We handle site work, grading, utilities, and everything in between to get your land ready for whatever comes next.",
        image: landDevImage,
        expertise: ["Site Grading", "Excavation", "Utilities Installation", "Drainage Systems", "Pad Preparation", "Demolition", "Erosion Control", "Retaining Walls", "Rough Grading", "Site Access"],
        cta: "Prep My Site"
    },
    // Default fallback for others
    default: {
        title: "Specialized Construction Service",
        description: "Whatever you need built, fixed, or maintained, we've probably done it before. Let's talk about your project.",
        image: roofingImage,
        expertise: ["Commercial Projects", "Residential Work", "Industrial Construction"],
        cta: "Start a Conversation"
    }
};

// Per-trade SEO fields from the Aug 2026 SEO-team spec. Four parallel maps:
// TRADE_TITLE (title tag — brand suffix auto-appended by SEO.jsx when absent),
// TRADE_META (meta description), TRADE_H1 (visible headline override for the
// trades the spec called out; others keep the plain trade name), and
// TRADE_SCHEMA (JSON-LD name/serviceType/description/offer-catalog — the
// visible Expertise grid still renders from data.expertise, unchanged).
const TRADE_TITLE = {
    roofing:               'Commercial & Residential Roofing Services in Southwest | Canyon State',
    stucco:                'Residential & Commercial Stucco Installation & Repair in Southwest',
    'general-contracting': 'General Contracting Services in Arizona & Nevada | Canyon State',
    hvac:                  'Residential & Commercial HVAC Services across Arizona & Nevada',
    plumbing:              'Residential & Commercial Plumbing Services Across Mohave County & the Southwest',
    'res-const':           'Residential Construction & Addition Services in Arizona & Nevada',
    'com-const':           'Commercial Construction Services across Arizona & Nevada',
    metals:                'Specialty Metal Fabrication Services Across Arizona & Nevada',
    masonry:               'Residential & Commercial Masonry Services across Arizona & Nevada',
    fencing:               'Residential & Commercial Fencing across Arizona & Nevada',
    gutters:               'Seamless Gutters Repair & Installation across Arizona & Nevada',
    'land-dev':            'Land Development Services across Arizona & Nevada',
};

const TRADE_META = {
    roofing:               'Canyon State provides commercial & residential roofing, roof repair, roof replacement, and new roof installation services across Arizona and Nevada. Contact us!',
    stucco:                'Expert residential & commercial stucco installation, repair, and replacement across the Southwest. Contact Canyon State for a free estimate.',
    'general-contracting': 'Expert general contracting for commercial & residential projects in Arizona & Nevada. Contact Canyon State for a free consultation.',
    hvac:                  'Residential & commercial HVAC installation, repair & replacement in Arizona & Nevada. Contact Canyon State for a free HVAC estimate today.',
    plumbing:              'Expert residential & commercial plumbing services across Mohave County & the Southwest. Repairs, installations & replacements. Contact Canyon State today.',
    'res-const':           'Custom homes, additions & residential construction in Arizona & Nevada. Build with Canyon State—contact us for a free consultation.',
    'com-const':           'Commercial construction for retail, healthcare, industrial & mixed-use projects in Arizona & Nevada. Contact Canyon State for a consultation.',
    metals:                'Custom specialty metal fabrication for residential & commercial projects in Arizona & Nevada. Contact Canyon State for a free consultation.',
    masonry:               'Expert residential & commercial masonry services in Arizona & Nevada. Brick, block, stone & CMU walls. Contact Canyon State today.',
    fencing:               'Residential & commercial fencing, gates, privacy & security fence installation in Arizona & Nevada. Contact Canyon State for a free estimate.',
    gutters:               'Custom seamless gutter installation, gutter guards & drainage solutions in Arizona & Nevada. Contact Canyon State for a free estimate.',
    'land-dev':            'Expert land development, site preparation & grading services in Arizona & Nevada. Contact Canyon State for a free consultation.',
};

const TRADE_H1 = {
    roofing:               'Commercial and Residential Roofing Services in Arizona & Nevada',
    stucco:                'Residential & Commercial Stucco Services Across the Southwest',
    'general-contracting': 'General Contracting Services in Arizona & Nevada',
    hvac:                  'Residential & Commercial HVAC Services in Arizona & Nevada',
    plumbing:              'Residential & Commercial Plumbing Services Across Mohave County & the Southwest',
    masonry:               'Residential & Commercial Masonry Services in Arizona & Nevada',
    fencing:               'Residential & Commercial Fencing Services in Arizona & Nevada',
};

const TRADE_SCHEMA = {
    roofing: {
        name: 'Residential & Commercial Roofing',
        serviceType: 'Roofing Services',
        description: 'Canyon State provides residential and commercial roofing services, including roof installation, roof repair, roof replacement, reroofing, inspections, and maintenance across Arizona and Nevada.',
        offers: ['Residential Roofing', 'Commercial Roofing', 'Roof Repair', 'Roof Replacement', 'New Roof Installation', 'Roof Maintenance', 'Roof Inspections'],
    },
    stucco: {
        name: 'Residential & Commercial Stucco Services',
        serviceType: 'Stucco & EIFS Services',
        description: 'Canyon State provides residential and commercial stucco services, including stucco installation, repair, replacement, EIFS systems, and exterior finishes throughout Arizona and Nevada.',
        offers: ['Residential Stucco', 'Commercial Stucco', 'Stucco Installation', 'Stucco Repair', 'Stucco Replacement', 'EIFS Installation', 'EIFS Repair'],
    },
    'general-contracting': {
        name: 'General Contracting Services',
        serviceType: 'Commercial & Residential General Contracting',
        description: 'Canyon State provides commercial and residential general contracting services, including pre-construction planning, project management, trade coordination, budgeting, scheduling, quality control, renovations, tenant improvements, and ground-up construction throughout Arizona and Nevada.',
        offers: ['Commercial General Contracting', 'Residential General Contracting', 'Pre-Construction Planning', 'Project Management', 'Trade Coordination', 'Budget Management', 'Scheduling', 'Quality Control', 'Tenant Improvements', 'Ground-Up Construction', 'Owner Representation', 'Value Engineering'],
    },
    hvac: {
        name: 'Residential & Commercial HVAC Services',
        serviceType: 'Heating & Air Conditioning Services',
        description: 'Canyon State provides residential and commercial HVAC services, including heating and cooling installation, repair, replacement, maintenance, and air conditioning solutions throughout Arizona and Nevada.',
        offers: ['Residential HVAC', 'Commercial HVAC', 'HVAC Installation', 'HVAC Repair', 'HVAC Replacement', 'Air Conditioning Services', 'Heating Services', 'HVAC Maintenance'],
    },
    plumbing: {
        name: 'Residential & Commercial Plumbing Services',
        serviceType: 'Plumbing Services',
        description: 'Canyon State provides residential and commercial plumbing services, including plumbing installation, repair, replacement, maintenance, drain solutions, water line services, and plumbing system upgrades throughout Arizona and Nevada.',
        offers: ['Residential Plumbing', 'Commercial Plumbing', 'Plumbing Installation', 'Plumbing Repair', 'Plumbing Replacement', 'Drain Cleaning', 'Water Line Services', 'Leak Detection & Repair', 'Fixture Installation', 'Plumbing Maintenance'],
    },
    'res-const': {
        name: 'Residential Construction Services',
        serviceType: 'Residential Construction',
        description: 'Canyon State provides residential construction services including custom homes, home additions, renovations, remodeling, multi-family construction, and design-build solutions throughout Arizona and Nevada.',
        offers: ['Custom Home Construction', 'Home Additions', 'Home Renovations', 'Home Remodeling', 'Multi-Family Construction', 'Design-Build Construction', 'Residential Project Management'],
    },
    'com-const': {
        name: 'Commercial Construction Services',
        serviceType: 'Commercial Construction',
        description: 'Canyon State provides commercial construction services including ground-up construction, tenant improvements, renovations, project management, healthcare, retail, hospitality, industrial, and mixed-use construction throughout Arizona and Nevada.',
        offers: ['Ground-Up Commercial Construction', 'Tenant Improvements', 'Commercial Renovations', 'Healthcare Construction', 'Retail Construction', 'Hospitality Construction', 'Industrial Construction', 'Mixed-Use Construction', 'Project Management', 'Design-Build Construction'],
    },
    metals: {
        name: 'Specialty Metal Fabrication Services',
        serviceType: 'Metal Fabrication',
        description: 'Canyon State provides custom specialty metal fabrication services for residential and commercial construction, including structural steel, architectural metals, welding, fabrication, installation, and custom metal solutions across Arizona and Nevada.',
        offers: ['Custom Metal Fabrication', 'Structural Steel Fabrication', 'Architectural Metal Fabrication', 'Commercial Metal Fabrication', 'Residential Metal Fabrication', 'Metal Welding', 'Metal Installation', 'Decorative Metalwork'],
    },
    masonry: {
        name: 'Residential & Commercial Masonry Services',
        serviceType: 'Masonry Services',
        description: 'Canyon State provides residential and commercial masonry services, including brick laying, block construction, stone veneer, CMU walls, retaining walls, fireplaces, pavers, hardscaping, restoration, and tuckpointing across Arizona and Nevada.',
        offers: ['Residential Masonry', 'Commercial Masonry', 'Brick Laying', 'Block Construction', 'Stone Veneer', 'CMU Walls', 'Retaining Walls', 'Pavers & Hardscaping', 'Fireplaces', 'Masonry Restoration', 'Tuckpointing', 'Decorative Block'],
    },
    fencing: {
        name: 'Residential & Commercial Fencing Services',
        serviceType: 'Fence Installation & Repair',
        description: 'Canyon State provides residential and commercial fencing services including chain link, wrought iron, wood, vinyl, privacy, decorative, security, pool fencing, gates, and commercial perimeter fencing across Arizona and Nevada.',
        offers: ['Residential Fencing', 'Commercial Fencing', 'Chain Link Fencing', 'Wood Fencing', 'Vinyl Fencing', 'Wrought Iron Fencing', 'Privacy Fencing', 'Decorative Fencing', 'Security Fencing', 'Pool Fencing', 'Commercial Perimeter Fencing', 'Gates & Gate Operators'],
    },
    gutters: {
        name: 'Seamless Gutter Services',
        serviceType: 'Residential & Commercial Gutter Installation',
        description: 'Canyon State provides seamless gutter installation, custom aluminum gutters, gutter guards, downspouts, fascia repair, soffit installation, drip edge, commercial gutter systems, and drainage solutions throughout Arizona and Nevada.',
        offers: ['Seamless Gutter Installation', 'Custom Aluminum Gutters', 'Gutter Guards', 'Downspout Installation', 'Commercial Gutter Systems', 'Fascia Repair', 'Soffit Installation', 'Drip Edge Installation', 'Drainage Solutions'],
    },
    'land-dev': {
        name: 'Land Development Services',
        serviceType: 'Commercial & Residential Land Development',
        description: 'Canyon State provides commercial and residential land development services, including site preparation, grading, excavation, utility installation, drainage, road construction, infrastructure development, and project management throughout Arizona and Nevada.',
        offers: ['Site Preparation', 'Grading & Excavation', 'Utility Installation', 'Road Construction', 'Drainage & Stormwater Management', 'Infrastructure Development', 'Commercial Land Development', 'Residential Land Development', 'Project Management'],
    },
};

const TradeDetail = () => {
    const { tradeId } = useParams();
    const data = tradeData[tradeId] || tradeData.default;

    const tradeCategoryMap = {
        'roofing':   null,
        'stucco':    null,
        'hvac':      null,
        'plumbing':  null,
        'res-const': ['custom-home', 'development', 'model-home'],
        'com-const': ['hospitality', 'multi-family', 'industrial'],
        'metals':    ['industrial'],
        'masonry':   ['government', 'medical'],
        'fencing':   ['development'],
        'gutters':   ['custom-home', 'development'],
        'land-dev':  ['development'],
        'general-contracting': null,
    };

    const content = tradeContent[tradeId];

    const categories = tradeCategoryMap[tradeId];
    const relatedProjects = categories
        ? allProjects.filter(p => categories.includes(p.category)).slice(0, 6)
        : allProjects.filter(p => p.src).slice(0, 6);

    return (
        <div className={styles.page}>
            <SEO
                title={TRADE_TITLE[tradeId] || `${data.title} Services`}
                description={TRADE_META[tradeId] || data.description}
                canonical={`https://canyonstateaz.com/services/${tradeId}`}
            />

            {/* Per-trade Service schema. Tells Google this URL describes a
                specific service (the trade) offered by the parent organization,
                with explicit area-served and provider reference back to the
                site-wide LocalBusiness @id.
                hasOfferCatalog enumerates the concrete sub-services we perform
                under this trade (drawn from data.expertise so it stays in sync
                with the page content) — gives Google a structured inventory of
                offerings per trade, which is a recognized signal for service-
                provider rich results. provider uses @id to reference the
                site-wide GeneralContractor entity from SchemaMarkup.jsx
                instead of duplicating its fields, keeping the @graph clean
                and the HTML small. */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Service',
                        '@id': `https://canyonstateaz.com/services/${tradeId}#service`,
                        name: TRADE_SCHEMA[tradeId]?.name || data.title,
                        serviceType: TRADE_SCHEMA[tradeId]?.serviceType || data.title,
                        url: `https://canyonstateaz.com/services/${tradeId}`,
                        description: TRADE_SCHEMA[tradeId]?.description || data.description,
                        provider: { '@id': 'https://canyonstateaz.com/#organization' },
                        areaServed: [
                            { '@type': 'State', name: 'Arizona' },
                            { '@type': 'State', name: 'Nevada' },
                        ],
                        hasOfferCatalog: {
                            '@type': 'OfferCatalog',
                            name: `${TRADE_SCHEMA[tradeId]?.name || data.title} Catalog`,
                            itemListElement: (TRADE_SCHEMA[tradeId]?.offers || data.expertise || []).map((offering) => ({
                                '@type': 'Offer',
                                itemOffered: {
                                    '@type': 'Service',
                                    name: offering,
                                },
                            })),
                        },
                        inLanguage: 'en-US',
                    }),
                }}
            />
            <div className={styles.hero}>
                {/* Real <img> (not CSS bg) so the preload scanner finds the LCP image. */}
                <img
                    className={styles.heroImg}
                    src={data.image}
                    alt=""
                    aria-hidden="true"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                />
                <div className={styles.heroOverlay}>
                    <div className={styles.container}>
                        <span className={styles.eyebrow}>Services / {data.title}</span>
                        <h1 className={styles.title}>{TRADE_H1[tradeId] || data.title}</h1>
                    </div>
                </div>
            </div>

            <div className={`${styles.container} ${styles.contentSection}`}>
                <div className={styles.grid}>
                    <div className={styles.mainContent}>
                        <h2 className="text-h2">Overview</h2>
                        <p className={styles.description}>{data.description}</p>

                        <h3 className="text-h3" style={{ marginTop: '3rem', marginBottom: '1.25rem' }}>Our Expertise</h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '0',
                            border: '1px solid rgba(184,115,51,0.18)',
                            borderRadius: '4px',
                            overflow: 'hidden',
                        }}>
                            {data.expertise.map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.875rem 1rem',
                                    borderBottom: '1px solid rgba(184,115,51,0.1)',
                                    borderRight: '1px solid rgba(184,115,51,0.1)',
                                    background: i % 2 === 0 ? 'rgba(184,115,51,0.03)' : 'transparent',
                                }}>
                                    <span style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: '#b87333',
                                        flexShrink: 0,
                                    }} />
                                    <span style={{
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                        color: 'var(--color-text-main, #1a1a1a)',
                                    }}>{item}</span>
                                </div>
                            ))}
                        </div>

                        {content && (
                            <>
                                <h2 className="text-h2" style={{ marginTop: '3rem' }}>
                                    What {data.title} Work We Handle
                                </h2>
                                <p className={styles.description}>{content.scope}</p>

                                <h2 className="text-h2" style={{ marginTop: '3rem' }}>
                                    Why Canyon State for {data.title}
                                </h2>
                                <p className={styles.description}>{content.why}</p>

                                <h2 className="text-h2" style={{ marginTop: '3rem' }}>
                                    What to Expect
                                </h2>
                                <p className={styles.description}>{content.process}</p>
                            </>
                        )}
                    </div>

                    <div className={styles.sidebar}>
                        <div className={styles.ctaCard}>
                            <h3>Ready to Get Started?</h3>
                            <p>Let's talk about what you need. No sales pitch, just honest advice.</p>
                            <Link to="/contact" className={styles.btn}>{data.cta}</Link>
                        </div>
                    </div>
                </div>
            </div>

            {relatedProjects.length > 0 && (
                <section style={{
                    padding: '4rem 2rem',
                    background: 'var(--color-bg-base)',
                    borderTop: '1px solid rgba(184,115,51,0.15)'
                }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <h2 style={{ fontSize: 'var(--font-size-h2, 1.75rem)', fontWeight: 'var(--font-weight-light)', color: 'var(--color-text-main)', margin: 0 }}>
                                Related Projects
                            </h2>
                            <Link
                                to={categories && ['custom-home', 'development', 'model-home'].some(c => categories.includes(c))
                                    ? '/portfolio/residential'
                                    : '/portfolio/commercial'}
                                style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase',
                                    letterSpacing: '0.15em', color: '#b87333', textDecoration: 'none' }}
                            >
                                View All Projects →
                            </Link>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                            {relatedProjects.map(project => (
                                <Link
                                    key={project.id}
                                    to={`/portfolio/${project.id}`}
                                    style={{ display: 'block', textDecoration: 'none', borderRadius: '4px',
                                        overflow: 'hidden', background: '#111',
                                        border: '1px solid rgba(184,115,51,0.15)',
                                        transition: 'border-color 0.3s ease, transform 0.3s ease' }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = '#00b4b4';
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'rgba(184,115,51,0.15)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                                        <img
                                            src={project.src}
                                            alt={`${project.name} — ${project.location}`}
                                            width="1024"
                                            height="576"
                                            loading="lazy"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover',
                                                transition: 'transform 0.5s ease' }}
                                        />
                                    </div>
                                    <div style={{ padding: '0.875rem 1rem', background: '#0d0d0d' }}>
                                        <p style={{ margin: '0 0 0.25rem', fontSize: '0.9375rem',
                                            fontWeight: 600, color: '#b87333' }}>{project.name}</p>
                                        <p style={{ margin: 0, fontSize: '0.8125rem', color: '#6b7280' }}>
                                            {project.location}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default TradeDetail;
