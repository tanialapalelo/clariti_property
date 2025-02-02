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

export interface Transportation {
  title: string;
  content: string;
};

export interface WordPressTransportation {
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
};

export interface FacilityData {
  mainTitle: string;
}

export interface FacilitySection {
  id: number;
  title: string;
  description: string;
  featureImage: string | null;
  detailImage: string | null;
  bookUrl: string;
}


export interface WordPressFacilitySection {
  id: number;
  acf: {
    title: string;
    description: string;
    feature_image: number | null;  // WordPress stores media as IDs
    detail_image: number | null;
    book_url: string;
  };
}


export interface MapProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  link: string;
  x: string;
  y: string;
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  slug: string;
  date: string;
}

export interface WordpressNews {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  featured_media: number;
  categories: number[];
}

export interface News {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  featuredImage: string;
  categories: string[];
}

export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
}

export interface DetailNews {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  slug: string;
  featured_media: number;
  categories: string[];
  tags: string[];
}

export interface HomeHeroSection {
  image: string;
  title: string;
  description: string;
  url: string;
}