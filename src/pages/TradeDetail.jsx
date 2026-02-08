import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './TradeDetail.module.css';
import SEO from '../components/common/SEO';

// Import project images for service headers
import roofingImage from '../assets/projects/La Quinta Hotel_ KIngman Az.webp';
import stuccoImage from '../assets/projects/Greenprint Apartments_Phoenix AZ.webp';
import hvacImage from '../assets/projects/HVAC.webp';

// Data Mock - In a real app this might come from a CMS or config file
const tradeData = {
    roofing: {
        title: "Roofing",
        description: "We've been putting roofs over people's heads for years—tile, single-ply, foam, metal, you name it. Whether you need a brand new roof, a repair, or just someone to take a look and tell it to you straight, we've got you covered.",
        image: roofingImage,
        expertise: ["Tile Roofing", "Single-Ply Systems", "Foam Roofing", "Metal Roofing", "Shingle Systems", "New Construction", "Re-roofing", "Repairs & Maintenance", "Roof Coatings", "Inspections & Assessments"],
        cta: "Let's Talk About Your Roof"
    },
    stucco: {
        title: "Stucco & EIFS",
        description: "Stucco isn't just about slapping some plaster on a wall—it's a craft. We do everything from old-school 3-coat systems to modern EIFS, and we make sure it's done right so it lasts.",
        image: stuccoImage,
        expertise: ["Traditional 3-Coat Stucco", "EIFS Systems", "Synthetic Stucco", "Lath & Plaster", "Texture Matching", "Repair & Patching", "Color Matching", "Waterproofing"],
        cta: "Let's Get Plastered"
    },
    hvac: {
        title: "HVAC",
        description: "Nobody thinks about their HVAC until it stops working. We keep the air moving, the temps right, and your energy bills from getting out of hand. Installs, repairs, maintenance—we do it all.",
        image: hvacImage,
        expertise: ["AC Installation", "Heating Systems", "Ductwork", "Preventive Maintenance", "Energy Audits", "Zone Control", "Commercial HVAC", "Emergency Repairs", "Smart Thermostats", "Indoor Air Quality"],
        cta: "Fix My Climate"
    },
    plumbing: {
        title: "Plumbing",
        description: "From rough-in to finish work, we handle plumbing the way it should be done—code compliant, leak-free, and built to last. No shortcuts, no surprises.",
        image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=2670",
        expertise: ["Rough-In Plumbing", "Fixture Installation", "Water Lines", "Drain & Sewer", "Gas Lines", "Backflow Prevention", "Repiping", "Commercial Plumbing", "Leak Detection", "Emergency Service"],
        cta: "Stop the Leaks"
    },
    "res-const": {
        title: "Residential Construction",
        description: "Custom homes, renovations, additions—we build where you live. Whether it's ground-up or a major remodel, we bring the same detail and accountability to every residential project.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2670",
        expertise: ["Custom Homes", "Home Additions", "Renovations", "Kitchen & Bath Remodels", "Multi-Family Units", "ADUs", "Luxury Homes", "Design-Build", "Finish Carpentry", "Green Building"],
        cta: "Build My Dream"
    },
    "com-const": {
        title: "Commercial Construction",
        description: "Retail, hospitality, industrial—we build commercial spaces that work. Fast timelines, tight budgets, zero drama. That's the Canyon State difference.",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2670",
        expertise: ["Tenant Improvements", "Ground-Up Construction", "Retail Build-Outs", "Office Spaces", "Hospitality Projects", "Industrial Facilities", "Design-Build", "Fast-Track Delivery", "Value Engineering", "Post-Occupancy Support"],
        cta: "Go Big"
    },
    metals: {
        title: "Specialty Metals",
        description: "Panel systems, standing seam, coping—we fabricate and install architectural aluminum that looks sharp and lasts. Custom work is our specialty.",
        image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=80&w=2670",
        expertise: ["Standing Seam Panels", "Aluminum Coping", "Panel Systems", "Custom Fabrication", "Fascia & Trim", "Sunshades", "Canopy Systems", "Architectural Metals", "Color Matching", "Commercial Applications"],
        cta: "Work with Aluminum"
    },
    masonry: {
        title: "Masonry",
        description: "Brick, block, stone—masonry is as much art as it is trade. We lay every unit with precision and pride, building structures that stand the test of time.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2670",
        expertise: ["Brick Laying", "Block Construction", "Stone Veneer", "Retaining Walls", "CMU Walls", "Pavers & Hardscaping", "Fireplaces", "Restoration", "Tuckpointing", "Decorative Block"],
        cta: "Lay Some Brick"
    },
    fencing: {
        title: "Fencing",
        description: "Good fences make good neighbors—and we make good fences. Commercial perimeter, residential privacy, or decorative work, we do it clean and we do it fast.",
        image: "https://images.unsplash.com/photo-1600493572882-f2f31a801c9c?auto=format&fit=crop&q=80&w=2670",
        expertise: ["Chain Link", "Wrought Iron", "Wood Fencing", "Vinyl Fencing", "Privacy Fencing", "Decorative Fencing", "Gates & Operators", "Security Fencing", "Pool Fencing", "Commercial Perimeter"],
        cta: "Fence It In"
    },
    gutters: {
        title: "Seamless Gutters",
        description: "We roll gutters on-site, custom fit to your building. No seams, no leaks, no headaches. Just clean water management that actually works.",
        image: "https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?auto=format&fit=crop&q=80&w=2670",
        expertise: ["Seamless Aluminum Gutters", "Custom Fabrication", "Gutter Guards", "Downspouts", "Fascia Repair", "Commercial Systems", "Color Matching", "Soffit Installation", "Drip Edge", "Drainage Solutions"],
        cta: "Get Seamless Gutters"
    },
    "land-dev": {
        title: "Land Development",
        description: "From dirt to destination. We handle site work, grading, utilities, and everything in between to get your land ready for whatever comes next.",
        image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=2670",
        expertise: ["Site Grading", "Excavation", "Utilities Installation", "Drainage Systems", "Pad Preparation", "Demolition", "Erosion Control", "Retaining Walls", "Rough Grading", "Site Access"],
        cta: "Prep My Site"
    },
    auto: {
        title: "Car & Truck Sales",
        description: "Quality commercial trucks and work vehicles at fair prices. We know what contractors need because we ARE contractors. No games, no gimmicks—just solid trucks for solid work.",
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=2670",
        expertise: ["Work Trucks", "Commercial Vehicles", "Fleet Sales", "Used Trucks", "Service Bodies", "Utility Beds", "Upfitting", "Financing Available", "Trade-Ins Welcome", "Delivery Available"],
        cta: "Find My Truck"
    },
    // Default fallback for others
    default: {
        title: "Specialized Construction Service",
        description: "Whatever you need built, fixed, or maintained—we've probably done it before. Let's talk about your project.",
        image: "https://images.unsplash.com/photo-1535732820275-9ffd998cac22?auto=format&fit=crop&q=80&w=2670",
        expertise: ["Commercial Projects", "Residential Work", "Industrial Construction"],
        cta: "Start a Conversation"
    }
};

const TradeDetail = () => {
    const { tradeId } = useParams();
    const data = tradeData[tradeId] || tradeData.default;

    return (
        <div className={styles.page}>
            <SEO
                title={`${data.title} Services - Expert ${data.title} Contractors`}
                description={data.description}
                canonical={`https://canyonstate.netlify.app/services/${tradeId}`}
            />
            <div className={styles.hero} style={{ backgroundImage: `url(${data.image})` }}>
                <div className={styles.heroOverlay}>
                    <div className={styles.container}>
                        <span className={styles.eyebrow}>Services / {tradeId}</span>
                        <h1 className={styles.title}>{data.title}</h1>
                    </div>
                </div>
            </div>

            <div className={`${styles.container} ${styles.contentSection}`}>
                <div className={styles.grid}>
                    <div className={styles.mainContent}>
                        <h2 className="text-h2">Overview</h2>
                        <p className={styles.description}>{data.description}</p>

                        <h3 className="text-h3" style={{ marginTop: '3rem', marginBottom: '1rem' }}>Our Expertise</h3>
                        <div className={styles.expertiseScroller}>
                            <ul className={styles.expertiseList}>
                                {/* Duplicate items for seamless infinite scroll */}
                                {[...data.expertise, ...data.expertise].map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={styles.sidebar}>
                        <div className={styles.ctaCard}>
                            <h3>Ready to Get Started?</h3>
                            <p>Let's talk about what you need. No sales pitch—just honest advice.</p>
                            <Link to="/contact" className={styles.btn}>{data.cta}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TradeDetail;
