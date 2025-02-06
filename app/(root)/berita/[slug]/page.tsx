import { CardsCarousel } from "@/components/CardsCarousel";
import { DetailNews } from "@/lib/shared.types";
import { formatDate } from "@/lib/utils";
import { fetchImageData } from "@/lib/wordpress";
import { Container, Image, Text, Title } from "@mantine/core";
import { Metadata } from "next";

// Fetch the post data dynamically
async function fetchPost(slug: string, tags?: string) {
  try {
    let url = `${process.env.WORDPRESS_URL}/posts?slug=${slug}`;
    if (tags) url = `${process.env.WORDPRESS_URL}/posts?tags=${tags}`;

    url += `&_fields=id,slug,title.rendered,content.rendered,featured_media,categories,date,tags&_embed`;

    const res = await fetch(url, {
      next: { revalidate: 60 }, // Cache for 60 seconds (ISR)
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const data = await fetchPost(params.slug);

    return {
      title: data?.[0]?.title?.rendered || "Unknown Post",
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return { title: "Error" };
  }
}

// Fetch static params for SSG (only fetch a few to reduce build time)
export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/posts?_fields=slug`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );

  if (!res.ok) return [];

  const posts = await res.json();
  return posts.slice(0, 10).map((news: DetailNews) => ({ slug: news.slug })); // Pre-build only 10
}

// Main page component
export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);

  if (!post || post.length === 0) {
    return <Text ta={"center"}>Post not found</Text>;
  }

  const postData = post[0];
  const featureImage = postData.featured_media
    ? await fetchImageData(postData.featured_media)
    : null;

  const relatedNews =
    postData.tags.length > 0
      ? await fetchPost("", postData.tags.join(","))
      : [];

  const formattedRelatedNews = await Promise.all(
    relatedNews.map(async (news: DetailNews) => ({
      id: news.id,
      title: news.title.rendered,
      slug: news.slug,
      date: formatDate(news.date),
      category: "",
      featuredImage: news.featured_media
        ? await fetchImageData(news.featured_media)
        : null,
    }))
  );

  return (
    <>
      <Container>
        <Title order={2} my="md" style={{ textAlign: "center" }}>
          {post[0].title.rendered}
        </Title>
        {featureImage && (
          <Image src={featureImage} alt={postData.title} width={300} height={300} />
        )}
        <div
          style={{
            color: "#444444",
          }}
          dangerouslySetInnerHTML={{
            __html: post[0].content.rendered,
          }}
        />

        <Title order={2} my={"md"} style={{ textAlign: "center" }}>
          Related News
        </Title>
      </Container>
      {relatedNews.length > 0 ? (
        <CardsCarousel berita={formattedRelatedNews} />
      ) : (
        <p>No related news found.</p>
      )}
    </>
  );
}
