import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import styles from './SignatureCursor.module.css';
import { useCursorPhysics } from './useCursorPhysics';
import { useMagnetic } from './useMagnetic';
import { useContextCursor } from './useContextCursor';
import { CURSOR_CONFIG } from './config';

/**
 * Signature Cursor System
 * Premium physics-based cursor with magnetic effects and context awareness
 * 
 * Features:
 * - Spring physics for smooth, weighted motion
 * - Magnetic attraction to [data-magnetic] elements
 * - Context-aware states via [data-cursor] attributes
 * - CSS blur glass effect
 * - Performance optimized with GSAP
 * 
 * @author Canyon State Enterprises
 */
const SignatureCursor = () => {
    // Refs for cursor elements
    const ringRef = useRef(null);
    const dotRef = useRef(null);
    const glowRef = useRef(null);
    const blurRef = useRef(null);
    const rafRef = useRef(null);

    // State
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [currentContext, setCurrentContext] = useState('default');

    // Hooks
    const physics = useCursorPhysics();
    const magnetic = useMagnetic();
    const context = useContextCursor();

    // Mouse position for magnetic calculation
    const mousePos = useRef({ x: -100, y: -100 });

    // Performance tracking
    const lastFrameTime = useRef(performance.now());
    const frameCount = useRef(0);
    const lowPerfMode = useRef(false);

    // Check if should render (touch devices, reduced motion)
    const shouldRender = useCallback(() => {
        if (typeof window === 'undefined') return false;
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return false;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
        return true;
    }, []);

    // Animation loop
    const animate = useCallback(() => {
        // Performance monitoring
        const now = performance.now();
        const delta = now - lastFrameTime.current;
        lastFrameTime.current = now;

        // Check for low performance
        frameCount.current++;
        if (frameCount.current % 60 === 0) {
            const fps = 1000 / delta;
            lowPerfMode.current = fps < CURSOR_CONFIG.performance.minFPS;
        }

        // Run physics tick
        const pos = physics.tick();

        // Get magnetic offset
        const magneticOffset = magnetic.getMagneticOffset(mousePos.current.x, mousePos.current.y);

        // Apply magnetic offset to position
        const finalX = pos.x + magneticOffset.offsetX;
        const finalY = pos.y + magneticOffset.offsetY;

        // Update cursor ring with GSAP for butter-smooth animation
        if (ringRef.current) {
            gsap.set(ringRef.current, {
                x: finalX,
                y: finalY,
                force3D: true,
            });
        }

        // Update dot (follows more directly)
        if (dotRef.current) {
            gsap.set(dotRef.current, {
                x: pos.x,
                y: pos.y,
                force3D: true,
            });
        }

        // Update glow (larger, more lag)
        if (glowRef.current) {
            gsap.set(glowRef.current, {
                x: pos.x,
                y: pos.y,
                force3D: true,
            });
        }

        // Update blur layer
        if (blurRef.current && CURSOR_CONFIG.performance.enableBlur) {
            gsap.set(blurRef.current, {
                x: finalX,
                y: finalY,
                force3D: true,
            });
        }

        // Continue animation loop
        rafRef.current = requestAnimationFrame(animate);
    }, [physics, magnetic]);

    // Mouse move handler
    const handleMouseMove = useCallback((e) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
        physics.updateMouse(e.clientX, e.clientY);

        if (!isVisible) setIsVisible(true);

        // Update context based on element under cursor
        const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
        const contextResult = context.updateContext(elementUnderCursor);

        if (contextResult.changed) {
            setCurrentContext(contextResult.context);
            setIsHovering(contextResult.context !== 'default');
        }
    }, [physics, context, isVisible]);

    // Mouse leave handler
    const handleMouseLeave = useCallback(() => {
        setIsVisible(false);
        physics.reset();
    }, [physics]);

    // Mouse enter handler
    const handleMouseEnter = useCallback(() => {
        setIsVisible(true);
    }, []);

    // Setup effect
    useEffect(() => {
        if (!shouldRender()) return;

        // Cache magnetic elements
        magnetic.cacheElements();

        // Add event listeners
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        // Start animation loop
        rafRef.current = requestAnimationFrame(animate);

        // Re-cache magnetic elements on DOM changes (debounced)
        let cacheTimeout;
        const observer = new MutationObserver(() => {
            clearTimeout(cacheTimeout);
            cacheTimeout = setTimeout(() => magnetic.cacheElements(), 100);
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            cancelAnimationFrame(rafRef.current);
            observer.disconnect();
            clearTimeout(cacheTimeout);
        };
    }, [shouldRender, handleMouseMove, handleMouseLeave, handleMouseEnter, animate, magnetic]);

    // Don't render on touch devices
    if (!shouldRender()) return null;

    // Build class names
    const ringClasses = [
        styles.cursorRing,
        isHovering && styles.hovering,
        currentContext !== 'default' && styles[currentContext],
    ].filter(Boolean).join(' ');

    const dotClasses = [
        styles.cursorDot,
        isHovering && styles.hovering,
    ].filter(Boolean).join(' ');

    const blurClasses = [
        styles.cursorBlur,
        isHovering && styles.active,
    ].filter(Boolean).join(' ');

    return (
        <div className={styles.cursorContainer} aria-hidden="true">
            {/* Ambient glow layer */}
            {CURSOR_CONFIG.performance.enableGlow && (
                <div
                    ref={glowRef}
                    className={styles.cursorGlow}
                    style={{ opacity: isVisible ? 1 : 0 }}
                />
            )}

            {/* Glass blur layer */}
            {CURSOR_CONFIG.performance.enableBlur && (
                <div
                    ref={blurRef}
                    className={blurClasses}
                    style={{ opacity: isVisible && isHovering ? 1 : 0 }}
                />
            )}

            {/* Main cursor ring */}
            <div
                ref={ringRef}
                className={ringClasses}
                style={{ opacity: isVisible ? 1 : 0 }}
            />

            {/* Center dot */}
            <div
                ref={dotRef}
                className={dotClasses}
                style={{ opacity: isVisible ? 1 : 0 }}
            />
        </div>
    );
};

export default SignatureCursor;
