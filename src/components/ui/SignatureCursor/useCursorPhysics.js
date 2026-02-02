import { useRef, useCallback } from 'react';
import { CURSOR_CONFIG } from './config';

/**
 * Physics-based cursor movement hook
 * Uses spring physics for smooth, weighted motion
 */
export const useCursorPhysics = () => {
    const { physics } = CURSOR_CONFIG;

    // Position state
    const mousePos = useRef({ x: -100, y: -100 });
    const cursorPos = useRef({ x: -100, y: -100 });
    const velocity = useRef({ x: 0, y: 0 });

    // Update mouse position (called on mousemove)
    const updateMouse = useCallback((x, y) => {
        mousePos.current = { x, y };
    }, []);

    // Physics tick (called every frame)
    const tick = useCallback(() => {
        const mouse = mousePos.current;
        const cursor = cursorPos.current;
        const vel = velocity.current;

        // Calculate spring force
        const dx = mouse.x - cursor.x;
        const dy = mouse.y - cursor.y;

        // Apply spring physics: F = -kx - bv
        const ax = dx * physics.stiffness - vel.x * physics.damping;
        const ay = dy * physics.stiffness - vel.y * physics.damping;

        // Update velocity
        vel.x += ax;
        vel.y += ay;

        // Update position
        cursor.x += vel.x;
        cursor.y += vel.y;

        // Calculate velocity magnitude for effects
        const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);

        return {
            x: cursor.x,
            y: cursor.y,
            velocityX: vel.x,
            velocityY: vel.y,
            speed,
            // Stretch factor based on velocity
            stretch: 1 + Math.min(speed * physics.velocityScale, 0.3),
            // Rotation based on movement direction
            angle: Math.atan2(vel.y, vel.x) * (180 / Math.PI),
        };
    }, [physics]);

    // Reset cursor position
    const reset = useCallback(() => {
        cursorPos.current = { x: -100, y: -100 };
        velocity.current = { x: 0, y: 0 };
    }, []);

    return {
        updateMouse,
        tick,
        reset,
        getPosition: () => cursorPos.current,
        getVelocity: () => velocity.current,
    };
};

export default useCursorPhysics;
