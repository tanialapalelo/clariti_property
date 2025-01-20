"use client"

import { Center, Grid, Image, Tabs, Text, Title } from "@mantine/core";
import { useState } from "react";


const categories = [
    { id: "exterior", label: "Exterior" },
    { id: "interior", label: "Interior" },
    { id: "facilities", label: "Facilities" },
    { id: "360", label: "360°" },
  ];

const ProjectLayout = () => {
    
  const [activeTab, setActiveTab] = useState<string>("exterior");

  // Function to update URL and state when tab changes
  const handleTabChange = (val: string) => {
    setActiveTab(val);
  };


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
        Judul
      </Title>

      <Grid justify="center" my={"xl"} p={"xl"}>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Title m={"sm"} w={250} mx={"auto"} order={2}>
            Join Our Team of Superstars
          </Title>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Text m={"lg"}>
            Kami selalu mencari tim baru yang memiliki impian dan visi yang sama
            dengan kami untuk mengembangkan kawasan SouthCity. Apakah Anda ingin
            menjadi bagian dari tim SouthCity? Silahkan email ke
            recruitment@southcity.co.id.
          </Text>
        </Grid.Col>
      </Grid>

      <Center mt={{ base: "sm", md: "xl" }}>
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
      </Center>

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

      <Grid gutter={"md"}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <div style={{ position: "relative", width: "100%", height: "500px" }}>
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
              alt="tes"
            />
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <div style={{ position: "relative", width: "100%", height: "500px" }}>
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
              alt="tes"
            />
          </div>
        </Grid.Col>
      </Grid>

      <Title
        order={1}
        style={{
          fontWeight: 800,
          textAlign: "center",
          padding: "100px",
        }}
      >
        Specifications
      </Title>
    </div>
  )
}

export default ProjectLayout