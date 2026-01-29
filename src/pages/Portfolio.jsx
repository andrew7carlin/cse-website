import { useState } from 'react';
import { LOBBY_VIDEO_URL, IS_YOUTUBE } from '../constants/media';
import SEO from '../components/common/SEO';

const Portfolio = () => {
    const [isCover, setIsCover] = useState(true);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <SEO
                title="Portfolio Video - Our Work Showcased"
                description="A cinematic tour of Canyon State Enterprises craftsmanship. Explore our commercial and residential construction projects across Arizona, Nevada, Utah, and New Mexico."
                canonical="https://canyonstate.netlify.app/portfolio"
            />
            {/* Cinematic Video */}
            {IS_YOUTUBE ? (
                <div className="absolute inset-0 w-full h-full">
                    <iframe
                        src={LOBBY_VIDEO_URL}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '177.78vh', /* 16:9 aspect ratio based on height */
                            height: '100vh',
                            minWidth: '100vw',
                            minHeight: '56.25vw', /* 16:9 aspect ratio based on width */
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                            border: 'none'
                        }}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title="Portfolio Showreel"
                    />
                </div>
            ) : (
                <video
                    src={LOBBY_VIDEO_URL}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            )}

            {/* Cinematic Overlay Gradient (Only visible in cover mode for text readability) */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none transition-opacity duration-500 ${isCover ? 'opacity-100' : 'opacity-0'}`} />

            {/* Controls */}
            <div className="absolute bottom-8 right-8 z-30">
                <button
                    onClick={() => setIsCover(!isCover)}
                    className="flex items-center gap-2 bg-black/50 hover:bg-[#b87333] text-white backdrop-blur-md border border-white/20 px-4 py-2 rounded-full transition-all text-sm uppercase tracking-wider font-medium"
                >
                    {isCover ? (
                        <>
                            {/* Collapse Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
                            </svg>
                            <span>Fit to Screen</span>
                        </>
                    ) : (
                        <>
                            {/* Expand Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                            </svg>
                            <span>Fill Screen</span>
                        </>
                    )}
                </button>
            </div>

            {/* Content Overlay */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4 pointer-events-none transition-opacity duration-500 ${isCover ? 'opacity-100' : 'opacity-0'}`}>
                <h1 className="text-white text-5xl md:text-7xl font-bold uppercase tracking-widest mb-4 drop-shadow-2xl">
                    Portfolio
                </h1>
                <div className="w-24 h-1 bg-[#b87333] mb-6 rounded-full" />
                <p className="text-gray-200 text-lg md:text-xl font-light tracking-wide max-w-2xl drop-shadow-lg">
                    A cinematic tour of our craftsmanship.
                </p>
            </div>
        </div>
    );
};

export default Portfolio;
