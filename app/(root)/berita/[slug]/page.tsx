import { CardsCarousel } from "@/components/CardsCarousel";
import { DetailNews } from "@/lib/shared.types";
import { formatDate } from "@/lib/utils";
import { fetchImageData } from "@/lib/wordpress";
import { Container, Image, Text, Title } from "@mantine/core";
import { Metadata } from "next";

// Fetch the post data dynamically
async function fetchPost(slug: string, tags?: string) {
  let url = `${process.env.WORDPRESS_URL}/posts?slug=${slug}`;
  if (tags) url = `${process.env.WORDPRESS_URL}/posts?tags=${tags}`;

  url += `&_fields=id,slug,title.rendered,content.rendered,featured_media,excerpt,categories,date,tags&_embed`;
  const res = await fetch(url, {
    cache: "no-store", // Ensure fresh data
  });

  if (!res.ok) return null;

  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = (await params).slug;

  const data = await fetch(
    `${process.env.WORDPRESS_URL}/posts?slug=${slug}`
  ).then((res) => res.json());

  return {
    title: data[0].title.rendered
  };
}

// Fetch static params for SSG
export async function generateStaticParams({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/posts?slug=${params.slug}`
  );

  if (!res.ok) return [];

  const posts = await res.json();
  return posts.map((news: DetailNews) => ({ slug: news.slug }));
}

// The main page component to display the post details
export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);

  const postData = post[0];
  // Fetch feature image if it exists
  const featureImage = postData.featured_media
    ? await fetchImageData(postData.featured_media)
    : null;

  // Fetch related posts using tags (if available)
  const relatedNews =
    postData.tags.length > 0
      ? await fetchPost("", postData.tags.join(","))
      : [];
      
      const formattedRelatedNews = await Promise.all(
        relatedNews.map(async (news: any) => ({
          id: news.id,
          title: news.title.rendered,
          content: news.content.rendered,
          slug: news.slug,
          date: formatDate(news.date),
          excerpt: news.excerpt.rendered,
          featuredImage: news.featured_media
            ? await fetchImageData(news.featured_media)
            : null,
        }))
      );
      

  if (!post) {
    return <Text ta={"center"}>Post not found</Text>;
  }

  return (
    <Container>
      <Title order={2} my="md" style={{ textAlign: "center" }}>
        {post[0].title.rendered}
      </Title>
      <Image src={featureImage} alt={post.title} width={300} height={300} />
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
      {relatedNews.length > 0 ? (
        <CardsCarousel berita={formattedRelatedNews} />
      ) : (
        <p>No related news found.</p>
      )}
    </Container>
  );
}
