"use client";

import { FacilityData, FacilitySection } from "@/lib/shared.types";
import { Grid, Title, Text, Button } from "@mantine/core";
import Image from "next/image";

interface FacilityLayoutProps {
  facilityData: FacilityData;
  facilitySections: FacilitySection[];
}

const FacilityLayout = ({
  facilityData,
  facilitySections,
}: FacilityLayoutProps) => {
  return (
    <>
      <Title
        ta="center"
        order={2}
        p="lg"
        style={{
          backgroundColor: "#0E1E40",
          color: "#FFFFFF",
        }}
      >
        {facilityData?.mainTitle || "Our Facilities"}
      </Title>

      {facilitySections.map((section, index) => {
        const isEven = index % 2 === 0;
        return (
          <Grid key={section.id} gutter={0} style={{ margin: 0 }}>
            {/* Text content section */}
            <Grid.Col
              span={{ base: 12, md: 6 }}
              order={{ base: 2, md: isEven ? 1 : 2 }}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Title order={3} m="xl">
                {section.title}
              </Title>
              <Text m="xl">{section.description}</Text>

              {section.detailImage && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={section.detailImage}
                    alt={section.title}
                    width={400}
                    height={400}
                    style={{
                      maxWidth: "100%", // Ensures responsiveness
                      height: "auto", // Maintains aspect ratio
                      objectFit: "contain", // Prevents cropping
                    }}
                  />
                </div>
              )}

              {section.bookUrl && (
                <Button
                  component="a"
                  href={section.bookUrl}
                  target="_blank"
                  radius="xl"
                  m="xl"
                >
                  Book Now
                </Button>
              )}
            </Grid.Col>

            {/* Feature image section */}
            <Grid.Col
              span={{ base: 12, md: 6 }}
              order={{ base: 1, md: isEven ? 2 : 1 }}
              style={{ height: "100%" }}
            >
              {section.featureImage && (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%", // Full height of the grid column
                    minHeight: "700px", // Ensures consistent image size
                  }}
                >
                  <Image
                    src={section.featureImage}
                    alt={section.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
            </Grid.Col>
          </Grid>
        );
      })}
    </>
  );
};

export default FacilityLayout;
