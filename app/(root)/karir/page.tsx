"use client"

import SuperHeroes from '@/components/SuperHeroes'
import Section from '@/components/Section'
import { AspectRatio, Container, Grid, SimpleGrid, Text, Title } from '@mantine/core'
import Image from 'next/image'
import React from 'react'

const Karir = () => {
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
            <Grid gutter={0}>
                <Grid.Col span={{ base: 12, sm: 8 }}>
                    <Title
                        order={1}
                        style={{
                            fontWeight: 800,
                            textAlign: "center",
                            padding: "100px",
                            backgroundColor: "#0E1E40",
                            color: "#FFFFFF",
                        }}
                    >
                        Great Teamwork Makes the Dream Work
                    </Title>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                    <AspectRatio ratio={1920 / 1920}>
                        <Image src="/assets/images/career.jpg"
                            alt="map"
                            width={500}
                            height={245}
                        // layout="responsive"
                        />
                    </AspectRatio>
                </Grid.Col>
            </Grid>

            <Grid justify="center" my={'xl'} p={'xl'}>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Title m={"sm"} w={250} mx={"auto"} order={2}>Join Our Team of Superstars</Title></Grid.Col>
                <Grid.Col span={{ base: 12, md: 7 }}>
                    <Text m={"lg"}>Kami selalu mencari tim baru yang memiliki impian dan visi yang sama dengan kami untuk mengembangkan kawasan SouthCity. Apakah Anda ingin menjadi bagian dari tim SouthCity? Silahkan email ke recruitment@southcity.co.id.</Text>
                </Grid.Col>
            </Grid>

            <Section
                title="Meet Our Superheroes"
                description="Tim manajemen SouthCity adalah bagian terpenting yang memimpin perusahaan untuk dapat terus berkembang dan merealisasikan tujuan kami. SouthCity tidak akan terwujud tanpa adanya tim kami."
            />


            <SimpleGrid cols={{ base: 1, sm: 4 }} spacing={'xs'}>
                {superHeroes.map(hero => {
                    return <SuperHeroes key={hero.name} name={hero.name} title={hero.title} image={hero.image} />
                })}
            </SimpleGrid>

        </>
    )
}

export default Karir