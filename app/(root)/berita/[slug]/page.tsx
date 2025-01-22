import { CardsCarousel } from "@/components/CardsCarousel";
import { mockPosts } from "@/constants"; // Adjust the import path accordingly
import { Container, Image, Text, Title } from "@mantine/core";
import { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  return {
    title: params.slug,
  };
}

// Generate static params based on the slugs from the mockPosts
export async function generateStaticParams() {
  // Here we are mapping through the mockPosts to generate params for each post's slug
  return mockPosts.map((post) => ({
    slug: post.slug, // each post should have a 'slug' field
  }));
}

// The main page component to display the post details
export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  // Find the post based on the slug
  const post = mockPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return <p>Post not found</p>;
  }
  
  // Find related news by matching tags
  const relatedNews = mockPosts.filter(
    (item) =>
      item.id !== post.id && // Exclude the current news
      item.tags.some((tag) => post.tags.includes(tag)) // Check if any tags match
  );


  return (
    <Container>
      <Title order={2} my={"md"} style={{textAlign: "center"}}>{post.title}</Title>
      <Image src={post.featuredImage} alt={post.title} width={300} height={300}/>
      <Text my={"md"}>{post.excerpt}</Text>
      
      <Title order={2} my={"md"} style={{textAlign: "center"}}>Related News</Title>
      {relatedNews.length > 0 ? (
        <CardsCarousel berita={relatedNews}/>
      ) : (
        <p>No related news found.</p>
      )}
    </Container>
  );
}
