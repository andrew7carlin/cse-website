export const locations = [
  {
    heroImage: 'kingman',
    heroPosition: 'center 40%',
    id: 'kingman-az',
    city: 'Kingman',
    state: 'Arizona',
    abbrev: 'AZ',
    label: 'Kingman, AZ',
    role: 'Corporate Headquarters',
    phone: '(928) 757-9003',
    region: 'Northwest Arizona: Mohave County, Golden Valley, Bullhead City corridor',
    description:
      'Kingman is home to Canyon State Enterprises corporate headquarters. Our Kingman office serves as the operations hub for the entire Southwest, coordinating roofing, stucco, metals, and specialty construction across Mohave County and beyond. With decades of local history, our team knows every jobsite, inspector, and supplier in the region.',
    services: ['Roofing', 'Stucco & EIFS', 'Specialty Metals', 'Masonry', 'Fencing', 'Seamless Gutters', 'HVAC', 'Plumbing'],
    coverage: ['Kingman', 'Golden Valley', 'Wikieup', 'Chloride', 'Hackberry', 'Valentine', 'Mohave Valley'],
    // Local-context copy (used in About This Office section). Speaks to
    // building conditions and code realities specific to this market.
    localContext:
      'Mohave County construction has its own rhythm: high desert temperature swings, monsoon-driven moisture intrusion, and a building-department culture that rewards crews who actually live here. Our Kingman team has built relationships with every major inspector, supplier, and engineer in the county over 25+ years — which means fewer surprises, faster approvals, and warranty work that we can be on-site for the same day.',
    // Project IDs that anchor real local proof. Pulled from
    // src/data/projects.js commercialProjects[] — IDs must match.
    featuredProjects: ['krmc-medical-main', 'hualapai-mountain-campus', 'jimmy-johns-kingman'],
  },
  {
    heroImage: 'phoenix',
    heroPosition: 'center center',
    id: 'phoenix-az',
    city: 'Phoenix',
    state: 'Arizona',
    abbrev: 'AZ',
    label: 'Phoenix, AZ',
    role: 'Phoenix Metro Office',
    phone: '(602) 527-6050',
    region: 'Greater Phoenix Metro: East Valley, West Valley, Scottsdale, Tempe, Mesa, Gilbert, Chandler',
    description:
      'Our Phoenix office puts Canyon State crews in the heart of the fastest-growing construction market in the country. From large commercial builds in Scottsdale to multi-family developments across the East Valley, we bring the same standards that built our reputation in the Northwest to every Phoenix project.',
    services: ['Roofing', 'Stucco & EIFS', 'General Contracting', 'Commercial Construction', 'Land Development', 'HVAC'],
    coverage: ['Phoenix', 'Scottsdale', 'Mesa', 'Tempe', 'Gilbert', 'Chandler', 'Glendale', 'Peoria', 'Surprise', 'Goodyear', 'Avondale', 'Queen Creek'],
    localContext:
      'The Valley is the most aggressive construction market in the Southwest, and the schedules show it. Phoenix-area work is dominated by tight GC timelines, dealership and retail tenant turnover, multi-family developments under accelerated draw schedules, and brutal summer heat that punishes underspecified roof assemblies. We staff Phoenix specifically to keep crews and materials inside the Valley — no waiting on a truck from Kingman when a TPO deck needs to be dried in before a 115°F afternoon.',
    featuredProjects: ['greenprint-apartments', 'hyundai-gilbert', 'good-gather-phoenix'],
  },
  {
    heroImage: 'bullhead',
    heroPosition: 'center 30%',
    id: 'bullhead-city-az',
    city: 'Bullhead City',
    state: 'Arizona',
    abbrev: 'AZ',
    label: 'Bullhead City, AZ',
    role: 'Tri-State Area Office',
    phone: '(928) 757-9003',
    region: 'Tri-State Area: Western AZ, Southern NV, Eastern CA',
    description:
      'Bullhead City positions Canyon State at the crossroads of Arizona, Nevada, and California. Our crews service both sides of the Colorado River and the Laughlin corridor with the same speed and quality our clients expect. Whether it\'s a casino property in Laughlin or a commercial build in Fort Mohave, we\'re already there.',
    services: ['Roofing', 'Stucco & EIFS', 'Specialty Metals', 'Seamless Gutters', 'Fencing', 'Masonry'],
    coverage: ['Bullhead City', 'Fort Mohave', 'Mohave Valley', 'Laughlin NV', 'Needles CA', 'Katherine Landing'],
    localContext:
      'The tri-state corridor mixes hospitality, multi-family, and retail work across two state jurisdictions and three building departments. Our Bullhead crews carry licenses and inspector relationships on both sides of the river, which keeps Laughlin casino turns and Fort Mohave multi-family draws on schedule without re-permitting headaches.',
    featuredProjects: ['legacy-senior-center', 'holiday-inn-express-bullhead', 'rivyve-behavioral-health'],
  },
  {
    heroImage: 'lasvegas',
    heroPosition: 'center 35%',
    id: 'las-vegas-nv',
    city: 'Las Vegas',
    state: 'Nevada',
    abbrev: 'NV',
    label: 'Las Vegas, NV',
    role: 'Nevada Operations',
    phone: '(928) 757-9003',
    region: 'Southern Nevada: Las Vegas, Henderson, North Las Vegas, Pahrump, Mesquite',
    description:
      'Canyon State\'s Nevada operations are headquartered in Las Vegas. The market is large, fast-moving, and unforgiving, and it fits us perfectly. From large multi-family communities like Betty\'s Village to hospitality projects on the Strip corridor, our Nevada crews bring the same relentless standards that define Canyon State everywhere we work.',
    services: ['Roofing', 'Stucco & EIFS', 'Commercial Construction', 'Specialty Metals'],
    coverage: ['Las Vegas', 'Henderson', 'North Las Vegas', 'Summerlin', 'Boulder City', 'Pahrump', 'Mesquite', 'Laughlin'],
    localContext:
      'Roofing in the Las Vegas Valley is a different problem than anywhere else we work. Sustained 110°F+ summer temperatures cook standard TPO and asphalt assemblies faster than spec sheets predict, monsoon-driven wind events expose seam and flashing weaknesses, and Clark County and City of Las Vegas inspectors enforce code aggressively. Our Nevada crews specify desert-rated TPO and PVC systems, oversize crickets for storm drainage, and detail flashings to survive UV and thermal cycling — not the suburban template that fails in year four.',
    featuredProjects: ['bettys-village', '28th-sunrise-las-vegas', 'costco-henderson'],
  },
  {
    heroImage: 'havasu',
    heroPosition: 'center center',
    id: 'lake-havasu-city-az',
    city: 'Lake Havasu City',
    state: 'Arizona',
    abbrev: 'AZ',
    label: 'Lake Havasu City, AZ',
    role: 'West Arizona Office',
    phone: '(928) 757-9003',
    region: 'Western Arizona: Lake Havasu City, Parker, Quartzsite, Blythe area',
    description:
      'Lake Havasu City is one of the fastest-growing communities in Arizona, and Canyon State has been part of that growth. Our west Arizona office serves the full Lake Havasu corridor, from residential custom homes to commercial and hospitality projects along the waterfront. If you\'re building near the lake, we know the market.',
    services: ['Roofing', 'Stucco & EIFS', 'Residential Construction', 'Seamless Gutters', 'Fencing', 'Masonry'],
    coverage: ['Lake Havasu City', 'Parker', 'Quartzsite', 'Blythe CA', 'Topock', 'Havasu Landing'],
    localContext:
      'Havasu builds skew custom-residential and lakeside hospitality, with heavy UV exposure and waterfront wind loading that make material selection consequential. Our west Arizona crews specify tile, metal, and high-end stucco systems built for the lake environment, and we routinely coordinate with the same custom home builders and architects across the corridor.',
    featuredProjects: ['northpoint-custom-home'],
  },
];

export const getLocation = (id) => locations.find(l => l.id === id) || null;
