"use client";

import { Carousel } from "@mantine/carousel";
import ArticleCard from "./ArticleCard";
import { Article } from "@/lib/shared.types";
import { Container } from "@mantine/core";

interface CardsCarouselProps {
  berita: Article[];
}

export function CardsCarousel({ berita }: CardsCarouselProps) {
  // Group dataBerita into chunks of 3 using reduce for better readability
  const chunkedData: Article[][] = [];
  for (let i = 0; i < berita.length; i += 3) {
    chunkedData.push(berita.slice(i, i + 3));
  }

  return (
    <Container size={"xl"}>
      <Carousel
        withIndicators
        slideSize="100%"
        align="start"
        loop
      >
        {chunkedData.map((group, index) => (
          <Carousel.Slide key={index}>
            <div style={{ display: "flex" }}>
              {group.map((article) => (
                <ArticleCard key={article.title} {...article} />
              ))}
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
}
