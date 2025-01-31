import { AspectRatio, Card, Image, Text } from "@mantine/core";
import Link from "next/link";
import classes from "../styles/ArticleCard.module.css";
import { motion } from "framer-motion";

interface ArticleProps {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  slug: string;
  featuredImage: string;
}

const ArticleCard = ({
  title,
  date,
  category,
  slug,
  excerpt,
  featuredImage,
}: ArticleProps) => {
  console.log("exceprt", excerpt)
  return (
    <Card mx="auto" radius="md" style={{ width: "350px", height: "350px" }}>
      
      <Link href={`/berita/${slug}`} passHref>
        <AspectRatio ratio={1080 / 720} style={{ overflow: "hidden" }}>
          <motion.div
            whileHover={{ scale: 1.05 }} // Scale up on hover
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <Image src={featuredImage} alt={title} />
          </motion.div>
        </AspectRatio>
      </Link>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "12px",
        }}
      >
        <Text c="dimmed" size="xs" tt="uppercase" fw={400}>
          {category}
        </Text>
        <Text c="dimmed" size="xs" tt="uppercase" fw={400}>
          {date}
        </Text>
      </div>
      <Text className={classes.title} mt={5} lineClamp={2} component="a" href={`/berita/${slug}`}>
        {title}
      </Text>
      
      {/* <Text mt={5} lineClamp={2} component="a" href={`/berita/${slug}`}>
        {excerpt}
      </Text> */}
      {/* <div
        style={{
          color: "#444444",
        }}
        dangerouslySetInnerHTML={{
          __html: excerpt,
        }}
      /> */}
      <Link href={`/berita/${slug}`}>Read More</Link>
    </Card>
  );
};

export default ArticleCard;
