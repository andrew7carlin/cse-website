import { useEffect, useRef } from 'react';
import styles from './MorphingStates.module.css';

const MorphingStates = () => {
    const pathRef = useRef(null);

    // Simplified SVG path data for state outlines (scaled and centered)
    const statePaths = {
        arizona: "M50,10 L90,10 L90,70 L85,75 L80,80 L70,85 L60,88 L50,88 L40,88 L30,85 L20,80 L15,75 L10,70 L10,10 Z",
        nevada: "M40,10 L60,10 L65,15 L70,25 L75,40 L78,55 L80,70 L78,80 L72,88 L60,90 L48,90 L36,88 L28,82 L22,70 L20,55 L22,40 L28,25 L35,15 Z",
        utah: "M35,10 L65,10 L65,45 L80,45 L80,55 L65,55 L65,90 L35,90 L35,55 L20,55 L20,45 L35,45 Z",
        newmexico: "M20,15 L80,15 L80,85 L20,85 Z"
    };

    useEffect(() => {
        const states = ['arizona', 'nevada', 'utah', 'newmexico'];
        let currentIndex = 0;

        const morphPath = () => {
            if (pathRef.current) {
                currentIndex = (currentIndex + 1) % states.length;
                const nextPath = statePaths[states[currentIndex]];

                // Animate to next path
                pathRef.current.setAttribute('d', nextPath);
            }
        };

        // Change state every 3 seconds
        const interval = setInterval(morphPath, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.container}>
            <svg
                viewBox="0 0 100 100"
                className={styles.svg}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    ref={pathRef}
                    d={statePaths.arizona}
                    className={styles.statePath}
                    fill="none"
                    stroke="var(--color-copper)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
    );
};

export default MorphingStates;
