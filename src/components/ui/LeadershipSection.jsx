import React, { useRef } from 'react';
import styles from './LeadershipSection.module.css';

// Leadership photos
import kevenOtt from '../../assets/leadership/Kevin-Ott.png';
import joeJuelfs from '../../assets/leadership/Joe-Juelfs.png';
import jessicaGonzalez from '../../assets/leadership/Jessica-Gonzalez.png';
import anthonyGonzalez from '../../assets/leadership/Anthony-Gonzalez.png';
import cameronOtt from '../../assets/leadership/Cameron-Ott.png';
import steveSampson from '../../assets/leadership/Steve-Samson.png';
import clayFinch from '../../assets/leadership/Clay-Finch.png';
import jeremiahDevine from '../../assets/leadership/Jeremiah-Devine.png';
import andrewCarlin from '../../assets/leadership/Andrew-Carlin.png';
import johnBlake from '../../assets/leadership/John-Blake.png';
import nathanSchoolmeester from '../../assets/leadership/Nathan-Schoolmeester.png';
import randyFinch from '../../assets/leadership/Randy-Finch.png';
import koreyHines from '../../assets/leadership/Korey-Hines.png';
import ashleyUngaro from '../../assets/leadership/Ashley-Ungaro.png';
import randyPerry from '../../assets/leadership/Randy-Perry.png';

const leaders = [
    { name: 'Keven Ott', title: 'Owner', photo: kevenOtt },
    { name: 'Joe Juelfs', title: 'Owner', photo: joeJuelfs },
    { name: 'Jessica Gonzalez', title: 'Owner', photo: jessicaGonzalez },
    { name: 'Anthony Gonzalez', title: 'Owner', photo: anthonyGonzalez },
    { name: 'Cameron Ott', title: 'Commercial Manager', photo: cameronOtt },
    { name: 'Steve Sampson', title: 'Director of Roofing – Mohave County', photo: steveSampson },
    { name: 'Clay Finch', title: 'Director of Stucco', photo: clayFinch },
    { name: 'Jeremiah Devine', title: 'Director of Roofing – Colorado River', photo: jeremiahDevine },
    { name: 'Andrew Carlin', title: 'Director of Operations – Nevada, Utah', photo: andrewCarlin },
    { name: 'John Blake', title: 'Director of Operations – Phoenix, New Mexico', photo: johnBlake },
    { name: 'Nathan Schoolmeester', title: 'Director of HVAC Operations', photo: nathanSchoolmeester },
    { name: 'Randy Finch', title: 'Director of Estimating', photo: randyFinch },
    { name: 'Korey Hines', title: 'Director of Operations, Craftwork Fence', photo: koreyHines },
    { name: 'Ashley Ungaro', title: 'Director of Construction', photo: ashleyUngaro },
    { name: 'Randy Perry', title: 'Director of Plumbing', photo: randyPerry },
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
