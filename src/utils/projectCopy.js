/**
 * Grounded body copy for individual portfolio project pages
 * (src/pages/ProjectDetail.jsx, non-featured projects).
 *
 * We do not have a written case study for every one of the 100+ portfolio
 * projects, so this generates an "About This Project" paragraph and a
 * factual details list from the attributes we DO have for each project:
 * its category (building type), trade (what Canyon State self-performed),
 * and location (market/region). The prose is deliberately kept to a single
 * grounded paragraph that varies by category + trade + location, rather
 * than a long templated narrative, to keep the body useful without
 * manufacturing near-duplicate filler across similar projects.
 *
 * Nothing here asserts a specific date, budget, square footage, or any
 * other fact we can't substantiate from the project record.
 */

// What each building type demands — general, true statements about the
// category, used to give the paragraph substance beyond the bare facts.
const CATEGORY = {
  hospitality:   { label: 'Hospitality', demands: 'Hotels and resorts run on uptime, so the work has to happen around active operations and unforgiving open dates.' },
  'multi-family':{ label: 'Multi-Family', demands: 'Multi-family communities move on tight draw schedules where multiple buildings have to come together at once.' },
  medical:       { label: 'Medical', demands: 'Medical facilities demand tight tolerances, clean detailing, and work that holds up to strict inspection.' },
  government:    { label: 'Government', demands: 'Public buildings are built to last and to pass rigorous inspection, with accountability at every step.' },
  restaurants:  { label: 'Restaurant', demands: 'Restaurants live and die by their opening date, so the build has to hold a fast, fixed schedule.' },
  retail:        { label: 'Retail', demands: 'Retail space turns over quickly and has to open on schedule with a clean, customer-ready finish.' },
  dealerships:   { label: 'Dealership', demands: 'Auto dealerships pair large open showrooms with demanding architectural finishes and strict brand standards.' },
  industrial:    { label: 'Industrial', demands: 'Industrial buildings cover large footprints where durable, efficient systems matter more than ornament.' },
  'custom-home': { label: 'Custom Home', demands: 'A custom home is personal, and it rewards a builder who treats every detail the way the owner does.' },
  development:   { label: 'Development', demands: 'Community developments repeat quality across many homes while holding a consistent schedule and standard.' },
  'model-home':  { label: 'Model Home', demands: 'A model home sets the standard a whole community will be measured against, so the finish has to be flawless.' },
};

const STATE_NAMES = {
  AZ: 'Arizona', NV: 'Nevada', CA: 'California', TX: 'Texas', NM: 'New Mexico',
  UT: 'Utah', NC: 'North Carolina', TN: 'Tennessee', CO: 'Colorado',
};

// Desert-Southwest markets get an envelope-specific closing line; everything
// else gets a regional-reach line. Both are true.
const SOUTHWEST = new Set(['AZ', 'NV']);

function stateAbbrev(location = '') {
  const m = location.match(/,\s*([A-Z]{2})\b/);
  return m ? m[1] : '';
}

export function projectCategoryLabel(category) {
  return CATEGORY[category]?.label || 'Construction';
}

/**
 * Build the "About This Project" paragraph + a factual details list.
 * @returns {{ heading: string, overview: string, details: Array<{label:string,value:string}> }}
 */
export function buildProjectCopy(project) {
  const cat = CATEGORY[project.category];
  const catLabel = cat?.label || 'Construction';
  const demands = cat?.demands || '';
  const trade = (project.trade || 'construction').trim();
  const tradeLower = trade.toLowerCase();
  const abbrev = stateAbbrev(project.location);
  const stateName = STATE_NAMES[abbrev] || 'the Southwest';

  const closing = SOUTHWEST.has(abbrev)
    ? 'In the Southwest that means systems detailed for intense sun, heat, and monsoon weather, not a template borrowed from a milder climate.'
    : `Canyon State has delivered this kind of work across the Southwest and into ${stateName}.`;

  const overview =
    `${project.title} is a ${catLabel.toLowerCase()} project in ${project.location} where Canyon State self-performed the ${tradeLower} scope. ` +
    `${demands} ` +
    `Because Canyon State self-performs its trades in house instead of brokering them to outside subcontractors, the same crew that bid the work installed it and stands behind it. ` +
    `${closing}`;

  const details = [
    { label: 'Location', value: project.location },
    { label: 'Project Type', value: catLabel },
    project.trade ? { label: 'Trade Self-Performed', value: project.trade } : null,
    { label: 'Region', value: SOUTHWEST.has(abbrev) ? `${stateName} (Southwest)` : stateName },
  ].filter(Boolean);

  return { heading: `About ${project.title}`, overview, details };
}
