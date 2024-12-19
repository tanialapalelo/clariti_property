import { Container, SimpleGrid, Text, Title } from "@mantine/core";
import { IconBus, IconTrain } from "@tabler/icons-react";

const TransportationInfo = () => {
  return (
    <Container fluid pt="xl" style={{ backgroundColor: "#f0f4ff" }}>
      <SimpleGrid cols={2} spacing="xl" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {/* Column 1 */}
        <div>
          <Title order={3} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconBus size={28} />
            Busway
          </Title>
          <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
            <li>SouthCity - Kuningan</li>
            <li>SouthCity - Lebak Bulus</li>
            <li>Pondok Cabe - Tanah Abang</li>
            <li>Harmoni - Terminal Lebak Bulus: TransJakarta Koridor 8 (7.8 km dari SouthCity)</li>
            <li>Kota - Ciputat: APTB (4.2 km dari SouthCity)</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <Title order={3} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconBus size={28} />
            Regular Bus
          </Title>
          <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
            <li>Kota - Terminal Lebak Bulus: PPD AC PAC 01, Kopaja B 86</li>
            <li>Tanah Abang - Terminal Lebak Bulus: Kopaja P 13, Kopaja S 615</li>
            <li>Senen - Terminal Lebak Bulus: Kopaja P 20</li>
            <li>Blok M - Terminal Lebak Bulus: Metromini S 72</li>
          </ul>
        </div>
      </SimpleGrid>

      <SimpleGrid cols={2} spacing="xl" breakpoints={[{ maxWidth: "sm", cols: 1 }]} mt="xl">
        {/* Column 1 */}
        <div>
          <Title order={3} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconTrain size={28} />
            Commuter Line
          </Title>
          <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
            <li>Sudimara Station (11.9 km dari SouthCity)</li>
            <li>Jurangmangu Station (10 km dari SouthCity)</li>
            <li>Tanah Abang - Terminal Lebak Bulus: Kopaja P 13, Kopaja S 615</li>
            <li>Jurangmangu Station (10 km dari SouthCity)</li>
            <li>Blok M - Terminal Lebak Bulus: Metromini S 72</li>
            <li>Jurangmangu Station (10 km dari SouthCity)</li>
            <li>Tanah Abang - Terminal Lebak Bulus: Kopaja P 13, Kopaja S 615</li>
            <li>Blok M - Terminal Lebak Bulus: Metromini S 72</li>
            <li>Jurangmangu Station (10 km dari SouthCity)</li>
            <li>Tanah Abang - Terminal Lebak Bulus: Kopaja P 13, Kopaja S 615</li>
            <li>Jurangmangu Station (10 km dari SouthCity)</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <Title order={3} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconTrain size={28} />
            MRT
          </Title>
          <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
            <li>Bundaran HI - Lebak Bulus MRT Station</li>
            <li>Bundaran HI - Fatmawati MRT Station</li>
          </ul>
        </div>
      </SimpleGrid>
    </Container>
  );
};

export default TransportationInfo;
