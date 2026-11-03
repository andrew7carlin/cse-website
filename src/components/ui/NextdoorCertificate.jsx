import styles from './NextdoorCertificate.module.css';
import cseLogo from '../../assets/logos/logo-dark.png';

/**
 * 2026 Nextdoor Fave Award certificate — an authority marker used on the
 * Partnerships page and in the award blog post.
 *
 * The badge is Nextdoor's official 2026 Fave Winner sticker from the winner's
 * kit (Web/Nextdoor Fave Awards 2026 Sticker US.png), saved as
 * src/assets/awards/nextdoor-fave-2026.webp. Nextdoor permits kit assets on
 * winners' websites. Use the official file only; never redraw Nextdoor's mark.
 */
const badgeModules = import.meta.glob('../../assets/awards/nextdoor-fave-2026.{webp,png,svg}', {
    eager: true,
    import: 'default',
});
const NEXTDOOR_BADGE = Object.values(badgeModules)[0] || null;

const NextdoorCertificate = ({ compact = false }) => (
    <figure
        className={`${styles.certificate} ${compact ? styles.compact : ''}`}
        aria-label="Certificate: Canyon State Enterprises, 2026 Nextdoor Fave Award Winner, General Contractor, Kingman, Arizona"
    >
        <div className={styles.inner}>
            {NEXTDOOR_BADGE && (
                <img
                    src={NEXTDOOR_BADGE}
                    alt="2026 Fave Winner, voted by neighbors on Nextdoor"
                    className={styles.badge}
                    loading="lazy"
                    decoding="async"
                />
            )}
            <span className={styles.eyebrow}>Certificate of Recognition</span>
            <div className={styles.title}>2026 Nextdoor Fave Award Winner</div>
            <div className={styles.category}>General Contractor &middot; Kingman, Arizona</div>
            <div className={styles.rule} aria-hidden="true" />
            <div className={styles.presented}>Presented to</div>
            <img
                src={cseLogo}
                alt="Canyon State Enterprises"
                className={styles.cseLogo}
                loading="lazy"
                decoding="async"
            />
            <div className={styles.note}>
                Chosen by real, verified neighbors on Nextdoor. This award can&rsquo;t be applied
                for or bought.
            </div>
        </div>
    </figure>
);

export default NextdoorCertificate;
