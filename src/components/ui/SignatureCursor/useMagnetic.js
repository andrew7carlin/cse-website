import { useRef, useCallback } from 'react';
import { CURSOR_CONFIG } from './config';

/**
 * Magnetic attraction hook for UI elements
 * Elements with [data-magnetic] attract the cursor
 */
export const useMagnetic = () => {
    const { magnetic } = CURSOR_CONFIG;
    const magneticElements = useRef([]);
    const currentTarget = useRef(null);

    // Cache magnetic elements on mount
    const cacheElements = useCallback(() => {
        magneticElements.current = Array.from(
            document.querySelectorAll('[data-magnetic]')
        );
    }, []);

    // Find nearest magnetic element
    const findNearest = useCallback((x, y) => {
        let nearest = null;
        let nearestDist = Infinity;

        for (const el of magneticElements.current) {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dist = Math.sqrt(
                Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
            );

            if (dist < magnetic.radius && dist < nearestDist) {
                nearest = { el, rect, centerX, centerY, dist };
                nearestDist = dist;
            }
        }

        return nearest;
    }, [magnetic.radius]);

    // Calculate magnetic offset
    const getMagneticOffset = useCallback((mouseX, mouseY) => {
        const nearest = findNearest(mouseX, mouseY);

        if (!nearest) {
            currentTarget.current = null;
            return { offsetX: 0, offsetY: 0, target: null, strength: 0 };
        }

        currentTarget.current = nearest.el;

        // Calculate pull toward center
        const dx = nearest.centerX - mouseX;
        const dy = nearest.centerY - mouseY;

        // Strength decreases with distance
        const distRatio = 1 - (nearest.dist / magnetic.radius);
        const strength = distRatio * magnetic.strength;

        return {
            offsetX: dx * strength,
            offsetY: dy * strength,
            target: nearest.el,
            strength,
            centerX: nearest.centerX,
            centerY: nearest.centerY,
        };
    }, [findNearest, magnetic.radius, magnetic.strength]);

    return {
        cacheElements,
        getMagneticOffset,
        getCurrentTarget: () => currentTarget.current,
    };
};

export default useMagnetic;
