export interface ProjectData {
  mainTitle: string;
  heroTitle: string;
  heroDescription: string;
  floorPlan: { title: string; image: string }[];
  specifications: {
    title: string;
    description: string;
    pondasi: string;
    lantai: string;
    dinding: string;
    dapur: string;
    pintu_jendela: string;
    kamar_mandi: string;
    lain_lain: string;
  };
}

export interface Project {
  id: number;
  name: string;
  slug: string;
  type: string;
}

export interface ProjectImage {
  id: number;
  acf:{
    title: string;
    image: number;
  }
}


export interface Section {
  title: string;
  description: string;
  image: string;
  alignment: 'left' | 'right';
}

export interface VisionMission {
  image: string;
  vision_title: string;
  vision_description: string;
  mission_title: string;
  mission_description: string;
}

export interface CEO {
  image: string;
  title: string;
  name: string;
  description: string;
}

export interface TeamMember {
  image: string;
  name: string;
  role: string;
}


export interface AboutSectionProps {
  mainTitle: string;
  sections: Section;
  visionMission: VisionMission;
  ceo: CEO;
  superHeroTitle: string; 
  superHeroDescription: string;
  teamMembers: TeamMember[];
}
