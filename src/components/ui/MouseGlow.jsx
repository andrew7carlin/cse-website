import { useEffect, useState } from 'react';

const MouseGlow = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible]);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.3s ease',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    left: position.x,
                    top: position.y,
                    width: '600px',
                    height: '600px',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(160, 73, 33, 0.12) 0%, rgba(160, 73, 33, 0.05) 30%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    transition: 'left 0.1s ease-out, top 0.1s ease-out',
                }}
            />
        </div>
    );
};

export default MouseGlow;
