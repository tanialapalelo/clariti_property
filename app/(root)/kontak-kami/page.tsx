import Kontak from "@/components/forms/Kontak";
import TransportationInfo from "@/components/TransportationInfo";
import { Container, Title } from "@mantine/core";
import Image from "next/image";

export const metadata = {
  title: 'Hubungi Kami - Clariti',
  description: 'Halaman Kontak Kami',
}
const KontakKami = () => {

  return (
    <>
      <Title
        order={1}
        style={{
          fontWeight: 800,
          textAlign: "center",
          margin: "2.5rem 0",
        }}
      >
        We Are Here To Help
      </Title>
      <Container fluid p="xl" style={{ backgroundColor: "#0E1E40" }}>
        <div>
          <Title
            style={{
              textAlign: "center",
              color: "white",
              marginBottom: "1rem",
            }}
            order={2}
          >
            Kirim Pesan
          </Title>
          <p style={{ color: "white", textAlign: "center", marginBottom: "2rem" }}>
            Kami selalu ada untuk Anda setiap hari. Jangan ragu untuk mengirim pesan melalui formulir di bawah ini.
          </p>
        </div>
        <Kontak/>
      </Container>

      {/* <Container py={"xl"}>
        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title my={"sm"}>SouthCity Masterplan</Title>
            <Text>SouthCity merupakan kawasan 57 hektar yang disiapkan untuk pengembangan proyek hunian, pusat komersial, dan perhotelan yang akan hadir di masa mendatang. Terletak di lokasi yang strategis di Jakarta Selatan, Cinere dan Pondok Cabe serta memiliki kemudahan akses menuju tol Depok-Antasari (gerbang tol Limo), tol Cinere-Jagorawi (gerbang tol Pamulang), dan tol Antasari-Brigif (gerbang tol Brigif). Selain itu berbagai pilihan transportasi umum juga tersedia di dalam kawasan SouthCity dengan dibangunnya halte TransJakarta serta adanya MRT di Lebak Bulus dan Fatmawati.</Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title my={"sm"}>Marketing Galery</Title>
            <SimpleGrid cols={2}>
              <div>
                <IconMapPinFilled size={22} />
                <Text>Jl. Raya SouthCity Utara, Lot 5 No. 12, Pondok Cabe, Tangerang Selatan, Banten 15418, Indonesia</Text>
                <Link href="https://maps.app.goo.gl/cQ5d73izkWdnabXD6?g_st=ic">Open in Google Maps</Link>
              </div>

              <div>
                <TextWithIcon icon={<IconBrandWhatsapp size={22} />} label="+62 818 0621 8999" />
                <TextWithIcon icon={<IconPhoneFilled size={22} />} label="+62 21 749 8999" />
                <TextWithIcon icon={<IconMail size={22} />} label="info@southcity.co.id" />
                <TextWithIcon icon={<IconMail size={22} />} label="recruitment@southcity.co.id" />

              </div>

            </SimpleGrid>

          </Grid.Col>
        </Grid>
      </Container> */}

      <Image src="/assets/images/dekstop-map.gif"
        alt="map"
        width={1200}
        height={600}
        layout="responsive"
        unoptimized
      />
      <TransportationInfo/>
    </>
  );
};

export default KontakKami;
