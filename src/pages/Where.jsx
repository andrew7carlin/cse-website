import React, { useState } from 'react';
import styles from './Where.module.css';

const locations = [
    {
        id: 'kingman',
        city: 'Kingman',
        state: 'AZ',
        type: 'Corporate Headquarters',
        address: '2959 Rhoades Ave',
        addressLine2: 'Kingman, AZ 86409',
        byAppointment: false,
        position: { top: '52%', left: '28%' },
    },
    {
        id: 'phoenix',
        city: 'Phoenix',
        state: 'AZ',
        type: 'Regional Office',
        address: 'Phoenix, Arizona',
        addressLine2: null,
        byAppointment: true,
        position: { top: '68%', left: '32%' },
    },
    {
        id: 'vegas',
        city: 'Las Vegas',
        state: 'NV',
        type: 'Regional Office',
        address: 'Las Vegas, Nevada',
        addressLine2: null,
        byAppointment: true,
        position: { top: '38%', left: '22%' },
    },
];

const Where = () => {
    const [activeLocation, setActiveLocation] = useState(null);

    const handlePinClick = (location) => {
        setActiveLocation(activeLocation?.id === location.id ? null : location);
    };

    const closePanel = () => {
        setActiveLocation(null);
    };

    return (
        <main className={styles.page}>
            {/* Hero Header */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.eyebrow}>Our Locations</span>
                    <h1 className={styles.title}>Where to Find Us</h1>
                    <p className={styles.subtitle}>
                        Serving Arizona and Nevada from three strategic locations.
                    </p>
                </div>
            </section>

            {/* Interactive Map Section */}
            <section className={styles.mapSection}>
                <div className={styles.mapContainer}>
                    {/* Stylized 3D Map Background */}
                    <div className={styles.map}>
                        {/* State Outlines - Simplified SVG representation */}
                        <svg
                            className={styles.mapSvg}
                            viewBox="0 0 400 500"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            {/* Nevada */}
                            <path
                                className={styles.statePath}
                                d="M50,50 L150,50 L150,80 L160,120 L170,180 L140,280 L50,280 Z"
                                data-state="NV"
                            />
                            {/* Arizona */}
                            <path
                                className={styles.statePath}
                                d="M140,280 L170,180 L160,120 L240,120 L280,140 L320,200 L340,350 L280,400 L200,420 L140,400 L100,350 L140,280 Z"
                                data-state="AZ"
                            />
                            {/* State Labels */}
                            <text x="90" y="170" className={styles.stateLabel}>NV</text>
                            <text x="210" y="290" className={styles.stateLabel}>AZ</text>
                        </svg>

                        {/* Glowing Pins */}
                        {locations.map((loc) => (
                            <button
                                key={loc.id}
                                className={`${styles.pin} ${activeLocation?.id === loc.id ? styles.pinActive : ''} ${loc.id === 'kingman' ? styles.pinHq : ''}`}
                                style={{ top: loc.position.top, left: loc.position.left }}
                                onClick={() => handlePinClick(loc)}
                                aria-label={`View ${loc.city} office`}
                            >
                                <span className={styles.pinPulse}></span>
                                <span className={styles.pinDot}></span>
                                <span className={styles.pinLabel}>{loc.city}</span>
                            </button>
                        ))}

                        {/* Connection Lines */}
                        <svg className={styles.connections} viewBox="0 0 400 500">
                            <line x1="112" y1="260" x2="128" y2="340" className={styles.connectionLine} />
                            <line x1="88" y1="190" x2="112" y2="260" className={styles.connectionLine} />
                        </svg>
                    </div>
                </div>

                {/* Detail Panel */}
                <div className={`${styles.detailPanel} ${activeLocation ? styles.detailPanelOpen : ''}`}>
                    {activeLocation && (
                        <>
                            <button className={styles.closeBtn} onClick={closePanel} aria-label="Close">
                                ×
                            </button>
                            <div className={styles.detailContent}>
                                <span className={styles.detailType}>{activeLocation.type}</span>
                                <h2 className={styles.detailCity}>
                                    {activeLocation.city}, {activeLocation.state}
                                </h2>
                                <div className={styles.detailAddress}>
                                    <p>{activeLocation.address}</p>
                                    {activeLocation.addressLine2 && <p>{activeLocation.addressLine2}</p>}
                                </div>
                                {activeLocation.byAppointment && (
                                    <span className={styles.appointmentBadge}>By Appointment Only</span>
                                )}
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeLocation.address + ' ' + (activeLocation.addressLine2 || ''))}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.directionsBtn}
                                >
                                    Get Directions →
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Location Cards Grid (Fallback/Additional Info) */}
            <section className={styles.cardsSection}>
                <div className={styles.cardsContainer}>
                    {locations.map((loc, index) => (
                        <div
                            key={loc.id}
                            className={`${styles.card} ${loc.id === 'kingman' ? styles.cardHq : ''}`}
                            style={{ '--card-delay': `${index * 100}ms` }}
                        >
                            <div className={styles.cardHeader}>
                                <span className={styles.cardType}>{loc.type}</span>
                                {loc.id === 'kingman' && <span className={styles.hqBadge}>HQ</span>}
                            </div>
                            <h3 className={styles.cardCity}>{loc.city}, {loc.state}</h3>
                            <p className={styles.cardAddress}>{loc.address}</p>
                            {loc.addressLine2 && <p className={styles.cardAddress}>{loc.addressLine2}</p>}
                            {loc.byAppointment && (
                                <span className={styles.cardBadge}>By Appointment</span>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Where;
