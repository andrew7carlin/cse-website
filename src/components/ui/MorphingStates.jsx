import { useEffect, useState } from 'react';
import styles from './MorphingStates.module.css';

const MorphingStates = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Actual state outline polygons (clip-path coordinates)
    const states = [
        {
            abbrev: 'AZ',
            name: 'Arizona',
            // Arizona: Straight top/east, jagged west edge following Colorado River
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 40% 100%, 35% 92%, 28% 82%, 20% 72%, 14% 62%, 10% 50%, 8% 38%, 5% 25%, 0% 15%)'
        },
        {
            abbrev: 'NV',
            name: 'Nevada',
            // Nevada: Arrow pointing south, angled western border
            clipPath: 'polygon(30% 0%, 100% 0%, 100% 22%, 85% 100%, 45% 100%, 0% 18%)'
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
