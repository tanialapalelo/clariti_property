import AboutSection from '@/components/AboutSection';

interface Section {
  title: string;
  description: string;
  image: string;
  alignment: 'left' | 'right';
}

interface VisionMission {
  image: string;
  vision_title: string;
  vision_description: string;
  mission_title: string;
  mission_description: string;
}

interface CEO {
  image: string;
  title: string;
  description: string;
}

interface TeamMember {
  image: string;
  name: string;
  role: string;
}

interface WordPressTeamMember {
  title: { rendered: string }; // The name of the team member
  acf: { role: string }; // The role of the team member from ACF
  _embedded: {
    'wp:featuredmedia'?: [
      {
        source_url: string; // The URL of the featured image
      }
    ];
  };
}

interface AboutSectionProps {
  mainTitle: string;
  sections: Section;
  visionMission: VisionMission;
  ceo: CEO;
  superHeroTitle: string; 
  superHeroDescription: string;
  teamMembers: TeamMember[];
}

async function fetchTeamMembers(): Promise<TeamMember[]> {
  const res = await fetch(`${process.env.WORDPRESS_URL}/team_member?_embed`);
  const data: WordPressTeamMember[] = await res.json();
  
  return data.map((member: any) => ({
    image: member._embedded['wp:featuredmedia']?.[0]?.source_url || '',
    name: member.title.rendered,
    role: member.acf.role,
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
  const aboutDataPromise = fetchAboutData();
  const teamMembersPromise = fetchTeamMembers();

  const [aboutData, teamMembers] = await Promise.all([aboutDataPromise, teamMembersPromise]);

  const combinedData = {
    ...aboutData,
    teamMembers,
  };
  return <AboutSection {...combinedData} />;
};

export default AboutUsPage;
