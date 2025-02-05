import HomeLayout from "@/components/layout/HomeLayout";
import {
  Article,
  HomeHeroSection,
  HomeSectionProps,
  News,
  StrategicPlaces,
  WordPressHomeHeroSection,
} from "@/lib/shared.types";
import { fetchImageData, fetchProjects } from "@/lib/wordpress";

async function fetchHeroSection(): Promise<HomeHeroSection[]> {
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/home_hero_section?_embed`
  );
  if (!res.ok) {
    throw new Error(
      `Failed to fetch facility sections: ${res.status} ${res.statusText}`
    );
  }
  const data: WordPressHomeHeroSection[] = await res.json();

  return await Promise.all(
    data.map(async (section) => {
      const featureImage = section.acf.feature_image
        ? await fetchImageData(section.acf.feature_image)
        : "";

      return {
        id: section.id,
        title: section.acf.title,
        description: section.acf.description,
        featureImage,
        buttonUrl: section.acf.button_url || "",
        buttonText: section.acf.button_text || "",
      };
    })
  );
}


async function fetchStrategicPlace(): Promise<StrategicPlaces[]> {
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/strategic_place?_embed`
  );
  if (!res.ok) {
    throw new Error(
      `Failed to fetch strategic place sections: ${res.status} ${res.statusText}`
    );
  }
  const data: StrategicPlaces[] = await res.json();

  return await Promise.all(
    data.map(async (place) => {
      return {
        id: place.id,
        acf: place.acf,
      };
    })
  );
}

// Fetch from API route
const fetchBerita = async (category: string): Promise<Article[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/news?category=${category}`,
      {
        cache: "no-store", // Ensures fresh data on each request
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const newsData: News[] = await response.json();
    // Transform News[] into Article[]
    return newsData.map((newsItem) => ({
      id: newsItem.id,
      title: newsItem.title.rendered,
      featuredImage: newsItem.featuredImage,
      category: newsItem.categories[0] || "uncategorized", // Assuming the first category
      slug: newsItem.slug,
      date: newsItem.date,
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

async function fetchHomeData(): Promise<HomeSectionProps> {
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/pages?slug=home-page&acf_format=standard`,
    {
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  const content = data[0].acf;
  return {
    tentangKamiSection: content.tentang_kami_section,
    panoramaSection: content.panorama_section,
    beritaSection: content.berita_section,
    kunjungiKamiSection: content.kunjungi_kami_section,
    popupMapSection: content.popup_map_section,
  };
}

export default async function Home() {
  const homeSections: HomeSectionProps = await fetchHomeData();
  const newsData: Article[] = await fetchBerita("all");
  const heroSections: HomeHeroSection[] = await fetchHeroSection();
  const projects = await fetchProjects();
  const strategicPlaces = await fetchStrategicPlace();

  return (
    <HomeLayout
      homeSections={homeSections}
      news={newsData}
      heroSections={heroSections}
      projects={projects}
      strategicPlaces={strategicPlaces}
    />
  );
}
