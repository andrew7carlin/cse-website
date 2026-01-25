import { useEffect, useState } from 'react';
import styles from './MorphingStates.module.css';

const MorphingStates = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Actual state outline paths - scaled to fit 500x500 viewBox
    const states = [
        {
            name: 'Arizona',
            abbrev: 'AZ',
            path: 'M 450 50 L 400 130 L 350 180 L 320 220 L 280 270 L 250 310 L 220 350 L 200 390 L 180 430 L 150 450 L 100 450 L 80 400 L 70 350 L 60 300 L 50 250 L 50 200 L 60 150 L 80 100 L 120 70 L 170 50 L 250 50 L 330 70 L 380 90 L 420 100 Z',
            gradient: 'linear-gradient(135deg, #A04921 0%, #c45827 50%, #d4713a 100%)'
        },
        {
            name: 'Nevada',
            abbrev: 'NV',
            path: 'M 450 100 L 420 150 L 390 200 L 360 250 L 340 300 L 320 350 L 300 400 L 270 430 L 220 450 L 150 450 L 100 420 L 80 380 L 70 330 L 60 280 L 50 230 L 50 180 L 60 130 L 80 90 L 120 60 L 180 50 L 250 50 L 320 60 L 380 80 Z',
            gradient: 'linear-gradient(135deg, #1B150F 0%, #2a211a 50%, #3d2f24 100%)'
        },
        {
            name: 'Utah',
            abbrev: 'UT',
            path: 'M 350 50 L 350 200 L 400 200 L 400 300 L 350 300 L 350 450 L 150 450 L 150 300 L 100 300 L 100 200 L 150 200 L 150 50 Z',
            gradient: 'linear-gradient(135deg, #B48F73 0%, #c9a78b 50%, #ddbfa3 100%)'
        },
        {
            name: 'New Mexico',
            abbrev: 'NM',
            path: 'M 400 50 L 400 450 L 100 450 L 100 50 Z',
            gradient: 'linear-gradient(135deg, #008080 0%, #00a0a0 50%, #00b8b8 100%)'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % states.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    const currentState = states[currentIndex];
    const nextState = states[(currentIndex + 1) % states.length];

    return (
        <div className={styles.container}>
            <svg
                viewBox="0 0 500 500"
                className={styles.svg}
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {states.map((state, i) => (
                        <linearGradient key={i} id={`gradient-${state.abbrev}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={state.gradient.match(/#[A-Fa-f0-9]{6}/g)?.[0] || '#A04921'} />
                            <stop offset="50%" stopColor={state.gradient.match(/#[A-Fa-f0-9]{6}/g)?.[1] || '#c45827'} />
                            <stop offset="100%" stopColor={state.gradient.match(/#[A-Fa-f0-9]{6}/g)?.[2] || '#d4713a'} />
                        </linearGradient>
                    ))}
                </defs>

                {/* Morphing path with SMIL animation */}
                <path
                    d={currentState.path}
                    fill={`url(#gradient-${currentState.abbrev})`}
                    className={styles.statePath}
                    opacity="0.95"
                >
                    <animate
                        attributeName="d"
                        dur="3s"
                        values={states.map(s => s.path).join(';') + ';' + states[0].path}
                        repeatCount="indefinite"
                        calcMode="spline"
                        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                    />
                </path>
            </svg>

            {/* Text Overlay */}
            <div className={styles.textOverlay}>
                <span className={styles.stateAbbrev} key={currentState.abbrev}>
                    {currentState.abbrev}
                </span>
            </div>
        </div>
    );
};

export default MorphingStates;
