"use client"

import { Grid, Title } from '@mantine/core';
import { IconBike, IconBus, IconCar, IconQuestionMark, IconShip, IconTrain, type IconProps } from '@tabler/icons-react';
import React from 'react';

type Transportation = {
  title: string;
  content: string;
};

interface TransportationInfoProps {
  data: Transportation[];
}


const transportationIconMap: Record<string, React.FC<IconProps>> = {
  MRT: IconTrain,
  Busway: IconBus,
  'Regular Bus': IconBus,
  'Commuter Line': IconTrain,
  Car: IconCar,
  Bicycle: IconBike,
  Ferry: IconShip,
  Default: IconQuestionMark,
};

const getTransportationIcon = (type: string) => {
  return transportationIconMap[type] || transportationIconMap.Default;
};


const TransportationInfo: React.FC<TransportationInfoProps> = ({ data }) => {
  return (
    <Grid gutter={0} bg={"#E6F0FD"}>
      {/* Render each category dynamically */}
      {data.map((transport, index) => {

        const Icon = getTransportationIcon(transport.title);
        return (
          <Grid.Col key={index} span={{ base: 12, md: 6 }} p={{ base: "xs", md: "xl" }}>
            <div>


              <div style={{ display: "flex", alignItems: "center" }}>
                <Icon size={36} />
                <Title order={3} m={"sm"}>{transport.title}</Title>
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: transport.content }}
              />
            </div>
          </Grid.Col>
        );
      })}
    </Grid>
    // </div>
  );
};

export default TransportationInfo;
