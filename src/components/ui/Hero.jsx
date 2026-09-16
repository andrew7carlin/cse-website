import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    // Phone player: iOS Safari only autoplays when the <video> element
    // literally carries the `muted` attribute — React sets the *property*
    // and skips the attribute, so Safari sits on the poster. Force it on the
    // DOM node and call play() ourselves; if Safari still refuses (Low Power
    // Mode, data saver) show a tap-to-play button rather than a dead frame.
    const mobileVideoRef = useRef(null);
    const [needsTap, setNeedsTap] = useState(false);
    const tryPlay = useCallback(() => {
        const el = mobileVideoRef.current;
        if (!el) return;
        el.muted = true;
        el.defaultMuted = true;
        el.setAttribute('muted', '');
        const p = el.play();
        if (p && p.catch) p.then(() => setNeedsTap(false)).catch(() => setNeedsTap(true));
    }, []);
    useEffect(() => {
        if (videoReady && isMobile) tryPlay();
    }, [videoReady, isMobile, tryPlay]);

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

    // Phone layout: the owner wants the whole video frame visible, not a
    // centre-cropped still, and no call-to-action card over it. So under
    // 768px the hero becomes a letterboxed 16:9 player at screen width,
    // sitting directly under the header, and the page content follows.
    // The H1/subheadline stay in the DOM (visually hidden) for SEO.
    if (variant === 'video' && videoUrl && !isYouTube && isMobile) {
        return (
            <section className={`${styles.hero} ${styles.video} ${styles.mobileHero}`}>
                <div className={styles.mobileFrame}>
                    {!videoReady && (
                        <img
                            src="/hero-poster.webp"
                            alt="Canyon State Enterprises"
                            fetchPriority="high"
                            loading="eager"
                            width="1920"
                            height="1080"
                            className={styles.mobileMedia}
                        />
                    )}
                    {videoReady && (
                        <video
                            ref={mobileVideoRef}
                            src={videoUrl}
                            className={styles.mobileMedia}
                            poster="/hero-poster.webp"
                            preload="auto"
                            autoPlay
                            loop
                            muted
                            playsInline
                            webkit-playsinline="true"
                            onCanPlay={tryPlay}
                            onPlaying={() => setNeedsTap(false)}
                        />
                    )}
                    {videoReady && needsTap && (
                        <button
                            type="button"
                            className={styles.tapToPlay}
                            onClick={tryPlay}
                            aria-label="Play video"
                        >
                            <span className={styles.tapToPlayIcon} aria-hidden="true">&#9654;</span>
                        </button>
                    )}
                </div>
                <h1 className={styles.srOnly}>{headline}</h1>
                <p className={styles.srOnly}>{subheadline}</p>
            </section>
        );
    }

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
                            {/* Poster — shown immediately, is the LCP element on
                                first paint AND the permanent hero on mobile. */}
                            {(!videoReady || isMobile) && (
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
                            {/* Desktop video (16:9) — deferred until after window.load.
                                Mobile gets the poster only: a 3.5 MB autoplay loop on a
                                phone is a Lighthouse-killing TBT/transfer cost for very
                                little visual payoff (most mobile browsers won't even
                                autoplay reliably with sound restrictions). */}
                            {videoReady && !isMobile && (
                                <video
                                    src={videoUrl}
                                    className={`${styles.videoElement} ${styles.desktopVideo}`}
                                    poster="/hero-poster.webp"
                                    preload="metadata"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
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
            {variant === 'split' && imageUrl && (
                <div className={styles.imageCol}>
                    {/* Real <img> (not CSS bg) so the preload scanner discovers it
                        and gets the LCP image on screen faster. */}
                    <img
                        src={imageUrl}
                        alt=""
                        aria-hidden="true"
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                        className={styles.imageColImg}
                    />
                </div>
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

            {variant === 'full' && imageUrl && (
                <>
                    <img
                        src={imageUrl}
                        alt=""
                        aria-hidden="true"
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                        className={styles.fullBgImg}
                    />
                    <div className={styles.overlay}></div>
                </>
            )}
        </section>
    );
};

export default Hero;
