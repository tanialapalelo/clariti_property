"use client"

import { getGradient, Grid, SimpleGrid, Text, Title, useMantineTheme } from '@mantine/core';
import { motion } from 'framer-motion';
import Section from './Section';
import Superheroes from './SuperHeroes';
import Image from 'next/image';
import { AboutSectionProps } from '@/lib/shared.types';

interface Section {
  title: string;
  description: string;
  image: string;
  alignment: 'left' | 'right';
}

const AboutSection = ({ mainTitle, sections, visionMission, ceo, superHeroTitle, superHeroDescription, teamMembers }: AboutSectionProps) => {
  
  const theme = useMantineTheme();
  return (
    <div>

      <Title
        order={1}
        style={{
          fontWeight: 800,
          textAlign: "center",
          padding: "100px",
          backgroundColor: "#f0f4ff",
        }}
      >
        {mainTitle}
      </Title>

      <motion.div
        initial={{ opacity: 0, x: sections.alignment === 'left' ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Grid gutter={0}>
          <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
            <div style={{ position: "relative", width: "100%", height: "400px" }}>
              <Image
                src={sections.image}
                alt={sections.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }} p={{ base: "xs", md: 'xl' }} bg={"#0E2244"}>
            <Title order={3} ta={"center"} m={"xl"} style={{ color: "#FFFFFF" }}>{sections.title}</Title>
            <Text m={'xl'} style={{ color: "#FFFFFF" }}>{sections.description}</Text>
          </Grid.Col>
        </Grid>
      </motion.div>

      <Grid gutter={0}>
        <Grid.Col span={{ base: 12, md: 6 }} p={{ base: "xs", md: 'xl' }}>
          <Title order={3} m={"xl"}>{visionMission.vision_title}</Title>
          <Text m={"xl"}>{visionMission.vision_description}</Text>
          <Title order={3} m={"xl"}>{visionMission.mission_title}</Title>
          <Text m={"xl"}>{visionMission.mission_description}</Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>

          <div style={{ position: "relative", width: "100%", height: "500px" }}>
            <Image
              src={visionMission.image}
              alt={visionMission.vision_title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Grid.Col>
      </Grid>

      <Grid gutter={0} bg={getGradient({ deg: 50, from: '#F6F7F8', to: '#F6F7F8' }, theme)}>
        <Grid.Col span={{ base: 12, md: 3 }} order={{ base: 3, md: 1 }} >
          <div
            style={{ display: 'flex', justifyContent: 'center' }}>

            <Image src={ceo.image} alt="CEO"
              width={250}
              height={400}
            />
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }} order={{ base: 1, md: 2 }} p={{ base: "xs", md: 'xl' }}>
          <Title order={3} style={{ marginBottom: "10px" }}>{ceo.title}</Title>
          <Text>{ceo.name} - Chief Executive Officer</Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5 }} order={{ base: 2, md: 3 }} p={{ base: "xs", md: 'xl' }}>
          <Text>{ceo.description}</Text>
        </Grid.Col>
      </Grid>

      <Section
        title={superHeroTitle}
        description={superHeroDescription}
      />

      <SimpleGrid cols={{ base: 1, sm: 4 }} spacing={'xs'} mb={'xl'}>

        {teamMembers.map((member, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1 * 0.2 }}
          >

            <Superheroes
              key={member.name}
              name={member.name}
              title={member.role}
              image={member.image}
            />
          </motion.div>

        ))}
        {/* })} */}
      </SimpleGrid>
    </div>
  );
};

export default AboutSection;