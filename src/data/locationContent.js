/**
 * Long-form, per-office body copy for the location detail pages
 * (src/pages/LocationPage.jsx). Kept separate from src/data/locations.js so
 * the marketing prose is easy to edit without touching the data structure
 * the rest of the app reads.
 *
 * Each entry renders as two H2 sections beneath the existing "About This
 * Office" content:
 *   - services:   "Construction Services in [City]" — what this office
 *     focuses on, grounded in its real services + local market.
 *   - commitment: "Why [Region] Builds with Canyon State" — local crews,
 *     relationships, and coverage.
 *
 * Copy is factual: it references the trades each office actually performs,
 * the markets it serves, and Canyon State's known approach. It avoids
 * specific dates, dollar figures, or counts we cannot substantiate.
 */
export const locationContent = {
  'kingman-az': {
    services:
      'Kingman is the operations hub for the entire company, and the office self-performs the widest range of trades of any Canyon State location: roofing, three-coat stucco and EIFS, specialty metals, masonry, fencing, seamless gutters, HVAC, and plumbing. That breadth lets a single team carry a Mohave County project from the building envelope to the mechanical systems without waiting on outside subs. From medical and government work in town to custom homes out in Golden Valley, the Kingman crews handle commercial and residential alike, and they bring the company yard, equipment, and scaffolding inventory that keep larger jobs on schedule.',
    commitment:
      'Twenty-five years in one market builds something you cannot buy: relationships. The Kingman team knows the inspectors, the suppliers, and the engineers across Mohave County by name, which means fewer surprises, faster approvals, and warranty work we can be on site for the same day. High-desert temperature swings, monsoon-driven moisture, and a building-department culture that rewards crews who actually live here all reward local knowledge, and that is exactly what headquarters brings. When you hire the Kingman office, you hire the people who have been building this region for decades.',
  },
  'phoenix-az': {
    services:
      'The Phoenix office puts Canyon State crews in the heart of the fastest-growing construction market in the country, and it is built for the work the Valley actually demands: roofing, stucco and EIFS, general contracting, commercial construction, land development, and HVAC. That mix matches the projects here, from dealership and retail tenant turns to multi-family developments running on accelerated draw schedules. Staffing crews and materials inside the Valley means we are not waiting on a truck from Kingman when a roof deck has to be dried in before a 115-degree afternoon. Ground-up or tenant improvement, the Phoenix team builds to the schedules this market runs on.',
    commitment:
      'Phoenix is the most aggressive construction market in the Southwest, and the schedules show it. Tight general-contractor timelines, brutal summer heat that punishes underspecified roof assemblies, and demanding tenants are the normal operating environment here, not the exception. Canyon State staffs Phoenix specifically so crews and materials stay in the Valley and the critical path never waits on an out-of-town subcontractor. We bring the same standards that built our reputation in the Northwest to every Phoenix project, with the local presence to back them up across Scottsdale, the East Valley, and the West Valley.',
  },
  'bullhead-city-az': {
    services:
      'Bullhead City sits at the crossroads of Arizona, Nevada, and California, and the office is built to work across all three: roofing, stucco and EIFS, specialty metals, seamless gutters, fencing, and masonry. The tri-state corridor mixes hospitality, multi-family, and retail work across two state jurisdictions and three building departments, so the crews here carry the licenses and relationships needed on both sides of the Colorado River. Whether it is a casino property in Laughlin or a commercial build in Fort Mohave, our team is already there, already permitted, and already working with the local inspectors.',
    commitment:
      'Working a multi-state corridor sounds simple until a permit, an inspection, or a code interpretation has to cross a state line. The Bullhead City crews carry inspector relationships on both sides of the river, which keeps Laughlin casino turns and Fort Mohave multi-family draws on schedule without re-permitting headaches. That local fluency, combined with the full backing of corporate headquarters just up the road in Kingman, gives clients the speed of a local contractor and the depth of a regional one. Same river, three states, one accountable team.',
  },
  'las-vegas-nv': {
    services:
      'Canyon State runs its Nevada operations from Las Vegas, and the office is focused on the work that defines this market: commercial roofing, stucco and EIFS, commercial construction, and specialty metals. The Las Vegas Valley is large, fast-moving, and unforgiving, and it fits us perfectly, from large multi-family communities like Betty’s Village to hospitality projects on the Strip corridor. Our Nevada crews specify desert-rated TPO and PVC systems, oversize crickets for storm drainage, and detail flashings to survive UV and thermal cycling rather than relying on the suburban template that fails in year four.',
    commitment:
      'Roofing in the Las Vegas Valley is a different problem than anywhere else we work. Sustained summer temperatures above 110 degrees cook standard membranes faster than spec sheets predict, monsoon wind events expose seam and flashing weaknesses, and Clark County and City of Las Vegas inspectors enforce code aggressively. Canyon State staffs Nevada with crews who build for those conditions on purpose, not by accident. The same relentless standards that define the company everywhere else show up here in systems engineered for the desert and a team that stands behind them long after the final inspection.',
  },
  'lake-havasu-city-az': {
    services:
      'The Lake Havasu City office serves one of the fastest-growing communities in Arizona, and it is built for the work the corridor produces: roofing, stucco and EIFS, residential construction, seamless gutters, fencing, and masonry. Havasu builds skew toward custom residential and lakeside hospitality, with heavy UV exposure and waterfront wind loading that make material selection genuinely consequential. Our west Arizona crews specify tile, metal, and high-end stucco systems built for the lake environment, and they routinely coordinate with the same custom-home builders and architects working up and down the corridor from Parker to Quartzsite.',
    commitment:
      'Building near the lake is its own discipline. Sun and wind that would be an afterthought elsewhere become the deciding factors in how a roof, a wall, or a finish is detailed here, and getting it wrong shows up fast on the waterfront. Canyon State has been part of Lake Havasu’s growth long enough to know the market, the builders, and the conditions, and we bring the full capability of a regional multi-trade contractor to projects that often want a craftsman’s attention to detail. If you are building near the water, we already know what it takes to make it last.',
  },
};
