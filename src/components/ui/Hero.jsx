import React from 'react';
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
    variant = "split" // 'split', 'full', or 'video'
}) => {
    if (variant === 'video' && videoUrl) {
        return (
            <section className={`${styles.hero} ${styles.video}`}>
                <div className={styles.videoBg}>
                    <video
                        src={videoUrl}
                        className={styles.videoElement}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                    <div className={styles.overlay}></div>
                </div>

                <div className={styles.glassContent}>
                    <div className={styles.glassCard}>
                        <h1 className={styles.headline}>{headline}</h1>
                        <p className={styles.subheadline}>{subheadline}</p>

                        <div className={styles.ctaGroup}>
                            <Link to={primaryCtaLink} className={styles.btnPrimary}>{primaryCtaText}</Link>
                            {secondaryCtaText && (
                                <Link to={secondaryCtaLink} className={styles.btnSecondary}>{secondaryCtaText}</Link>
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
                        <Link to={primaryCtaLink} className={styles.btnPrimary}>{primaryCtaText}</Link>
                        {secondaryCtaText && (
                            <Link to={secondaryCtaLink} className={styles.btnSecondary}>{secondaryCtaText}</Link>
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
