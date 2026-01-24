import React, { useState } from 'react';
import styles from './Timeline.module.css';

const Timeline = ({ events }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className={styles.timeline}>
            {/* Hover Image Preview */}
            <div className={styles.imagePreview}>
                {events.map((event, index) => (
                    <div
                        key={index}
                        className={`${styles.previewImage} ${hoveredIndex === index ? styles.visible : ''}`}
                    >
                        {event.image && (
                            <img src={event.image} alt={event.title} />
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.track}>
                {/* The connecting line */}
                <div className={styles.line}></div>

                {/* Timeline events */}
                <div className={styles.events}>
                    {events.map((event, index) => (
                        <div
                            key={index}
                            className={`${styles.event} ${hoveredIndex === index ? styles.active : ''}`}
                            style={{ animationDelay: `${index * 0.15}s` }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className={styles.marker}>
                                <span className={styles.year}>{event.year}</span>
                                <div className={styles.dot}></div>
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.title}>{event.title}</h3>
                                <p className={styles.description}>{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
