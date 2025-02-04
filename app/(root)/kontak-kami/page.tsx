import Kontak from "@/components/forms/Kontak";
import TransportationInfo from "@/components/TransportationInfo";
import VisitUs from "@/components/VisitUs";
import { Transportation, WordPressTransportation } from "@/lib/shared.types";
import { Container, Title } from "@mantine/core";
import Image from "next/image";

export const metadata = {
  title: "Hubungi Kami - Clariti",
  description: "Halaman Kontak Kami",
};

interface MarketingGallery {
  title: string;
  description: string;
  address: string;
  address_map: string;
  whatsapp_number: string;
  phone_number: string;
  email: string;
};

interface ContactUsProps {
  mainTitle: string;
  mapImage: string;
  transportations: Transportation[];
}

async function fetchMarketingGallery(): Promise<MarketingGallery> {
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/visit_us_detail?slug=marketing-gallery`
  );
  const data = await res.json();
  const content = data[0].acf;

  return {
    title: data[0].title.rendered,
    address: content.address,
    address_map: content.address_map,
    whatsapp_number: content.whatsapp_number,
    phone_number: content.phone_number,
    email: content.email,
    description: content.description,
  };
}

async function fetchTransportation(): Promise<Transportation[]> {
  const res = await fetch(`${process.env.WORDPRESS_URL}/transportation?_embed`);
  const data: WordPressTransportation[] = await res.json();

  return data.map((transport) => ({
    title: transport.title.rendered,
    content: transport.content.rendered,
  }));
}

async function fetchContactUsData(): Promise<
  Omit<ContactUsProps, "transportations">
> {
  const res = await fetch(
    `${process.env.WORDPRESS_URL}/pages?slug=contact-us&acf_format=standard`,
    {
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  const content = data[0].acf;
  return {
    mainTitle: content.main_title,
    mapImage: content.map_image.url,
  };
}

const KontakKami = async () => {
  const contactUsPromise = fetchContactUsData();
  const transportationPromise = fetchTransportation();
  const marketingPromise = fetchMarketingGallery();

  const [contactUsData, transportations, marketingGallery] = await Promise.all([
    contactUsPromise,
    transportationPromise,
    marketingPromise,
  ]);

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
        {contactUsData.mainTitle}
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
          <p
            style={{
              color: "white",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Kami selalu ada untuk Anda setiap hari. Jangan ragu untuk mengirim
            pesan melalui formulir di bawah ini.
          </p>
        </div>
        <Kontak />
      </Container>

      <VisitUs data={marketingGallery} />

      <Image
        src={contactUsData.mapImage}
        alt="map"
        width={1200}
        height={600}
        layout="responsive"
      />
      <TransportationInfo data={transportations} />
    </>
  );
};

export default KontakKami;
