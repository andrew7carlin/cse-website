import React, { useEffect, useRef } from 'react';
import styles from './LeadershipSection.module.css';

// Leadership photos
import kevenOtt from '../../assets/leadership/Kevin-Ott.webp';
import joeJuelfs from '../../assets/leadership/Joe-Juelfs.webp';
import jessicaGonzalez from '../../assets/leadership/Jessica-Gonzalez.webp';
import anthonyGonzalez from '../../assets/leadership/Anthony-Gonzalez.webp';
import patCarlin from '../../assets/leadership/Pat-Carlin.webp';
import cameronOtt from '../../assets/leadership/Cameron-Ott.webp';
import steveSampson from '../../assets/leadership/Steve-Samson.webp';
import clayFinch from '../../assets/leadership/Clay-Finch.webp';
import jeremiahDevine from '../../assets/leadership/Jeremiah-Devine.webp';
import andrewCarlin from '../../assets/leadership/Andrew-Carlin.webp';
import johnBlake from '../../assets/leadership/John-Blake.webp';
import nathanSchoolmeester from '../../assets/leadership/Nathan-Schoolmeester.webp';
import randyFinch from '../../assets/leadership/Randy-Finch.webp';
import koreyHines from '../../assets/leadership/Korey-Hines.webp';
import ashleyUngaro from '../../assets/leadership/Ashley-Ungaro.webp';
import randyPerry from '../../assets/leadership/Randy-Perry.webp';

// Copper background for transparent headshots
import copperBg from '../../assets/leadership/copper-bg.webp';

const leaders = [
    { name: 'Keven Ott', title: 'Owner', photo: kevenOtt },
    { name: 'Joe Juelfs', title: 'Owner', photo: joeJuelfs },
    { name: 'Jessica Gonzalez', title: 'Owner - Stucco', photo: jessicaGonzalez },
    { name: 'Anthony Gonzalez', title: 'Owner - Stucco', photo: anthonyGonzalez },
    { name: 'Pat Carlin', title: 'Chief Operating Officer', photo: patCarlin },
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
    const ownersRef = useRef(null);
    const cooRef = useRef(null);
    const directorsRef = useRef(null);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.visible);
                }
            });
        }, observerOptions);

        if (ownersRef.current) observer.observe(ownersRef.current);
        if (cooRef.current) observer.observe(cooRef.current);
        if (directorsRef.current) observer.observe(directorsRef.current);

        return () => observer.disconnect();
    }, []);

    // Determine scale class based on role
    const getScaleClass = (title) => {
        if (title.startsWith('Owner')) return styles.scaleOwner;
        if (title === 'Chief Operating Officer') return styles.scaleCOO;
        if (title.startsWith('Director') || title.startsWith('Commercial')) return styles.scaleDirector;
        return styles.scaleDirector; // Default to director size
    };

    // Group leaders by level
    const owners = leaders.filter(l => l.title.startsWith('Owner'));
    const coo = leaders.filter(l => l.title === 'Chief Operating Officer');
    const directors = leaders.filter(l => l.title.startsWith('Director') || l.title.startsWith('Commercial'));

    const renderLeaderCard = (leader, index) => (
        <div key={index} className={`${styles.leaderCard} ${getScaleClass(leader.title)}`}>
            <div
                className={styles.photoContainer}
                style={{ backgroundImage: `url(${copperBg})` }}
            >
                {leader.photo ? (
                    <img src={leader.photo} alt={leader.name} loading="lazy" />
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
    );


    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h2>Meet Our Leaders</h2>
                    <p>The people who make it happen.</p>
                </div>
            </div>

            {/* Owners Level */}
            <div ref={ownersRef} className={`${styles.levelGroup} ${styles.ownersLevel}`}>
                <h3 className={styles.levelTitle}>Owners</h3>
                <div className={styles.gridContainer}>
                    {owners.map(renderLeaderCard)}
                </div>
            </div>

            {/* COO Level */}
            <div ref={cooRef} className={`${styles.levelGroup} ${styles.cooLevel}`}>
                <h3 className={styles.levelTitle}>Chief Operating Officer</h3>
                <div className={styles.gridContainer}>
                    {coo.map(renderLeaderCard)}
                </div>
            </div>

            {/* Directors & Management Level */}
            <div ref={directorsRef} className={`${styles.levelGroup} ${styles.directorsLevel}`}>
                <h3 className={styles.levelTitle}>Directors & Management</h3>
                <div className={styles.gridContainer}>
                    {directors.map(renderLeaderCard)}
                </div>
            </div>
        </section>
    );
};

export default LeadershipSection;
