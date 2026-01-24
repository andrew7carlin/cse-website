
/**
 * Loads all assets from src/assets/projects and groups them by filename convention.
 * Convention: (Job Name)_(Location)_Num.ext
 * Example: KitchenRemodel_Phoenix_01.jpg
 */
export const loadProjectAssets = () => {
  // Eagerly load all files in the projects directory
  // Note: This relies on Vite's import.meta.glob feature
  const assets = import.meta.glob('../assets/projects/*.*', { eager: true });
  
  const projects = {};

  for (const path in assets) {
    // path example: '../assets/projects/Kitchen_Phoenix_01.jpg'
    
    // Extract filename
    const filename = path.split('/').pop(); // "Kitchen_Phoenix_01.jpg"
    
    // Remove extension for parsing parts
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
    
    // Split by underscore
    const parts = nameWithoutExt.split('_');
    
    // We expect at least 2 parts: Job and Location. 3rd is optional number/ignore.
    if (parts.length < 2) {
      console.warn(`Skipping file with invalid naming format: ${filename}`);
      continue;
    }

    const jobName = parts[0].trim().replace(/-/g, ' '); // Clean up dashes to spaces if used
    const location = parts[1].trim().replace(/-/g, ' ');
    
    // The module from glob upload usually has a default export with the url
    const fileModule = assets[path];
    const fileUrl = fileModule.default || fileModule; 

    // Determine type
    const isVideo = /\.(mp4|mov|webm)$/i.test(path);

    // Create a unique key for grouping
    const groupKey = `${jobName}_${location}`;

    if (!projects[groupKey]) {
      projects[groupKey] = {
        id: groupKey,
        title: jobName,
        location: location,
        media: []
      };
    }

    projects[groupKey].media.push({
      type: isVideo ? 'video' : 'image',
      src: fileUrl,
      fileName: filename
    });
  }

  // Convert map to array and sort if needed
  return Object.values(projects);
};
