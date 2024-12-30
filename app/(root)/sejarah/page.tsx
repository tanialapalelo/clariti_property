// "use client"

import Section from '@/components/Section'
import Superheroes from '@/components/SuperHeroes'
import { AspectRatio, Paper, SimpleGrid, Text, Title } from '@mantine/core'
import Image from 'next/image'


async function getAboutPageData() {
    const res = await fetch(`${process.env.WORDPRESS_URL}/pages?acf_format=standard&_field=id,slug,title,acf&slug=sejarah`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    
    if (!res) {
        return {
            notFound: true,
        }
    }
    
    if (!res.ok) throw new Error('Failed to fetch about page data');
    return res.json();
  }

const Sejarah = async () => {    
    const data = await getAboutPageData();
    console.log("data", data[0].acf);
    console.log("image tania", data[0].acf.hero.image.link);

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
                {data[0].acf.title}
            </Title>

            {/* <Grid gutter={0}>
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
            </Grid> */}

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={0}>
                <div>
                    <AspectRatio ratio={1920 / 1920}>
                        <Image src={"http://127.0.0.1/wordpress-tes/wp-content/uploads/2024/12/do-big-do-right.jpg"}
                            alt={data[0].acf.hero.image.alt}
                            width={300} height={300}
                        />
                        
                    </AspectRatio>
                </div>
                <Paper px={{ base: "xl", sm: "100px" }} py={{ base: "xl" }}>
                    <Title order={2}>{data[0].acf.hero.title}</Title>
                    <Text my={'xl'}>{data[0].acf.hero.description}</Text>
                </Paper>

            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={0}>
                
                <div>
                <AspectRatio ratio={1920 / 1920}>
                    <Image src="/assets/images/parkir.jpg"
                        alt="fasilitas"
                        width={300} height={300}
                    />
                    </AspectRatio>
                </div>
                <Paper px={{ base: "xl", sm: "100px" }} py={{ base: "xl" }}>
                    <Title order={2}>Rate Parkir Khusus Event</Title>
                    <Text my={'xl'}>Berikut adalah tarif sewa untuk berbagai kebutuhan acara dan aktivitas kreatif seperti pengambilan video dan fotografi profesional. Kami berkomitmen menyediakan layanan terbaik untuk mendukung kesuksesan acara dan kegiatan Anda.</Text>
                    <Image src="/assets/images/book.jpg"
                        alt="book"
                        width={300} height={300}
                    />
                </Paper>

                <Paper px={{ base: "xl", sm: "100px" }} py={{ base: "xl", sm: "200px" }}>
                    <Title order={2}>Outdoor Gym</Title>
                    <Text my={'xl'}>Segera hadir: SouthCity dengan bangga akan memiliki fasilitas outdoor gym yang baru. Dengan berbagai macam pilihan peralatan olahraga untuk mendukung exercise dan memudahkan Anda untuk menerapkan gaya hidup yang sehat di SouthCity.</Text>
                </Paper>
                <div>
                    <Image src="/assets/images/jogging.jpg"
                        alt="fasilitas"
                        width={300} height={300}
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

        // <div>
        //     <p>tes</p>
        // </div>
    )
}

export default Sejarah