"use client";

import { CardsCarousel } from "@/components/CardsCarousel";
import { Hero } from "@/components/Hero";
import MapWithPopup from "@/components/MapWithPopup";
import Section from "@/components/Section";
import RadiusButton from "@/components/ui/RadiusButton";
import { mockPosts, strategyPlaces } from "@/constants";
import {
  Anchor,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapProps } from "@/lib/shared.types";

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



export default function Home() {

  const finalMapData = tempMapData;

  return (
    <>
      <Hero />

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
                src="/assets/images/peony.jpg"
                alt="tes"
                layout="fill"
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
              Beautiful Spaces Created With Passion
            </Title>
            <Text m={"xl"} style={{ color: "#FFFFFF" }}>
              Dengan pengalaman bertahun-tahun mengembangkan properti, tim
              SouthCity berkomitmen untuk membangun kawasan ini secara positif
              bagi komunitas bersama. Kami berjanji untuk selalu memberikan yang
              terbaik dalam mengembangkan 57 hektar kawasan superblok SouthCity.
              Selama bertahun-tahun, para pemegang saham SouthCity juga telah
              terlibat dalam berbagai proyek prestisius di Jakarta, seperti di
              antaranya adalah Pacific Place Jakarta, Equity Tower, SCBD Suites
              dan Visenda Residence.
            </Text>
          </Grid.Col>
        </Grid>
      </motion.div>

      <Section
        title="Perfecting Your Urban Lifestyle"
        description="SouthCity merupakan tempat bagi Anda untuk bekerja, bertempat tinggal, serta bersenang-senang. SouthCity bertujuan untuk memenuhi berbagai kebutuhan masyarakat modern dengan menawarkan kawasan yang terintegrasi dengan perumahan, apartemen, dan pusat rekreasi."
      />
      <Container
        styles={{
          root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          },
        }}
      >
        <RadiusButton description="Explore with 360" link=""/>
      </Container>

      <SimpleGrid cols={{base: 1, md: 2}} spacing={0}>
        
      <Group justify="center">
          <Title order={3} m={"sm"} ta={"center"}>
            Beautiful Spaces Created With Passion
          </Title>
          <Text m={"sm"} ta={"center"}>
            Dengan pengalaman bertahun-tahun mengembangkan properti, tim
            SouthCity berkomitmen untuk membangun kawasan ini secara positif
            bagi komunitas bersama. Kami berjanji untuk selalu memberikan yang
            terbaik dalam mengembangkan 57 hektar kawasan superblok SouthCity.
          </Text>
          <Anchor href="#">Lebih Lanjut</Anchor>
          <div 
            style={{ 
                position: "relative", 
                width: "100%",
                aspectRatio: "1/1", // Responsive aspect ratio
                maxHeight: "150vh", // Ensures it doesn't take too much space on large screens
                marginTop: "-40%", // Adjust for overlapping effect
             }}
          >
            <Image
              src="/assets/images/Fortunia-Residence-2-80-1.webp"
              alt="tes"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Group>
        <Group justify="center">
          <Title order={3} m={"sm"} ta={"center"}>
            Beautiful Spaces Created With Passion
          </Title>
          <Text m={"sm"} ta={"center"}>
            Dengan pengalaman bertahun-tahun mengembangkan properti, tim
            SouthCity berkomitmen untuk membangun kawasan ini secara positif
            bagi komunitas bersama. Kami berjanji untuk selalu memberikan yang
            terbaik dalam mengembangkan 57 hektar kawasan superblok SouthCity.
          </Text>
          <Anchor href="#">Lebih Lanjut</Anchor>
          <div 
            style={{ 
                position: "relative", 
                width: "100%",
                aspectRatio: "1/1", // Responsive aspect ratio
                maxHeight: "150vh", // Ensures it doesn't take too much space on large screens
                marginTop: "-40%", // Adjust for overlapping effect
             }}
          >
            <Image
              src="/assets/images/Fortunia-Residence-2-80-1.webp"
              alt="tes"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Group>
      </SimpleGrid>

      {/* ini yang buat berantakan layout mobile */}

      
      <SimpleGrid cols={{base: 1, md: 2}}>
        <div>
          
        <Title ta={{base: "center", md: "center"}} m={{base: "sm", md: "55px"}}>
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
        title="Come Find Us We'll Make It a Date"
        description="SouthCity memiliki lokasi strategis yang berbatasan dengan tiga daerah perkotaan besar: Jakarta Selatan, Cinere dan Pondok Cabe. Kawasan yang memberikan kemudahan akses menuju tol Depok-Antasari (gerbang tol Brigif), tol Cinere-Jagorawi (gerbang tol Limo), dan tol Serpong-Cinere (gerbang tol Pamulang). Berbagai pilihan transportasi lainnya juga tersedia dengan adanya halte TransJakarta dengan jalur SouthCity-Kuningan, serta stasiun MRT Lebak Bulus dan Fatmawati. SouthCity hanya berjarak 5 menit saja dari Sekolah Harapan Bangsa (SHB), 10 menit dari Mal Cinere dan Mal Bellevue, 15 menit dari Mal Pondok Indah, serta 20 menit dari Universitas Indonesia."
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
            <div key={item.description} style={{padding: "10px"}}>
              <Title c={"#2763D6"}>{item.time}</Title>
              <Text c={"#2763D6"}>{item.unitOfTime}</Text>
              <Text c={"gray"}>{item.description}</Text>
            </div>
          ))}
        </SimpleGrid>
      </Container>
      <Image
        src="/assets/images/dekstop-map.gif"
        alt="map"
        width={1200}
        height={600}
        layout="responsive"
      />
      <Section
        title="Miss Us Already? Don't Worry"
        description="Kami akan selalu memberikan berita, kabar terbaru, acara, serta promosi dan informasi menarik lainnya kepada Anda. Cari tahu lebih lanjut mengenai aktivitas kami lainnya."
      />
      <CardsCarousel berita={mockPosts} />
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
        <RadiusButton description="Berita Lainnya" link="/berita?category=berita"/>
      </Container>
    </>
  );
}
