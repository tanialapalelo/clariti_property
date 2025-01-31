import HomeLayout from "@/components/layout/HomeLayout";
import { Article, News } from "@/lib/shared.types";

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
  
  return <HomeLayout news={newsData} />;
}
