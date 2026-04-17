import { useState, useRef, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ServiceAreaMap.module.css';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const ACTIVE_STATES = ['Arizona', 'Nevada', 'Utah', 'Colorado'];

const cities = [
  // Arizona — Mohave County
  { name: 'Kingman',          state: 'AZ', coordinates: [-114.0530, 35.1895], hq: true },
  { name: 'Bullhead City',    state: 'AZ', coordinates: [-114.5286, 35.1478] },
  { name: 'Lake Havasu City', state: 'AZ', coordinates: [-114.3225, 34.4839] },
  // Arizona — Phoenix Metro
  { name: 'Phoenix',          state: 'AZ', coordinates: [-112.0740, 33.4484] },
  { name: 'Mesa',             state: 'AZ', coordinates: [-111.8315, 33.4152] },
  { name: 'Glendale',         state: 'AZ', coordinates: [-112.1860, 33.5387] },
  { name: 'Scottsdale',       state: 'AZ', coordinates: [-111.9261, 33.4942] },
  { name: 'Tempe',            state: 'AZ', coordinates: [-111.9400, 33.4255] },
  { name: 'Chandler',         state: 'AZ', coordinates: [-111.8413, 33.3062] },
  { name: 'Gilbert',          state: 'AZ', coordinates: [-111.7890, 33.3528] },
  { name: 'Peoria',           state: 'AZ', coordinates: [-112.2374, 33.5806] },
  { name: 'Apache Junction',  state: 'AZ', coordinates: [-111.5495, 33.4151] },
  { name: 'Queen Creek',      state: 'AZ', coordinates: [-111.6340, 33.2487] },
  // Arizona — Other
  { name: 'Flagstaff',        state: 'AZ', coordinates: [-111.6513, 35.1983] },
  { name: 'Tucson',           state: 'AZ', coordinates: [-110.9265, 32.2226] },
  { name: 'Marana',           state: 'AZ', coordinates: [-111.2248, 32.4368] },
  { name: 'Oro Valley',       state: 'AZ', coordinates: [-110.9665, 32.3909] },
  { name: 'Sahuarita',        state: 'AZ', coordinates: [-110.9554, 31.9582] },
  { name: 'Show Low',         state: 'AZ', coordinates: [-110.0326, 34.2542] },
  // Nevada
  { name: 'Las Vegas',        state: 'NV', coordinates: [-115.1398, 36.1699] },
  { name: 'Henderson',        state: 'NV', coordinates: [-114.9817, 36.0395] },
  { name: 'Laughlin',         state: 'NV', coordinates: [-114.5719, 35.1678] },
  { name: 'Pahrump',          state: 'NV', coordinates: [-115.9846, 36.2083] },
  { name: 'Mesquite',         state: 'NV', coordinates: [-114.0672, 36.8054] },
  { name: 'Reno',             state: 'NV', coordinates: [-119.8138, 39.5296] },
  // Utah
  { name: 'St. George',       state: 'UT', coordinates: [-113.5684, 37.0965] },
  { name: 'Hurricane',        state: 'UT', coordinates: [-113.2896, 37.1752] },
  { name: 'Salt Lake City',   state: 'UT', coordinates: [-111.8910, 40.7608] },
  { name: 'Spanish Fork',     state: 'UT', coordinates: [-111.6549, 40.1150] },
  // Colorado
  { name: 'Denver',           state: 'CO', coordinates: [-104.9903, 39.7392] },
  { name: 'Colorado Springs', state: 'CO', coordinates: [-104.8214, 38.8339] },
  { name: 'Grand Junction',   state: 'CO', coordinates: [-108.5506, 39.0639] },
];

const ServiceAreaMap = () => {
  const [hovered, setHovered]   = useState(null);
  const [visible, setVisible]   = useState(false);
  const [cardPos, setCardPos]   = useState({ x: 0, y: 0 });
  const wrapperRef              = useRef(null);

  // Trigger pin animation when map scrolls into view
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

  const handlePinEnter = (city, e) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    const pinRect = e.currentTarget.getBoundingClientRect();
    setCardPos({
      x: pinRect.left - rect.left + pinRect.width / 2,
      y: pinRect.top  - rect.top,
    });
    setHovered(city);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 2800, center: [-111, 36] }}
        className={styles.map}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isActive = ACTIVE_STATES.includes(geo.properties.name);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill:         isActive ? '#222222' : '#161616',
                      stroke:       isActive ? '#b87333' : '#2a2a2a',
                      strokeWidth:  isActive ? 0.8 : 0.4,
                      strokeOpacity: isActive ? 0.6 : 1,
                      outline: 'none',
                    },
                    hover:   { fill: isActive ? '#2a2a2a' : '#161616', outline: 'none' },
                    pressed: { fill: isActive ? '#2a2a2a' : '#161616', outline: 'none' },
                  }}
                />
              );
            })
          }
        </Geographies>

        {cities.map((city, i) => (
          <Marker key={city.name} coordinates={city.coordinates}>
            <motion.g
              onMouseEnter={(e) => handlePinEnter(city, e)}
              onMouseLeave={() => setHovered(null)}
              className={styles.pinGroup}
              initial={{ y: -30, opacity: 0 }}
              animate={visible ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
              transition={{ delay: i * 0.12, duration: 0.4, ease: 'easeOut' }}
            >
              {city.hq ? (
                <>
                  {/* HQ pulse ring */}
                  <motion.circle
                    r={14}
                    fill="none"
                    stroke="#b87333"
                    strokeWidth={1.5}
                    animate={{ r: [10, 16, 10], opacity: [0.6, 0.1, 0.6] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* HQ main dot */}
                  <circle r={7} fill="#4a9b9b" stroke="#5ac5c5" strokeWidth={1.5} />
                  <circle r={2.5} fill="#ffffff" />
                </>
              ) : (
                <>
                  <circle r={4} fill="#b87333" opacity={0.85} />
                  <circle r={1.5} fill="#ffffff" opacity={0.9} />
                </>
              )}
            </motion.g>
          </Marker>
        ))}
      </ComposableMap>

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
              {hovered.hq && (
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
