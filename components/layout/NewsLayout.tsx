"use client";

import { Center, Grid, Pagination, Tabs, Text, Title } from "@mantine/core";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import { newsCategories } from "@/constants";
import { News } from "@/lib/shared.types";

const NewsLayout: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [activeTab, setActiveTab] = useState<string>(initialCategory);
  const [posts, setPosts] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 12;

  const fetchPosts = async (category: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/news?category=${category}`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(activeTab);
  }, [activeTab]);

  const paginatedPosts = useMemo(() => {
    return posts.slice((page - 1) * perPage, page * perPage);
  }, [posts, page]);

  const handleTabChange = (val: string | null) => {
    if (val) {
      setActiveTab(val);
      setPage(1);
      router.push(`/berita?category=${val}`, { scroll: false });
    }
  };

  return (
    <>
      <Title
        order={1}
        style={{
          fontWeight: 800,
          textAlign: "center",
          padding: "100px",
          backgroundColor: "#F6F7F8",
        }}
      >
        Latest News from Us
      </Title>

      <Center mt={{ base: "sm", md: "xl" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="pills"
          radius="xl"
        >
          <Tabs.List>
            {newsCategories.map((cat) => (
              <Tabs.Tab key={cat.id} value={cat.id}>
                {cat.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </Center>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {loading ? (
          <Center>
            <Text>Loading...</Text>
          </Center>
        ) : paginatedPosts.length > 0 ? (
          <Grid justify="center" align="center" mx="xl" px="xl">
            {paginatedPosts.map((post) => (
              <Grid.Col span="content" key={post.id}>
                <ArticleCard
                  title={post.title.rendered}
                  date={post.date}
                  category={activeTab}
                  slug={post.slug}
                  featuredImage={post.featuredImage}
                />
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Center>
            <Text color="dimmed" size="lg">
              Sorry, no news available in this category.
            </Text>
          </Center>
        )}
      </motion.div>

      <Center mb="xl">
        <Pagination
          total={Math.ceil(posts.length / perPage)}
          onChange={setPage}
          radius="lg"
        />
      </Center>
    </>
  );
};

export default NewsLayout;
