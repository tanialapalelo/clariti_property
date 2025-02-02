import HomeLayout from "@/components/layout/HomeLayout";
import { Article, HomeHeroSection, News } from "@/lib/shared.types";



async function fetchHeroSection(): Promise<HomeHeroSection[]> {
  const res = await fetch(`${process.env.WORDPRESS_URL}/home_hero_section?_embed`);
  const data: HomeHeroSection[] = await res.json();
  
  return data.map((member) => ({
    image: member.image,
    url: member.url,
    title: member.title,
    description: member.description
  }));
}


// Fetch from API route
const fetchPosts = async (category: string): Promise<Article[]> => {
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

export default async function Home() {
  const newsData: Article[] = await fetchPosts("all");
  const heroSection: HomeHeroSection[] = await fetchHeroSection();
  
  return <HomeLayout news={newsData} heroSection={heroSection}/>;
}
