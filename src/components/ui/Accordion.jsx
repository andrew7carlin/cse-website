import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Accordion.module.css';

// Direct import for reliable image loading
import sideImage from '../../assets/projects/Fresenius Medical Care_ KIngman Az.webp';

const items = [
    { id: 1, title: 'Who We Serve', content: 'Commercial, industrial, and high-end residential. We bring institutional rigor to every project, regardless of scale.' },
    { id: 2, title: 'Smart Planning', content: 'No surprises. We map out the budget, schedule, and logistics before a single shovel hits the dirt.' },
    { id: 3, title: 'Self-Performed Power', content: 'We aren\'t just paper contractors. We self-perform 12+ trades, giving us—and you—total control over quality and timelines.' },
    { id: 4, title: 'Modern Process', content: 'Old school work ethic met with modern efficiency. We use the best tools to keep projects moving and owners informed.' },
    { id: 5, title: 'Uncompromised Safety', content: 'Our safety record isn\'t just a stat; it\'s a promise. We protect our people and your liability with relentless standards.' },
    { id: 6, title: 'Built to Last', content: 'We build for the long haul. Quality materials and expert craftsmanship mean structures that stand the test of time.' },
];

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const { ref: imageRef, isVisible: imageVisible } = useScrollReveal({ threshold: 0.2 });
    const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({ threshold: 0.1 });

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className={styles.section}>
            <div className={styles.split}>
                <div
                    ref={imageRef}
                    className={`${styles.imageCol} reveal-scale ${imageVisible ? 'visible' : ''}`}
                >
                    <div
                        className={styles.bgImage}
                        style={{ backgroundImage: `url(${sideImage})` }}
                    ></div>
                </div>
                <div
                    ref={contentRef}
                    className={`${styles.contentCol} reveal ${contentVisible ? 'visible' : ''}`}
                >
                    <h2 className="text-h2" style={{ marginBottom: '3rem' }}>The Canyon State Approach</h2>
                    <div className={styles.list}>
                        {items.map((item, index) => (
                            <div key={item.id} className={`${styles.item} ${activeIndex === index ? styles.active : ''}`}>
                                <button className={styles.trigger} onClick={() => toggle(index)}>
                                    <span className={styles.title}>{item.title}</span>
                                    <span className={styles.icon}>{activeIndex === index ? '−' : '+'}</span>
                                </button>
                                <div className={styles.panel} style={{ maxHeight: activeIndex === index ? '200px' : '0' }}>
                                    <div className={styles.panelContent}>
                                        {item.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Accordion;
