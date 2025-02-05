"use client";

import { CardsCarousel } from "@/components/CardsCarousel";
import { Hero } from "@/components/Hero";
import MapWithPopup from "@/components/MapWithPopup";
import Section from "@/components/Section";
import RadiusButton from "@/components/ui/RadiusButton";
import {
  Article,
  HomeHeroSection,
  HomeSectionProps,
  MapProps,
  Project,
  StrategicPlaces,
} from "@/lib/shared.types";
import {
  Anchor,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { motion } from "framer-motion";
import Image from "next/image";

const tempMapData: MapProps[] = [
  {
    id: "1",
    icon: "home",
    title: "Home Facility",
    description: "A description of the home facility.",
    link: "/home",
    x: "50%",
    y: "50%",
  },
  {
    id: "2",
    icon: "wifi",
    title: "WiFi Hotspot",
    description: "A description of the WiFi hotspot.",
    link: "/wifi",
    x: "40%",
    y: "30%",
  },
];

interface HomeLayoutProps {
  homeSections: HomeSectionProps;
  news: Article[];
  heroSections: HomeHeroSection[];
  projects: Project[];
  strategicPlaces: StrategicPlaces[];
}

const HomeLayout = ({
  homeSections,
  news,
  heroSections,
  projects,
  strategicPlaces
}: HomeLayoutProps) => {
  const finalMapData = tempMapData;
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <Hero heroSections={heroSections} />
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Grid gutter={0}>
          <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
            <div
              style={{ position: "relative", width: "100%", height: "400px" }}
            >
              <Image
                src={homeSections.tentangKamiSection.image}
                alt={homeSections.tentangKamiSection.title}
                fill
                objectFit="cover"
              />
            </div>
          </Grid.Col>
          <Grid.Col
            span={{ base: 12, md: 6 }}
            order={{ base: 1, md: 2 }}
            p={{ base: "xs", md: "xl" }}
            bg={"#0E2244"}
          >
            <Title
              order={3}
              ta={"center"}
              m={"xl"}
              style={{ color: "#FFFFFF" }}
            >
              {homeSections.tentangKamiSection.title}
            </Title>
            <Text m={"xl"} style={{ color: "#FFFFFF" }}>
              {homeSections.tentangKamiSection.description}
            </Text>
          </Grid.Col>
        </Grid>
      </motion.div>

      <Section
        title={homeSections.panoramaSection.title}
        description={homeSections.panoramaSection.description}
      />
      {/* TODO: Implement 360 Panorama View */}
      {/* <Group justify="center" mb={"lg"}>
        <RadiusButton description="Explore with 360" link="" />
      </Group> */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0} bg={"#EAFEF8"}>
        {projects
          .filter((project) => project.acf.show_in_home)
          .map((project) => (
            <Group justify="center" key={project.id}>
              <div>
                <Title order={3} m={"sm"} ta={"center"}>
                  {project.acf.hero.title}
                </Title>
                <Text m={"sm"} ta={"center"} lineClamp={2}>
                  {project.acf.hero.description}
                </Text>
                <Group justify="center">
                  <Anchor
                    href={project.acf.hero.url}
                    target="_blank"
                    ta={"center"}
                  >
                    Lebih Lanjut
                  </Anchor>
                </Group>
              </div>
              <div
                style={{ position: "relative", width: "100%", height: "500px" }}
              >
                <Image
                  src={project.acf.hero.image || ""}
                  alt={project.acf.hero.title}
                  fill
                  objectFit="cover"
                />
              </div>
            </Group>
          ))}
      </SimpleGrid>

      <Grid gutter={0} m={{base: "sm", md: "md"}}>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Title
            ta={{base: "center", md: "right"}}
            p={{base: 0, md: 50}}
            my={{ base: 20 }}
          >
            {homeSections.popupMapSection.title}
          </Title>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Text p={{ base: "xs", md: 50 }} ta={{base: "center", md:"left"}}>
            {homeSections.popupMapSection.description}
          </Text>
        </Grid.Col>
      </Grid>

      <MapWithPopup facilities={finalMapData} />
      <Section
        title={homeSections.kunjungiKamiSection.title}
        description={homeSections.kunjungiKamiSection.description}
      />
      <Container
        size={"lg"}
        styles={{
          root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "2% 0",
          },
        }}
      >
        <SimpleGrid cols={{ base: 2, sm: 4 }}>
          {strategicPlaces.map((item) => (
            <div key={item.id} style={{ padding: "10px" }}>
              <Title c={"#2763D6"}>{item.acf.time}</Title>
              <Text c={"#2763D6"}>{item.acf.unit_of_time}</Text>
              <Text c={"gray"}>{item.acf.description}</Text>
            </div>
          ))}
        </SimpleGrid>
      </Container>

      <Image
        src={
          isMobile
            ? homeSections.kunjungiKamiSection.mobile_map_image
            : homeSections.kunjungiKamiSection.desktop_map_image
        }
        alt="Clariti Map"
        layout="responsive"
        width={isMobile ? 360 : 1500}
        height={isMobile ? 640 : 768}
        priority
      />

      <Section
        title={homeSections.beritaSection.title}
        description={homeSections.beritaSection.description}
      />
      <CardsCarousel berita={news} />
      <Container
        styles={{
          root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "80px",
          },
        }}
      >
        <RadiusButton
          description="Berita Lainnya"
          link="/berita?category=berita"
        />
      </Container>
    </>
  );
};

export default HomeLayout;
