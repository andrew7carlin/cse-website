import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import styles from './SignatureCursor.module.css';
import { useCursorPhysics } from './useCursorPhysics';
import { useMagnetic } from './useMagnetic';
import { useContextCursor } from './useContextCursor';
import { CURSOR_CONFIG } from './config';

/**
 * Signature Cursor — subtle colored glow that follows the cursor,
 * plus a soft glass blur that fades in on interactive elements.
 * The explicit ring + dot were removed for a quieter feel.
 *
 * Still respects prefers-reduced-motion and waits for a mouse-type
 * pointermove before rendering (so touch devices stay clean).
 */
const SignatureCursor = () => {
    const glowRef = useRef(null);
    const blurRef = useRef(null);
    const rafRef = useRef(null);
    const enabledRef = useRef(false); // true once a mouse pointermove is confirmed

    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const physics = useCursorPhysics();
    const magnetic = useMagnetic();
    const context = useContextCursor();

    const mousePos = useRef({ x: -100, y: -100 });

    // Performance tracking — initialized lazily inside the setup effect so
    // the render stays pure (no performance.now() calls).
    const lastFrameTime = useRef(0);
    const frameCount = useRef(0);
    const lowPerfMode = useRef(false);

    const shouldRender = useCallback(() => {
        if (typeof window === 'undefined') return false;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
        return true;
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!enabledRef.current) return;
        mousePos.current = { x: e.clientX, y: e.clientY };
        physics.updateMouse(e.clientX, e.clientY);

        if (!isVisible) setIsVisible(true);

        const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
        const contextResult = context.updateContext(elementUnderCursor);

        if (contextResult.changed) {
            setIsHovering(contextResult.context !== 'default');
        }
    }, [physics, context, isVisible]);

    const handleMouseLeave = useCallback(() => {
        setIsVisible(false);
        physics.reset();
    }, [physics]);

    const handleMouseEnter = useCallback(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        if (!shouldRender()) return;

        lastFrameTime.current = performance.now();

        const animate = () => {
            const now = performance.now();
            const delta = now - lastFrameTime.current;
            lastFrameTime.current = now;

            frameCount.current++;
            if (frameCount.current % 60 === 0) {
                const fps = 1000 / delta;
                lowPerfMode.current = fps < CURSOR_CONFIG.performance.minFPS;
            }

            const pos = physics.tick();
            const magneticOffset = magnetic.getMagneticOffset(mousePos.current.x, mousePos.current.y);
            const finalX = pos.x + magneticOffset.offsetX;
            const finalY = pos.y + magneticOffset.offsetY;

            if (glowRef.current) {
                gsap.set(glowRef.current, { x: pos.x, y: pos.y, force3D: true });
            }
            if (blurRef.current && CURSOR_CONFIG.performance.enableBlur) {
                gsap.set(blurRef.current, { x: finalX, y: finalY, force3D: true });
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        // Dynamically detect pointer type so touch laptops with a mouse
        // get the cursor, while pure touch devices do not.
        enabledRef.current = false;
        const handlePointerType = (e) => {
            if (e.pointerType === 'mouse') {
                enabledRef.current = true;
                window.removeEventListener('pointermove', handlePointerType);
            } else if (e.pointerType === 'touch') {
                enabledRef.current = false;
                window.removeEventListener('pointermove', handlePointerType);
            }
        };
        window.addEventListener('pointermove', handlePointerType);

        magnetic.cacheElements();

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        rafRef.current = requestAnimationFrame(animate);

        let cacheTimeout;
        const observer = new MutationObserver(() => {
            clearTimeout(cacheTimeout);
            cacheTimeout = setTimeout(() => magnetic.cacheElements(), 100);
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('pointermove', handlePointerType);
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            cancelAnimationFrame(rafRef.current);
            observer.disconnect();
            clearTimeout(cacheTimeout);
        };
    }, [shouldRender, handleMouseMove, handleMouseLeave, handleMouseEnter, physics, magnetic]);

    if (!shouldRender()) return null;

    const blurClasses = [
        styles.cursorBlur,
        isHovering && styles.active,
    ].filter(Boolean).join(' ');

    return (
        <div className={styles.cursorContainer} aria-hidden="true">
            {/* Ambient glow — the subtle colored follow */}
            {CURSOR_CONFIG.performance.enableGlow && (
                <div
                    ref={glowRef}
                    className={styles.cursorGlow}
                    style={{ opacity: isVisible ? 1 : 0 }}
                />
            )}

            {/* Glass blur — only visible on interactive hover */}
            {CURSOR_CONFIG.performance.enableBlur && (
                <div
                    ref={blurRef}
                    className={blurClasses}
                    style={{ opacity: isVisible && isHovering ? 1 : 0 }}
                />
            )}
        </div>
    );
};

export default SignatureCursor;
