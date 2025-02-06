"use client";

import { ProjectData } from "@/lib/shared.types";
import {
  Center,
  Container,
  Grid,
  Image,
  SimpleGrid,
  Tabs,
  Text,
  Title
} from "@mantine/core";
import { useState } from "react";

interface ProjectLayoutProps {
  projectData: ProjectData;
}

// const categories = [
//   { id: "exterior", label: "Exterior" },
//   { id: "interior", label: "Interior" },
//   { id: "facilities", label: "Facilities" },
//   { id: "360", label: "360°" },
// ];

const ProjectLayout = ({ projectData }: ProjectLayoutProps) => {
  const [activeTab, setActiveTab] = useState<string>("exterior");

  // Function to update URL and state when tab changes
  const handleTabChange = (val: string | null) => {
    if(val) setActiveTab(val);
  };

  // Check if projectData is undefined
  if (!projectData) {
    return (
      <Center style={{ height: "100vh" }}>
        <Text size="lg" c="gray">
          Project data not found.
        </Text>
      </Center>
    );
  }

  return (
    <div>
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
        {projectData.mainTitle}
      </Title>

      <Grid justify="center" my={"xl"} p={"xl"}>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Title m={"sm"} w={250} mx={"auto"} order={1}>
            {projectData.heroTitle}
          </Title>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Text m={"lg"}>{projectData.heroDescription}</Text>
        </Grid.Col>
      </Grid>

      {/* TODO: Different action category for proyek */}
      {/* <Center mt={{ base: "sm", md: "xl" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="pills"
          radius="xl"
        >
          <Tabs.List>
            {categories.map((cat) => (
              <Tabs.Tab key={cat.id} value={cat.id}>
                {cat.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </Center> */}

      <Title
        order={1}
        style={{
          fontWeight: 800,
          textAlign: "center",
          padding: "100px",
        }}
      >
        Floor Plan
      </Title>

      <Grid gutter={0}>
        {projectData.floorPlan.map((item, index) => (
          <Grid.Col span={{ base: 12, md: 6 }} key={index}>
            <Title ta={"center"} order={3}>
              {item.title}
            </Title>
            <Image src={item.image} alt={item.title} />
          </Grid.Col>
        ))}
      </Grid>


      <Container my={"sm"}>
      <Title
        order={1}
        style={{
          fontWeight: 800,
          textAlign: "center",
          padding: "50px",
        }}
      >
        {projectData.specifications.title}
      </Title>
      <Text mb={"xs"}>
        {projectData.specifications.description}
      </Text>

        <SimpleGrid cols={2}>
          {projectData.specifications.pondasi && (
            <div>
              <Title order={4} c={"#333333"} my={"xs"}>
                Pondasi
              </Title>
              <div
                dangerouslySetInnerHTML={{
                  __html: projectData.specifications.pondasi,
                }}
              />
            </div>
          )}

          {projectData.specifications.lantai && (
            <div>
              <Title order={4} c={"#333333"} my={"xs"}>
                Lantai
              </Title>
              <div
                style={{
                  color: "#444444",
                }}
                dangerouslySetInnerHTML={{
                  
                  __html: projectData.specifications.lantai.replace(
                    /(?:\r\n|\r|\n)/g,
                    "<br />"
                  ),
                }}
              />
            </div>
          )}

          {projectData.specifications.dinding && (
            <div>
              <Title order={4} c={"#333333"} my={"xs"}>
                Dinding
              </Title>
              <div
                style={{
                  color: "#444444",
                }}
                dangerouslySetInnerHTML={{
                  
                  __html: projectData.specifications.dinding.replace(
                    /(?:\r\n|\r|\n)/g,
                    "<br />"
                  ),
                }}
              />
            </div>
          )}

          {projectData.specifications.dapur && (
            <div>
              <Title order={4} c={"#333333"} my={"xs"}>
                Dapur
              </Title>
              <div
                dangerouslySetInnerHTML={{
                  __html: projectData.specifications.dapur,
                }}
              />
            </div>
          )}

          {projectData.specifications.pintu_jendela && (
            <div>
              <Title order={4} c={"#333333"} my={"xs"}>
                Pintu & Jendela
              </Title>
              <div
                dangerouslySetInnerHTML={{
                  __html: projectData.specifications.pintu_jendela,
                }}
              />
            </div>
          )}
          {projectData.specifications.kamar_mandi && (
            <div>
              <Title order={4} c={"#333333"} my={"xs"}>
                Kamar Mandi
              </Title>
              <div
                dangerouslySetInnerHTML={{
                  __html: projectData.specifications.kamar_mandi,
                }}
              />
            </div>
          )}
          {projectData.specifications.lain_lain && (
            <div>
              <Title order={4} c={"#333333"} my={"xs"}>
                Lain-Lain
              </Title>
              <div
                dangerouslySetInnerHTML={{
                  __html: projectData.specifications.lain_lain.replace(
                    /(?:\r\n|\r|\n)/g,
                    "<br />"
                  ),
                }}
              />
            </div>
          )}
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default ProjectLayout;
