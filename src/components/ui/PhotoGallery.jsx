import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './PhotoGallery.module.css';

/**
 * PhotoGallery — responsive thumbnail grid with an accessible lightbox.
 *
 * items: [{ thumb, full, alt, width, height }]
 *   thumb  → small image used in the grid (lazy-loaded)
 *   full   → large image shown in the lightbox (loaded on open only)
 *
 * Lightbox: role="dialog", Esc closes, ←/→ navigate, focus moves into the
 * dialog on open and back to the clicked thumbnail on close, body scroll is
 * locked while open. No external libraries.
 */
const PhotoGallery = ({ items, label = 'Photo gallery' }) => {
    const [openIndex, setOpenIndex] = useState(-1);
    const closeBtnRef = useRef(null);
    const returnFocusRef = useRef(null);
    const isOpen = openIndex >= 0;
    const count = items.length;

    const close = useCallback(() => setOpenIndex(-1), []);
    const prev = useCallback(() => setOpenIndex((i) => (i - 1 + count) % count), [count]);
    const next = useCallback(() => setOpenIndex((i) => (i + 1) % count), [count]);

    // Keyboard + scroll lock while the lightbox is open. Restore focus to the
    // thumbnail that opened it when it closes.
    useEffect(() => {
        if (!isOpen) return undefined;
        const onKey = (e) => {
            if (e.key === 'Escape') close();
            else if (e.key === 'ArrowLeft') prev();
            else if (e.key === 'ArrowRight') next();
        };
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onKey);
        closeBtnRef.current?.focus();
        const returnTo = returnFocusRef.current;
        return () => {
            document.body.style.overflow = prevOverflow;
            document.removeEventListener('keydown', onKey);
            returnTo?.focus?.();
        };
    }, [isOpen, close, prev, next]);

    const current = isOpen ? items[openIndex] : null;

    return (
        <div className={styles.gallery}>
            <ul className={styles.grid} aria-label={label}>
                {items.map((it, i) => (
                    <li key={it.thumb} className={styles.cell}>
                        <button
                            type="button"
                            className={styles.thumbBtn}
                            onClick={(e) => { returnFocusRef.current = e.currentTarget; setOpenIndex(i); }}
                            aria-label={`Open photo ${i + 1} of ${count}`}
                        >
                            <img
                                src={it.thumb}
                                alt={it.alt}
                                loading="lazy"
                                decoding="async"
                                width={it.width}
                                height={it.height}
                                className={styles.thumb}
                            />
                        </button>
                    </li>
                ))}
            </ul>

            {current && (
                <div
                    className={styles.lightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Photo ${openIndex + 1} of ${count}`}
                    onClick={(e) => { if (e.target === e.currentTarget) close(); }}
                >
                    <button ref={closeBtnRef} type="button" className={styles.closeBtn} onClick={close} aria-label="Close">
                        &times;
                    </button>
                    <button type="button" className={`${styles.navBtn} ${styles.navPrev}`} onClick={prev} aria-label="Previous photo">
                        &#8249;
                    </button>
                    <figure className={styles.stage}>
                        <img src={current.full} alt={current.alt} className={styles.fullImg} decoding="async" />
                        <figcaption className={styles.counter}>{openIndex + 1} / {count}</figcaption>
                    </figure>
                    <button type="button" className={`${styles.navBtn} ${styles.navNext}`} onClick={next} aria-label="Next photo">
                        &#8250;
                    </button>
                </div>
            )}
        </div>
    );
};

export default PhotoGallery;
