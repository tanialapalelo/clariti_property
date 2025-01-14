import AboutSection from '@/components/AboutSection';

// Section type for individual sections with alternating alignment
interface Section {
  title: string; // Title of the section
  description: string; // Description of the section
  image: string; // URL of the image
  alignment: 'left' | 'right'; // Alignment of the content
}

// Type for Vision and Mission section

interface VisionMission {
  image: string;
  vision_title: string;
  vision_description: string;
  mission_title: string;
  mission_description: string;
}

// Type for the CEO section
interface CEO {
  image: string; // URL of the CEO's image
  title: string; // Title or Name of the CEO
  description: string; // Description or message from the CEO
}

// Type for Team Member details
interface TeamMember {
  image: string; // URL of the team member's image
  name: string; // Name of the team member
  role: string; // Role or designation of the team member
}

// Props for the AboutSection component
interface AboutSectionProps {
  mainTitle: string; // Main title of the page
  sections: Section; // Array of sections for the alternating content
  visionMission: VisionMission; // Vision and Mission content
  ceo: CEO; // CEO information
  superHeroTitle: string; 
  superHeroDescription: string;
  teamMembers: TeamMember[]; // Array of team members
}

async function fetchTeamMembers(): Promise<TeamMember[]> {
  const res = await fetch(`${process.env.WORDPRESS_URL}/team_member?_embed`);
  const data = await res.json();
  console.log("dataaa", data);
  return data.map((member: any) => ({
    image: member._embedded['wp:featuredmedia']?.[0]?.source_url || '', // Image URL
    name: member.title.rendered, // Team member name
    role: member.acf.role, // Role from ACF
  }));
}


async function fetchAboutData(): Promise<Omit<AboutSectionProps, 'teamMembers'>> {
  const res = await fetch(`${process.env.WORDPRESS_URL}/pages?slug=about-us`, {
//   const res = await fetch(`${process.env.WORDPRESS_URL}/pages?acf_format=standard&_field=id,slug,title,acf&slug=sejarah`, {
    next: { revalidate: 10 }, // ISR equivalent in App Router
  });
  const data = await res.json();

  const content = data[0].acf;

  return {
    mainTitle: content.main_title,
    sections: content.sections,
    visionMission: content.vision_and_mission,
    ceo: content.ceo,
    superHeroTitle: content.superhero_title,
    superHeroDescription: content.superhero_description
  };
}

const AboutUsPage = async () => {
  const aboutDataPromise = fetchAboutData(); // Fetch About Us page data
  const teamMembersPromise = fetchTeamMembers(); // Fetch team members

  const [aboutData, teamMembers] = await Promise.all([aboutDataPromise, teamMembersPromise]);

  const combinedData = {
    ...aboutData,
    teamMembers,
  };
  return <AboutSection {...combinedData} />;
};

export default AboutUsPage;
