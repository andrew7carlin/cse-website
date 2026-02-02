import { useEffect, useRef, useState } from 'react';

const BrandCursor = () => {
    // Refs for current positions (for smooth animation loop)
    const cursorRef = useRef(null);
    const ringRef = useRef(null);
    const requestRef = useRef(null);

    // Position state management
    const mousePos = useRef({ x: -100, y: -100 }); // Start off-screen
    const ringPos = useRef({ x: -100, y: -100 });

    // Interaction state
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Configuration
    const LERP_FACTOR = 0.15; // Lower = smoother/slower delay

    useEffect(() => {
        // Track mouse movement
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        // Track hover states for interactive elements
        const handleMouseOver = (e) => {
            const target = e.target;
            // Check if hovering over clickable elements
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

        // Animation loop
        const animate = () => {
            // Linear interpolation for smooth following
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * LERP_FACTOR;
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * LERP_FACTOR;

            // Update DOM directly for performance (bypassing React render cycle)
            if (ringRef.current) {
                const x = ringPos.current.x;
                const y = ringPos.current.y;
                ringRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        // Start listeners and loop
        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseover', handleMouseOver); // Delegate for dynamic elements
        document.body.addEventListener('mouseleave', handleMouseLeave);
        requestRef.current = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseover', handleMouseOver);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(requestRef.current);
        };
    }, [isVisible]);

    // Don't render on mobile/touch devices (simplified check)
    // In a production app, you might want a robust media query check
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <>
            {/* Styles are inline to be self-contained, but could move to CSS module */}
            <style>{`
                /* Hide default cursor only if we were doing a full replacement, 
                   but we are keeping the system cursor for usability per plan. 
                   Uncomment below if you want to hide system cursor:
                   body { cursor: none; } 
                   a, button { cursor: none; }
                */
                
                .brand-cursor-ring {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 32px;
                    height: 32px;
                    border: 1.5px solid var(--color-copper, #A04921);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    will-change: transform;
                    transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease, background-color 0.3s ease;
                    mix-blend-mode: difference; /* Optional: Cool effect over images */
                }
                
                .brand-cursor-ring.hovering {
                    width: 48px;
                    height: 48px;
                    background-color: rgba(160, 73, 33, 0.1);
                    border-color: transparent;
                }
                
                .brand-cursor-glow {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(160, 73, 33, 0.08) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9998;
                    transform: translate(-50%, -50%); /* Always centered on ring */
                    opacity: 0.6;
                }
            `}</style>

            {/* The Follower Ring */}
            <div
                ref={ringRef}
                className={`brand-cursor-ring ${isHovering ? 'hovering' : ''}`}
                style={{
                    opacity: isVisible ? 1 : 0
                }}
            >
                {/* Optional Subtle Glow child attached to the ring */}
                <div className="brand-cursor-glow" />
            </div>
        </>
    );
};

export default BrandCursor;
