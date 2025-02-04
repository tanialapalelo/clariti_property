"use client";

import { CardsCarousel } from "@/components/CardsCarousel";
import { Hero } from "@/components/Hero";
import MapWithPopup from "@/components/MapWithPopup";
import Section from "@/components/Section";
import RadiusButton from "@/components/ui/RadiusButton";
import { strategyPlaces } from "@/constants";
import {
  Article,
  HomeHeroSection,
  HomeSectionProps,
  MapProps,
  WordpressProject,
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
  projects: WordpressProject[];
}

const HomeLayout = ({
  homeSections,
  news,
  heroSections,
  projects,
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
      <Group justify="center" mb={"lg"}>
        <RadiusButton description="Explore with 360" link="" />
      </Group>
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
                    href="https://mantine.dev/"
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

      {/* ini yang buat berantakan layout mobile */}
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <div>
          <Title
            ta={{ base: "center", md: "center" }}
            m={{ base: "sm", md: "55px" }}
          >
            SouthCity Masterplan
          </Title>
        </div>
        <div>
          <Text m={"lg"}>
            SouthCity merupakan kawasan 57 hektar yang disiapkan untuk
            pengembangan proyek hunian, pusat komersial, dan perhotelan yang
            akan hadir di masa mendatang. Terletak di lokasi yang strategis di
            Jakarta Selatan, Cinere dan Pondok Cabe serta memiliki kemudahan
            akses menuju tol Depok-Antasari (gerbang tol Limo), tol
            Cinere-Jagorawi (gerbang tol Pamulang), dan tol Antasari-Brigif
            (gerbang tol Brigif). Selain itu berbagai pilihan transportasi umum
            juga tersedia di dalam kawasan SouthCity dengan dibangunnya halte
            TransJakarta serta adanya MRT di Lebak Bulus dan Fatmawati.
          </Text>
        </div>
      </SimpleGrid>

      {/* <Grid>
        <Grid.Col span={{base: 12, md: 4}}>
          <Title ta={"right"}>
            SouthCity Masterplan
          </Title>
        </Grid.Col>
        <Grid.Col span={{base: 12, md: "auto"}}>
          <Text>
            SouthCity merupakan kawasan 57 hektar yang disiapkan untuk
            pengembangan proyek hunian, pusat komersial, dan perhotelan yang
            akan hadir di masa mendatang. Terletak di lokasi yang strategis di
            Jakarta Selatan, Cinere dan Pondok Cabe serta memiliki kemudahan
            akses menuju tol Depok-Antasari (gerbang tol Limo), tol
            Cinere-Jagorawi (gerbang tol Pamulang), dan tol Antasari-Brigif
            (gerbang tol Brigif). Selain itu berbagai pilihan transportasi umum
            juga tersedia di dalam kawasan SouthCity dengan dibangunnya halte
            TransJakarta serta adanya MRT di Lebak Bulus dan Fatmawati.
          </Text>
        </Grid.Col>
      </Grid> */}
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
          {strategyPlaces.map((item) => (
            <div key={item.description} style={{ padding: "10px" }}>
              <Title c={"#2763D6"}>{item.time}</Title>
              <Text c={"#2763D6"}>{item.unitOfTime}</Text>
              <Text c={"gray"}>{item.description}</Text>
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

      {/* <Image
        src="/assets/images/dekstop-map.gif"
        alt="map"
        width={1200}
        height={600}
        layout="responsive"
      /> */}
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
