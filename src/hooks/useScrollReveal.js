import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-reveal animations using Intersection Observer
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1), default 0.1
 * @param {string} options.rootMargin - Root margin, default '0px 0px -50px 0px'
 * @param {boolean} options.triggerOnce - Only trigger once, default true
 * @returns {Object} { ref, isVisible }
 */
export const useScrollReveal = (options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '0px 0px -50px 0px',
        triggerOnce = true
    } = options;

    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce]);

    return { ref, isVisible };
};

/**
 * Hook for revealing multiple children with staggered delays
 * @param {number} count - Number of items to track
 * @param {Object} options - Same as useScrollReveal options
 * @returns {Object} { containerRef, visibleItems }
 */
export const useStaggeredReveal = (count, options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '0px 0px -30px 0px',
        staggerDelay = 100 // ms between each item
    } = options;

    const containerRef = useRef(null);
    const [visibleItems, setVisibleItems] = useState(new Set());

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Stagger the reveal of items
                    for (let i = 0; i < count; i++) {
                        setTimeout(() => {
                            setVisibleItems(prev => new Set([...prev, i]));
                        }, i * staggerDelay);
                    }
                    observer.unobserve(container);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(container);

        return () => observer.disconnect();
    }, [count, threshold, rootMargin, staggerDelay]);

    return { containerRef, visibleItems };
};

export default useScrollReveal;
