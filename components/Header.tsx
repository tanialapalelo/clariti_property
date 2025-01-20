import { HeaderLayout } from './HeaderLayout';

interface HeaderProps {
  projects: any[]; 
}

const Header = async () => {
  try {
    const res = await fetch(`${process.env.WORDPRESS_URL}/project?_embed`);
    const data = await res.json();

    // Ensure that you're extracting the rendered content from each project
    const projects = data.map((project: any) => {
      // Check if `rendered` exists and safely extract its content
      return {
        title: project.title?.rendered || 'Untitled Project',
        description: project.excerpt?.rendered || 'No description available',
        // Add more fields as necessary
      };
    });

    // Pass the cleaned data to HeaderLayout
    return <HeaderLayout projects={projects} />;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return <HeaderLayout projects={[]} />;
  }
};

export default Header;
