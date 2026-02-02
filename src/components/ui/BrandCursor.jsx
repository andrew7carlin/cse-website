import { useEffect, useRef, useState } from 'react';

/**
 * Whisper Dot Cursor
 * Ultra-minimal, hyper-premium cursor effect.
 * A barely-visible ghost dot that follows the mouse.
 */
const BrandCursor = () => {
    const dotRef = useRef(null);
    const requestRef = useRef(null);

    const mousePos = useRef({ x: -100, y: -100 });
    const dotPos = useRef({ x: -100, y: -100 });

    const [isVisible, setIsVisible] = useState(false);

    // Smooth, weighted physics
    const LERP = 0.12;

    useEffect(() => {
        const onMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const onLeave = () => setIsVisible(false);

        const animate = () => {
            dotPos.current.x += (mousePos.current.x - dotPos.current.x) * LERP;
            dotPos.current.y += (mousePos.current.y - dotPos.current.y) * LERP;

            if (dotRef.current) {
                dotRef.current.style.transform =
                    `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMove);
        document.body.addEventListener('mouseleave', onLeave);
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMove);
            document.body.removeEventListener('mouseleave', onLeave);
            cancelAnimationFrame(requestRef.current);
        };
    }, [isVisible]);

    // Disable on touch
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <div
            ref={dotRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '6px',
                height: '6px',
                backgroundColor: 'var(--color-copper, #A04921)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999,
                opacity: isVisible ? 0.15 : 0,
                transition: 'opacity 0.4s ease',
                willChange: 'transform',
            }}
        />
    );
};

export default BrandCursor;
