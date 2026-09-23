/**
 * King of the Desert Classic — full photo set (93 images).
 *
 * Shared by the article (which shows a 6-photo strip) and the /photos
 * gallery page (which shows everything). Kept in its own module so the
 * 93 asset URLs load as one lazy chunk only when needed.
 *
 * Order: drone stills by capture time, then video frame grabs by timecode.
 */

const fullImports = import.meta.glob('../../assets/blog/king-of-the-desert-classic/gallery-??.webp', {
    eager: true,
    import: 'default',
});
const thumbImports = import.meta.glob('../../assets/blog/king-of-the-desert-classic/gallery-??-thumb.webp', {
    eager: true,
    import: 'default',
});

const ALT = 'Golfers and partners on the course at the King of the Desert Classic.';

const gallery = Object.keys(fullImports)
    .sort()
    .map((key) => ({
        full: fullImports[key],
        thumb: thumbImports[key.replace('.webp', '-thumb.webp')],
        alt: ALT,
        width: 640,
        height: 480,
    }));

// Hand-picked strip for the article (1-based gallery numbers): the two group
// shots, the cart lineup, the course sign, carts under the mesas, the tee box.
export const STRIP_INDEXES = [17, 16, 4, 8, 29, 40];
export const strip = STRIP_INDEXES.map((n) => gallery[n - 1]).filter(Boolean);

export default gallery;
