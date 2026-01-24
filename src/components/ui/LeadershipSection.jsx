import React, { useRef } from 'react';
import styles from './LeadershipSection.module.css';

const leaders = [
    { name: 'Keven Ott', title: 'Owner', photo: null },
    { name: 'Joe Juelfs', title: 'Owner', photo: null },
    { name: 'Jessica Gonzalez', title: 'Owner', photo: null },
    { name: 'Anthony Gonzalez', title: 'Owner', photo: null },
    { name: 'Pat Carlin', title: 'Chief Operating Officer', photo: null },
    { name: 'Cameron Ott', title: 'Commercial Manager', photo: null },
    { name: 'Steve Sampson', title: 'Director of Roofing – Mohave County', photo: null },
    { name: 'Clay Finch', title: 'Director of Stucco', photo: null },
    { name: 'Jeremiah Devine', title: 'Director of Roofing – Colorado River', photo: null },
    { name: 'Andrew Carlin', title: 'Director of Operations – Nevada, Utah', photo: null },
    { name: 'John Blake', title: 'Director of Operations – Phoenix, New Mexico', photo: null },
    { name: 'Nathan Schoolmeester', title: 'Director of HVAC Operations', photo: null },
    { name: 'Randy Finch', title: 'Director of Estimating', photo: null },
    { name: 'Korey Hines', title: 'Director of Operations, Craftwork Fence', photo: null },
    { name: 'Ashley Ungaro', title: 'Director of Construction', photo: null },
    { name: 'Randy Perry', title: 'Director of Plumbing', photo: null },
];

const LeadershipSection = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h2>Meet Our Leaders</h2>
                    <p>The people who make it happen.</p>
                </div>
                <div className={styles.scrollControls}>
                    <button
                        className={styles.scrollBtn}
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                    >
                        ←
                    </button>
                    <button
                        className={styles.scrollBtn}
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                    >
                        →
                    </button>
                </div>
            </div>

            <div className={styles.scrollContainer} ref={scrollRef}>
                <div className={styles.leadersTrack}>
                    {leaders.map((leader, index) => (
                        <div key={index} className={styles.leaderCard}>
                            <div className={styles.photoContainer}>
                                {leader.photo ? (
                                    <img src={leader.photo} alt={leader.name} />
                                ) : (
                                    <div className={styles.photoPlaceholder}>
                                        <span>{leader.name.split(' ').map(n => n[0]).join('')}</span>
                                    </div>
                                )}
                            </div>
                            <div className={styles.leaderInfo}>
                                <h3>{leader.name}</h3>
                                <p>{leader.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LeadershipSection;
