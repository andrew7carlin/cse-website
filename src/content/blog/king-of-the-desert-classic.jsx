/**
 * Blog post: King of the Desert Classic — A Big Thank-You to Our Partners
 *
 * Lazy-loaded via src/data/blog.js → contentLoader. The wrapper
 * (src/pages/BlogPost.jsx) provides the page chrome, hero, and metadata.
 * This file is responsible for the body content only.
 *
 * Copy is the client's approved article verbatim (King-of-the-Desert-Classic
 * blog-article fragment, Sept 2026). The 80 partner labels are kept in the
 * supplied order; they acknowledge partners and are not an attendance or
 * sponsor list. No event date, venue or results are stated by design.
 *
 * Layout (owner's call, Sept 2026): the recap video leads right after the
 * opening lines, the article shows a 6-photo strip, and the full 93-photo
 * gallery lives on its own page at /blog/king-of-the-desert-classic/photos.
 */

import { Link } from 'react-router-dom';
import styles from '../../pages/BlogPost.module.css';
import PhotoGallery from '../../components/ui/PhotoGallery';
import gallery, { strip } from './king-of-the-desert-classic.gallery';

import partners800 from '../../assets/blog/king-of-the-desert-classic/partners-on-course-800.webp';
import partners1600 from '../../assets/blog/king-of-the-desert-classic/partners-on-course-1600.webp';
import partners2400 from '../../assets/blog/king-of-the-desert-classic/partners-on-course-2400.webp';

const VIDEO_MP4 = '/videos/king-of-the-desert-classic-widescreen-v4.mp4';
const VIDEO_VTT = '/videos/king-of-the-desert-classic-v4.vtt';
const VIDEO_POSTER = '/videos/king-of-the-desert-classic-poster.jpg';
const GALLERY_PATH = '/blog/king-of-the-desert-classic/photos';

const PARTNERS = [
    '66 Auto / Freedom Auto Sales',
    'ABC',
    'Angle Homes',
    'AR Mays Construction',
    'Axiom',
    'AZ Res Outfitters',
    'Banker Insulation',
    'Bellm Construction',
    'Better Builder',
    'Bressman',
    'Bull Mountain Builders',
    'Burke',
    'Candor Development',
    'Central Arizona Supply',
    'Century Communities',
    'Century Complete',
    'Coated Metals Group',
    'Colorado River Homes',
    'Concord',
    'Core Construction',
    'Desert Dream Builders',
    'Desert Edge',
    'Desert Sunset',
    'Design Homes',
    'Dryvit',
    'DTL',
    'Duralast',
    'Eagle Tile',
    'Elevate',
    'Fairbanks Contracting',
    'Fairway Homes',
    'Faner Electric',
    'Geary Pacific',
    'Golden West Homes',
    'Gore Construction',
    'Grand Canyon Development',
    'Gulfeagle Supply (KGM)',
    'Gulfeagle Supply (LV)',
    'Henderson Construction',
    'Hill Development',
    'HRP',
    'Iris Development',
    'JBK Construction',
    "Jim's House of Glass",
    'Johns Manville',
    'K Squared',
    'Kinchloe Construction',
    'KTR',
    'L & W Las Vegas',
    'La Quinta',
    'LD Shritter',
    'Legacy Homes',
    'LiveBox',
    'Lumabilt',
    'Mass Construction',
    'Meld Global',
    'Mohave Garage Door',
    'Moran AZ',
    'My Framing Crew',
    'Mynk Construction',
    'Overland',
    'Pacificap Construction',
    'Path Construction',
    'Pioneer Title',
    'Precise',
    'PriMac',
    'QXO',
    'R&O Construction',
    'REMAX',
    'Rock Solid',
    'Seven Steel',
    'Sonoran Building Products',
    'SRS',
    'TNT Custom Homes',
    'TR Orr',
    'Unisource',
    'Valandingham Drywall',
    'Wespac',
    'Westates Construction',
    'Willmeng',
];

const KingOfTheDesertClassicPost = () => (
    <>
        <p className={styles.lead}>
            The idea behind the King of the Desert Classic was simple: get together for some
            golf and say thanks to the people we work with.
        </p>

        <p>
            To our partners, we&rsquo;re glad we get to do this work with you. The event was a
            chance to step away from the day-to-day, spend some time together and let you know
            we appreciate you.
        </p>

        <figure className={styles.videoBlock}>
            <div className={styles.videoWrap}>
                <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={VIDEO_POSTER}
                    width="1920"
                    height="1080"
                    aria-label="King of the Desert Classic partner-appreciation recap"
                >
                    <source src={VIDEO_MP4} type="video/mp4" />
                    <track kind="captions" src={VIDEO_VTT} srcLang="en" label="English" default />
                    Your browser cannot play this video.{' '}
                    <a href={VIDEO_MP4}>Download the recap</a>.
                </video>
            </div>
            <figcaption className={styles.videoMeta}>
                <span>King of the Desert Classic &middot; Partner appreciation and team credits</span>
                <a href={VIDEO_MP4} download>Download video</a>
            </figcaption>
        </figure>

        <h2>A little time on the course</h2>
        <p>
            We&rsquo;ve pulled together a few moments from the course, from the group photo on
            the green to golfers taking their swings. It&rsquo;s a little look at the people
            this event was about.
        </p>

        <div className={styles.photoStrip}>
            <PhotoGallery items={strip} label="King of the Desert Classic photo highlights" />
        </div>
        <p className={styles.galleryCtaRow}>
            <Link to={GALLERY_PATH} className={styles.galleryCta}>
                See all {gallery.length} photos &rarr;
            </Link>
        </p>

        <h2>Here&rsquo;s to our partners</h2>
        <p>We&rsquo;re glad to have these partners alongside us:</p>
        <ul className={styles.partnerList} aria-label="Partner acknowledgments">
            {PARTNERS.map((name) => (
                <li key={name}>{name}</li>
            ))}
        </ul>

        <h2>Good work starts with good relationships</h2>
        <p>
            Good work depends on people being able to count on each other. A returned call, a
            question answered, a delivery coordinated, a problem worked through together - those
            everyday things add up.
        </p>
        <p>
            The King of the Desert Classic was a chance to spend time with the people who help
            make that happen. We wanted to get together outside the usual project conversations,
            enjoy the day, and say thanks. Those relationships matter to us, and they deserve some
            time on the calendar.
        </p>

        <figure className={styles.figure}>
            <img
                src={partners1600}
                srcSet={`${partners800} 800w, ${partners1600} 1600w, ${partners2400} 2400w`}
                sizes="(max-width: 767px) calc(100vw - 2rem), 760px"
                width="1600"
                height="1200"
                loading="lazy"
                decoding="async"
                alt="Golfers gather beside golf carts at a tee box, with a fairway and desert hills behind them."
            />
            <figcaption>Time together on the course at the King of the Desert Classic.</figcaption>
        </figure>

        <h2>Thanks for being part of it</h2>
        <p>
            To everyone who joined us, thanks for making time for Canyon State. And to all our
            partners, we&rsquo;re glad to have you alongside us.
        </p>

        <p className={styles.signature}>One team. Multiple trades.</p>
    </>
);

export default KingOfTheDesertClassicPost;
