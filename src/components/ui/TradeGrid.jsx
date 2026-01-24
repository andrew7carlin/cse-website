import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TradeGrid.module.css';

const trades = [
    { id: 'roofing', label: 'Roofing' },
    { id: 'stucco', label: 'Stucco' },
    { id: 'hvac', label: 'Heating & Cooling' },
    { id: 'plumbing', label: 'Plumbing' },
    { id: 'res-const', label: 'Residential Construction' },
    { id: 'com-const', label: 'Commercial Construction' },
    { id: 'metals', label: 'Specialty Metals' },
    { id: 'masonry', label: 'Masonry' },
    { id: 'fencing', label: 'Fencing' },
    { id: 'gutters', label: 'Seamless Gutters' },
    { id: 'auto', label: 'Car & Truck Sales' },
];

const TradeGrid = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className="text-h2">Our Trades</h2>
                    <p className={styles.subtext}>Comprehensive expertise under one roof.</p>
                </div>
                <div className={styles.grid}>
                    {trades.map((trade) => (
                        <Link key={trade.id} to={`/services/${trade.id}`} className={styles.card}>
                            <span className={styles.icon}>+</span>
                            <span className={styles.label}>{trade.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TradeGrid;
