"use client"

import { CardsCarousel } from "@/components/CardsCarousel";
import { Hero } from "@/components/Hero";
import HoverableIconsWithPopup from "@/components/HoverableIconsWithPopup";
import Section from "@/components/Section";
import RadiusButton from "@/components/ui/RadiusButton";
import { strategyPlaces } from "@/constants";
import { Container, Grid, SimpleGrid, Text, Title } from "@mantine/core";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <Section title="Perfecting Your Urban Lifestyle" description="SouthCity merupakan tempat bagi Anda untuk bekerja, bertempat tinggal, serta bersenang-senang. SouthCity bertujuan untuk memenuhi berbagai kebutuhan masyarakat modern dengan menawarkan kawasan yang terintegrasi dengan perumahan, apartemen, dan pusat rekreasi." />
      <Container
        styles={{
          root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          },
        }}>
        <RadiusButton description="Explore with 360" />
      </Container>
      <Grid justify="center">
        <Grid.Col span={{ base: 12, md: 2 }}>
          <Title textWrap="wrap" m={"sm"}>SouthCity Masterplan</Title></Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Text m={"lg"}>SouthCity merupakan kawasan 57 hektar yang disiapkan untuk pengembangan proyek hunian, pusat komersial, dan perhotelan yang akan hadir di masa mendatang. Terletak di lokasi yang strategis di Jakarta Selatan, Cinere dan Pondok Cabe serta memiliki kemudahan akses menuju tol Depok-Antasari (gerbang tol Limo), tol Cinere-Jagorawi (gerbang tol Pamulang), dan tol Antasari-Brigif (gerbang tol Brigif). Selain itu berbagai pilihan transportasi umum juga tersedia di dalam kawasan SouthCity dengan dibangunnya halte TransJakarta serta adanya MRT di Lebak Bulus dan Fatmawati.</Text>
        </Grid.Col>
      </Grid>
      <HoverableIconsWithPopup/>
      <Section title="Come Find Us We'll Make It a Date" description="SouthCity memiliki lokasi strategis yang berbatasan dengan tiga daerah perkotaan besar: Jakarta Selatan, Cinere dan Pondok Cabe. Kawasan yang memberikan kemudahan akses menuju tol Depok-Antasari (gerbang tol Brigif), tol Cinere-Jagorawi (gerbang tol Limo), dan tol Serpong-Cinere (gerbang tol Pamulang). Berbagai pilihan transportasi lainnya juga tersedia dengan adanya halte TransJakarta dengan jalur SouthCity-Kuningan, serta stasiun MRT Lebak Bulus dan Fatmawati. SouthCity hanya berjarak 5 menit saja dari Sekolah Harapan Bangsa (SHB), 10 menit dari Mal Cinere dan Mal Bellevue, 15 menit dari Mal Pondok Indah, serta 20 menit dari Universitas Indonesia." />
      <Container size={"lg"}
        styles={{
          root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: "2% 0"
          },
        }}>
        <SimpleGrid cols={{ base: 2, sm: 4 }}>

          {strategyPlaces.map((item) => (
            <div key={item.description}>
              <Title styles={{ root: { color: "blue" } }}>{item.time}</Title>
              <Text styles={{ root: { color: "blue" } }}>{item.unitOfTime}</Text>
              <Text styles={{ root: { color: "gray" } }}>{item.description}</Text>
            </div>
          ))}

        </SimpleGrid>
      </Container>
      <Image src="/assets/images/dekstop-map.gif"
        alt="map"
        width={1200}
        height={600}
        layout="responsive"
        />
      <Section title="Miss Us Already? Don't Worry" description="Kami akan selalu memberikan berita, kabar terbaru, acara, serta promosi dan informasi menarik lainnya kepada Anda. Cari tahu lebih lanjut mengenai aktivitas kami lainnya." />
      <CardsCarousel />
      <Container
        styles={{
          root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '80px',
          },
        }}>
        <RadiusButton description="Berita Lainnya" />
      </Container>
    </div>
  );
}
