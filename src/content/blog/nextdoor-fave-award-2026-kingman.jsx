/**
 * Blog post: Kingman Neighbors Named Canyon State a 2026 Nextdoor Fave
 *
 * Lazy-loaded via src/data/blog.js → contentLoader. The wrapper
 * (src/pages/BlogPost.jsx) provides the page chrome, hero, and metadata.
 * This file is responsible for the body content only.
 *
 * Source material: Nextdoor's winner letter to Canyon State Enterprises, LLC
 * (2026 Fave Award, General Contractor category, Kingman) and Nextdoor's
 * 2026 Fave Awards winner's kit (press release template, certificate and
 * sticker badge). Nextdoor asks winners to link the winners list
 * (nextdoor.com/fave_awards_winners), tag @Nextdoor and use #FaveAwards2026. Statistics are Nextdoor's own and are
 * attributed to Nextdoor in the copy. The FAQ answers below are mirrored in
 * the post's `faq` field in src/data/blog.js (FAQPage JSON-LD) — keep the two
 * in sync if either changes.
 */

import { Link } from 'react-router-dom';
import styles from '../../pages/BlogPost.module.css';
import NextdoorCertificate from '../../components/ui/NextdoorCertificate';

import hqOffice from '../../assets/portfolio/commercial/Canyon State Office_Kingman AZ.webp';

const NextdoorFaveAward2026Post = () => (
    <>
        <p className={styles.lead}>
            Kingman neighbors named Canyon State Enterprises a <strong>2026 Nextdoor Fave
            Award Winner</strong> in the General Contractor category. Every vote came from a
            real, verified neighbor. Nobody applied for it, and nobody bought it. People who
            know our work put our name forward.
        </p>

        <p>
            We found out the old-fashioned way: a letter in the mail from Nextdoor that opened
            with &ldquo;Congratulations! Neighbors in Kingman chose you!&rdquo; That&rsquo;s a
            sentence we&rsquo;ll take every time.
        </p>

        <NextdoorCertificate />

        <h2>What the Nextdoor Fave Award is</h2>

        <p>
            The Fave Awards are Nextdoor&rsquo;s yearly recognition of the local businesses
            neighbors recommend most, and 2026 is the program&rsquo;s 10th year. Neighbors
            voted during Nextdoor&rsquo;s award window from September 9 to September 30,
            2026, one category at a time. Every vote comes from a verified Nextdoor member,
            not a star rating or an ad placement. A business can&rsquo;t apply for the award
            or pay to be considered. In Nextdoor&rsquo;s words, someone who
            knows your work, trusts your business, and wants others to discover you has to
            vote for you.
        </p>

        <p>
            That&rsquo;s why this one means something to us. Manufacturer certifications tell
            you a crew is trained on a system. A license tells you the state says you can do
            the work. A Fave Award tells you the people living next to the work think it was
            done right.
        </p>

        <h2>Why it matters to us in Kingman</h2>

        <p>
            Kingman is home. Our corporate headquarters is at 2959 Rhoades Ave, and the
            company&rsquo;s roots here go back to 1987, when A-2-Z Roofing Supply Co. picked
            up the original Arizona ROC license. We&rsquo;ve grown into a multi-trade
            contractor working across Arizona, Nevada, Utah, and Colorado, but Kingman is
            still where the company is run from.
        </p>

        <p>
            That means the people voting are the same people we see at the hardware store,
            at the ballfield, and in line for coffee. When a roof we put on leaks, we hear
            about it on Monday. When a stucco job comes out clean, we hear about that too.
            There&rsquo;s no hiding from your own neighbors, and we wouldn&rsquo;t want to.
        </p>

        <figure className={styles.figure}>
            <img
                src={hqOffice}
                alt="Canyon State Enterprises corporate headquarters on Rhoades Avenue in Kingman, Arizona."
                loading="lazy"
                decoding="async"
            />
            <figcaption>
                Our Kingman headquarters on Rhoades Ave. The award came from the neighbors who
                live around the jobs we build from here.
            </figcaption>
        </figure>

        <h2>What earned the vote</h2>

        <p>
            We don&rsquo;t get to see who voted or why. But we know what we try to do on every
            job, and it&rsquo;s not complicated:
        </p>

        <ul>
            <li><strong>Answer the phone.</strong> A human calls you back within one business day.</li>
            <li><strong>Self-perform the work.</strong> Roofing, stucco, HVAC, plumbing, metals, and more, all run by our own crews instead of a chain of subs.</li>
            <li><strong>Show up when we said we would.</strong> One schedule, one team, one point of contact.</li>
            <li><strong>Leave the site clean.</strong> Neighbors notice the dumpster and the driveway as much as the finished roof.</li>
            <li><strong>Stand behind it.</strong> Licensed (Arizona ROC #353683), bonded, insured, and certified on the manufacturer systems we install.</li>
        </ul>

        <p>
            None of that is flashy. It&rsquo;s the everyday stuff that makes someone
            comfortable recommending a contractor to the family down the street.
        </p>

        <h2>What it means for customers</h2>

        <p>
            According to Nextdoor, <strong>79% of Nextdoor neighbors</strong> say
            they&rsquo;re more likely to shop at a business they know is a Fave winner, and Fave
            winners get <strong>38 times more views</strong> on their Nextdoor Business
            Page (Nextdoor internal data). We don&rsquo;t read that as a reason to coast.
            We read it as more people trusting us with their homes and buildings, which
            raises the bar for the next job, not lowers it.
        </p>

        <h2>Frequently asked questions</h2>

        <h3>What is the Nextdoor Fave Award?</h3>
        <p>
            The Nextdoor Fave Award is an annual recognition for local businesses, chosen by
            votes from verified Nextdoor neighbors in each community. Businesses cannot apply
            for it or buy it.
        </p>

        <h3>What award did Canyon State Enterprises win?</h3>
        <p>
            Canyon State Enterprises was named a 2026 Nextdoor Fave Award Winner in the
            General Contractor category by neighbors in Kingman, Arizona.
        </p>

        <h3>How are Nextdoor Fave winners chosen?</h3>
        <p>
            Winners are chosen by votes from real, verified Nextdoor members who know the
            business&rsquo;s work and want others in their community to find it. For 2026,
            voting ran from September 9 to September 30, 2026.
        </p>

        <h3>What does Canyon State do in Kingman?</h3>
        <p>
            Canyon State is a multi-trade contractor headquartered in Kingman. We self-perform
            roofing, stucco and EIFS, HVAC, plumbing, specialty metals, masonry, fencing,
            seamless gutters, and residential and commercial construction across Mohave County
            and the Southwest.
        </p>

        <h2>Thank you, Kingman</h2>

        <p>
            To every neighbor who took two minutes to vote for us: thank you. To our crews:
            this one&rsquo;s yours. You earned it one roof, one wall, and one returned phone
            call at a time.
        </p>

        <div className={styles.endLinks}>
            <p>
                <strong>Building or re-roofing in Kingman?</strong>{' '}
                <Link to="/locations/kingman-az">See our Kingman office</Link>
                <br />
                <strong>See what we self-perform:</strong>{' '}
                <Link to="/services">All 12 trades</Link>
                <br />
                <strong>Our manufacturer certifications:</strong>{' '}
                <Link to="/partnerships">Partnerships</Link>
                <br />
                <strong>See every 2026 winner:</strong>{' '}
                <a
                    href="https://nextdoor.com/fave_awards_winners"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Nextdoor Fave Awards winners list
                </a>
                <br />
                <strong>Ready to start a project?</strong>{' '}
                <Link to="/contact">Tell us about it</Link>, or call our Kingman HQ at{' '}
                <a href="tel:+19287579003">(928) 757-9003</a>.
            </p>
        </div>

        <div className={styles.thanks}>
            <span className={styles.thanksEyebrow}>Special Thanks</span>
            <p>
                To our Kingman neighbors and to{' '}
                <a
                    href="https://nextdoor.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Nextdoor
                </a>{' '}
                for the recognition. #FaveAwards2026
            </p>
        </div>

        <p className={styles.signature}>One team. Multiple trades.</p>
    </>
);

export default NextdoorFaveAward2026Post;
