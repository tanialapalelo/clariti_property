"use client";

import { Button, Container, Grid, Group, Select, SimpleGrid, Text, Textarea, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";
import { IconBrandWhatsapp, IconMail, IconMapPinFilled, IconPhoneFilled } from "@tabler/icons-react";
import Link from "next/link";
import TextWithIcon from "@/components/ui/TextWithIcon";
import TransportationInfo from "@/components/TransportationInfo";

const KontakKami = () => {

  const recaptchaRef = useRef<ReCAPTCHA>(null); // Reference for reCAPTCHA

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      city: "",
      subject: "",
      message: "",
    },
    validate: {
      name: (value) => (value.length === 0 ? "Invalid name" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      mobile: (value) => (/^\d+$/.test(value) ? null : "Invalid mobile number"),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    // Get reCAPTCHA token
    const token = await recaptchaRef.current?.executeAsync();
    recaptchaRef.current?.reset();

    // Send form data and token to API route
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, token }),
    });

    const result = await response.json();
    console.log(result);
  };


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

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group grow mb="md">
            <TextInput
              placeholder="Masukkan nama"
              label="Nama"
              styles={{ label: { color: "white" } }}
              {...form.getInputProps("name")}
            />
            <Select
              label="Subjek"
              placeholder="Pilih subjek"
              styles={{ label: { color: "white" } }}
              data={["Umum", "Permintaan", "Lainnya"]}
              {...form.getInputProps("subject")}
            />
          </Group>

          <Group grow mb="md">
            <TextInput
              placeholder="Masukkan email"
              label="Email"
              styles={{ label: { color: "white" } }}
              {...form.getInputProps("email")}
            />
            <TextInput
              placeholder="Masukkan nomor telepon"
              label="Mobile"
              styles={{ label: { color: "white" } }}
              {...form.getInputProps("mobile")}
            />
          </Group>

          <TextInput
            placeholder="Pilih kota"
            label="Kota"
            mb="md"
            styles={{ label: { color: "white" } }}
            {...form.getInputProps("city")}
          />

          <Textarea
            placeholder="Tuliskan pesan"
            label="Pesan"
            minRows={4}
            mb="md"
            styles={{ label: { color: "white" } }}
            {...form.getInputProps("message")}
          />

          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
            ref={recaptchaRef}
          />
          {/* Submit Button */}
          {/* <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}> */}
            <Button type="submit" fullWidth color="blue" radius="xl" size="md" style={{ fontWeight: 600 }}>
              SUBMIT
            </Button>
          {/* </motion.div> */}
        </form>
      </Container>

      <Container py={"xl"}>
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
      </Container>

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
