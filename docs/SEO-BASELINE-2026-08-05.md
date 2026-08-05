# SEO Baseline — captured 2026-08-05 (before SEO-team spec implementation)

Backup of every page's title, meta description, and H1 as they existed before the
on-page optimization pass. Rendered titles include the auto-appended brand suffix
from `SEO.jsx`. Git history at this commit is the authoritative full backup.

## Static pages

| Page | Rendered title | H1 |
|---|---|---|
| / | Canyon State Enterprises \| Multi-Trade Contractor AZ, NV, UT | One Team, Multiple Trades. |
| /about | About Us - Our Story & Leadership \| Canyon State Enterprises | We Are / Canyon State |
| /services | Trades & Construction Services \| Canyon State Enterprises | Complete Construction Services. |
| /partnerships | Manufacturer & Client Partnerships \| Canyon State Enterprises | Great Work Starts With Great Partners |
| /where | Where We Work \| Canyon State Enterprises | Building the Southwest |
| /contact | Contact Us - Get a Free Quote \| Canyon State Enterprises | Contact Canyon State Enterprises (visually hidden) |
| /careers | Careers - Join Canyon State \| Canyon State Enterprises | Build a real career. / Not a punch list. |
| /portfolio | Project Portfolio \| Canyon State Enterprises | CANYON STATE PROJECT PORTFOLIO |
| /portfolio/commercial | Commercial Projects \| Canyon State Enterprises | Commercial Projects |
| /portfolio/residential | Residential Projects \| Canyon State Enterprises | Residential Projects |
| /faq | FAQ: Frequently Asked Questions \| Canyon State Enterprises | Frequently Asked / Questions |

### Meta descriptions (static)
- **/** — Arizona's trusted multi-trade construction company. Roofing, stucco, HVAC, plumbing, masonry and more across Arizona, Nevada, and the Southwest.
- **/about** — Since 2001, Canyon State Enterprises has built the Southwest with 12+ self-performed construction trades across Arizona, Nevada, Utah, and New Mexico.
- **/services** — 12+ self-performed trades under one roof: roofing, stucco, HVAC, plumbing, masonry, metals, and full construction across Arizona, Nevada, and the Southwest.
- **/partnerships** — Canyon State Enterprises partners with leading manufacturers and clients: GAF, Carlisle, EOS Fitness, Salad and Go, Home Depot, and more across the Southwest.
- **/where** — serves roofing, stucco, and construction across Arizona, Nevada, Utah, and Colorado. Active projects in 30+ cities across the Southwest.
- **/contact** — Request a free quote. Serving AZ, NV, UT & NM. ROC licensed and insured.
- **/careers** — Build a real career at Canyon State Enterprises. We run 12 self-performed trades across Arizona, Nevada, Utah, and Colorado. Hiring crews and office talent.

### Home crawlable fallback (scripts/home-fallback.html)
- H1: Arizona & Nevada Multi-Trade Construction Contractor
- H2s: Twelve Self-Performed Construction Trades · Five Offices Across Arizona and
  Nevada · One Accountable Team, Not a Chain of Subcontractors · Featured Project:
  Betty's Village North · Serving the Southwest · Talk to Canyon State Enterprises

## Trade pages (/services/:id)
Old pattern — title: "{Trade} Services | Canyon State Enterprises"; H1: bare trade
name from tradeData. Trades: Roofing, Stucco & EIFS, General Contracting, HVAC,
Plumbing, Residential Construction, Commercial Construction, Specialty Metals,
Masonry, Fencing, Seamless Gutters, Land Development.

Old TRADE_META descriptions (verbatim):
- roofing — Commercial and residential roofing across Arizona and Nevada: tile, metal, TPO, foam, shingle, repairs, and coatings. Get a straight answer from Canyon State.
- stucco — Three-coat stucco, synthetic stucco, and EIFS for homes and commercial buildings across the Southwest. Volume work without sacrificing the craft. Get a quote.
- general-contracting — Full-service general contracting across Arizona and Nevada: pre-construction, trade coordination, budgets, and closeout. One accountable team, no surprises.
- hvac — HVAC install, replacement, and service for homes and businesses across Arizona and Nevada. Keep the air moving and energy bills in check. Call Canyon State.
- plumbing — Residential and commercial plumbing across Arizona and Nevada: rough-in, fixtures, water and gas lines, repipes, and emergencies. Code-compliant and leak-free.
- res-const — Custom homes, additions, and renovations across Arizona and Nevada. Ground-up or major remodel, Canyon State brings detail and accountability to every build.
- com-const — Commercial construction across Arizona and Nevada: retail, hospitality, medical, and industrial. Fast timelines, tight budgets, zero drama. Get a quote.
- metals — Architectural specialty metals across Arizona and Nevada: standing seam, panel systems, coping, flashings, and custom fabrication. Sharp work that lasts.
- masonry — Masonry across Arizona and Nevada: brick, block, stone veneer, CMU walls, and retaining walls. Built with precision to stand the test of time. Get a quote.
- fencing — Commercial and residential fencing across Arizona and Nevada: chain link, wrought iron, wood, vinyl, privacy, and security. Clean and fast. Get a quote.
- gutters — Seamless gutters custom-rolled on site across Arizona and Nevada: aluminum gutters, downspouts, guards, and drainage. No seams, no leaks. Get a quote.
- land-dev — Land development across Arizona and Nevada: grading, excavation, utilities, drainage, and pad prep. We get your site ready for whatever comes next.

## Location pages (/locations/:id)
Old pattern — title: "{City} Construction, {ST} | Canyon State Enterprises";
H1: "{City}, {ST}". Old metaDescriptions:
- kingman-az — Canyon State Enterprises is headquartered in Kingman, AZ, serving Mohave County with roofing, stucco, metals, and full construction. Call (928) 757-9003.
- phoenix-az — Canyon State Enterprises serves Greater Phoenix with roofing, stucco, commercial construction, and land development across the Valley. Call (602) 527-6050.
- bullhead-city-az — Canyon State Enterprises serves the Bullhead City tri-state area: roofing, stucco, metals, and gutters across western AZ, the Laughlin corridor, and Fort Mohave.
- las-vegas-nv — Canyon State Enterprises runs Nevada operations from Las Vegas: roofing, stucco, metals, and commercial construction across the Valley. Call (702) 659-2819. (NOTE: page phone field was (928) 757-9003 — inconsistent; fixed to 702 in the SEO pass)
- lake-havasu-city-az — Canyon State Enterprises serves Lake Havasu City and western Arizona with roofing, stucco, custom-home construction, and gutters. Building near the lake? We know it.

## Org schema (SchemaMarkup.jsx) — old key values
@type GeneralContractor · name "Canyon State Enterprises" · email info@canyonstateaz.com ·
priceRange "$$-$$$" · areaServed AZ/NV/UT/NM · serviceType 11 trades (no General
Contracting) · slogan "One Team. Multiple Trades. Zero Excuses." · foundingDate 2001 ·
geo 35.1894,-114.0531 · no department array · Where.jsx additionally emitted a
duplicate RoofingContractor entity (replaced in the SEO pass).
