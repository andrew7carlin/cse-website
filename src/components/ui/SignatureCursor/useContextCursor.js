import { useRef, useCallback } from 'react';
import { CURSOR_CONFIG } from './config';

/**
 * Context-aware cursor states hook
 * Reads [data-cursor] attributes for different hover effects
 */
export const useContextCursor = () => {
    const { contexts, size } = CURSOR_CONFIG;
    const currentContext = useRef('default');
    const targetElement = useRef(null);

    // Find cursor context from element or ancestors
    const getContextFromElement = useCallback((element) => {
        if (!element) return 'default';

        // Walk up the DOM tree to find data-cursor
        let el = element;
        while (el && el !== document.body) {
            const context = el.getAttribute('data-cursor');
            if (context && contexts[context]) {
                targetElement.current = el;
                return context;
            }
            el = el.parentElement;
        }

        targetElement.current = null;
        return 'default';
    }, [contexts]);

    // Update context based on element under cursor
    const updateContext = useCallback((element) => {
        const newContext = getContextFromElement(element);
        const changed = newContext !== currentContext.current;
        currentContext.current = newContext;

        return {
            context: newContext,
            changed,
            config: contexts[newContext] || contexts.default,
        };
    }, [getContextFromElement, contexts]);

    // Get current cursor style based on context
    const getContextStyle = useCallback(() => {
        const ctx = currentContext.current;
        const config = contexts[ctx] || contexts.default;

        return {
            scale: config.scale,
            mixBlendMode: config.blend,
            ringSize: size.ring * config.scale,
            dotSize: ctx === 'default' ? size.dot : size.dotHover,
        };
    }, [contexts, size]);

    return {
        updateContext,
        getContextStyle,
        getCurrentContext: () => currentContext.current,
        getTargetElement: () => targetElement.current,
    };
};

export default useContextCursor;
