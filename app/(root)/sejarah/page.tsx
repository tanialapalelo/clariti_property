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
  image: string; // URL of the image for Vision/Mission section
  visionTitle: string; // Title of the Vision section
  visionDescription: string; // Description of the Vision section
  missionTitle: string; // Title of the Mission section
  missionDescription: string; // Description of the Mission section
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
  sections: Section[]; // Array of sections for the alternating content
  visionMission: VisionMission; // Vision and Mission content
  ceo: CEO; // CEO information
  teamMembers: TeamMember[]; // Array of team members
}

async function fetchAboutData(): Promise<AboutSectionProps> {
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
    teamMembers: content.team_members,
  };
}

const AboutUsPage = async () => {
  const aboutData = await fetchAboutData();
  console.log("about data", aboutData);
  return <AboutSection {...aboutData} />;
};

export default AboutUsPage;
