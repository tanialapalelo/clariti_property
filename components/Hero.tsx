"use client";

import { Button, Container, Overlay, Text, Title } from "@mantine/core";
import classes from "../styles/Hero.module.css";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { HomeHeroSection } from "@/lib/shared.types";

interface HeroProps {
  heroSections: HomeHeroSection[];
}
export function Hero({heroSections}: HeroProps) {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  return (
      <Carousel
        loop
        slideGap="md"
        align="start"
        styles={{ control: { color: "white" } }}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
      {heroSections.map((section) => (
        <Carousel.Slide key={section.id}>
          
          <div
            className={classes.hero}
            style={{
              backgroundImage: `url(${section.featureImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >

            <Overlay
              gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
              opacity={1}
              zIndex={0}
              color="#000"
              backgroundOpacity={0.85}
            />
            <Container className={classes.container} size="md">
              <Title className={classes.title}>
                {section.title}
              </Title>
              <Text className={classes.description} size="xl" mt="xl">
              {section.description}
              </Text>

              <Button
                variant="gradient"
                size="md"
                radius="xl"
                className={classes.control}
                component="a"
                href={section.buttonUrl}
              >
                {section.buttonText}
              </Button>
            </Container>
          </div>
        </Carousel.Slide>
      ))}
      </Carousel>
  );
}
