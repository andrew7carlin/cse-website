/**
 * Long-form, per-trade body copy for the service detail pages
 * (src/pages/TradeDetail.jsx). Kept out of the tradeData object so the
 * marketing prose is easy to edit without touching the page logic.
 *
 * Each entry renders as three H2 sections beneath the Overview + Expertise:
 *   - scope:   "What [Trade] Work We Handle" — the real services we
 *     self-perform for this trade.
 *   - why:     "Why Canyon State for [Trade]" — the trade-specific value prop.
 *   - process: "What to Expect" — how Canyon State approaches the work.
 *
 * Copy is intentionally factual: it describes the work, the building types,
 * and Canyon State's known approach (self-performed crews, Southwest desert
 * conditions, AZ ROC licensing). It does not claim specific dates, budgets,
 * or square footage we can't substantiate.
 */
export const tradeContent = {
  roofing: {
    scope:
      'Canyon State self-performs the full range of commercial and residential roofing across the Southwest. On flat and low-slope commercial decks we install single-ply TPO, PVC, and EPDM membranes, built-up and modified bitumen, and spray polyurethane foam with reflective coatings. On steep-slope and residential work we handle concrete and clay tile, standing-seam and exposed-fastener metal, and architectural asphalt shingle. We also take on reroofs, tear-offs, leak diagnosis, and restoration coatings that add years to an aging assembly. Every system is detailed for the conditions it actually has to survive, from monsoon-driven wind and water to sustained desert UV and thermal cycling.',
    why:
      'Roofing is where Canyon State started, and it still sets the standard for everything else we do. Because we self-perform instead of brokering the work to a rotating cast of subcontractors, the crew that bids your roof is the crew that installs it and the crew that warranties it. That continuity matters most on the details that fail first: flashings, penetrations, crickets, and terminations. Our roots trace back to A-2-Z Roofing Supply in 1987, and that history shows up as relationships with the manufacturers whose systems we install, faster approvals from inspectors who know our work, and warranty calls we can answer the same day.',
    process:
      'Every Canyon State roof starts with a real assessment, not a sales pitch. We inspect the existing assembly, identify the failure points, and specify a system matched to the building, the budget, and the climate. Then our own crews install it, our own supervisors check it, and we document the work for the warranty. If a question comes up after completion, you call the company that did the work, not a subcontractor who has already moved on to the next job.',
  },
  stucco: {
    scope:
      'Canyon State performs traditional three-coat stucco, synthetic stucco, and full EIFS wall systems on both homes and commercial buildings. That includes lath and scratch-and-brown application, finish coats in a wide range of textures, color matching to existing walls, and the waterproofing and flashing details that keep moisture out of the assembly. We are also one of the few crews in the region that will take on custom texture and finish work most plasterers avoid. From large multi-building developments that need volume and consistency to one-off architectural finishes, the same crews bring the same standards to the wall.',
    why:
      'Stucco built our reputation after roofing built our foundation, and we approach it with the same discipline. A stucco wall is only as good as the lath, the moisture barrier, and the transitions behind the finish you can see, which is exactly where rushed crews cut corners. Canyon State self-performs the entire assembly, so the waterproofing and the finish are the responsibility of one accountable team rather than a handoff between trades. The result is a wall that looks right on day one and stays watertight through years of monsoon exposure and desert temperature swings.',
    process:
      'A Canyon State stucco job is planned from the substrate out. We confirm the lath, the moisture barrier, and the flashing details before any finish goes on, because that is where walls fail. Our crews apply the scratch, brown, and finish coats on a controlled schedule, match texture and color to the architect or the existing wall, and protect the work as it cures. You get a wall that performs as well as it looks, backed by the crew that installed it.',
  },
  'general-contracting': {
    scope:
      'As a general contractor, Canyon State manages every phase of a project from preconstruction through closeout. That means budgeting and value engineering before the first shovel, trade coordination and scheduling during the build, quality control and inspections throughout, and a clean punch-and-closeout at the end. We run new construction, full renovations, and tenant improvements, and we are equally comfortable as the GC of record or as an owner representative keeping someone else honest. Because we self-perform several of the trades on most jobs, we can hold the schedule on the critical path instead of waiting on a subcontractor truck from out of town.',
    why:
      'Most construction problems start at the seams between trades, where one subcontractor hands off to the next and nobody owns the gap. Canyon State closes those seams by self-performing roofing, stucco, metals, and more in house, then coordinating the remaining trades with the same accountability. You get one schedule, one point of contact, and one team that answers for the result. No three layers of subcontractors, no finger-pointing when something goes sideways, and no surprises on the budget. That is the difference between managing a project and simply administering one.',
    process:
      'As your general contractor, Canyon State runs preconstruction before the schedule is ever set: we pressure-test the budget, flag long-lead items, and value-engineer where it helps without cutting corners that matter. During the build we coordinate every trade against one master schedule, hold weekly accountability, and keep you informed instead of surprised. At closeout we run the punch list to zero and hand over a building that is genuinely finished, not just substantially complete.',
  },
  hvac: {
    scope:
      'Canyon State Heating & Cooling installs, replaces, and services heating and air conditioning systems for homes and businesses across Arizona and Nevada. We handle new-construction rough-in and ductwork, full system replacements, and ongoing preventive maintenance, plus zoning, smart thermostats, and indoor-air-quality upgrades. On the commercial side we service rooftop units and larger packaged systems on the same buildings our roofing crews work on. Whether it is a failed compressor in July or a ground-up mechanical package, the goal is the same: keep the air moving, the temperatures right, and the energy bills under control.',
    why:
      'In the desert, an HVAC system is not a convenience, it is the thing standing between you and a 115-degree afternoon. Canyon State Heating & Cooling carries its own Arizona ROC license (328713) and brings the same self-perform discipline to mechanical work that the rest of the company brings to the building envelope. That matters on a commercial building where the roof and the rooftop units have to work together: one company that understands both will not leave you with a leak around a curb or a unit that was never sized for the load. Installs, repairs, and maintenance, all from one accountable team.',
    process:
      'Canyon State Heating & Cooling sizes every system to the actual load, not a rule of thumb, because an oversized or undersized unit costs you comfort and money for years. We install or replace with attention to ductwork, airflow, and refrigerant charge, then verify the system performs before we leave. For maintenance clients, we catch the small failures before they become a no-cooling call in the middle of July. Straightforward diagnoses, fair pricing, and work that holds up to a desert summer.',
  },
  plumbing: {
    scope:
      'Canyon State handles plumbing from rough-in to finish on both residential and commercial projects. That includes water supply and distribution, drain, waste, and vent systems, gas lines, fixture setting, backflow prevention, and full repipes on older buildings. We diagnose and repair leaks, and we take on commercial plumbing where code compliance and inspection coordination matter as much as the pipe itself. Across Mohave County and the wider Southwest, our crews build plumbing systems the way they should be built: to code, leak-free, and accessible for whoever has to service them later.',
    why:
      'Plumbing is hidden until it fails, and when it fails it does expensive damage. The fix is not glamorous, it is disciplined: correct materials, proper slope, tested joints, and clean rough-in that the inspector passes the first time. Canyon State self-performs plumbing as part of a coordinated build rather than as an afterthought bolted on at the end, so the system is laid out around the structure instead of fought into it. No shortcuts behind the wall, no callbacks for a leak that should never have happened.',
    process:
      'Canyon State plumbing is laid out around the structure from the start, so the system is built right rather than forced into place at the end. We use correct materials, set proper slope, pressure-test the joints, and rough in clean so the inspection passes the first time. On finish, fixtures are set level and sealed, and we walk the system with you. On repairs and repipes, we find the actual cause instead of chasing the symptom and patching it twice.',
  },
  'res-const': {
    scope:
      'Canyon State builds where people live: custom homes, major additions, whole-house renovations, kitchen and bath remodels, ADUs, and multi-family communities. We work ground-up from a bare lot and we work inside existing homes, and in both cases we bring the same finish-level detail and the same accountability. Because we self-perform the roof, the stucco, the metals, and more, a residential project does not stall while we wait on three separate specialty subs to find a free week. From design-build collaboration to the final walkthrough, one team carries the home from dirt to keys.',
    why:
      'A house is the most personal thing most people will ever build, and it deserves a builder who treats the details that way. Canyon State brings commercial-grade process to residential work without losing the craftsmanship a home needs. Self-performing the major trades means tighter schedules, fewer handoff errors, and a single team that stands behind the whole house rather than just its piece of it. Whether it is a custom home on a view lot or a multi-family community on a draw schedule, you get the same standards and the same straight answers.',
    process:
      'Building a home with Canyon State starts with listening, then planning the work so the trades flow in the right order and the schedule holds. Because we self-perform the roof, stucco, and metals, those critical milestones are ours to hit, not someone else’s to miss. We hold the same finish standards on a detail nobody will see as on the ones everybody will, and we walk the finished home with you to make sure it is right before you move in.',
  },
  'com-const': {
    scope:
      'Canyon State builds commercial space that has to open on time and perform under use: retail and restaurant build-outs, hospitality, medical and dealership facilities, office, and light industrial. We run both ground-up construction and tenant improvements, and we deliver on fast-track schedules where the rent clock is already running. Self-performing the building envelope, including roofing, stucco, and metals, lets us compress the critical path and dry a building in before the finishes crews arrive. From value engineering at bid time to post-occupancy support, we treat a commercial project as the business investment it is.',
    why:
      'Commercial work lives and dies by the schedule, and the schedule lives and dies on the trades that everyone else has to wait for. Canyon State self-performs exactly those trades, so we are not bidding your timeline on a subcontractor we have never met. Tight budgets, aggressive deadlines, and demanding tenants are the normal operating environment, not the exception. One team that owns the envelope and coordinates the rest means fewer delays, fewer change orders born of miscommunication, and a building that opens when you said it would.',
    process:
      'On commercial work, Canyon State front-loads the planning so the open date is protected. We sequence the envelope to dry the building in early, coordinate inspections so they do not stall the trades, and keep materials staged inside the market so a delivery delay never becomes a schedule delay. Whether it is a tenant improvement on a tight turn or a ground-up build, we manage the critical path actively and flag risks before they cost you time or money.',
  },
  metals: {
    scope:
      'Canyon State fabricates and installs architectural sheet metal: standing-seam roof and wall panels, flush and reveal panel systems, coping and cap metal, fascia and trim, sunshades, canopies, and the custom flashings that tie an envelope together. We roll long continuous panels on site when a job calls for it and we build custom profiles to match an architect intent. Most of this metal goes on the same commercial buildings our roofing crews are already on, so the panel work and the membrane work are detailed to function as one system rather than two trades meeting at a seam.',
    why:
      'Architectural metal is unforgiving: it is the most visible part of the envelope and the part where a sloppy flashing both looks wrong and leaks. Canyon State self-performs metals alongside roofing, which means the standing seam, the coping, and the membrane are coordinated by one team that understands how they have to work together. We bring the fabrication capability, the equipment, and the experienced applicators that complex panel work demands. Sharp lines, tight reveals, and flashings detailed to survive UV and thermal movement, not just to pass a glance from the ground.',
    process:
      'Custom metal work begins in fabrication, where the profiles, reveals, and flashings are built to the drawings before anything reaches the roof or wall. Canyon State rolls long panels on site when a job calls for it, and our experienced applicators handle the demanding installations that separate clean architectural metal from sloppy. We coordinate every termination with the roofing and stucco scopes so the envelope works as one system, then inspect the finished metal for the lines and the watertightness it has to deliver.',
  },
  masonry: {
    scope:
      'Canyon State self-performs masonry across the Southwest: brick, structural and decorative block, stone and manufactured-stone veneer, CMU walls, retaining walls, pavers and hardscape, and restoration work like tuckpointing and patching. We lay units for both the structure of a building and the finish that faces the street, and we coordinate masonry with the rest of the envelope so flashings, weeps, and control joints actually do their job. From perimeter and screen walls on commercial sites to feature walls and fireplaces on custom homes, the work is built to stand for decades.',
    why:
      'Masonry is as much craft as trade. A block wall that is plumb, coursed, and properly reinforced is the difference between a structure that lasts generations and one that cracks and leans. Canyon State approaches every unit with that long-view discipline, and because we self-perform the surrounding envelope we make sure the masonry integrates with the waterproofing instead of fighting it. Precision in the layout, the right reinforcement and grout, and clean joints that read as intentional: that is masonry built with pride and built to last.',
    process:
      'A Canyon State masonry job is laid out before the first unit is set: we confirm coursing, reinforcement, and control-joint locations so the wall is plumb, strong, and built to move without cracking. Our masons grout and reinforce to spec, tool the joints clean, and coordinate flashings and weeps with the rest of the envelope so water gets out where it should. The finished wall is built to stand straight and true for decades, not just to pass a glance from the curb.',
  },
  fencing: {
    scope:
      'Canyon State installs commercial and residential fencing of every common type: chain link, ornamental wrought iron, wood and vinyl privacy fence, decorative and security fencing, pool enclosures, and commercial perimeter systems. We set gates and gate operators, handle access-controlled openings, and build to the codes and setbacks each jurisdiction enforces. Whether the job is securing a commercial yard, screening a development, or enclosing a backyard, we set posts that stay plumb in desert soils and hang gates that still swing true years later.',
    why:
      'Good fences make good neighbors, and they make secure job sites, finished developments, and private backyards. The difference between a fence that lasts and one that leans is in the parts you do not see: footing depth, post setting, and proper hardware. Canyon State does fencing the way we do everything else, clean and fast without skipping the fundamentals. As a multi-trade contractor we can fold fencing into a larger site package or handle it as a standalone, and either way you get one accountable crew rather than the cheapest bid that disappears after install.',
    process:
      'Canyon State sets fence the way it should be set: footings to the right depth, posts plumb and aligned, and hardware rated for the job rather than the cheapest option on the shelf. We confirm property lines, setbacks, and local code before we dig, and we hang gates and operators so they still swing true years later. Commercial perimeter or backyard privacy, the install is clean, fast, and built to stay standing through desert wind and soil movement.',
  },
  gutters: {
    scope:
      'Canyon State rolls seamless aluminum gutters on site, custom-fit to each building rather than cut from stock lengths. We fabricate and install gutters and downspouts, add gutter guards, handle fascia and soffit work and drip edge, and engineer drainage so water actually leaves the building instead of pooling against it. On commercial buildings we tie gutter systems into the larger roof and metal package our crews are already installing, so the water management is detailed as part of the envelope rather than added as an afterthought.',
    why:
      'A gutter is simple until it leaks, overflows, or pulls away from the fascia, and then it is a water-intrusion problem dressed up as a small one. Rolling seamless gutters on site removes the joints that fail and lets us fit the building exactly. Because Canyon State also installs the roof and the metal trim, the gutter is integrated with the drip edge and the flashing instead of caulked on at the end by a separate crew. No seams, no leaks, no headaches, just clean water management that works through monsoon season.',
    process:
      'Because we roll seamless gutters on site, every run is custom-fit to the building instead of pieced together from stock lengths. Canyon State sets the pitch so water actually moves to the downspouts, ties the system into the drip edge and flashing our roofing crews already installed, and adds guards and drainage where the building needs them. The result is integrated water management with no joints to fail, sized and detailed to handle a real monsoon downpour.',
  },
  'land-dev': {
    scope:
      'Canyon State takes raw ground and makes it ready to build: site grading and rough grading, excavation, underground utilities, drainage and erosion control, demolition, retaining walls, pad preparation, and site access. We move dirt and set the infrastructure that everything else depends on, and we coordinate that early work with the vertical construction that follows so the site is staged correctly when the building crews arrive. From a single pad to a full development, the goal is a site that is graded, drained, and serviced exactly the way the project needs.',
    why:
      'Everything built on a site inherits the quality of the work done before the foundation. Bad grading and drainage do not announce themselves until the first big storm, and by then they are expensive to fix. Canyon State treats land development as the foundation of the whole project, not as throwaway dirt work, and because we also build vertically we understand what the site has to deliver for the structure on top of it. Get the dirt, the drainage, and the utilities right, and every trade that follows has a better place to start.',
    process:
      'Site work with Canyon State starts with the grades and the drainage, because everything built later inherits them. We move dirt to plan, set underground utilities, and build in the drainage and erosion control the site needs before the first storm tests it. We coordinate the early work with the vertical construction that follows so pads are ready and access is clear when the building crews arrive. Get the foundation of the site right, and every trade after has a better place to start.',
  },
};
