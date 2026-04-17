import { useParams, Link } from 'react-router-dom';
import { loadProjectAssets } from '../utils/assetLoader';
import SEO from '../components/common/SEO';
import FeaturedProjectDetail from '../components/ui/FeaturedProjectDetail';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const projects = loadProjectAssets();
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 600 }}>Project not found</h2>
          <Link to="/portfolio" style={{ color: '#b87333' }}>← Back to Portfolio</Link>
        </div>
      </div>
    );
  }

  // Featured projects get the premium layout
  if (project.featured) {
    return <FeaturedProjectDetail project={project} />;
  }

  const hero = project.media[0];

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <SEO
        title={`${project.title} | Canyon State Enterprises`}
        description={`${project.title} — a Canyon State Enterprises ${project.trade ? project.trade + ' ' : ''}project in ${project.location}. View project photos and details.`}
        canonical={`https://canyonstateaz.com/portfolio/${project.id}`}
      />

      <div style={{ position: 'relative', height: '60vh', width: '100%', borderBottom: '4px solid #b87333', overflow: 'hidden' }}>
        {hero?.type === 'video' ? (
          <video
            src={hero.src}
            autoPlay loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <img
            src={hero?.src}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            width="1024"
            height="576"
          />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: 'clamp(2rem, 5vw, 4rem)' }}>
          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
            <span style={{ display: 'block', fontSize: '0.75rem', color: '#b87333', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Project Overview
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {project.title}
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#d1d5db', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', borderLeft: '4px solid #b87333', paddingLeft: '1rem', marginTop: '1rem' }}>
              {project.location}
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem var(--container-padding, 2rem)' }}>
        <Link
          to={project.category && ['custom-home', 'development', 'model-home'].includes(project.category)
            ? '/portfolio/residential'
            : '/portfolio/commercial'}
          style={{ display: 'inline-block', marginBottom: '2rem', color: '#b87333',
            textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem',
            fontWeight: 700, textDecoration: 'none' }}
        >
          ← Back to Portfolio
        </Link>

        <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(184,115,51,0.2)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            {project.trade && (
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.15em', color: '#b87333', background: 'rgba(184,115,51,0.1)',
                padding: '0.375rem 0.875rem', borderRadius: '2px', border: '1px solid rgba(184,115,51,0.3)' }}>
                {project.trade}
              </span>
            )}
            {project.location && (
              <span style={{ fontSize: '0.875rem', color: '#9ca3af', fontWeight: 400 }}>
                {project.location}
              </span>
            )}
          </div>
        </div>

        {project.media.length > 1 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {project.media.map((item, index) => (
              <div key={index} style={{ borderRadius: '4px', overflow: 'hidden', background: '#111', border: '1px solid rgba(184,115,51,0.25)' }}>
                <img
                  src={item.src}
                  alt={`${project.title} — view ${index + 1}`}
                  style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
                  width="1024"
                  height="576"
                />
                <div style={{ background: '#1a1a1a', padding: '0.625rem 0.875rem', borderTop: '1px solid rgba(184,115,51,0.2)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', color: '#9ca3af', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '10px', color: '#b87333', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>
                    Canyon State
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ borderRadius: '4px', overflow: 'hidden', background: '#111', border: '1px solid rgba(184,115,51,0.25)' }}>
              <img
                src={project.media[0].src}
                alt={project.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                width="1024"
                height="576"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem', padding: '1rem 0' }}>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#b87333', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.2em', marginBottom: '0.5rem' }}>Project</p>
                <p style={{ fontSize: '1.25rem', fontWeight: 500, color: '#fff', margin: 0 }}>{project.title}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#b87333', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.2em', marginBottom: '0.5rem' }}>Location</p>
                <p style={{ fontSize: '1rem', color: '#d1d5db', margin: 0 }}>{project.location}</p>
              </div>
              {project.trade && (
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#b87333', fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.2em', marginBottom: '0.5rem' }}>Trade</p>
                  <p style={{ fontSize: '1rem', color: '#d1d5db', margin: 0 }}>{project.trade}</p>
                </div>
              )}
              <Link
                to={project.category && ['custom-home', 'development', 'model-home'].includes(project.category)
                  ? '/portfolio/residential' : '/portfolio/commercial'}
                style={{ display: 'inline-block', marginTop: '1rem', padding: '0.75rem 1.5rem',
                  background: 'transparent', border: '1px solid #b87333', color: '#b87333',
                  textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem',
                  fontWeight: 700, textDecoration: 'none', borderRadius: '2px',
                  transition: 'all 0.2s ease', width: 'fit-content' }}
              >
                View More Projects →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
