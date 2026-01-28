import { useState } from 'react';
import styles from './TopoMap.module.css';

const TopoMap = ({ data }) => {
    const [hoveredRegion, setHoveredRegion] = useState(null);
    const [hoveredHQ, setHoveredHQ] = useState(false);

    // Kingman headquarters coordinates (northwest Arizona)
    const hqMarker = {
        cx: 220,
        cy: 280,
        title: 'Headquarters',
        city: 'Kingman, AZ',
        address: '2959 Rhoades Ave',
        zip: 'Kingman, AZ 86409',
    };

    const regions = {
        arizona: {
            cx: 250,
            cy: 350,
            lines: [
                { r: 60, opacity: 0.8 },
                { r: 75, opacity: 0.6 },
                { r: 90, opacity: 0.5 },
                { r: 110, opacity: 0.4 },
                { r: 130, opacity: 0.3 },
                { r: 155, opacity: 0.2 },
            ],
        },
        nevada: {
            cx: 180,
            cy: 200,
            lines: [
                { r: 50, opacity: 0.7 },
                { r: 65, opacity: 0.5 },
                { r: 85, opacity: 0.4 },
                { r: 105, opacity: 0.3 },
                { r: 130, opacity: 0.2 },
            ],
        },
        newmexico: {
            cx: 380,
            cy: 350,
            lines: [
                { r: 45, opacity: 0.6 },
                { r: 60, opacity: 0.5 },
                { r: 77, opacity: 0.4 },
                { r: 95, opacity: 0.3 },
                { r: 115, opacity: 0.2 },
            ],
        },
        utah: {
            cx: 270,
            cy: 150,
            lines: [
                { r: 40, opacity: 0.6 },
                { r: 55, opacity: 0.5 },
                { r: 72, opacity: 0.4 },
                { r: 90, opacity: 0.3 },
                { r: 110, opacity: 0.2 },
            ],
        },
    };

    const getRegionData = (id) => data.find((area) => area.id === id);

    return (
        <section className={styles.container}>
            <div className={styles.mapWrapper}>
                <svg
                    viewBox="0 0 600 500"
                    className={styles.svg}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Abstract topographic contour lines for each region */}
                    {Object.entries(regions).map(([id, region]) => (
                        <g
                            key={id}
                            className={`${styles.region} ${hoveredRegion === id ? styles.regionActive : ''}`}
                            onMouseEnter={() => setHoveredRegion(id)}
                            onMouseLeave={() => setHoveredRegion(null)}
                        >
                            {region.lines.map((line, i) => (
                                <circle
                                    key={i}
                                    cx={region.cx}
                                    cy={region.cy}
                                    r={line.r}
                                    className={styles.contour}
                                    style={{
                                        opacity: hoveredRegion === id ? line.opacity * 1.5 : line.opacity,
                                    }}
                                />
                            ))}
                            {/* Invisible interaction area */}
                            <circle
                                cx={region.cx}
                                cy={region.cy}
                                r={region.lines[region.lines.length - 1].r}
                                fill="transparent"
                                className={styles.hitArea}
                            />
                            {/* State label */}
                            <text
                                x={region.cx}
                                y={region.cy}
                                className={styles.label}
                                textAnchor="middle"
                                dominantBaseline="middle"
                            >
                                {getRegionData(id)?.abbrev}
                            </text>
                        </g>
                    ))}

                    {/* Headquarters Marker */}
                    <g
                        className={`${styles.hqMarker} ${hoveredHQ ? styles.hqMarkerActive : ''}`}
                        onMouseEnter={() => setHoveredHQ(true)}
                        onMouseLeave={() => setHoveredHQ(false)}
                    >
                        {/* Pulsing outer ring */}
                        <circle
                            cx={hqMarker.cx}
                            cy={hqMarker.cy}
                            r="10"
                            className={styles.hqPulse}
                        />
                        {/* Main marker circle */}
                        <circle
                            cx={hqMarker.cx}
                            cy={hqMarker.cy}
                            r="6"
                            className={styles.hqCircle}
                        />
                        {/* Center dot */}
                        <circle
                            cx={hqMarker.cx}
                            cy={hqMarker.cy}
                            r="2"
                            className={styles.hqDot}
                        />
                    </g>
                </svg>

                {/* Detail cards */}
                {hoveredRegion && (
                    <div
                        className={styles.detailCard}
                        style={{
                            left: `${(regions[hoveredRegion].cx / 600) * 100}%`,
                            top: `${(regions[hoveredRegion].cy / 500) * 100}%`,
                        }}
                    >
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>
                                {getRegionData(hoveredRegion)?.state}
                            </h3>
                            <span className={styles.cardTagline}>
                                {getRegionData(hoveredRegion)?.tagline}
                            </span>
                            <p className={styles.cardDescription}>
                                {getRegionData(hoveredRegion)?.description}
                            </p>
                            <div className={styles.cardCoverage}>
                                <span className={styles.coverageIcon}>◉</span>
                                <span>{getRegionData(hoveredRegion)?.coverage}</span>
                            </div>
                            {getRegionData(hoveredRegion)?.hq && (
                                <div className={styles.cardHq}>
                                    <strong>HQ:</strong> {getRegionData(hoveredRegion).hq.city}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Headquarters Detail Card */}
                {hoveredHQ && (
                    <div
                        className={`${styles.detailCard} ${styles.hqCard}`}
                        style={{
                            left: `${(hqMarker.cx / 600) * 100}%`,
                            top: `${(hqMarker.cy / 500) * 100}%`,
                        }}
                    >
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>{hqMarker.title}</h3>
                            <span className={styles.cardTagline}>{hqMarker.city}</span>
                            <div className={styles.hqAddress}>
                                <span>{hqMarker.address}</span>
                                <span>{hqMarker.zip}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TopoMap;
