import HomeLayout from "@/components/layout/HomeLayout";
import { Article, HomeHeroSection, HomeSectionProps, News, WordPressHomeHeroSection } from "@/lib/shared.types";
import { fetchImageData } from "@/lib/wordpress";

async function fetchHeroSection(): Promise<HomeHeroSection[]> {
  const res = await fetch(`${process.env.WORDPRESS_URL}/home_hero_section?_embed`);
  if (!res.ok) {
    throw new Error(`Failed to fetch facility sections: ${res.status} ${res.statusText}`);
  }
  const data: WordPressHomeHeroSection[] = await res.json();

  return await Promise.all(
    data.map(async (section) => {
      const featureImage = section.acf.feature_image ? await fetchImageData(section.acf.feature_image) : "";

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
      excerpt: newsItem.excerpt.rendered,
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
  const res = await fetch(`${process.env.WORDPRESS_URL}/pages?slug=home-page&acf_format=standard`, {
    next: { revalidate: 10 },
  });
  const data = await res.json();
  const content = data[0].acf;
  return {
    tengtangKami: content.tentang_kami,
    panoramaSection: content.panorama_section
  };
}

export default async function Home() {
  const homeSections: HomeSectionProps = await fetchHomeData();
  const newsData: Article[] = await fetchBerita("all");
  const heroSections: HomeHeroSection[] = await fetchHeroSection();
  
  return <HomeLayout homeSections={homeSections} news={newsData} heroSections={heroSections}/>;
}
