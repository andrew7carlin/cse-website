/**
 * Blog post: Building Betty's Village North
 *
 * Lazy-loaded via src/data/blog.js → contentLoader. The wrapper
 * (src/pages/BlogPost.jsx) provides the page chrome, hero, and metadata.
 * This file is responsible for the body content only.
 */

import { Link } from 'react-router-dom';
import styles from '../../pages/BlogPost.module.css';

// In-article images. Vite dedupes — these are the same assets the project
// detail page already uses, so they cost nothing extra to import here.
import bvWaterfall      from '../../assets/portfolio/commercial/Betty\'s Village_Las Vegas NV_7.webp';
import bvUnderConstruction from '../../assets/portfolio/commercial/Betty\'s Village_Las Vegas NV.webp';
import bvStaging       from '../../assets/portfolio/commercial/Betty\'s Village_Las Vegas NV_4.webp';
import bvAerial        from '../../assets/portfolio/commercial/Betty\'s Village_Las Vegas NV_2.webp';

const BettysVillageNorthPost = () => (
    <>
        <p className={styles.lead}>
            In 1954, a Las Vegas couple named Al and Dessie Bailey got the kind of news
            that changes everything. Their daughter Claudia was born with Down syndrome.
            At the time, there was nowhere for kids like Claudia to go. Schools wouldn&rsquo;t
            take her. Workforce programs didn&rsquo;t exist. So the Baileys did what people in
            this town tend to do when something needs to exist and doesn&rsquo;t: they built it
            themselves.
        </p>

        <p>
            That December, they opened a one-room schoolhouse at 310 North Ninth Street to 27
            kids with intellectual disabilities. They called it{' '}
            <a
                href="https://www.opportunityvillage.org/about/our-history"
                target="_blank"
                rel="noopener noreferrer"
            >
                Opportunity Village
            </a>
            .
        </p>

        <p>
            Seventy-two years later, Canyon State Enterprises is the roofing, stucco, and
            metals contractor on the second phase of Opportunity Village&rsquo;s housing community
            for adult residents. The project is called{' '}
            <strong>Betty&rsquo;s Village North</strong>.
        </p>

        <p>
            We&rsquo;re going to tell you what&rsquo;s actually going up out there, why the construction
            is harder than it looks, and why this particular job has gotten under our crews&rsquo;
            skin in a way most jobs don&rsquo;t.
        </p>

        <figure className={styles.figure}>
            <img
                src={bvAerial}
                alt="Betty's Village taking shape across multiple residential buildings."
                loading="lazy"
                decoding="async"
            />
            <figcaption>
                A broad view of Betty&rsquo;s Village taking shape. Twenty-two residential dwellings and
                three commercial buildings under construction simultaneously.
            </figcaption>
        </figure>

        <h2>What Betty&rsquo;s Village actually is</h2>

        <p>
            The original Betty&rsquo;s Village opened at 7755 W. Oquendo Road in June 2021. It
            filled to capacity in <strong>five months</strong>. That number alone tells you
            most of what you need to know about the demand for what Opportunity Village
            does.
        </p>

        <p>
            &ldquo;Betty&rdquo; is Betty Engelstad. The Ralph and Betty Engelstad Foundation is the
            primary funder of both the original Betty&rsquo;s Village and the new northwest
            campus. Adult residents, most with intellectual or developmental disabilities,
            live independently in a community designed around them, not around code-minimum
            compliance:
        </p>

        <ul>
            <li>Roll-in showers and accessible appliances in every unit</li>
            <li>Emergency alert poles throughout the campus</li>
            <li>Center-facing townhomes so neighbors actually see each other from the porch</li>
            <li>A central clubhouse with a gym, pool, spa, and multipurpose spaces</li>
            <li>Rent covered by Medicaid, so residents pay nothing out of pocket for housing</li>
        </ul>

        <p>
            On a normal weekday at Betty&rsquo;s Village, residents are at workforce
            training, in the pool, at the gym, at arts and crafts, or running shifts at
            on-campus retail. It&rsquo;s a community, not a facility.
        </p>

        <h2>What we&rsquo;re building at the northwest campus</h2>

        <p>
            Opportunity Village broke ground on{' '}
            <a
                href="https://www.fox5vegas.com/2024/09/26/opportunity-village-breaks-ground-59m-construction-project/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Betty&rsquo;s Village North
            </a>{' '}
            on September 26, 2024. The numbers:
        </p>

        <ul>
            <li><strong>$59 million</strong> total project budget</li>
            <li><strong>17.6 acres</strong> at Thom and Rome Boulevards, just off N. Decatur Blvd and the I-215</li>
            <li><strong>90 residential units</strong> in Phase 1: a mix of 1-bedroom and 2-bedroom apartments plus 4-bedroom shared homes</li>
            <li><strong>22 residential dwellings + 3 commercial buildings</strong> in Canyon State&rsquo;s scope</li>
            <li><strong>125+ residents</strong> at full build</li>
            <li><strong>~24 months</strong> from October 2024, targeting late-2026 completion</li>
        </ul>

        <p>
            The three commercial buildings matter. They&rsquo;ll house workforce training space,
            coffee shops, and retail, so residents will work in the same campus they live
            in. That&rsquo;s the whole model: independent living plus meaningful employment, in
            one place, on one team.
        </p>

        <p>
            <a
                href="https://www.randoco.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
                R&amp;O Construction
            </a>
            {' '}is the general contractor on the project. They&rsquo;ve been building commercial work
            across Las Vegas and Utah for 45 years and they&rsquo;re a trusted partner of ours.
            Canyon State&rsquo;s scope under R&amp;O covers <strong>TPO roofing, tile roofing, metal
            roofing, flush panels, and three-coat stucco</strong>. Five trades, one self-performed
            crew structure, one schedule.
        </p>

        <figure className={styles.figure}>
            <img
                src={bvUnderConstruction}
                alt="Residential buildings under construction at Betty's Village, with scaffolding in place and crews working multiple buildings simultaneously."
                loading="lazy"
                decoding="async"
            />
            <figcaption>
                First residential buildings under construction. Large communities with tight
                timelines often face scaffolding delays. Owning our scaffolding inventory
                is how we keep the schedule honest.
            </figcaption>
        </figure>

        <h2>The real construction problems on this job</h2>

        <p>
            Here&rsquo;s the stuff you don&rsquo;t see in the press release. We&rsquo;re going to be honest
            about it because honest is the only way these stories are worth telling.
        </p>

        <h3>The scaffolding crunch</h3>

        <p>
            Thirty buildings going up simultaneously on a tight schedule means scaffolding
            becomes the bottleneck. Most stucco contractors rent, which means you&rsquo;re
            waiting on someone else&rsquo;s truck, someone else&rsquo;s scheduler, and someone else&rsquo;s
            priorities. We made the deliberate choice years ago to own ours. That decision
            costs money up front and pays back on jobs exactly like this one, where the
            schedule has zero room for &ldquo;the scaffolding truck got delayed.&rdquo;
        </p>

        <h3>Dissimilar materials at every transition</h3>

        <p>
            The buildings mix concrete cement board fascia with traditional eaves.
            Concrete cement board makes rake installation a fight. The saw kerfs don&rsquo;t
            behave like wood, the dust is brutal, and you can&rsquo;t just shoot a fastener and
            move on. Every transition has to be detailed individually. We&rsquo;re running an
            extra QC pass on these specifically so the rakes still look clean when the
            paint goes on.
        </p>

        <h3>The clubhouse waterfall roof</h3>

        <p>
            The visual centerpiece of the whole campus is a standing seam metal roof on the
            clubhouse, but not just any standing seam. It&rsquo;s a continuous waterfall design
            where the panels drape over the building in <strong>70-foot continuous lengths</strong>.
            Standard install methods don&rsquo;t apply. To pull it off we brought a roll former
            on-site so we could produce panels at full length (no field seams visible), used
            multiple telehandlers to position them, and staffed it with applicators who have
            specific standing-seam experience at that scale.
        </p>

        <p>
            On the same building we ran 3-coat stucco, coping metal, cap metal, 80-mil TPO
            on the low-slope sections, and all custom flashings around penetrations. Five
            different roofing and envelope systems on one structure, integrated cleanly.
        </p>

        <figure className={styles.figure}>
            <img
                src={bvWaterfall}
                alt="The clubhouse at Betty's Village showing its dramatic standing-seam waterfall roof, a continuous metal panel system draping over the building."
                loading="lazy"
                decoding="async"
            />
            <figcaption>
                The clubhouse waterfall roof: 70-foot continuous standing-seam panels, rolled
                on-site, set with telehandlers. Five envelope systems integrated on one
                building.
            </figcaption>
        </figure>

        <h3>Coordinating thirty active buildings at once</h3>

        <p>
            Trade congestion is the silent killer on a project like this. When you&rsquo;ve got
            framers, roofers, stucco crews, plumbers, electricians, and HVAC all needing
            access to the same 22 residential buildings on overlapping schedules, somebody
            is going to get rained out, or a crew shows up and someone else is in their
            slot.
        </p>

        <p>
            Our answer is that we self-perform roofing, stucco, AND metals on the same job.
            When our schedule needs to shift because the rough-in plumbing got delayed,
            we move our own crews around internally. We don&rsquo;t have to wait on three
            different subs to confirm new dates. That single decision, being a multi-trade
            subcontractor instead of three different ones, is the most underrated thing
            about how we run jobs.
        </p>

        <figure className={styles.figure}>
            <img
                src={bvStaging}
                alt="Neat material staging at Betty's Village. Pallets organized, proper safety equipment in use, owned heavy machinery on site."
                loading="lazy"
                decoding="async"
            />
            <figcaption>
                Neat material staging, proper safety equipment, owned heavy machinery. We
                solve problems before they become problems.
            </figcaption>
        </figure>

        <h2>Why this one matters</h2>

        <p>
            Construction is rarely about the marquee buildings. It&rsquo;s usually about whether
            the work gets done on time, on budget, and at the quality the spec calls for,
            on the days you said it would happen.
        </p>

        <p>
            The reason Betty&rsquo;s Village North matters to us isn&rsquo;t because the clubhouse roof
            is photogenic. (It is.) It&rsquo;s because the people moving into these homes in late
            2026 don&rsquo;t have many other places to go. The original Betty&rsquo;s Village filled to
            capacity in five months because the demand is that real.
        </p>

        <p>
            So when our crew has to figure out how to install a 70-foot standing-seam panel
            over a public courtyard, or detail concrete-cement-board fascia at a rake
            without making it look like an industrial loading dock, we figure it out. The
            deadline isn&rsquo;t a developer pro-forma. It&rsquo;s the date that 125 more Las Vegas
            residents finally get a home that was designed around them.
        </p>

        <p>
            Opportunity Village has been doing the hard thing in Las Vegas since 1954.
            We&rsquo;re proud to be the contractor putting roofs and walls on what they&rsquo;re
            building next.
        </p>

        <div className={styles.endLinks}>
            <p>
                <strong>See the project gallery:</strong>{' '}
                <Link to="/portfolio/bettys-village">Betty&rsquo;s Village on our portfolio</Link>
                <br />
                <strong>The GC on this project:</strong>{' '}
                <a
                    href="https://www.randoco.com/project/bettys-village/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    R&amp;O Construction
                </a>
                <br />
                <strong>Learn more about Opportunity Village:</strong>{' '}
                <a
                    href="https://www.opportunityvillage.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    opportunityvillage.org
                </a>
                <br />
                <strong>Looking for a Las Vegas multi-trade contractor?</strong>{' '}
                <Link to="/contact">Tell us about your project</Link>. Our Nevada crews are
                booked solid for a reason.
            </p>
        </div>

        <div className={styles.thanks}>
            <span className={styles.thanksEyebrow}>Special Thanks</span>
            <p>
                To{' '}
                <a
                    href="https://www.opportunityvillage.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Opportunity Village
                </a>
                ,{' '}
                <a
                    href="https://www.randoco.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    R&amp;O Construction
                </a>
                , and{' '}
                <a
                    href="https://kga.design/opportunity-village-bettys-village.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    KGA Architecture
                </a>
                {' '}for trusting us with their project.
            </p>
        </div>
    </>
);

export default BettysVillageNorthPost;
