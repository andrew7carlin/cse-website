import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Accordion.module.css';

// Direct import for reliable image loading
import sideImage from '../../assets/projects/Fresenius Medical Care_ KIngman Az.jpg';

const items = [
    { id: 1, title: 'Market Segments', content: 'Serving commercial, industrial, and residential sectors with specialized teams for every scale.' },
    { id: 2, title: 'Preconstruction Services', content: 'Detailed planning, clear budgeting, and feasibility analysis to clear the path before breaking ground.' },
    { id: 3, title: 'Construction Services', content: 'End-to-end execution across 12 trades. We self-perform key scopes to control quality and schedule.' },
    { id: 4, title: 'Technology & Innovation', content: 'Using modern project management tools and digital workflows to keep owners informed.' },
    { id: 5, title: 'Safety', content: 'A rigorous safety culture that protects our team, our partners, and your property.' },
    { id: 6, title: 'Sustainability', content: 'Building for the long term with energy-efficient materials and responsible waste management.' },
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
                    <h2 className="text-h2" style={{ marginBottom: '3rem' }}>What We Offer</h2>
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
