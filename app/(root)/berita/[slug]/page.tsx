"use client"; // Hydration issue fix

import { CardsCarousel } from "@/components/CardsCarousel";
import { DetailNews } from "@/lib/shared.types";
import { formatDate } from "@/lib/utils";
import { fetchImageData } from "@/lib/wordpress";
import { Container, Image, Text, Title } from "@mantine/core";
import { Metadata } from "next";
import { useEffect, useState } from "react";

// Fetch the post data dynamically
async function fetchPost(slug: string, tags?: string) {
  try {
    let url = `${process.env.WORDPRESS_URL}/posts?slug=${slug}`;
    if (tags) url = `${process.env.WORDPRESS_URL}/posts?tags=${tags}`;
    url += `&_fields=id,slug,title.rendered,content.rendered,featured_media,categories,date,tags&_embed`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// Fetch metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.WORDPRESS_URL}/posts?slug=${params.slug}&_fields=title`);
    if (!res.ok) return { title: "Post Not Found" };

    const data = await res.json();
    return { title: data[0]?.title?.rendered || "Unknown Post" };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return { title: "Error" };
  }
}

// Static paths for pre-rendering
export async function generateStaticParams() {
  const res = await fetch(`${process.env.WORDPRESS_URL}/posts?_fields=slug,_embed`, { next: { revalidate: 3600 } });
  if (!res.ok) return [];

  const posts = await res.json();
  return posts.map((news: DetailNews) => ({ slug: news.slug }));
}

// 🛠 Fixed Component
export default function Page({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<DetailNews | null>(null);
  const [featureImage, setFeatureImage] = useState<string | null>(null);
  const [relatedNews, setRelatedNews] = useState<DetailNews[]>([]);

  useEffect(() => {
    async function loadPost() {
      const postData = await fetchPost(params.slug);
      if (!postData || postData.length === 0) return;

      setPost(postData[0]);

      // Fetch featured image
      if (postData[0].featured_media) {
        const image = await fetchImageData(postData[0].featured_media);
        setFeatureImage(image);
      }

      // Fetch related news
      if (postData[0].tags.length > 0) {
        const related = await fetchPost("", postData[0].tags.join(","));
        setRelatedNews(related || []);
      }
    }

    loadPost();
  }, [params.slug]);

  if (!post) return <Text ta={"center"}>Post not found</Text>;

  return (
    <>
      <Container>
        <Title order={2} my="md" style={{ textAlign: "center" }}>
          {post.title.rendered}
        </Title>
        {featureImage && <Image src={featureImage} alt={post.title.rendered} width={300} height={300} />}
        <div
          style={{ color: "#444444" }}
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        <Title order={2} my={"md"} style={{ textAlign: "center" }}>
          Related News
        </Title>
      </Container>
      {relatedNews.length > 0 ? <CardsCarousel berita={relatedNews} /> : <p>No related news found.</p>}
    </>
  );
}
