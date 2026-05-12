import { useState, useRef, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
// `motion` is used as a JSX namespace (<motion.g />, <motion.circle />, <motion.div />).
// ESLint's no-unused-vars rule doesn't connect those JSX uses back to the named import,
// so it gets falsely flagged as unused — do NOT remove it.
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ServiceAreaMap.module.css';
import usStates from '../../assets/maps/us-states-10m.json';

// FIPS codes — states shown on map
const VISIBLE_FIPS = new Set(['04','32','49','08','35','06','48','16','56','41']);
// FIPS codes — copper highlight (core service states)
const ACTIVE_FIPS  = new Set(['04','32','49','08']);

// ── Office locations ────────────────────────────────────────────────────────
const offices = [
  { name: 'Kingman Office',       state: 'AZ', coordinates: [-114.0530, 35.1895], type: 'office', address: '2959 Rhoades Ave, Kingman AZ 86409', hq: true },
  { name: 'Las Vegas Office',     state: 'NV', coordinates: [-115.1398, 36.1699], type: 'office', address: 'Las Vegas, NV' },
  { name: 'Phoenix Office',       state: 'AZ', coordinates: [-112.0740, 33.4484], type: 'office', address: 'Phoenix, AZ' },
  { name: 'Lake Havasu Office',   state: 'AZ', coordinates: [-114.3225, 34.4839], type: 'office', address: 'Lake Havasu City, AZ' },
  { name: 'Bullhead City Office', state: 'AZ', coordinates: [-114.5286, 35.1478], type: 'office', address: 'Bullhead City, AZ' },
];

// ── Project city pins ───────────────────────────────────────────────────────
const cities = [
  // Arizona — Mohave County
  { name: 'Kingman',          state: 'AZ', coordinates: [-114.0530, 35.1895], type: 'project' },
  { name: 'Bullhead City',    state: 'AZ', coordinates: [-114.5286, 35.1478], type: 'project' },
  { name: 'Lake Havasu City', state: 'AZ', coordinates: [-114.3225, 34.4839], type: 'project' },
  { name: 'Fort Mohave',      state: 'AZ', coordinates: [-114.5630, 35.0781], type: 'project' },
  { name: 'Mohave Valley',    state: 'AZ', coordinates: [-114.5833, 35.0617], type: 'project' },
  { name: 'Golden Valley',    state: 'AZ', coordinates: [-114.2386, 35.2264], type: 'project' },
  { name: 'Chloride',         state: 'AZ', coordinates: [-114.2017, 35.4158], type: 'project' },
  { name: 'Dolan Springs',    state: 'AZ', coordinates: [-114.2642, 35.5933], type: 'project' },
  { name: 'White Hills',      state: 'AZ', coordinates: [-114.3275, 35.6264], type: 'project' },
  { name: 'Oatman',           state: 'AZ', coordinates: [-114.3831, 35.0239], type: 'project' },
  { name: 'Yucca',            state: 'AZ', coordinates: [-114.1469, 34.8700], type: 'project' },
  { name: 'Topock',           state: 'AZ', coordinates: [-114.4789, 34.7081], type: 'project' },
  { name: 'Meadview',         state: 'AZ', coordinates: [-114.0564, 36.0006], type: 'project' },
  { name: 'Peach Springs',    state: 'AZ', coordinates: [-113.4258, 35.5247], type: 'project' },
  { name: 'Truxton',          state: 'AZ', coordinates: [-113.5672, 35.4694], type: 'project' },
  { name: 'Valentine',        state: 'AZ', coordinates: [-113.6703, 35.3739], type: 'project' },
  { name: 'Hackberry',        state: 'AZ', coordinates: [-113.7256, 35.3692], type: 'project' },
  { name: 'Wikieup',          state: 'AZ', coordinates: [-113.6019, 34.7069], type: 'project' },
  { name: 'Littlefield',      state: 'AZ', coordinates: [-113.9133, 36.8750], type: 'project' },
  { name: 'Beaver Dam',       state: 'AZ', coordinates: [-113.9394, 36.8594], type: 'project' },
  { name: 'Colorado City',    state: 'AZ', coordinates: [-112.9742, 36.9936], type: 'project' },
  // Arizona — Phoenix Metro
  { name: 'Phoenix',          state: 'AZ', coordinates: [-112.0740, 33.4484], type: 'project' },
  { name: 'Mesa',             state: 'AZ', coordinates: [-111.8315, 33.4152], type: 'project' },
  { name: 'Glendale',         state: 'AZ', coordinates: [-112.1860, 33.5387], type: 'project' },
  { name: 'Scottsdale',       state: 'AZ', coordinates: [-111.9261, 33.4942], type: 'project' },
  { name: 'Tempe',            state: 'AZ', coordinates: [-111.9400, 33.4255], type: 'project' },
  { name: 'Chandler',         state: 'AZ', coordinates: [-111.8413, 33.3062], type: 'project' },
  { name: 'Gilbert',          state: 'AZ', coordinates: [-111.7890, 33.3528], type: 'project' },
  { name: 'Peoria',           state: 'AZ', coordinates: [-112.2374, 33.5806], type: 'project' },
  { name: 'Apache Junction',  state: 'AZ', coordinates: [-111.5495, 33.4151], type: 'project' },
  { name: 'Queen Creek',      state: 'AZ', coordinates: [-111.6340, 33.2487], type: 'project' },
  { name: 'Goodyear',         state: 'AZ', coordinates: [-112.3576, 33.4353], type: 'project' },
  { name: 'Ak-Chin',          state: 'AZ', coordinates: [-111.9174, 32.9012], type: 'project' },
  // Arizona — Other
  { name: 'Flagstaff',        state: 'AZ', coordinates: [-111.6513, 35.1983], type: 'project' },
  { name: 'Tucson',           state: 'AZ', coordinates: [-110.9265, 32.2226], type: 'project' },
  { name: 'Marana',           state: 'AZ', coordinates: [-111.2248, 32.4368], type: 'project' },
  { name: 'Oro Valley',       state: 'AZ', coordinates: [-110.9665, 32.3909], type: 'project' },
  { name: 'Sahuarita',        state: 'AZ', coordinates: [-110.9554, 31.9582], type: 'project' },
  { name: 'Show Low',         state: 'AZ', coordinates: [-110.0326, 34.2542], type: 'project' },
  { name: 'Yuma',             state: 'AZ', coordinates: [-114.6277, 32.6927], type: 'project' },
  { name: 'Willcox',          state: 'AZ', coordinates: [-109.8329, 32.2532], type: 'project' },
  { name: 'Quartzsite',       state: 'AZ', coordinates: [-114.2297, 33.6637], type: 'project' },
  { name: 'Sierra Vista',     state: 'AZ', coordinates: [-110.2776, 31.5545], type: 'project' },
  { name: 'Prescott',         state: 'AZ', coordinates: [-112.4685, 34.5400], type: 'project' },
  { name: 'Prescott Valley',  state: 'AZ', coordinates: [-112.3155, 34.6100], type: 'project' },
  { name: 'Camp Verde',       state: 'AZ', coordinates: [-111.8579, 34.5636], type: 'project' },
  { name: 'Williams',         state: 'AZ', coordinates: [-112.1910, 35.2497], type: 'project' },
  { name: 'Concho',           state: 'AZ', coordinates: [-109.6579, 34.4870], type: 'project' },
  // Nevada
  { name: 'Las Vegas',        state: 'NV', coordinates: [-115.1398, 36.1699], type: 'project' },
  { name: 'Henderson',        state: 'NV', coordinates: [-114.9817, 36.0395], type: 'project' },
  { name: 'North Las Vegas',  state: 'NV', coordinates: [-115.1175, 36.1989], type: 'project' },
  { name: 'Summerlin',        state: 'NV', coordinates: [-115.3247, 36.1540], type: 'project' },
  { name: 'Laughlin',         state: 'NV', coordinates: [-114.5719, 35.1678], type: 'project' },
  { name: 'Pahrump',          state: 'NV', coordinates: [-115.9846, 36.2083], type: 'project' },
  { name: 'Mesquite',         state: 'NV', coordinates: [-114.0672, 36.8054], type: 'project' },
  { name: 'Reno',             state: 'NV', coordinates: [-119.8138, 39.5296], type: 'project' },
  // Utah
  { name: 'St. George',       state: 'UT', coordinates: [-113.5684, 37.0965], type: 'project' },
  { name: 'Hurricane',        state: 'UT', coordinates: [-113.2896, 37.1752], type: 'project' },
  { name: 'Salt Lake City',   state: 'UT', coordinates: [-111.8910, 40.7608], type: 'project' },
  { name: 'Spanish Fork',     state: 'UT', coordinates: [-111.6549, 40.1150], type: 'project' },
  // Colorado
  { name: 'Denver',           state: 'CO', coordinates: [-104.9903, 39.7392], type: 'project' },
  { name: 'Colorado Springs', state: 'CO', coordinates: [-104.8214, 38.8339], type: 'project' },
  { name: 'Grand Junction',   state: 'CO', coordinates: [-108.5506, 39.0639], type: 'project' },
  { name: 'Trinidad',         state: 'CO', coordinates: [-104.5005, 37.1694], type: 'project' },
  // New Mexico
  { name: 'Albuquerque',      state: 'NM', coordinates: [-106.6504, 35.0844], type: 'project' },
  // California
  { name: 'Los Angeles',      state: 'CA', coordinates: [-118.2437, 34.0522], type: 'project' },
  { name: 'Santa Barbara',    state: 'CA', coordinates: [-119.6982, 34.4208], type: 'project' },
  { name: 'Long Beach',       state: 'CA', coordinates: [-118.1937, 33.7701], type: 'project' },
  { name: 'Pismo Beach',      state: 'CA', coordinates: [-120.6413, 35.1428], type: 'project' },
  { name: 'Encinitas',        state: 'CA', coordinates: [-117.2920, 33.0369], type: 'project' },
  { name: 'Barstow',          state: 'CA', coordinates: [-117.0228, 34.8958], type: 'project' },
  { name: 'Victorville',      state: 'CA', coordinates: [-117.2911, 34.5362], type: 'project' },
  { name: 'Murrieta',         state: 'CA', coordinates: [-117.2139, 33.5539], type: 'project' },
  { name: 'Temecula',         state: 'CA', coordinates: [-117.1484, 33.4936], type: 'project' },
  { name: 'Hesperia',         state: 'CA', coordinates: [-117.3031, 34.4263], type: 'project' },
  // Texas
  { name: 'Austin',           state: 'TX', coordinates: [-97.7431,  30.2672], type: 'project' },
  { name: 'Houston',          state: 'TX', coordinates: [-95.3698,  29.7604], type: 'project' },
  { name: 'Galveston',        state: 'TX', coordinates: [-94.7977,  29.3013], type: 'project' },
  { name: 'Del Rio',          state: 'TX', coordinates: [-100.8968, 29.3627], type: 'project' },
  { name: 'El Paso',          state: 'TX', coordinates: [-106.4850, 31.7619], type: 'project' },
  { name: 'North Carolina',   state: 'NC', coordinates: [-82.5515,  35.5951], type: 'project' },
];

// Merge offices + project pins for rendering
const allMarkers = [...cities, ...offices];

// ── Component ───────────────────────────────────────────────────────────────
const ServiceAreaMap = () => {
  const [hovered,  setHovered]  = useState(null);
  const [visible,  setVisible]  = useState(false);
  const [cardPos,  setCardPos]  = useState({ x: 0, y: 0 });
  const [zoom,     setZoom]     = useState(1);
  const [center,   setCenter]   = useState([-109, 36]);
  const wrapperRef              = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePinEnter = (marker, e) => {
    const rect    = wrapperRef.current?.getBoundingClientRect();
    const pinRect = e.currentTarget.getBoundingClientRect();
    setCardPos({
      x: pinRect.left - rect.left + pinRect.width / 2,
      y: pinRect.top  - rect.top,
    });
    setHovered(marker);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 900, center: [-109, 36] }}
        width={800}
        height={500}
        className={styles.map}
      >
        <ZoomableGroup
          zoom={zoom}
          center={center}
          onMoveEnd={({ zoom: z, coordinates }) => {
            setZoom(z);
            setCenter(coordinates);
          }}
          minZoom={1}
          maxZoom={8}
        >
          <Geographies geography={usStates}>
            {({ geographies }) =>
              geographies
                .filter((geo) => VISIBLE_FIPS.has(geo.id))
                .map((geo) => {
                  const isActive = ACTIVE_FIPS.has(geo.id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill:          isActive ? '#222222' : '#161616',
                          stroke:        isActive ? '#b87333' : '#2a2a2a',
                          strokeWidth:   isActive ? 0.8 : 0.4,
                          strokeOpacity: isActive ? 0.6 : 1,
                          outline: 'none',
                        },
                        hover:   { fill: isActive ? '#2a2a2a' : '#1a1a1a', outline: 'none' },
                        pressed: { fill: isActive ? '#2a2a2a' : '#1a1a1a', outline: 'none' },
                      }}
                    />
                  );
                })
            }
          </Geographies>

          {allMarkers.map((marker, i) => {
            const pinRadius = Math.max(1.5, 3 / zoom);
            const isOffice  = marker.type === 'office';

            return (
              <Marker key={`${marker.name}-${i}`} coordinates={marker.coordinates}>
                <motion.g
                  onMouseEnter={(e) => handlePinEnter(marker, e)}
                  onMouseLeave={() => setHovered(null)}
                  className={styles.pinGroup}
                  initial={{ y: -30, opacity: 0 }}
                  animate={visible ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.4, ease: 'easeOut' }}
                >
                  {isOffice ? (
                    <>
                      {/* Office pulse ring */}
                      <motion.circle
                        r={pinRadius * 2.4}
                        fill="none"
                        stroke="#4a9b9b"
                        strokeWidth={1}
                        animate={{ r: [pinRadius * 1.8, pinRadius * 2.8, pinRadius * 1.8], opacity: [0.5, 0.05, 0.5] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      {/* Office diamond */}
                      <rect
                        width={pinRadius * 1.8}
                        height={pinRadius * 1.8}
                        x={-(pinRadius * 0.9)}
                        y={-(pinRadius * 0.9)}
                        fill="#4a9b9b"
                        stroke="#5ac5c5"
                        strokeWidth={1}
                        transform="rotate(45)"
                      />
                      <circle r={pinRadius * 0.4} fill="#ffffff" />
                    </>
                  ) : (
                    <>
                      <circle r={pinRadius} fill="#b87333" opacity={0.85} />
                      <circle r={pinRadius * 0.38} fill="#ffffff" opacity={0.9} />
                    </>
                  )}
                </motion.g>
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Zoom controls */}
      <div className={styles.zoomControls}>
        <button
          className={styles.zoomBtn}
          onClick={() => setZoom(z => Math.min(z + 0.5, 8))}
          aria-label="Zoom in"
        >+</button>
        <button
          className={styles.zoomBtn}
          onClick={() => setZoom(z => Math.max(z - 0.5, 1))}
          aria-label="Zoom out"
        >−</button>
      </div>

      {/* Hover card */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={hovered.name}
            className={styles.card}
            style={{ left: cardPos.x, top: cardPos.y }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
          >
            <div className={styles.cardInner}>
              <div className={styles.cardHeader}>
                <span className={styles.cardCity}>{hovered.name}</span>
                <span className={styles.cardState}>{hovered.state}</span>
              </div>
              {hovered.type === 'office' && (
                <>
                  <span className={styles.hqBadge}>Canyon State Office</span>
                  {hovered.address && (
                    <p className={styles.cardAddress}>{hovered.address}</p>
                  )}
                </>
              )}
              {hovered.hq && hovered.type !== 'office' && (
                <span className={styles.hqBadge}>Headquarters</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceAreaMap;
