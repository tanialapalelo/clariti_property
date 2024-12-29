"use client"

import Section from '@/components/Section'
import Superheroes from '@/components/SuperHeroes'
import { AspectRatio, Button, Grid, Paper, SimpleGrid, Text, Title } from '@mantine/core'
import Image from 'next/image'

const Sejarah = () => {
    const superHeroes = [
        {
            name: 'Hambali Hazali',
            title: 'President Director',
            image: '/assets/images/hambali-hazali.jpg'
        },
        {
            name: 'Peony Tang',
            title: 'Chief Executive Officer',
            image: '/assets/images/peony.jpg'
        },
        {
            name: 'Alberto Prabowo Sutejo',
            title: 'Sales & Marketing General Manager',
            image: '/assets/images/alberto.jpg'
        },
        {
            name: 'Sofini Periatna',
            title: 'Associate Director of Finance, Accounting & Tax',
            image: '/assets/images/sofini-periatna.jpg'
        },
    ];

    return (
        <>
            <Title
                order={1}
                style={{
                    fontWeight: 800,
                    textAlign: "center",
                    padding: "100px",
                    backgroundColor: "#f0f4ff",
                    color: "#000000",
                }}
            >
                Improving Life for the Next Generation
            </Title>

            <Grid gutter={0}>
                <Grid.Col span={{ base: 12, sm: 8 }} bg={"#0E1E40"}>
                    <div style={{ color: "#ffffff" }}>
                        <Title
                            order={1}
                            ta={"center"}
                            my={'xl'}
                        >
                            Do It Big and Do It Right
                        </Title>
                        <Text
                            ta={"center"}
                            m={'xl'}
                        >SouthCity berkomitmen untuk mengembangkan kawasan ini secara positif bagi komunitas bersama. Kami berjanji selalu memberikan yang terbaik dalam mengembangkan kawasan seluas 57 hektar di superblok SouthCity. Selama bertahun-tahun, para pemegang saham SouthCity juga telah terlibat dalam berbagai proyek prestisius di Jakarta, seperti di antaranya adalah Pacific Place Jakarta, Equity Tower, SCBD Suites dan Visenda Residence.</Text>
                    </div>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                    <AspectRatio ratio={1920 / 1920}>
                        <Image src="/assets/images/career.jpg"
                            alt="map"
                            width={500}
                            height={300}
                        />
                    </AspectRatio>
                </Grid.Col>
            </Grid>


            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={0}>
                
                <div>
                <AspectRatio ratio={1920 / 1920}>
                    <Image src="/assets/images/parkir.jpg"
                        alt="fasilitas"
                        width={300} height={300} layout='responsive'
                    />
                    </AspectRatio>
                </div>
                <Paper px={{ base: "xl", sm: "100px" }} py={{ base: "xl" }}>
                    <Title order={2}>Rate Parkir Khusus Event</Title>
                    <Text my={'xl'}>Berikut adalah tarif sewa untuk berbagai kebutuhan acara dan aktivitas kreatif seperti pengambilan video dan fotografi profesional. Kami berkomitmen menyediakan layanan terbaik untuk mendukung kesuksesan acara dan kegiatan Anda.</Text>
                    <Image src="/assets/images/book.jpg"
                        alt="book"
                        width={300} height={300} layout='responsive'
                    />
                </Paper>

                <Paper px={{ base: "xl", sm: "100px" }} py={{ base: "xl", sm: "200px" }}>
                    <Title order={2}>Outdoor Gym</Title>
                    <Text my={'xl'}>Segera hadir: SouthCity dengan bangga akan memiliki fasilitas outdoor gym yang baru. Dengan berbagai macam pilihan peralatan olahraga untuk mendukung exercise dan memudahkan Anda untuk menerapkan gaya hidup yang sehat di SouthCity.</Text>
                </Paper>
                <div>
                    <Image src="/assets/images/jogging.jpg"
                        alt="fasilitas"
                        width={300} height={300} layout='responsive'
                    />
                </div>

            </SimpleGrid>


            <Section
                title="Meet Our Superheroes"
                description="Tim manajemen SouthCity adalah bagian terpenting yang memimpin perusahaan untuk dapat terus berkembang dan merealisasikan tujuan kami. SouthCity tidak akan terwujud tanpa adanya tim kami."
            />


            <SimpleGrid cols={{ base: 1, sm: 4 }} spacing={'xs'} mb={'xl'}>
                {superHeroes.map(hero => {
                    return <Superheroes key={hero.name} name={hero.name} title={hero.title} image={hero.image} />
                })}
            </SimpleGrid>
        </>
    )
}

export default Sejarah