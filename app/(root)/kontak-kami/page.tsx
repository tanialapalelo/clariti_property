"use client";

import { Button, Container, Group, Select, Textarea, TextInput, Title } from "@mantine/core";
import { motion } from "framer-motion";
import { useForm } from "@mantine/form";

const ContactForm = () => {
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
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      mobile: (value) => (/^\d+$/.test(value) ? null : "Invalid mobile number"),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("Form Submitted:", values);
  };

  return (
    <Container size="lg" py="xl" style={{ backgroundColor: "#0E1E40", borderRadius: "8px" }}>
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title
          align="center"
          order={2}
          style={{ color: "white", marginBottom: "1rem", fontWeight: 700 }}
        >
          Kirim Pesan
        </Title>
        <p style={{ color: "white", textAlign: "center", marginBottom: "2rem" }}>
          Kami selalu ada untuk Anda setiap hari. Jangan ragu untuk mengirim pesan melalui formulir di bawah ini.
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <Group grow mb="md">
          <TextInput
            placeholder="Masukkan nama"
            label="Nama"
            {...form.getInputProps("name")}
          />
          <Select
            label="Subjek"
            placeholder="Pilih subjek"
            data={["Umum", "Permintaan", "Lainnya"]}
            {...form.getInputProps("subject")}
          />
        </Group>

        <Group grow mb="md">
          <TextInput
            placeholder="Masukkan email"
            label="Email"
            {...form.getInputProps("email")}
          />
          <TextInput
            placeholder="Masukkan nomor telepon"
            label="Mobile"
            {...form.getInputProps("mobile")}
          />
        </Group>

        <TextInput
          placeholder="Pilih kota"
          label="Kota"
          mb="md"
          {...form.getInputProps("city")}
        />

        <Textarea
          placeholder="Tuliskan pesan"
          label="Pesan"
          minRows={4}
          mb="md"
          {...form.getInputProps("message")}
        />

        {/* reCAPTCHA Placeholder */}
        <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
          <div style={{ background: "#fff", padding: "1rem", borderRadius: "6px", marginBottom: "1rem" }}>
            reCAPTCHA Placeholder
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Button type="submit" fullWidth color="blue" radius="xl" size="md" style={{ fontWeight: 600 }}>
            SUBMIT
          </Button>
        </motion.div>
      </motion.form>
    </Container>
  );
};

export default ContactForm;
