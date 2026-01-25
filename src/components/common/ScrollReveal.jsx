import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * Wrapper component for scroll-reveal animations
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.className - Additional classes
 * @param {string} props.variant - 'default' | 'fade' | 'scale' | 'stagger'
 * @param {number} props.threshold - Visibility threshold (0-1)
 * @param {string} props.as - HTML element to render as
 */
const ScrollReveal = ({
    children,
    className = '',
    variant = 'default',
    threshold = 0.1,
    as: Component = 'div',
    ...props
}) => {
    const { ref, isVisible } = useScrollReveal({ threshold });

    const variantClass = {
        default: 'reveal',
        fade: 'reveal-fade',
        scale: 'reveal-scale',
        stagger: 'reveal-stagger'
    }[variant] || 'reveal';

    return (
        <Component
            ref={ref}
            className={`${variantClass} ${isVisible ? 'visible' : ''} ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
};

export default ScrollReveal;
