import React, { useEffect, useRef } from 'react';
import styles from './TeamSection.module.css';

// Team photos
import aaronPuskarov from '../../assets/team/Aaron-Puskarov.png';
import andyJoseph from '../../assets/team/Andy-Joseph.png';
import carlosRuiz from '../../assets/team/Carlos-Ruiz.png';
import cooperKay from '../../assets/team/Cooper-Kay.png';
import donObanion from '../../assets/team/Don-OBanion.png';
import fabianArvizo from '../../assets/team/Fabian-Arvizo.png';
import grantGollis from '../../assets/team/Grant-Gollis.png';
import jarrettDoheny from '../../assets/team/Jarrett-Doheny.png';
import jayGilbertson from '../../assets/team/Jay-Gilbertson.png';
import joshTurner from '../../assets/team/Josh-Turner.png';
import keithRainey from '../../assets/team/Keith-Rainey.png';
import kemerReinhardt from '../../assets/team/Kemer-Reinhardt.png';
import leonMitchell from '../../assets/team/Leon-Mitchell.png';
import orinCunningham from '../../assets/team/Orin-Cunningham.png';
import patrickBlake from '../../assets/team/Patrick-Blake.png';
import ramonGallegos from '../../assets/team/Ramon-Gallegos.png';
import travisCrouch from '../../assets/team/Travis-Crouch.png';
import tylerLogas from '../../assets/team/Tyler-Logas.png';

// Background for consistent styling
import copperBg from '../../assets/leadership/copper-bg.webp';

const team = [
    // Supervisors & Project Managers
    { name: 'Keith Rainey', title: 'Roofing Operations Manager', photo: keithRainey },
    { name: 'Aaron Puskarov', title: 'Project Manager – HVAC', photo: aaronPuskarov },
    { name: 'Grant Gollis', title: 'Project Supervisor – Roofing', photo: grantGollis },
    { name: 'Tyler Logas', title: 'Project Supervisor – Roofing', photo: tylerLogas },
    { name: 'Jay Gilbertson', title: 'Roofing Supervisor – Lake Havasu', photo: jayGilbertson },
    { name: 'Andy Joseph', title: 'Project Supervisor – Remodeling', photo: andyJoseph },
    { name: 'Fabian Arvizo', title: 'Project Supervisor', photo: fabianArvizo },
    { name: 'Patrick Blake', title: 'Project Supervisor – Phoenix', photo: patrickBlake },

    // Stucco Supervisors
    { name: 'Don O\'Banion', title: 'Stucco Supervisor – Kingman', photo: donObanion },
    { name: 'Ramon Gallegos', title: 'Stucco Supervisor – Bullhead City', photo: ramonGallegos },

    // Specialty Supervisors
    { name: 'Carlos Ruiz', title: 'Scaffold Supervisor', photo: carlosRuiz },
    { name: 'Orin Cunningham', title: 'Manager – Specialties', photo: orinCunningham },
    { name: 'Leon Mitchell', title: 'Mechanic Shop Manager', photo: leonMitchell },
    { name: 'Cooper Kay', title: 'Logistics Manager', photo: cooperKay },

    // Estimators & Sales
    { name: 'Randy Finch', title: 'Director of Estimating', photo: null }, // Already in leadership
    { name: 'Jarrett Doheny', title: 'Estimator', photo: jarrettDoheny },
    { name: 'Kemer Reinhardt', title: 'Estimator', photo: kemerReinhardt },
    { name: 'Travis Crouch', title: 'Estimator', photo: travisCrouch },
    { name: 'Josh Turner', title: 'Roofing Sales', photo: joshTurner },
].filter(member => member.photo !== null); // Remove placeholder entries

const TeamSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2>Our Team</h2>
                <p>The skilled professionals who deliver excellence every day.</p>
            </div>

            <div ref={sectionRef} className={styles.grid}>
                {team.map((member, index) => (
                    <div
                        key={index}
                        className={styles.card}
                        style={{ '--delay': `${index * 50}ms` }}
                    >
                        <div
                            className={styles.photoContainer}
                            style={{ backgroundImage: `url(${copperBg})` }}
                        >
                            <img
                                src={member.photo}
                                alt={member.name}
                                loading="lazy"
                            />
                        </div>
                        <div className={styles.info}>
                            <h3>{member.name}</h3>
                            <p>{member.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TeamSection;
