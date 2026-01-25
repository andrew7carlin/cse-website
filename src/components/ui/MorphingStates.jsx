import { useEffect, useState } from 'react';
import styles from './MorphingStates.module.css';

const MorphingStates = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Actual state outline polygons (clip-path coordinates)
    const states = [
        {
            abbrev: 'AZ',
            name: 'Arizona',
            // Arizona: Rectangular with jagged SW corner (Colorado River/Grand Canyon edge)
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 35% 100%, 30% 85%, 20% 75%, 15% 100%, 0% 100%)'
        },
        {
            abbrev: 'NV',
            name: 'Nevada',
            // Nevada: Wedge shape - wider at top, pointed at bottom
            clipPath: 'polygon(15% 0%, 100% 0%, 100% 15%, 85% 100%, 35% 100%, 0% 20%)'
        },
        {
            abbrev: 'UT',
            name: 'Utah',
            // Utah: Rectangle with notch cut out of top-right corner
            clipPath: 'polygon(0% 0%, 65% 0%, 65% 30%, 100% 30%, 100% 100%, 0% 100%)'
        },
        {
            abbrev: 'NM',
            name: 'New Mexico',
            // New Mexico: Nearly rectangular with small jog on east side
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 35%, 92% 35%, 92% 100%, 0% 100%)'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % states.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const currentState = states[currentIndex];

    return (
        <div className={styles.container}>
            <div
                className={styles.shape}
                style={{ clipPath: currentState.clipPath }}
            />
            <div className={styles.textOverlay}>
                <span className={styles.stateAbbrev} key={currentState.abbrev}>
                    {currentState.abbrev}
                </span>
                <span className={styles.stateName} key={`name-${currentState.abbrev}`}>
                    {currentState.name}
                </span>
            </div>
        </div>
    );
};

export default MorphingStates;
