"use client"

import { Anchor, Container, Grid, SimpleGrid, Text, Title } from "@mantine/core"
import { IconBrandWhatsapp, IconMail, IconMapPinFilled, IconPhoneFilled } from "@tabler/icons-react"
import TextWithIcon from "./ui/TextWithIcon"


interface VisitUsDetail {
    title: string;
    description: string;
    address: string;
    address_map: string;
    whatsapp_number: string;
    phone_number: string;
    email: string;
  };


const VisitUs = ({ data }: { data: VisitUsDetail }) => {
    return (

        <Container py={"xl"}>
            <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Title my={"sm"}>Kunjungi Kami</Title>
                    <Text>{data.description}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Title my={"sm"}>{data.title}</Title>
                    <SimpleGrid cols={{ base: 1, md: 2 }}>
                        <div>
                            <IconMapPinFilled size={22} />
                            <Text>{data.address}</Text>
                            <Anchor href={data.address_map} target="_blank">Open in Google Maps</Anchor>
                        </div>

                        <div>
                            <TextWithIcon icon={<IconBrandWhatsapp size={22} />} label={data.whatsapp_number} />
                            <TextWithIcon icon={<IconPhoneFilled size={22} />} label={data.phone_number} />
                            <TextWithIcon icon={<IconMail size={22} />} label={data.email} />
                        </div>

                    </SimpleGrid>

                </Grid.Col>
            </Grid>
        </Container>
    )
}

export default VisitUs