import AboutSection from '@/components/AboutSection';


export const metadata = {
  title: 'Tentang Kami - Clariti',
  description: 'Halaman Tentang Kami',
}

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
  name: string;
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
  
  return data.map((member) => ({
    image: member._embedded['wp:featuredmedia']?.[0]?.source_url || '',
    name: member.title.rendered,
    role: member.acf.role,
  }));
}

async function fetchAboutData(): Promise<Omit<AboutSectionProps, 'teamMembers'>> {
  const res = await fetch(`${process.env.WORDPRESS_URL}/pages?slug=about-us&acf_format=standard`, {
//   const res = await fetch(`${process.env.WORDPRESS_URL}/pages?acf_format=standard&_field=id,slug,title,acf&slug=sejarah`, {
    next: { revalidate: 3600 }, // ISR equivalent in App Router
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

// const aboutData: Omit<AboutSectionProps, 'teamMembers'> = {
//   mainTitle: "About Clariti",
//   sections: {
//     title: "Our Journey",
//     description:
//       "Clariti has been delivering exceptional services since its inception, focusing on innovation and quality.",
//     image: "/images/about/journey.jpg",
//     alignment: "left",
//   },
//   visionMission: {
//     image: "/images/about/vision-mission.jpg",
//     vision_title: "Our Vision",
//     vision_description:
//       "To be a leading company that drives technological innovation and delivers value to our customers.",
//     mission_title: "Our Mission",
//     mission_description:
//       "To provide cutting-edge solutions while maintaining integrity, excellence, and sustainability.",
//   },
//   ceo: {
//     image: "/images/about/ceo.jpg",
//     title: "CEO & Founder",
//     name: "John Doe",
//     description:
//       "With over 20 years of experience in the tech industry, John has led Clariti to new heights with his innovative mindset.",
//   },
//   superHeroTitle: "Meet Our Superheroes",
//   superHeroDescription:
//     "Our team consists of dedicated professionals committed to excellence and innovation.",
// };

// const teamMembers: TeamMember[] = [
//   {
//     image: "/images/team/member1.jpg",
//     name: "Alice Johnson",
//     role: "Software Engineer",
//   },
//   {
//     image: "/images/team/member2.jpg",
//     name: "Bob Smith",
//     role: "Project Manager",
//   },
//   {
//     image: "/images/team/member3.jpg",
//     name: "Charlie Brown",
//     role: "UX Designer",
//   },
//   {
//     image: "/images/team/member4.jpg",
//     name: "David Lee",
//     role: "Marketing Specialist",
//   },
// ];

const Sejarah = async () => {
  const aboutDataPromise = fetchAboutData();
  const teamMembersPromise = fetchTeamMembers();

  const [aboutData, teamMembers] = await Promise.all([aboutDataPromise, teamMembersPromise]);

  const combinedData = {
    ...aboutData,
    teamMembers,
  };
  return <AboutSection {...combinedData} />;
};

export default Sejarah;
