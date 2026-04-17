import { allProjects } from '../data/projects';

export const loadProjectAssets = () => {
  return allProjects.map(project => ({
    id: project.id,
    title: project.name,
    location: project.location,
    category: project.category,
    trade: project.trade,
    featured: project.featured ?? false,
    blurb: project.blurb ?? '',
    videos: project.videos ?? [],
    media: project.gallery
      ? project.gallery.map((src, i) => ({ type: 'image', src, fileName: `${project.id}-${i+1}` }))
      : [{ type: 'image', src: project.src, fileName: project.id }]
  }));
};
