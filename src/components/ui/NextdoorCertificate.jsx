import styles from './NextdoorCertificate.module.css';
import cseLogo from '../../assets/logos/logo-dark.png';

/**
 * 2026 Nextdoor Fave Award certificate — an authority marker used on the
 * Partnerships page and in the award blog post.
 *
 * The official Nextdoor Fave 2026 winner badge comes from Nextdoor's winner's
 * digital kit. Drop it into src/assets/awards/ named
 * `nextdoor-fave-2026.(webp|png|svg)` and it is picked up automatically; until
 * then the certificate renders without the badge (we never redraw Nextdoor's
 * mark ourselves).
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
                    alt="Nextdoor Fave 2026 winner badge"
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
