import { useEffect, useState } from 'react';
import styles from './MorphingStates.module.css';

const MorphingStates = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const states = [
        { abbrev: 'AZ', name: 'Arizona' },
        { abbrev: 'NV', name: 'Nevada' },
        { abbrev: 'UT', name: 'Utah' },
        { abbrev: 'NM', name: 'New Mexico' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % states.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.shape} key={currentIndex} />
            <div className={styles.textOverlay}>
                <span className={styles.stateAbbrev}>
                    {states[currentIndex].abbrev}
                </span>
                <span className={styles.stateName}>
                    {states[currentIndex].name}
                </span>
            </div>
        </div>
    );
};

export default MorphingStates;
