import { CardsCarousel } from "@/components/CardsCarousel";
import { mockPosts } from "@/constants"; // Adjust the import path accordingly
import { Container, Image, Text, Title } from "@mantine/core";
import { Metadata } from "next";


// Fetch the post data dynamically
async function fetchPost(slug: string) {
  const res = await fetch(`${process.env.WORDPRESS_URL}/posts?slug=${slug}`, {
    cache: "no-store", // Ensure fresh data
  });

  if (!res.ok) return null;

  return res.json();
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const res = await fetch(`${process.env.WORDPRESS_URL}/posts?slug=${params.slug}`);
  
  const post = await res.json();
  return {
    title: post ? post[0].title.rendered : "Berita Tidak Ditemukan",
  };
}


// Fetch static params for SSG
export async function generateStaticParams({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.WORDPRESS_URL}/posts?slug=${params.slug}`);

  if (!res.ok) return [];

  const posts = await res.json();
  return posts.map((post: any) => ({ slug: post.slug }));
}

// The main page component to display the post details
export default async function Page({
  params,
}: {
  params: { slug: string };
}) {

  const post = await fetchPost(params.slug);

  if (!post) {
    return <Text ta={"center"}>Post not found</Text>;
  }

  // Find related news by matching tags
  // const relatedNews = mockPosts.filter(
  //   (item) =>
  //     item.id !== post.id && // Exclude the current news
  //     item.tags.some((tag) => post.tags.includes(tag)) // Check if any tags match
  // );

  const relatedNews = [];


  return (
    <Container>
      <Title order={2} my="md" style={{ textAlign: "center" }}>
        {post[0].title.rendered}
      </Title>
      <Image src={post[0].featuredImage} alt={post.title} width={300} height={300} />
      <div
        style={{
          color: "#444444",
        }}
        dangerouslySetInnerHTML={{

          __html: post[0].content.rendered
        }}
      />

      <Title order={2} my={"md"} style={{ textAlign: "center" }}>Related News</Title>
      {relatedNews.length > 0 ? (
        <CardsCarousel berita={relatedNews} />
      ) : (
        <p>No related news found.</p>
      )}
    </Container>
  );
}
