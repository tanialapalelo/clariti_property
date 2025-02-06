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
import { News } from "@/lib/shared.types";
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
          const res = await fetch(`/api/search?query=${query}`);
          const data: News[] = await res.json();
          setSearchResults(data);
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
