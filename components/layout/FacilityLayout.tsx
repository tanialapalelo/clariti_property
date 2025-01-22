"use client";

import { Grid, Text, Title } from '@mantine/core'
import Image from 'next/image'
import React from 'react'

const FacilityLayout = () => {
  return (
    
    // <>
    //     <Title
    //         order={1}
    //         style={{
    //             fontWeight: 800,
    //             textAlign: "center",
    //             padding: "100px",
    //             backgroundColor: "#0E1E40",
    //             color: "#FFFFFF",
    //         }}
    //     >
    //         Unlimited Fun Under the Sun
    //     </Title>

    //     <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={0}>
    //         <Paper px={{ base: "xl", sm: "100px" }} py={{ base: "xl" }}>
    //             <Title order={2}>Car-Free Day</Title>
    //             <Text my={'xl'}>SouthCity mengadakan kegiatan Car-Free Day (CFD) di setiap hari Minggu untuk mempromosikan gaya hidup sehat juga menyenangkan tanpa penggunaan kendaraan pribadi, disini pengunjung dapat berolahraga sekaligus memanjakan diri dengan jajanan kaki lima yang lezat serta berbelanja di area boulevard kami. Jika Anda tertarik untuk menyewa lahan pada saat Car-Free Day, silahkan isi form dibawah ini.</Text>
    //             <Image src="/assets/images/book.jpg"
    //                 alt="book"
    //                 radius="md"
    //                 style={{ width: "100%" }} // Makes the image responsive
    //             />
    //             <Button
    //                 radius="xl"
    //                 size="xl"
    //                 style={{
    //                     display: "block",
    //                     marginTop: "2rem",
    //                     marginLeft: "auto", // Center horizontally
    //                     marginRight: "auto", // Center horizontally
    //                 }}
    //             >
    //                 Book Now
    //             </Button>
    //         </Paper>
    //         <div>
    //             <Image src="/assets/images/fasilitas.jpg"
    //                 alt="fasilitas"
    //                 style={{ width: "100%", height: "100%" }} // Makes the image responsive
    //             />
    //         </div>

    //         <div>
    //             <Image src="/assets/images/jogging.jpg"
    //                 alt="fasilitas"
    //                 style={{ width: "100%", height: "100%" }} // Makes the image responsive
    //             />
    //         </div>
    //         <Paper px={{ base: "xl", sm: "100px" }} py={{ base: "xl", sm: "200px" }}>
    //             <Title order={2}>Jogging Track</Title>
    //             <Text my={'xl'}>Kami memiliki jogging trek sepanjang 1.122 m di sekitar SouthCity yang dapat diakses dengan mudah dari dua titik masuk: dekat jembatan SouthCity dan dari sisi jalan utama setelah Galeri Pemasaran. Nikmati pagi Anda sambil menghirup udara segar dengan pemandangan alam dan berlari di sepanjang jogging trek.</Text>
    //         </Paper>

    //         <Paper px={{ base: "xl", sm: "100px" }} py={{ base: "xl", sm: "200px" }}>
    //             <Title order={2}>Rate Kegiatan Kreatif & Acara</Title>
    //             <Text my={'xl'}>Berikut adalah tarif sewa untuk berbagai kebutuhan acara dan aktivitas kreatif seperti pengambilan video dan fotografi profesional. Kami berkomitmen menyediakan layanan terbaik untuk mendukung kesuksesan acara dan kegiatan Anda.</Text>
    //             <Button
    //                 radius="xl"
    //                 size="xl"
    //                 style={{
    //                     display: "block",
    //                     marginTop: "2rem",
    //                     marginLeft: "auto", // Center horizontally
    //                     marginRight: "auto", // Center horizontally
    //                 }}
    //             >
    //                 Book Now
    //             </Button>
    //         </Paper>
    //         <div>
    //             <Image src="/assets/images/jogging.jpg"
    //                 alt="fasilitas"
    //                 style={{ width: "100%", height: "100%" }} // Makes the image responsive
    //             />
    //         </div>

    //         <div>
    //             <Image src="/assets/images/parkir.jpg"
    //                 alt="fasilitas"
    //                 style={{ width: "100%", height: "100%" }} // Makes the image responsive
    //             />
    //         </div>
    //         <Paper px={{ base: "xl", sm: "100px" }} py={{ base: "xl" }}>
    //             <Title order={2}>Rate Parkir Khusus Event</Title>
    //             <Text my={'xl'}>Berikut adalah tarif sewa untuk berbagai kebutuhan acara dan aktivitas kreatif seperti pengambilan video dan fotografi profesional. Kami berkomitmen menyediakan layanan terbaik untuk mendukung kesuksesan acara dan kegiatan Anda.</Text>
    //             <Image src="/assets/images/book.jpg"
    //                 alt="book"
    //                 radius="md"
    //                 style={{ width: "100%" }} // Makes the image responsive
    //             />
    //             <Button
    //                 radius="xl"
    //                 size="xl"
    //                 style={{
    //                     display: "block",
    //                     marginTop: "2rem",
    //                     marginLeft: "auto", // Center horizontally
    //                     marginRight: "auto", // Center horizontally
    //                 }}
    //             >
    //                 Book Now
    //             </Button>
    //         </Paper>

    //         <Paper px={{ base: "xl", sm: "100px" }} py={{ base: "xl", sm: "200px" }}>
    //             <Title order={2}>Outdoor Gym</Title>
    //             <Text my={'xl'}>Segera hadir: SouthCity dengan bangga akan memiliki fasilitas outdoor gym yang baru. Dengan berbagai macam pilihan peralatan olahraga untuk mendukung exercise dan memudahkan Anda untuk menerapkan gaya hidup yang sehat di SouthCity.</Text>
    //         </Paper>
    //         <div>
    //             <Image src="/assets/images/jogging.jpg"
    //                 alt="fasilitas"
    //                 style={{ width: "100%", height: "100%" }} // Makes the image responsive
    //             />
    //         </div>

    //     </SimpleGrid>
    // </>
    <>
    
    <Grid gutter={0}>
      <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
        <Title order={3} m={"xl"}>
          tes
        </Title>
        <Text m={"xl"}>tes</Text>
        <Title order={3} m={"xl"}>
          tes
        </Title>
        <Text m={"xl"}>tes</Text>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
        <div style={{ position: "relative", width: "100%", height: "500px" }}>
          <Image
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
            alt="tes"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Grid.Col>
    </Grid>
    
    <Grid gutter={0}>
      <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
        <Title order={3} m={"xl"}>
          tes
        </Title>
        <Text m={"xl"}>tes</Text>
        <Title order={3} m={"xl"}>
          tes
        </Title>
        <Text m={"xl"}>tes</Text>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
        <div style={{ position: "relative", width: "100%", height: "500px" }}>
          <Image
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
            alt="tes"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Grid.Col>
    </Grid>
    </>
  )
}

export default FacilityLayout