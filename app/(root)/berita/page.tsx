"use client";

import ArticleCard from "@/components/ArticleCard";
import { mockPosts } from "@/constants";
import {
  Center,
  Grid,
  Pagination,
  Tabs,
  Title
} from "@mantine/core";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const categories = [
  { id: "all", label: "All Categories" },
  { id: "berita", label: "Berita" },
  { id: "promosi", label: "Promosi" },
];

const BeritaPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get the initial category from the URL query
  const initialCategory = searchParams.get("category") || "all";
  const [activeTab, setActiveTab] = useState<string>(initialCategory);
  const [page, setPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    setActiveTab(initialCategory);
  }, [initialCategory]);

  // Function to update URL and state when tab changes
  const handleTabChange = (val: string) => {
    setActiveTab(val);
    setPage(1);
    router.push(`/berita?category=${val}`, { scroll: false });
  };

  const filteredPosts = useMemo(() => {
    return activeTab === "all"
      ? mockPosts
      : mockPosts.filter((post) => post.category === activeTab);
  }, [activeTab]);

  const paginatedPosts = useMemo(() => {
    return filteredPosts.slice((page - 1) * perPage, page * perPage);
  }, [filteredPosts, page]);

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

      <Center mt={{base: "sm", md: "xl"}}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="pills"
          radius="xl"
        >
          <Tabs.List>
            {categories.map((cat) => (
              <Tabs.Tab key={cat.id} value={cat.id}>
                {cat.label}
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
        {paginatedPosts.length > 0 ? (
          // <SimpleGrid
          //   cols={{ base: 1, md: 3 }}
          //   p={{ base: "", md: "xl" }}
          //   mx={{ base: "", md: "xl" }}
          //   spacing={"xs"}
          // >
          
          <Grid justify="center" align="center" mx={"xl"} px={"xl"}>
            {paginatedPosts.map((post) => (
              // <div key={post.id}>
              <Grid.Col span={"content"} key={post.id}>
                <ArticleCard
                  title={post.title}
                  date={post.date}
                  category={post.category}
                  slug={post.slug}
                  featuredImage={post.featuredImage}
                />
              {/* </div> */}
              </Grid.Col>
            ))}
          {/* </SimpleGrid> */}
          </Grid>
        ) : (
          <p>No posts available.</p>
        )}
      </motion.div>

      <Center mb={"xl"}>
        <Pagination
          total={Math.ceil(filteredPosts.length / perPage)}
          onChange={setPage}
          radius={"lg"}
        />
      </Center>
    </>
  );
};

export default BeritaPage;
