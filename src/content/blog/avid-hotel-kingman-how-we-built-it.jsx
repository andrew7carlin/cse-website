/**
 * Blog post: The New Avid Hotel in Kingman Is Done. Here's How We Built It.
 *
 * Lazy-loaded via src/data/blog.js → contentLoader. The wrapper
 * (src/pages/BlogPost.jsx) provides the page chrome, hero, and metadata.
 * This file is responsible for the body content only.
 *
 * Source material: Andrew's draft blog post and captions file in SharePoint
 * (Livebox GC / Avid by IHG Hotel / Website and Social - Nov 2026). The hotel
 * owner is left unnamed and there are no dollar figures, per those notes.
 */

import { Link } from 'react-router-dom';
import styles from '../../pages/BlogPost.module.css';

// Same assets the featured project page uses, so Vite dedupes them.
import avidEntrance from '../../assets/portfolio/commercial/Avid Hotel_Kingman AZ.webp';
import avidRoof     from '../../assets/portfolio/commercial/Avid Hotel_Kingman AZ_4.webp';

const AvidHotelKingmanPost = () => (
    <>
        <p className={styles.lead}>
            You&rsquo;ve probably driven past it. The new four-story hotel on Hotel Way with
            the big red tower and the Avid sign on the side. It&rsquo;s open, guests are
            checking in, and our crews had a big hand in building it.
        </p>

        <p>
            This one took most of the year and a lot of our people. So we want to tell you
            how it went, the good parts and the curveballs too.
        </p>

        <h2>The job</h2>

        <p>
            Livebox GC was the builder, and they brought us in for a big chunk of the outside
            of the building and the systems that keep it comfortable inside.
        </p>

        <p>
            That&rsquo;s not how most jobs like this go. Usually the work gets split up
            between a handful of different companies. Here, a lot of it came to one team.
        </p>

        <h2>What we built</h2>

        <ul>
            <li><strong>The EIFS:</strong> the finish on the outside walls, the smooth gray panels you see from the road. It&rsquo;s insulated, so it helps keep the heat out in summer and in during winter, and it&rsquo;s sealed up to keep water out.</li>
            <li><strong>The roof:</strong> a white roof that reflects the sun, plus the metal trim around the edges.</li>
            <li><strong>The heating and air conditioning:</strong> on every floor.</li>
            <li><strong>The trash enclosure:</strong> block walls out back, finished in stucco to match the hotel.</li>
            <li><strong>Caulking:</strong> sealing the joints and gaps around the building so wind, dust and rain stay outside.</li>
        </ul>

        <figure className={styles.figure}>
            <img
                src={avidEntrance}
                alt="The entrance side of the Avid by IHG hotel in Kingman, Arizona, with gray EIFS walls, the red tower and the entrance canopy."
                loading="lazy"
                decoding="async"
            />
            <figcaption>
                The entrance side of the finished hotel, with the EIFS walls and the red tower.
            </figcaption>
        </figure>

        <h2>Why it helps to have one team</h2>

        <p>
            On a building like this, the walls, the roof and the air conditioning all run
            into each other. The AC units sit on the roof. Their lines run through it. The
            walls tie into the roof edge. When three different companies handle those three
            things, every one of those spots is a place where somebody can say
            &ldquo;that&rsquo;s not my part.&rdquo;
        </p>

        <p>
            With one team, there&rsquo;s no finger-pointing. Our roofers and our HVAC crew
            talk to each other. Our EIFS crew knows exactly what the roof edge is going to
            look like. And the builder has one number to call instead of three. That came in
            handy more than once on this job.
        </p>

        <h2>Curveball #1: a hot elevator shaft</h2>

        <p>
            Kingman summers get hot. By late July, the builder realized the elevator shaft
            needed its own cooling. Elevator equipment doesn&rsquo;t like the heat any more
            than we do.
        </p>

        <p>
            They asked us to put in a small air conditioning unit just for the shaft, and
            they wanted it done the first week of August. That meant setting the unit,
            running a line up through the roof, and patching the roof so it stays watertight.
        </p>

        <p>
            On most jobs, that&rsquo;s two companies and some back and forth over who patches
            what. For us it was one job. Our HVAC team handled the unit, our roofing side
            handled the roof, and the builder didn&rsquo;t have to chase anybody.
        </p>

        <figure className={styles.figure}>
            <img
                src={avidRoof}
                alt="Aerial view of the Avid by IHG hotel in Kingman showing the white reflective roof and rooftop air conditioning units."
                loading="lazy"
                decoding="async"
            />
            <figcaption>
                The white roof and the rooftop air conditioning, built and tied together by
                one team.
            </figcaption>
        </figure>

        <h2>Curveball #2: working around hotel guests</h2>

        <p>
            After the hotel opened, the builder asked us back for one more round of work on
            the windows. Every outside window needed small drain holes at the bottom and a
            fresh seal around the inside of the frame, so any water that gets in has a way
            out.
        </p>

        <p>
            Simple enough, except the hotel was open and people were sleeping in those rooms.
        </p>

        <p>
            So Andy, who handled it for us, treated every window like a guest might be on the
            other side. Usually one was. Each morning he checked which rooms were empty and
            started there. He told the hotel which side of the building he&rsquo;d be on that
            day, and worked his way around from a lift, south side first, then west, then
            north.
        </p>

        <p>
            The front entrance was the tricky part, with a dozen windows right above where
            guests walk in. Andy put out extra cones and safety tape and set up extra
            protection under the awning, so nobody ever had to walk in under the work. The
            last few windows on the north side waited until those rooms opened up.
        </p>

        <p>
            It took patience. That&rsquo;s what it takes to work on a building people are
            already living in.
        </p>

        <h2>Built for Kingman weather</h2>

        <p>
            Between the insulated EIFS, a roof that bounces the sun back, and air
            conditioning built for July, this building is ready for whatever Kingman throws
            at it. Hot afternoons, cold nights, and the wind that blows dust at everything.
        </p>

        <p>
            The roof also comes with a 20-year warranty from the maker.
        </p>

        <h2>Thank you</h2>

        <p>
            A big thank you to Livebox GC for bringing us onto this one and trusting us with
            so much of it.
        </p>

        <p>
            And thank you to every one of our crew members who spent a Kingman summer on that
            building, from the EIFS crew on the walls to the guys on the roof in July. It
            looks great, and you should be proud of it.
        </p>

        <p>
            Next time you drive by, look up. That&rsquo;s our work.
        </p>

        <div className={styles.endLinks}>
            <p>
                <strong>See the project gallery:</strong>{' '}
                <Link to="/portfolio/avid-hilton-kingman">Avid by IHG on our portfolio</Link>
                <br />
                <strong>See what we self-perform:</strong>{' '}
                <Link to="/services">Our trades</Link>
                <br />
                <strong>Got a project coming up?</strong>{' '}
                We work across Arizona, Nevada and Utah, doing roofing, EIFS and stucco,
                heating and air, block work and more, for homes and businesses.{' '}
                <Link to="/contact">Tell us about it</Link>.
            </p>
        </div>

        <div className={styles.thanks}>
            <span className={styles.thanksEyebrow}>Special Thanks</span>
            <p>To Livebox GC for trusting us with so much of this project.</p>
        </div>

        <p className={styles.signature}>One team. Multiple trades.</p>
    </>
);

export default AvidHotelKingmanPost;
