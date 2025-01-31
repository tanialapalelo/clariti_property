import { NewsCategory, WordpressNews } from "@/lib/shared.types";
import { fetchImageData } from "@/lib/wordpress";
import { NextResponse } from "next/server";

const WORDPRESS_API_URL = process.env.WORDPRESS_URL;

export async function GET(req: Request) {
  const requestUrl = new URL(req.url);
  const category = requestUrl.searchParams.get("category");

  if (!category || typeof category !== "string") {
    return NextResponse.json({ error: "Category is required" }, { status: 400 });
  }

  try {
    let categoriesRes;

    if (category === "all") {
      categoriesRes = await fetch(`${WORDPRESS_API_URL}/categories`);
    } else {
      categoriesRes = await fetch(`${WORDPRESS_API_URL}/categories?slug=${category}`);
    }

    if (!categoriesRes.ok) {
      throw new Error("Failed to fetch categories");
    }

    const categoriesData = await categoriesRes.json();
    
    const categoryIds = categoriesData.map((cat: NewsCategory) => cat.id);

    if (categoryIds.length === 0) {
      return NextResponse.json({ error: "Categories not found" }, { status: 404 });
    }

    // const postsRes = await fetch(`${WORDPRESS_API_URL}/posts?categories=${categoryIds.join(",")}`);

    // Fetch posts with embedded media
    const postsRes = await fetch(
      `${WORDPRESS_API_URL}/posts?categories=${categoryIds.join(",")}` +
        `&_fields=id,slug,title.rendered,featured_media,excerpt,categories,date&_embed`
    );

    if (!postsRes.ok) throw new Error("Failed to fetch posts");

    const posts = await postsRes.json();
    console.log("posts", posts)
    // Fetch the featured image and category name for each post
    const postsWithDetails = await Promise.all(
      posts.map(async (post: WordpressNews) => {
        const featuredImageUrl = await fetchImageData(post.featured_media);

        // Get the category name for this post
        const postCategories = post.categories.map((catId: number) => {
          const category = categoriesData.find((c: NewsCategory) => c.id === catId);
          return category ? category.name : "Uncategorized";
        });

        return { ...post, categories: postCategories, featuredImage: featuredImageUrl };
      })
    );

    return NextResponse.json(postsWithDetails, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
