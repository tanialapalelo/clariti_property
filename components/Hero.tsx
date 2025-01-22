"use client";

import { Button, Container, Overlay, Text, Title } from "@mantine/core";
import classes from "../styles/Hero.module.css";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export function Hero() {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  return (
      <Carousel
        slideGap="md"
        align="start"
        styles={{ control: { color: "white" } }}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        <Carousel.Slide>
          <div className={classes.hero}>
            <Overlay
              gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
              opacity={1}
              zIndex={0}
              color="#000"
              backgroundOpacity={0.85}
            />
            <Container className={classes.container} size="md">
              <Title className={classes.title}>
                A fully featured React components library
              </Title>
              <Text className={classes.description} size="xl" mt="xl">
                Build fully functional accessible web applications faster than
                ever – Mantine includes more than 120 customizable components
                and hooks to cover you in any situation
              </Text>

              <Button
                variant="gradient"
                size="xl"
                radius="xl"
                className={classes.control}
              >
                Get started
              </Button>
            </Container>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className={classes.hero}>
            <Overlay
              gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
              opacity={1}
              zIndex={0}
              color="#000"
              backgroundOpacity={0.85}
            />
            <Container className={classes.container} size="md">
              <Title className={classes.title}>Slide 2</Title>
              <Text className={classes.description} size="xl" mt="xl">
                Build fully functional accessible web applications faster than
                ever – Mantine includes more than 120 customizable components
                and hooks to cover you in any situation
              </Text>

              <Button
                variant="gradient"
                size="xl"
                radius="xl"
                className={classes.control}
              >
                Get started
              </Button>
            </Container>
          </div>
        </Carousel.Slide>
      </Carousel>
  );
}
