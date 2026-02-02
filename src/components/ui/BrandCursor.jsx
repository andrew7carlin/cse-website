import { useEffect, useRef, useState } from 'react';

/**
 * Brand Glow Cursor
 * Soft radial glow that subtly transitions between Copper and Turquoise
 */
const BrandCursor = () => {
    const glowRef = useRef(null);
    const requestRef = useRef(null);

    const mousePos = useRef({ x: -100, y: -100 });
    const glowPos = useRef({ x: -100, y: -100 });

    const [isVisible, setIsVisible] = useState(false);

    // Smooth physics
    const LERP = 0.08;

    useEffect(() => {
        const onMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const onLeave = () => setIsVisible(false);

        const animate = () => {
            glowPos.current.x += (mousePos.current.x - glowPos.current.x) * LERP;
            glowPos.current.y += (mousePos.current.y - glowPos.current.y) * LERP;

            if (glowRef.current) {
                glowRef.current.style.left = `${glowPos.current.x}px`;
                glowRef.current.style.top = `${glowPos.current.y}px`;
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
        <>
            <style>{`
                @keyframes glowShift {
                    0%, 100% {
                        background: radial-gradient(
                            circle,
                            rgba(160, 73, 33, 0.12) 0%,
                            rgba(160, 73, 33, 0.04) 35%,
                            transparent 70%
                        );
                    }
                    50% {
                        background: radial-gradient(
                            circle,
                            rgba(0, 128, 128, 0.10) 0%,
                            rgba(0, 128, 128, 0.03) 35%,
                            transparent 70%
                        );
                    }
                }
                
                .brand-glow {
                    position: fixed;
                    width: 500px;
                    height: 500px;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transform: translate(-50%, -50%);
                    animation: glowShift 8s ease-in-out infinite;
                    transition: opacity 0.4s ease;
                    will-change: left, top;
                }
            `}</style>

            <div
                ref={glowRef}
                className="brand-glow"
                style={{
                    opacity: isVisible ? 1 : 0
                }}
            />
        </>
    );
};

export default BrandCursor;
