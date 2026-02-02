import { useEffect, useRef, useState } from 'react';

const BrandCursor = () => {
    const cursorRef = useRef(null);
    const requestRef = useRef(null);

    // Position state
    const mousePos = useRef({ x: -100, y: -100 });
    const cursorPos = useRef({ x: -100, y: -100 });

    // Interaction state
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Physics Config
    // 0.1 = Very heavy/luxurious delay. The "expensive" feel.
    const LERP_FACTOR = 0.1;

    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            // Expanded interactive list for premium feel
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
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
            cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * LERP_FACTOR;
            cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * LERP_FACTOR;

            if (cursorRef.current) {
                const x = cursorPos.current.x;
                const y = cursorPos.current.y;
                cursorRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
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

    // Disable on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <>
            <style>{`
                .premium-cursor {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 20px;
                    height: 20px;
                    background-color: white; /* White + Exclusion = Inversion */
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    mix-blend-mode: exclusion; /* THE key to the premium look */
                    will-change: transform, width, height, opacity;
                    transition: width 0.4s cubic-bezier(0.19, 1, 0.22, 1), 
                                height 0.4s cubic-bezier(0.19, 1, 0.22, 1),
                                opacity 0.4s ease;
                }
                
                /* HOVER STATE: Smooth expansion */
                .premium-cursor.hovering {
                    width: 64px;
                    height: 64px;
                    opacity: 0.5; /* Slight transparency on hover */
                }
            `}</style>

            <div
                ref={cursorRef}
                className={`premium-cursor ${isHovering ? 'hovering' : ''}`}
                style={{
                    opacity: isVisible ? 1 : 0
                }}
            />
        </>
    );
};

export default BrandCursor;
