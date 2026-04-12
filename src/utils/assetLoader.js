import { allProjects } from '../data/projects';

export const loadProjectAssets = () => {
  return allProjects.map(project => ({
    id: project.id,
    title: project.name,
    location: project.location,
    category: project.category,
    trade: project.trade,
    media: [{ type: 'image', src: project.src, fileName: project.id }]
  }));
};
