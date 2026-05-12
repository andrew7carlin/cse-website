import { Link } from 'react-router-dom';
import Timeline from '../components/ui/Timeline';
import LeadershipSection from '../components/ui/LeadershipSection';
import TeamSection from '../components/ui/TeamSection';
import SEO from '../components/common/SEO';
import styles from './About.module.css';

// Timeline placeholder images
import timeline2005 from '../assets/projects/Custom Home_Kingman Az_5.webp';
import timeline2010 from '../assets/projects/Greenprint Apartments_Phoenix AZ.webp';
import timeline2015 from '../assets/projects/28th and Sunrise_Las Vegas Nv.webp';
import timeline2019 from '../assets/projects/EOS Fitness_Tempe Az.webp';
import timeline2024 from '../assets/projects/Aquila Place_ Apache Junction_(2).webp';

// Hero image
import heroImage from '../assets/projects/Hyundai Gilbert_Gilbert Az.webp';
import droneTeamImg from '../assets/about/drone-team.webp';

const About = () => {
    const values = [
        {
            title: "One Team",
            description: "By self-performing our trades, we control the schedule, quality, and safety of every project. No finger-pointing, just results."
        },
        {
            title: "Integrity First",
            description: "We stand behind our word and our work. Relationships built on trust last longer than any building we construct."
        },
        {
            title: "Safety Always",
            description: "Everyone goes home safe. Our commitment to safety isn't a checkbox. It's woven into everything we do."
        },
        {
            title: "Quality Obsessed",
            description: "We obsess over every detail because our name is on every project. Good enough isn't in our vocabulary."
        }
    ];

    const timelineEvents = [
        {
            year: "2001",
            title: "Canyon State Formed",
            description: "Founded in Kingman with a single roofing crew and a commitment to quality.",
            image: timeline2005
        },
        {
            year: "2006",
            title: "Stucco & Stone Veneer Added",
            description: "Added stucco and stone veneer scopes to the trade lineup.",
            image: timeline2010
        },
        {
            year: "2016",
            title: "HVAC Scope Added",
            description: "Launched HVAC, expanding into mechanical trades."
        },
        {
            year: "2017",
            title: "A-2-Z Roofing Acquired",
            description: "Purchased A-2-Z Roofing Inc., adding capacity and market reach.",
            image: timeline2015
        },
        {
            year: "2020",
            title: "Merger & Kingman Expansion",
            description: "Canyon State and A-2-Z merge. First Kingman office expansion to accommodate growth."
        },
        {
            year: "2022",
            title: "Pro Tech Roofing & 66 Auto Sales",
            description: "Acquired Pro Tech Roofing and 66 Auto Sales.",
            image: timeline2019
        },
        {
            year: "2023",
            title: "Craftwork Fence & Freedom Auto Sales",
            description: "Acquired Craftwork Fence and Freedom Auto Sales."
        },
        {
            year: "2023",
            title: "Phoenix Branch Opens",
            description: "Opened the Phoenix branch.",
            image: timeline2024
        },
        {
            year: "2024",
            title: "Las Vegas Branch Opens",
            description: "Opened the Las Vegas branch, Canyon State's first Nevada office."
        },
        {
            year: "2025",
            title: "Gonzalez Merger, Plumbing & Expansion",
            description: "Merged stucco operations with Gonzalez Wall Systems. Second Kingman office expansion. Acquired Kingman Quality Plumbing."
        }
    ];

    return (
        <div className="about-page">
            <SEO
                title="About Us - Our Story, Values & Leadership"
                description="Since 2001. 25 years building the Southwest. Canyon State Enterprises is a multi-trade construction powerhouse with 12+ self-performed trades, serving Arizona, Nevada, Utah, and New Mexico."
                canonical="https://canyonstateaz.com/about"
            />
            {/* Full-Bleed Hero */}
            <section className={styles.fullHero}>
                <div className={styles.heroBg} style={{ backgroundImage: `url(${heroImage})` }}></div>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <span className={styles.heroLabel}>ABOUT US</span>
                    <h1 className={styles.heroHeadline}>We Are<br />Canyon State</h1>
                    <p className={styles.heroSubline}>Arizona roots. Southwest reach. One team.</p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className={styles.storySection}>
                <div className="container">
                    <div className={styles.storyGrid}>
                        <div className={styles.storyHeading}>
                            <h2>Our Story</h2>
                        </div>
                        <div className={styles.storyContent}>
                            <p>
                                Canyon State Enterprises was founded on a simple principle: do good work, and treat people right.
                                What started as a small local operation has grown into a multi-trade powerhouse serving the entire Southwest.
                            </p>
                            <p>
                                We believe in the power of "One Team." By self-performing many of our trades, we control the schedule,
                                the quality, and the safety of every project. When you work with Canyon State, you're not hiring a
                                general contractor who subs everything out. You're partnering with craftsmen who take personal pride in their work.
                            </p>
                            <p>
                                From roofing to stucco, HVAC to full construction services, our integrated approach means fewer delays,
                                better communication, and superior quality control. One team. Multiple trades. Zero excuses.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className={styles.valuesSection}>
                <div className="container">
                    <div className={styles.valuesHeader}>
                        <h2>What We Stand For</h2>
                        <p>Our values aren't wall decorations. They're how we make decisions every day.</p>
                    </div>
                    <div className={styles.valuesGrid}>
                        {values.map((value, index) => (
                            <div key={index} className={styles.valueCard}>
                                <span className={styles.valueNumber}>0{index + 1}</span>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className={styles.timelineSection}>
                <div className="container">
                    <div className={styles.timelineHeader}>
                        <h2>Our Journey</h2>
                        <p>Nearly two decades of building the Southwest, one project at a time.</p>
                    </div>
                    <Timeline events={timelineEvents} />
                </div>
            </section>

            {/* Leadership Section */}
            <LeadershipSection />

            {/* Team Section */}
            <TeamSection />

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Sick of subcontractor headaches?</h2>
                        <p>Let us fix that</p>
                        <a href="/contact" className={styles.ctaButton}>Get in Touch</a>
                    </div>
                </div>
            </section>

            {/* Drone Team Photo */}
            <section className={styles.droneSection}>
                <div className={styles.droneHeader}>
                    <h2>The Canyon State Team</h2>
                </div>
                <img
                    src={droneTeamImg}
                    alt="The Canyon State Enterprises team"
                    className={styles.droneImg}
                    loading="lazy"
                />
            </section>
        </div>
    );
};

export default About;
