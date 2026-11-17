/**
 * Blog post: The New High Desert Hyundai in Kingman Is Done. Here's How We Built It.
 *
 * Lazy-loaded via src/data/blog.js → contentLoader. The wrapper
 * (src/pages/BlogPost.jsx) provides the page chrome, hero, and metadata.
 * This file is responsible for the body content only.
 *
 * Source material: the High Desert Hyundai job folder in SharePoint
 * (Primak Construction / High Desert Hyundai): subcontract, SOV, COR log,
 * approved submittals, closeout equipment list and warranty letter. Photos are
 * the Nov 7, 2026 drone shoot. The owner is left unnamed and there are no
 * dollar figures, same as the Avid post. The FAQ below is mirrored in
 * src/data/blog.js (faq) for FAQPage JSON-LD; keep the two in sync.
 */

import { Link } from 'react-router-dom';
import styles from '../../pages/BlogPost.module.css';

// Same assets the featured project page uses, so Vite dedupes them.
import hdhShowroom from '../../assets/portfolio/commercial/High Desert Hyundai_Kingman AZ_2.webp';
import hdhRoof     from '../../assets/portfolio/commercial/High Desert Hyundai_Kingman AZ_3.webp';
import hdhBack     from '../../assets/portfolio/commercial/High Desert Hyundai_Kingman AZ_4.webp';

const HighDesertHyundaiPost = () => (
    <>
        <p className={styles.lead}>
            You&rsquo;ve probably driven past it. The new Hyundai dealership on Stockton Hill
            Road with the big glass showroom, the brown Hyundai sign and a lot full of new cars.
            It&rsquo;s done, and our crews built a big part of it.
        </p>

        <p>
            We worked on it from April through September 2026, on five trades at once. So here&rsquo;s
            how it went, including the parts that didn&rsquo;t go exactly to plan.
        </p>

        <h2>The job</h2>

        <p>
            Primak Construction Group was the builder. The project took an existing building
            across the street from the old dealership, fixed it up, and added a new showroom,
            service drive and vehicle delivery area onto it.
        </p>

        <p>
            Primak brought us in for the outside of the building and the systems that keep it
            comfortable inside. On most dealership jobs that work gets split between four or
            five different companies. Here, it came to one team.
        </p>

        <h2>What we built</h2>

        <ul>
            <li><strong>The EIFS:</strong> the insulated finish on the outside walls, from the moisture barrier underneath to the final coat and the caulking that seals it. It helps keep the heat out in summer and in during winter.</li>
            <li><strong>The roof:</strong> a white TPO roof over both the existing building and the new addition. Before it went down, we tore out the old rooftop curbs, gas lines and roof jacks that weren&rsquo;t coming back.</li>
            <li><strong>Gutters and downspouts:</strong> about 320 feet of new gutter. The plans had the old one staying, but it needed to go.</li>
            <li><strong>The heating and air conditioning:</strong> we pulled out the old system and put in two rooftop units, seven split systems, four evaporative coolers, eight heaters, fourteen exhaust fans and a carbon monoxide detection system for the service area.</li>
            <li><strong>The block walls:</strong> a CMU retaining wall about 200 feet long, plus a screen wall.</li>
            <li><strong>The metal work:</strong> flashing, vent trim and the small metal details where the walls, the roof and the panels meet.</li>
        </ul>

        <figure className={styles.figure}>
            <img
                src={hdhShowroom}
                alt="Aerial view of the glass showroom and the service wing at High Desert Hyundai in Kingman, Arizona."
                loading="lazy"
                decoding="async"
            />
            <figcaption>
                The glass showroom and the service wing. Our EIFS, roofing and HVAC crews all
                worked on this side of the building.
            </figcaption>
        </figure>

        <h2>Why it helps to have one team</h2>

        <p>
            On a building like this, everything runs into everything else. The AC units sit on
            the roof. Their lines and ducts run through it. The walls tie into the roof edge,
            and the panels tie into the walls. When separate companies own each of those, every
            one of those spots is a place where somebody can say &ldquo;that&rsquo;s not my
            part.&rdquo;
        </p>

        <p>
            With one team, our roofers and our HVAC crew talk to each other every day. Our EIFS
            crew knows what the roof edge is going to look like before they start. And the
            builder has one number to call instead of five. That came in handy on this job more
            than once.
        </p>

        <h2>Curveball #1: making the walls and the panels meet</h2>

        <p>
            In April, one area that was drawn as metal panel switched to EIFS. We added it to
            the schedule and kept going.
        </p>

        <p>
            Later in the summer, the metal panels went up right next to our finished walls, and
            the edges where the two meet needed a different detail than the plans first showed.
            So our EIFS crew came back, put the scaffold up again, covered the new roof
            underneath to protect it, and reworked those edges so the panels and the walls tie
            together cleanly.
        </p>

        <p>
            Those edges are the part people look at, and they came out tight.
        </p>

        <h2>Curveball #2: the service doors</h2>

        <p>
            A dealership lives on its service bays, and the service bays live on their big
            overhead doors. Once the door hardware went in, some of our ductwork turned out to
            be right where the door tracks needed to run.
        </p>

        <p>
            On most jobs that starts an argument about whose drawing was wrong. Here, our HVAC
            crew rerouted the ducts around the tracks so the doors open all the way and the air
            still gets where it needs to go. And when the door installers had to cut into our
            EIFS at four of the doors to set their frames, our EIFS crew came back and patched
            it so you can&rsquo;t tell.
        </p>

        <figure className={styles.figure}>
            <img
                src={hdhRoof}
                alt="Overhead drone view of the white TPO roof and rooftop HVAC equipment at High Desert Hyundai in Kingman."
                loading="lazy"
                decoding="async"
            />
            <figcaption>
                From straight overhead: the white TPO roof over the whole building, with the
                rooftop units and exhaust fans our HVAC crew set.
            </figcaption>
        </figure>

        <h2>Keeping the roof clean from the street</h2>

        <p>
            A car dealership is a showroom from every angle, including from the road. The
            outdoor AC condensers had to stay hidden behind the parapet wall, even though the
            ones we installed came in taller and heavier than first planned. We set them so you
            don&rsquo;t see them from the lot.
        </p>

        <p>
            We also swapped hoods for flat louvers on four of the exhaust fans so the walls
            stay clean looking, and matched the new coolers and heaters to the ones already on
            site. It&rsquo;s the kind of detail nobody notices, which is the point.
        </p>

        <h2>The last few weeks</h2>

        <p>
            Before we handed it over in late September, we went back around the whole building.
            We replaced EIFS at the roof drain areas, re-spread walls that caught concrete
            splatter during site work, sealed up the new electrical conduit that came through
            our roof, and added downspout extensions and splash blocks so the rain goes away
            from the building.
        </p>

        <p>
            None of that shows up in a drone photo. That&rsquo;s why the drone photos look the
            way they do.
        </p>

        <figure className={styles.figure}>
            <img
                src={hdhBack}
                alt="The back of High Desert Hyundai in Kingman, showing the service bays, the showroom and the large shop building behind them."
                loading="lazy"
                decoding="async"
            />
            <figcaption>
                From the back: the showroom, the service bays and the big shop building, all
                under the new white roof.
            </figcaption>
        </figure>

        <h2>Built for Kingman weather</h2>

        <p>
            Between the insulated EIFS walls, a white roof that bounces the sun back,
            evaporative coolers for the big open spaces and heaters for January mornings in the
            service bays, this building is ready for whatever Kingman throws at it. Hot
            afternoons, cold nights, and the wind that blows dust at everything.
        </p>

        <h2>Frequently asked questions</h2>

        <h3>Who built the new High Desert Hyundai in Kingman?</h3>
        <p>
            Primak Construction Group was the general contractor. Canyon State Enterprises built
            the EIFS, the TPO roof, the gutters, the heating and air conditioning, the block
            walls and the metal flashing and trim.
        </p>

        <h3>Where is High Desert Hyundai in Kingman?</h3>
        <p>
            It&rsquo;s on Stockton Hill Road in Kingman, Arizona, across the street from the
            dealership&rsquo;s old location.
        </p>

        <h3>When was the work finished?</h3>
        <p>
            Canyon State worked on the building from April through September 2026, and our work
            was substantially complete in late September 2026.
        </p>

        <h3>Does Canyon State do dealership and commercial remodels?</h3>
        <p>
            Yes. Canyon State is a multi-trade contractor headquartered in Kingman. We
            self-perform roofing, EIFS and stucco, heating and air, masonry and metals on
            commercial remodels and new buildings across Arizona, Nevada and Utah.
        </p>

        <h2>Thank you</h2>

        <p>
            A big thank you to Primak Construction Group for bringing us onto this one and
            trusting us with so much of it.
        </p>

        <p>
            And thank you to every one of our crew members who worked on it, from the EIFS crew
            on the scaffold to the roofers and HVAC techs up top through the summer. It looks
            great, and you should be proud of it.
        </p>

        <p>
            Next time you&rsquo;re on Stockton Hill Road, take a look. That&rsquo;s our work.
        </p>

        <div className={styles.endLinks}>
            <p>
                <strong>See the project gallery:</strong>{' '}
                <Link to="/portfolio/high-desert-hyundai-kingman">High Desert Hyundai on our portfolio</Link>
                <br />
                <strong>See what we self-perform:</strong>{' '}
                <Link to="/services">Our trades</Link>
                <br />
                <strong>Planning a remodel?</strong>{' '}
                We work across Arizona, Nevada and Utah, doing roofing, EIFS and stucco,
                heating and air, block work and more, for dealerships, hotels, offices and
                retail.{' '}
                <Link to="/contact">Tell us about it</Link>.
            </p>
        </div>

        <div className={styles.thanks}>
            <span className={styles.thanksEyebrow}>Special Thanks</span>
            <p>To Primak Construction Group for trusting us with so much of this project.</p>
        </div>

        <p className={styles.signature}>One team. Multiple trades.</p>
    </>
);

export default HighDesertHyundaiPost;
