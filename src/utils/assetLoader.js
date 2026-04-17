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
      ? project.gallery.map((item, i) => {
          // gallery items can be plain imports OR {src, caption} objects
          const src     = item?.src ?? item;
          const caption = item?.caption ?? '';
          return { type: 'image', src, caption, fileName: `${project.id}-${i+1}` };
        })
      : [{ type: 'image', src: project.src, caption: '', fileName: project.id }]
  }));
};
