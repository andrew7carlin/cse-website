import React from 'react';
import styles from './Timeline.module.css';

const Timeline = ({ events }) => {
    return (
        <div className={styles.timeline}>
            <div className={styles.track}>
                {/* The connecting line */}
                <div className={styles.line}></div>

                {/* Timeline events */}
                <div className={styles.events}>
                    {events.map((event, index) => (
                        <div
                            key={index}
                            className={styles.event}
                            style={{ animationDelay: `${index * 0.15}s` }}
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
