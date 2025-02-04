import { WordpressProject } from "./shared.types";

export async function fetchImageData(imageId: number): Promise<string> {
  const res = await fetch(`${process.env.WORDPRESS_URL}/media/${imageId}`);
  
  const data = await res.json();
  
  return data.source_url;
}

export const fetchProjects = async () => {
  try {
    const res = await fetch(`${process.env.WORDPRESS_URL}/project?acf_format=standard`);
    if (!res.ok) {
      throw new Error(`Failed to fetch projects, status: ${res.status}`);
    }

    const data: WordpressProject[] = await res.json();

    return Promise.all(
      data.map(async (project) => {
        const projectTypeName = await getProjectTypeName(project);

        return {
          id: project.id || 0,
          name: project.title?.rendered || '',
          slug: project.slug || '',
          type: projectTypeName || 'Unknown',
          acf: project.acf 
        };
      })
    );
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const getProjectTypeName = async (project: WordpressProject): Promise<string> => {
  try {
    const projectTypeLink = project._links?.['wp:term']?.find(
      (term) => term.taxonomy === 'project_type'
    );

    if (projectTypeLink) {
      return await fetchProjectType(projectTypeLink.href);
    }
    return 'Unknown';
  } catch (error) {
    console.error('Error getting project type:', error);
    return 'Unknown';
  }
};

export const fetchProjectType = async (url: string): Promise<string> => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch project type, status: ${res.status}`);
    }

    const types = await res.json();
    return types.map((type: { name: string }) => type.name).join(', ');
  } catch (error) {
    console.error('Error fetching project type:', error);
    return '';
  }
};