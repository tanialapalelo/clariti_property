import { fetchImageData } from "@/lib/wordpress";
import { NextResponse } from "next/server"; // Use NextResponse for app router

const WORDPRESS_API_URL = process.env.WORDPRESS_URL;

export async function GET(req: Request) {
  const requestUrl = new URL(req.url);
  const category = requestUrl.searchParams.get("category");
  console.log("req.query category:", category); // Log req.query to check its content

  if (!category || typeof category !== "string") {
    return NextResponse.json({ error: "Category is required" }, { status: 400 });
  }

  try {
    if (category === "all") {
      const [beritaRes, promosiRes] = await Promise.all([
        fetch(`${WORDPRESS_API_URL}/categories?slug=berita`),
        fetch(`${WORDPRESS_API_URL}/categories?slug=promosi`),
      ]);

      if (!beritaRes.ok || !promosiRes.ok) {
        throw new Error("Failed to fetch categories");
      }

      const berita = await beritaRes.json();
      const promosi = await promosiRes.json();

      const beritaId = berita[0]?.id;
      const promosiId = promosi[0]?.id;

      if (!beritaId || !promosiId) {
        return NextResponse.json({ error: "Categories not found" }, { status: 404 });
      }

      const [beritaPostsRes, promosiPostsRes] = await Promise.all([
        fetch(`${WORDPRESS_API_URL}/posts?categories=${beritaId}`),
        fetch(`${WORDPRESS_API_URL}/posts?categories=${promosiId}`),
      ]);

      if (!beritaPostsRes.ok || !promosiPostsRes.ok) {
        throw new Error("Failed to fetch posts");
      }

      const beritaPosts = await beritaPostsRes.json();
      const promosiPosts = await promosiPostsRes.json();

      // Fetch the featured image for each post
      const postsWithImages = await Promise.all([
        ...beritaPosts,
        ...promosiPosts
      ].map(async (post: any) => {
        const featuredImageUrl = await fetchImageData(post.featured_media); // Fetch the image URL
        return { ...post, featuredImage: featuredImageUrl }; // Add the image URL to the post data
      }));

      return NextResponse.json(postsWithImages, { status: 200 });
    } else {
      const categoryRes = await fetch(`${WORDPRESS_API_URL}/categories?slug=${category}`);
      if (!categoryRes.ok) throw new Error("Failed to fetch category");

      const categoryData = await categoryRes.json();
      const categoryId = categoryData[0]?.id;

      if (!categoryId) {
        return NextResponse.json({ error: "Category not found" }, { status: 404 });
      }

      const postsRes = await fetch(`${WORDPRESS_API_URL}/posts?categories=${categoryId}`);
      if (!postsRes.ok) throw new Error("Failed to fetch posts");

      const posts = await postsRes.json();

      // Fetch the featured image for each post
      const postsWithImages = await Promise.all(posts.map(async (post: any) => {
        const featuredImageUrl = await fetchImageData(post.featured_media); // Fetch the image URL
        
        return { ...post, featuredImage: featuredImageUrl }; // Add the image URL to the post data
      }));

      return NextResponse.json(postsWithImages, { status: 200 });
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
