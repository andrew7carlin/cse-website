import { useEffect, useState } from 'react';
import styles from './MorphingStates.module.css';

const MorphingStates = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Clean, simple state shapes that morph smoothly
    const states = [
        {
            name: 'Arizona',
            abbrev: 'AZ',
            path: 'M 100 150 L 400 120 L 450 220 L 420 350 L 350 440 L 150 450 L 80 350 L 60 240 Z',
            color: '#c45827'
        },
        {
            name: 'Nevada',
            abbrev: 'NV',
            path: 'M 150 60 L 320 50 L 380 140 L 400 280 L 370 420 L 130 450 L 90 310 L 110 160 Z',
            color: '#3d2f24'
        },
        {
            name: 'Utah',
            abbrev: 'UT',
            path: 'M 140 70 L 360 70 L 360 430 L 140 430 Z',
            color: '#c9a78b'
        },
        {
            name: 'New Mexico',
            abbrev: 'NM',
            path: 'M 110 90 L 390 90 L 390 410 L 110 410 Z',
            color: '#00a0a0'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % states.length);
        }, 5000); // Hold each state for 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.container}>
            <svg
                viewBox="0 0 500 500"
                className={styles.svg}
                xmlns="http://www.w3.org/2000/svg"
            >
                {states.map((state, index) => {
                    const isActive = index === currentIndex;
                    const isPrevious = index === (currentIndex - 1 + states.length) % states.length;

                    return (
                        <path
                            key={state.abbrev}
                            d={state.path}
                            fill={state.color}
                            className={`${styles.statePath} ${isActive ? styles.active : ''} ${isPrevious ? styles.exiting : ''}`}
                            opacity={isActive ? 0.9 : 0}
                        />
                    );
                })}
            </svg>

            {/* Text Overlay */}
            <div className={styles.textOverlay}>
                <span className={styles.stateAbbrev} key={`${states[currentIndex].abbrev}-${currentIndex}`}>
                    {states[currentIndex].abbrev}
                </span>
            </div>
        </div>
    );
};

export default MorphingStates;
