"use client";

import { Button, Select, Textarea, TextInput, SimpleGrid, Group, Notification } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface Province {
  id: string;
  name: string;
}

const Kontak = () => {
  const [cities, setCities] = useState<string[]>([]);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; color: string } | null>(null); // ✅ State for Notification

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cityApiUrl = process.env.NEXT_PUBLIC_CITY_API;
        if (!cityApiUrl) throw new Error("CITY_API URL is not defined.");

        const res = await fetch(cityApiUrl);
        const data = await res.json();
        const cityNames = data.map((city: Province) => city.name);
        setCities(cityNames);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
  }, []);

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
    if (!recaptchaToken) {
      setNotification({ message: "Please complete the reCAPTCHA.", color: "red" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Submission failed");

      setNotification({ message: "Your message has been sent successfully.", color: "teal" });

      form.reset();
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error("Failed to send message", error);
      setNotification({ message: "Failed to send your message. Please try again.", color: "red" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {notification && (
        <Notification icon={notification.color === "teal" ? <IconCheck size={20} /> : <IconX size={20} />} color={notification.color} onClose={() => setNotification(null)}>
          {notification.message}
        </Notification>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <TextInput c={"white"} placeholder="Masukkan nama" label="Nama" required {...form.getInputProps("name")} />
          <Select c={"white"} label="Subjek" placeholder="Pilih subjek" data={["Umum", "Permintaan", "Lainnya"]} required {...form.getInputProps("subject")} />

          <TextInput c={"white"} placeholder="Masukkan email" label="Email" required {...form.getInputProps("email")} />
          <TextInput c={"white"} placeholder="Masukkan nomor telepon" label="Mobile" required {...form.getInputProps("mobile")} />

          <div>
            <Select c={"white"} label="Kota" placeholder="Pilih kota" data={cities} searchable required {...form.getInputProps("city")} />

            {!isMobile && <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string} onChange={(token) => setRecaptchaToken(token)} style={{marginTop: "20px"}}/>}
          </div>

          <Textarea c={"white"} placeholder="Tuliskan pesan" label="Pesan" autosize minRows={5} required {...form.getInputProps("message")} />

          {isMobile && <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string} onChange={(token) => setRecaptchaToken(token)} />}
        </SimpleGrid>

        <Group justify="center" mt="md">
          <Button type="submit" color="blue" radius="xl" loading={loading}>
            {loading ? "Submitting..." : "SUBMIT"}
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default Kontak;
