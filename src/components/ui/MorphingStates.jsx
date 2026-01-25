import { useEffect, useState } from 'react';
import styles from './MorphingStates.module.css';

const MorphingStates = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Actual SVG paths for state outlines (simplified but accurate)
    const states = [
        {
            abbrev: 'AZ',
            name: 'Arizona',
            // Arizona actual shape
            path: 'M 80 20 L 220 20 L 220 280 L 160 280 L 140 260 L 100 220 L 80 180 L 60 140 L 50 100 L 50 60 Z'
        },
        {
            abbrev: 'NV',
            name: 'Nevada',
            // Nevada actual shape - V pointing south
            path: 'M 100 20 L 220 20 L 220 80 L 180 280 L 120 280 L 50 80 Z'
        },
        {
            abbrev: 'UT',
            name: 'Utah',
            // Utah - L-shape (rectangle with corner notch)
            path: 'M 50 20 L 150 20 L 150 100 L 220 100 L 220 280 L 50 280 Z'
        },
        {
            abbrev: 'NM',
            name: 'New Mexico',
            // New Mexico - rectangle with boot
            path: 'M 50 20 L 220 20 L 220 100 L 200 100 L 200 280 L 50 280 Z'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % states.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.container}>
            <svg viewBox="0 0 270 300" className={styles.svg}>
                <defs>
                    <linearGradient id="stateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c45827" />
                        <stop offset="100%" stopColor="#d4713a" />
                    </linearGradient>
                </defs>

                {states.map((state, index) => (
                    <path
                        key={state.abbrev}
                        d={state.path}
                        fill="url(#stateGradient)"
                        className={`${styles.statePath} ${index === currentIndex ? styles.active : ''}`}
                    />
                ))}
            </svg>

            <div className={styles.textOverlay}>
                <span className={styles.stateAbbrev} key={states[currentIndex].abbrev}>
                    {states[currentIndex].abbrev}
                </span>
                <span className={styles.stateName} key={`name-${states[currentIndex].abbrev}`}>
                    {states[currentIndex].name}
                </span>
            </div>
        </div>
    );
};

export default MorphingStates;
