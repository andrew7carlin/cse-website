import { Link } from 'react-router-dom';
import Timeline from '../components/ui/Timeline';
import LeadershipSection from '../components/ui/LeadershipSection';
import { loadProjectAssets } from '../utils/assetLoader';
import styles from './About.module.css';

// Timeline placeholder images
import timeline2005 from '../assets/projects/Custom Home_Kingman Az_5.webp';
import timeline2010 from '../assets/projects/Greenprint Apartments_Phoenix AZ.webp';
import timeline2015 from '../assets/projects/28th and Sunrise_Las Vegas Nv.webp';
import timeline2019 from '../assets/projects/EOS Fitness_Tempe Az.webp';
import timeline2024 from '../assets/projects/Aquila Place_ Apache Junction_(2).webp';

// Hero image
import heroImage from '../assets/projects/Hyundai Gilbert_Gilbert Az.webp';

const About = () => {
    const values = [
        {
            title: "One Team",
            description: "By self-performing our trades, we control the schedule, quality, and safety of every project. No finger-pointing—just results."
        },
        {
            title: "Integrity First",
            description: "We stand behind our word and our work. Relationships built on trust last longer than any building we construct."
        },
        {
            title: "Safety Always",
            description: "Everyone goes home safe. Our commitment to safety isn't a checkbox—it's woven into everything we do."
        },
        {
            title: "Quality Obsessed",
            description: "We obsess over every detail because our name is on every project. Good enough isn't in our vocabulary."
        }
    ];

    const timelineEvents = [
        {
            year: "2005",
            title: "Small Beginnings",
            description: "Founded in Arizona with a single roofing crew and a commitment to quality that set us apart from day one.",
            image: timeline2005
        },
        {
            year: "2010",
            title: "Expanding Trades",
            description: "Added stucco and HVAC divisions, establishing our multi-trade approach that gives clients a single point of accountability.",
            image: timeline2010
        },
        {
            year: "2015",
            title: "Regional Growth",
            description: "Expanded operations across Nevada and the broader Southwest region, completing landmark commercial projects.",
            image: timeline2015
        },
        {
            year: "2019",
            title: "Going Vertical",
            description: "Launched full construction services, becoming a true general contractor while maintaining our trade expertise.",
            image: timeline2019
        },
        {
            year: "2024",
            title: "West Coast Reach",
            description: "Building the future of the west coast with offices in multiple states and a portfolio spanning commercial, residential, and industrial sectors.",
            image: timeline2024
        }
    ];

    return (
        <div className="about-page">
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
                                general contractor who subs everything out—you're partnering with craftsmen who take personal pride in their work.
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
                        <p>Our values aren't wall decorations—they're how we make decisions every day.</p>
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

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Ready to Build Something Great?</h2>
                        <p>Let's talk about your next project.</p>
                        <a href="/contact" className={styles.ctaButton}>Get in Touch</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
