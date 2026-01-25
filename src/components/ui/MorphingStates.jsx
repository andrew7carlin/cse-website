import { useEffect, useState } from 'react';
import styles from './MorphingStates.module.css';

const MorphingStates = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Each state has a unique border-radius pattern to approximate its shape
    const states = [
        {
            abbrev: 'AZ',
            name: 'Arizona',
            // Arizona: Jagged bottom-left (Grand Canyon), straight right edge
            shape: '15% 85% 70% 30% / 25% 25% 75% 75%'
        },
        {
            abbrev: 'NV',
            name: 'Nevada',
            // Nevada: Pointed bottom, wider top
            shape: '30% 70% 95% 5% / 25% 25% 75% 75%'
        },
        {
            abbrev: 'UT',
            name: 'Utah',
            // Utah: More rectangular with notch
            shape: '10% 90% 90% 10% / 15% 15% 85% 85%'
        },
        {
            abbrev: 'NM',
            name: 'New Mexico',
            // New Mexico: Nearly rectangular
            shape: '8% 92% 92% 8% / 8% 8% 92% 92%'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % states.length);
        }, 4000); // Hold each state for 4 seconds

        return () => clearInterval(interval);
    }, []);

    const currentState = states[currentIndex];

    return (
        <div className={styles.container}>
            <div
                className={styles.shape}
                style={{ borderRadius: currentState.shape }}
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
