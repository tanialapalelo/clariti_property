"use client"

import { Grid, Image, SimpleGrid, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import Section from './Section';
import Superheroes from './SuperHeroes';

interface Section {
  title: string;
  description: string;
  image: string;
  alignment: 'left' | 'right';
}

interface VisionMission {
  image: string;
  vision_title: string;
  vision_description: string;
  mission_title: string;
  mission_description: string;
}

interface TeamMember {
  image: string;
  name: string;
  role: string;
}

interface AboutSectionProps {
  mainTitle: string;
  sections: Section;
  visionMission: VisionMission;
  ceo: { image: string; title: string; description: string };
  superHeroTitle: string; 
  superHeroDescription: string;
  teamMembers: TeamMember[];
}

const AboutSection = ({ mainTitle, sections, visionMission, ceo, superHeroTitle, superHeroDescription, teamMembers }: AboutSectionProps) => {
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
        {mainTitle}
      </Title>

      <motion.div
        initial={{ opacity: 0, x: sections.alignment === 'left' ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Grid gutter="xl" my="lg">
          <Grid.Col span={6} order={sections.alignment === 'left' ? 1 : 2}>
            <Image src={"/assets/images/sofini-periatna.jpg"} alt={sections.title} />
          </Grid.Col>
          <Grid.Col span={6} order={sections.alignment === 'left' ? 2 : 1}>
            <Title order={3} ta={"center"}
              my={'xl'}>{sections.title}</Title>

            <Text>{sections.description}</Text>
          </Grid.Col>
        </Grid>
      </motion.div>

      <Grid gutter="xl" my="lg">
        <Grid.Col span={6}>
          <Image src={"/assets/images/sofini-periatna.jpg"} alt="Vision and Mission" />
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={3}>{visionMission.vision_title}</Title>
          <Text>{visionMission.vision_description}</Text>
          <Title order={3} mt="lg">{visionMission.mission_title}</Title>
          <Text>{visionMission.mission_description}</Text>
        </Grid.Col>
      </Grid>
      <Grid gutter="xl" my="lg">
        <Grid.Col span={6}>
          <Image src={"/assets/images/sofini-periatna.jpg"} alt="CEO" />
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={3}>{ceo.title}</Title>
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
    </>
  );
};

export default AboutSection;
