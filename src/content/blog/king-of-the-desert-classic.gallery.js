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

// File numbers are not contiguous: near-duplicate frames of the same shot
// were removed (owner request, Sept 2026), so `num` is the original number.
const gallery = Object.keys(fullImports)
    .sort()
    .map((key) => ({
        num: Number(key.match(/gallery-(\d+)\.webp$/)[1]),
        full: fullImports[key],
        thumb: thumbImports[key.replace('.webp', '-thumb.webp')],
        alt: ALT,
        width: 640,
        height: 480,
    }));

// Hand-picked strip for the article (original file numbers): the group on
// the green from two angles, the cart lineup, the course sign, carts under
// the mesas, the tee box.
export const STRIP_NUMBERS = [17, 14, 4, 8, 29, 40];
export const strip = STRIP_NUMBERS.map((n) => gallery.find((g) => g.num === n)).filter(Boolean);

export default gallery;
