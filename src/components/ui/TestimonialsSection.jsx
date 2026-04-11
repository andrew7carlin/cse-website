import React, { useRef, useEffect, useState } from 'react';
import styles from './TestimonialsSection.module.css';

const testimonials = [
  {
    quote: "Ashley handled every detail for Canyon State every step of the way. Three homes being built at the same time — she stayed in constant communication on scheduling, styles, colors. Her approach was as if it were her own home being built. If we ever build again, won't consider anyone else.",
    author: "Verified Client",
    project: "Multi-Home New Construction",
    stars: 5
  },
  {
    quote: "They were fast, efficient, and went above and beyond to make sure we were satisfied. They took our 30-year-old bathrooms and made them look like they were part of the modern era. We look forward to working with Canyon State again.",
    author: "Bowling Alley Owner",
    project: "Commercial Renovation",
    stars: 5
  },
  {
    quote: "Canyon State responded incredibly fast when I discovered a leak during a rainstorm — they had someone at my home the very next day, even though they were clearly busy. That kind of responsiveness is rare and really speaks to how much they care.",
    author: "Verified Google Review",
    project: "Emergency Roof Repair",
    stars: 5
  },
  {
    quote: "Sent Canyon State an email about loose roof tiles, got a call the next day and they were out to repair within a few hours. Fast and dependable, experienced and reliable.",
    author: "Verified Google Review",
    project: "Roof Repair",
    stars: 5
  },
  {
    quote: "Aaron spent about 90 minutes working on my A/C system and it works perfectly. He was knowledgeable, professional, kind. He's an example of what techs in the HVAC industry should be like.",
    author: "Apartment Resident",
    project: "HVAC Service",
    stars: 5
  },
  {
    quote: "We hired Canyon State for a large stucco repair and to replace our AC unit. Clay and Don went above and beyond with communication and making sure the job was right and on schedule.",
    author: "Verified Client",
    project: "Stucco & HVAC",
    stars: 5
  }
];

function StarRating({ count }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={styles.star}>★</span>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${visible ? styles.visible : ''}`}
      style={{ '--delay': `${index * 0.1}s` }}
    >
      <div className={styles.quoteIcon}>"</div>
      <p className={styles.quoteText}>{testimonial.quote}</p>
      <div className={styles.cardFooter}>
        <StarRating count={testimonial.stars} />
        <div className={styles.authorInfo}>
          <span className={styles.authorName}>{testimonial.author}</span>
          <span className={styles.projectType}>{testimonial.project}</span>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2>What Our Clients Say</h2>
          <p className={styles.subheading}>Real feedback from real projects across Arizona</p>
        </div>
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
