/**
 * Signature Cursor Configuration
 * Canyon State Enterprises - Premium Cursor System
 */

export const CURSOR_CONFIG = {
    // Physics - Spring-based motion
    physics: {
        stiffness: 0.12,      // Spring tension (0.05-0.25)
        damping: 0.82,        // Friction (0.7-0.95)
        mass: 0.1,            // Inertia weight
        velocityScale: 0.15,  // Velocity influence on size
    },

    // Cursor sizing
    size: {
        ring: 40,             // Default ring diameter
        ringHover: 60,        // Expanded ring on hover
        ringCTA: 80,          // CTA button expansion
        dot: 6,               // Center dot diameter
        dotHover: 0,          // Dot hides on hover
    },

    // Magnetic attraction
    magnetic: {
        radius: 120,          // Detection radius in px
        strength: 0.35,       // Pull strength (0-1)
        ease: 0.08,           // Smoothing factor
    },

    // Visual styling
    style: {
        ringColor: 'rgba(160, 73, 33, 0.6)',      // Copper
        ringColorHover: 'rgba(160, 73, 33, 0.9)', // Copper strong
        dotColor: 'rgba(160, 73, 33, 1)',         // Copper solid
        glowColor: 'rgba(160, 73, 33, 0.15)',     // Copper glow
        glowColorAlt: 'rgba(0, 128, 128, 0.12)',  // Teal glow
        borderWidth: 1.5,
        blur: 0,              // Blur for glass effect
    },

    // Performance
    performance: {
        throttleFPS: 120,     // Target frame rate
        minFPS: 30,           // Fallback threshold
        enableGlow: true,     // Ambient glow layer
        enableBlur: true,     // Glass blur effect
    },

    // Context cursor types
    contexts: {
        default: { scale: 1, blend: 'normal' },
        cta: { scale: 1.8, blend: 'difference' },
        card: { scale: 1.3, blend: 'normal' },
        link: { scale: 0.8, blend: 'normal' },
        image: { scale: 1.5, blend: 'normal' },
        hide: { scale: 0, blend: 'normal' },
    }
};

export default CURSOR_CONFIG;
