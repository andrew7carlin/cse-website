import { useEffect, useRef, useState } from 'react';

const BrandCursor = () => {
    // Refs for physics loop
    const ringRef = useRef(null);
    const requestRef = useRef(null);

    // Position state
    const mousePos = useRef({ x: -100, y: -100 });
    const ringPos = useRef({ x: -100, y: -100 });

    // Interaction state
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Physics Config
    // Slightly tighter follow for the dot feeling (0.2) vs the floaty ring (0.15)
    const LERP_FACTOR = 0.2;

    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('interactive')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
            setIsHovering(false);
        };

        const animate = () => {
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * LERP_FACTOR;
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * LERP_FACTOR;

            if (ringRef.current) {
                const x = ringPos.current.x;
                const y = ringPos.current.y;
                ringRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseover', handleMouseOver);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseover', handleMouseOver);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(requestRef.current);
        };
    }, [isVisible]);

    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <>
            <style>{`
                .brand-cursor-dot {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 10px;
                    height: 10px;
                    background-color: var(--color-copper, #A04921);
                    border: 0px solid transparent; /* Start with no border */
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    will-change: transform, width, height, border;
                    transition: width 0.3s ease, 
                                height 0.3s ease, 
                                background-color 0.3s ease,
                                border-width 0.3s ease,
                                opacity 0.3s ease;
                    /* Subtle blend can nice, but normal is safer for visibility */
                    /* mix-blend-mode: difference; */
                }
                
                /* HOVER STATE: Transform into a ring */
                .brand-cursor-dot.hovering {
                    width: 44px;
                    height: 44px;
                    background-color: transparent; /* Center becomes see-through */
                    border: 1.5px solid var(--color-copper, #A04921);
                }
            `}</style>

            <div
                ref={ringRef}
                className={`brand-cursor-dot ${isHovering ? 'hovering' : ''}`}
                style={{
                    opacity: isVisible ? 1 : 0
                }}
            />
        </>
    );
};

export default BrandCursor;
