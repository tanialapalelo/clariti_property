import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    const searchRes = await fetch(
      `${process.env.WORDPRESS_URL}/search?search=${query}&type=post&subtype=post`
    );
    const searchData = await searchRes.json();

    // Fetch detailed data for each post
    const detailedResults = await Promise.all(
      searchData.map(async (result: any) => {
        const postRes = await fetch(
          `${process.env.WORDPRESS_URL}/posts/${result.id}?acf_format=standard`
        );
        const postData = await postRes.json();

        // Fetch featured media if available
        if (postData.featured_media) {
          const mediaRes = await fetch(
            `${process.env.WORDPRESS_URL}/media/${postData.featured_media}`
          );
          const mediaData = await mediaRes.json();
          postData.featuredImage = mediaData.source_url;
        } else {
          postData.featuredImage = null;
        }

        return postData;
      })
    );

    return NextResponse.json(detailedResults);
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}
