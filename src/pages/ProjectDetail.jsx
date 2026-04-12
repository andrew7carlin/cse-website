import { useParams, Link } from 'react-router-dom';
import { loadProjectAssets } from '../utils/assetLoader';
import SEO from '../components/common/SEO';

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

  const hero = project.media[0];

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <SEO
        title={`${project.title} | Canyon State Enterprises`}
        description={`View the ${project.title} project by Canyon State Enterprises in ${project.location}.`}
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

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '3rem var(--container-padding)' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {project.media.map((item, index) => (
            <div key={index} style={{ borderRadius: '8px', overflow: 'hidden', background: '#111', border: '2px solid #b87333' }}>
              {item.type === 'video' ? (
                <video src={item.src} controls style={{ width: '100%', height: 'auto' }} />
              ) : (
                <img src={item.src} alt={`${project.title} ${index + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
              )}
              <div style={{ background: '#1a1a1a', padding: '0.75rem', borderTop: '1px solid rgba(184,115,51,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
      </div>
    </div>
  );
}
