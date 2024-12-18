"use client";

import { Button, Container, Group, Select, Textarea, TextInput, Title } from "@mantine/core";
import { motion } from "framer-motion";
import { useForm } from "@mantine/form";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {

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
      {/* <Title mx="auto" display="fixed">We Are Here To Help</Title> */}
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
        {/* Section Title */}
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
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Button type="submit" fullWidth color="blue" radius="xl" size="md" style={{ fontWeight: 600 }}>
              SUBMIT
            </Button>
          </motion.div>
        </form>
      </Container>
    </>
  );
};

export default ContactForm;
