import React, { useEffect, useRef } from 'react';
import styles from './TeamSection.module.css';

// Team photos
import aaronPuskarov from '../../assets/team/Aaron-Puskarov.webp';
import andyJoseph from '../../assets/team/Andy-Joseph.webp';
import carlosRuiz from '../../assets/team/Carlos-Ruiz.webp';
import cooperKay from '../../assets/team/Cooper-Kay.webp';
import donObanion from '../../assets/team/Don-OBanion.webp';
import fabianArvizo from '../../assets/team/Fabian-Arvizo.webp';
import grantGollis from '../../assets/team/Grant-Gollis.webp';
import jarrettDoheny from '../../assets/team/Jarrett-Doheny.webp';
import jayGilbertson from '../../assets/team/Jay-Gilbertson.webp';
import joshTurner from '../../assets/team/Josh-Turner.webp';
import keithRainey from '../../assets/team/Keith-Rainey.webp';
import kemerReinhardt from '../../assets/team/Kemer-Reinhardt.webp';
import leonMitchell from '../../assets/team/Leon-Mitchell.webp';
import orinCunningham from '../../assets/team/Orin-Cunningham.webp';
import patrickBlake from '../../assets/team/Patrick-Blake.webp';
import ramonGallegos from '../../assets/team/Ramon-Gallegos.webp';
import travisCrouch from '../../assets/team/Travis-Crouch.webp';
import tylerLogas from '../../assets/team/Tyler-Logas.webp';

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
                        <div className={styles.photoContainer}>
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
