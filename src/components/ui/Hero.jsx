import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = ({
    headline,
    subheadline,
    primaryCtaText = "Request a Quote",
    primaryCtaLink = "/contact",
    secondaryCtaText = "View Portfolio",
    secondaryCtaLink = "/portfolio",
    imageUrl,
    videoUrl,
    mobileVideoUrl,
    isYouTube = false,
    variant = "split" // 'split', 'full', or 'video'
}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Defer video load until after page is interactive — fixes LCP regression
    useEffect(() => {
        const onLoad = () => setVideoReady(true);
        if (document.readyState === 'complete') {
            setTimeout(() => setVideoReady(true), 100);
        } else {
            window.addEventListener('load', onLoad);
            return () => window.removeEventListener('load', onLoad);
        }
    }, []);

    if (variant === 'video' && videoUrl) {
        return (
            <section className={`${styles.hero} ${styles.video}`}>
                {/* Blurred background — decorative, deferred until after load */}
                {!isYouTube && !isMobile && videoReady && (
                    <div className={styles.videoBlurBg}>
                        <video
                            src={mobileVideoUrl || videoUrl}
                            className={styles.videoBlurElement}
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </div>
                )}

                <div className={styles.videoBg}>
                    {isYouTube ? (
                        <iframe
                            src={videoUrl}
                            className={styles.videoElement}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="Background Video"
                        />
                    ) : (
                        <>
                            {/* Poster — shown immediately, is the fast LCP element */}
                            {!videoReady && (
                                <img
                                    src="/hero-poster.webp"
                                    alt="Canyon State Enterprises"
                                    fetchPriority="high"
                                    loading="eager"
                                    width="1920"
                                    height="1080"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center'
                                    }}
                                />
                            )}
                            {/* Desktop video (16:9) — deferred until after window.load */}
                            {videoReady && !isMobile && (
                                <video
                                    src={videoUrl}
                                    className={`${styles.videoElement} ${styles.desktopVideo}`}
                                    poster="/hero-poster.webp"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            )}
                            {/* Mobile video (9:16) — deferred until after window.load */}
                            {videoReady && isMobile && mobileVideoUrl && (
                                <video
                                    src={mobileVideoUrl}
                                    className={`${styles.videoElement} ${styles.mobileVideo}`}
                                    poster="/hero-poster.webp"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            )}
                            {/* Static poster fallback — only if no mobile video provided */}
                            {isMobile && !mobileVideoUrl && (
                                <img
                                    src="/hero-poster.webp"
                                    alt="Canyon State Enterprises"
                                    fetchPriority="high"
                                    loading="eager"
                                    width="1920"
                                    height="1080"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center'
                                    }}
                                />
                            )}
                        </>
                    )}
                    <div className={styles.overlay}></div>
                </div>

                <div className={styles.glassContent}>
                    <div className={styles.glassCard}>
                        <h1 className={styles.headline}>{headline}</h1>
                        <p className={styles.subheadline}>{subheadline}</p>

                        <div className={styles.ctaGroup}>
                            {primaryCtaText && (
                                <Link to={primaryCtaLink} className={styles.btnPrimary} data-magnetic data-cursor="cta">{primaryCtaText}</Link>
                            )}
                            {secondaryCtaText && (
                                <Link to={secondaryCtaLink} className={styles.btnSecondary} data-magnetic data-cursor="cta">{secondaryCtaText}</Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={`${styles.hero} ${styles[variant]}`}>
            {variant === 'split' && (
                <div className={styles.imageCol} style={{ backgroundImage: `url(${imageUrl})` }}></div>
            )}

            <div className={styles.contentCol}>
                <div className={styles.contentInner}>
                    <h1 className={styles.headline}>{headline}</h1>
                    <p className={styles.subheadline}>{subheadline}</p>

                    <div className={styles.ctaGroup}>
                        <Link to={primaryCtaLink} className={styles.btnPrimary} data-magnetic data-cursor="cta">{primaryCtaText}</Link>
                        {secondaryCtaText && (
                            <Link to={secondaryCtaLink} className={styles.btnSecondary} data-magnetic data-cursor="cta">{secondaryCtaText}</Link>
                        )}
                    </div>
                </div>
            </div>

            {variant === 'full' && (
                <div className={styles.overlay}></div>
            )}
            {variant === 'full' && (
                <div className={styles.fullBg} style={{ backgroundImage: `url(${imageUrl})` }}></div>
            )}
        </section>
    );
};

export default Hero;
