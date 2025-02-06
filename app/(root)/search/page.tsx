"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Text,
  Loader,
  Container,
  Title,
  Grid,
  Center,
} from "@mantine/core";
import ArticleCard from "@/components/ArticleCard";
import { News, SearchNews } from "@/lib/shared.types";
import { formatDate } from "@/lib/utils";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [searchResults, setSearchResults] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL}/wp-json/wp/v2/search?search=${query}&type=post&subtype=post`
          );
          const searchData: SearchNews[] = await res.json();

          const detailedResults = await Promise.all(
            searchData.map(async (result) => {
              const postRes = await fetch(
                `${process.env.NEXT_PUBLIC_SITE_URL}/wp-json/wp/v2/posts/${result.id}?acf_format=standard`
              );
              const postData = await postRes.json();

              // Fetch the media data if featured_media is present
              if (postData.featured_media) {
                const mediaRes = await fetch(
                  `${process.env.NEXT_PUBLIC_SITE_URL}/wp-json/wp/v2/media/${postData.featured_media}`
                );
                const mediaData = await mediaRes.json();
                postData.featuredImage = mediaData.source_url;
              }

              return postData;
            })
          );
          setSearchResults(detailedResults);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    }
  }, [query]);

  return (
    <>
      {loading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <>
          <Title order={1} bg={"#F6F7F8"} fw={"bold"} p={"80px"} ta={"center"}>
            Search Results
          </Title>
          <Container>
            <Text my={"lg"}>
              {searchResults.length} hasil ditemukan dari pencarian:{" "}
              <span style={{ fontWeight: "bold" }}>{query}</span>
            </Text>
            <Grid justify="center" mx="xl" px="xl" gutter={0}>
              {searchResults.map((post) => (
                <Grid.Col span="content" key={post.id}>
                  <ArticleCard
                    id={post.id}
                    title={post.title.rendered}
                    date={formatDate(post.date)}
                    // category={post.categories[0]}
                    category={""}
                    slug={post.slug}
                    featuredImage={post.featuredImage || ""}
                  />
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default SearchResults;
