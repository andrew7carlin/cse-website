import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Importing the specific video file
// Note: Using the exact filename user provided.
import introVideo from '../../assets/videos/intro.mp4';

const IntroSplash = () => {
    const [isVisible, setIsVisible] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const hasSeenIntro = sessionStorage.getItem('canyon_state_intro_seen');

        if (!hasSeenIntro) {
            // Function to trigger intro
            const triggerIntro = () => {
                setIsVisible(true);
                cleanup();
            };

            // 1. Mouse Wheel: Trigger on downward scroll
            const handleWheel = (e) => {
                if (e.deltaY > 0) { // Positive deltaY means scrolling DOWN
                    triggerIntro();
                }
            };

            // 2. Touch: Trigger on swipe up (scroll down content)
            let touchStartY = 0;
            const handleTouchStart = (e) => {
                touchStartY = e.touches[0].clientY;
            };
            const handleTouchMove = (e) => {
                const touchEndY = e.touches[0].clientY;
                // If finger moves UP (startY > endY), content moves DOWN
                if (touchStartY - touchEndY > 10) {
                    triggerIntro();
                }
            };

            // 3. Fallback Scroll: If they drag the scrollbar
            const handleScroll = () => {
                if (window.scrollY > 10) triggerIntro();
            };

            const cleanup = () => {
                window.removeEventListener('wheel', handleWheel);
                window.removeEventListener('touchstart', handleTouchStart);
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('scroll', handleScroll);
            };

            // Attach all listeners
            window.addEventListener('wheel', handleWheel);
            window.addEventListener('touchstart', handleTouchStart);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('scroll', handleScroll);

            return cleanup;
        }
    }, []);

    useEffect(() => {
        if (isVisible && videoRef.current) {
            videoRef.current.playbackRate = 2.0;
            videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        }
    }, [isVisible]);

    const handleVideoComplete = () => {
        sessionStorage.setItem('canyon_state_intro_seen', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center pointer-events-auto"
                >
                    <div className="relative w-full max-w-[800px] mx-auto">
                        <video
                            ref={videoRef}
                            src={introVideo}
                            muted
                            playsInline
                            onEnded={handleVideoComplete}
                            onClick={handleVideoComplete}
                            // Mask effect to fade out sides (CSS Mask)
                            style={{
                                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                            }}
                            className="w-full h-auto object-cover"
                        />

                        {/* Skip Button */}
                        <button
                            onClick={handleVideoComplete}
                            className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors text-3xl"
                        >
                            &times;
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroSplash;
