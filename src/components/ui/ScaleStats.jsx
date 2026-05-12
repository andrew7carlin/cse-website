import styles from './ScaleStats.module.css';

const STATS = [
    { value: '2001', label: 'Founded · 25 Years in Business' },
    { value: '50,000+', label: 'Projects Completed' },
    { value: '12', label: 'Self-Performed Trades' },
    { value: '32', label: 'Cities Served in 4 States' },
    { value: '0.75', label: 'EMR · Top 15% Nationally' },
];

const ScaleStats = () => (
    <section className={styles.section} aria-label="Canyon State Enterprises by the numbers">
        <div className={styles.container}>
            <div className={styles.grid}>
                {STATS.map(s => (
                    <div key={s.label} className={styles.item}>
                        <div className={styles.value}>{s.value}</div>
                        <div className={styles.label}>{s.label}</div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default ScaleStats;
