import { Container, Image, ActionIcon, Popover, Text, Box, Title } from '@mantine/core';
import { Carousel } from "@mantine/carousel";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconBarbellFilled, IconHomeFilled, IconProps, IconShoppingCartFilled, IconWifi } from '@tabler/icons-react';

interface Facility {
  id: string;
  icon: string;
  title: string;
  description: string;
  link: string;
  x: string;
  y: string;
}

const iconMapping: Record<string, React.FC<IconProps>> = {
  home: IconHomeFilled,
  wifi: IconWifi,
  shopping: IconShoppingCartFilled,
  football: IconBarbellFilled,
};


const getIcon = (type: string) => {
  return iconMapping[type] || iconMapping.Default;
};


const MapWithPopup = ({ facilities }: { facilities: Facility[] }) => {
  const [opened, setOpened] = useState<string | null>(null);

  return (
    <>
    <Container style={{ position: 'relative', maxWidth: '100%', padding: 0 }}>
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV8fHx8&auto=format&fit=crop&w=720&q=80"
        alt="Background Image"
        style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
      />

      {/* Desktop Interactive Icons */}
      {facilities.map((data) => {
        
        const Icon = getIcon(data.icon);
        return (
          <Popover
            key={data.id}
            opened={opened === data.id}
            onClose={() => setOpened(null)}
            position="top"
            withArrow
            radius="md"
            shadow="lg"
            trapFocus={false}
            closeOnEscape={false}
          >
          <Popover.Target>
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setOpened(data.id)}
              onMouseLeave={() => setTimeout(() => setOpened(null), 300)}
              style={{
                position: 'absolute',
                left: data.x,
                top: data.y,
                cursor: 'pointer',
              }}
            >
              <ActionIcon
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
                size="xl"
                radius="lg"
                style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }}
              >
                {Icon[data.icon] && <Icon[data.icon] size={30} />}
              </ActionIcon>

            </motion.div>
          </Popover.Target>

          <Popover.Dropdown
            onMouseEnter={() => setOpened(data.id)}
            onMouseLeave={() => setOpened(null)}
            style={{
              background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
              color: 'white',
              padding: '16px',
              borderRadius: '12px',
              maxWidth: '250px',
            }}
          >
            <Box>
              <Title order={4} mb="xs">
                {data.title}
              </Title>
              <Text size="sm" mb="sm">
                {data.description}
              </Text>
              <Link href={data.link} passHref>
                <Text
                  size="sm"
                  style={{ textDecoration: 'underline', cursor: 'pointer', color: '#9BD0FF' }}
                >
                  Lebih Lanjut
                </Text>
              </Link>
            </Box>
          </Popover.Dropdown>
        </Popover>
        )
        
      })}

      {/* Mobile Carousel View */}
      <Box mt="lg" style={{ display: 'block', maxWidth: '100%' }}>
        <Carousel
          slideSize="80%"
          slideGap="md"
          align="start"
          loop
          withIndicators
        >
          {facilities.map((facility) => (
            <Carousel.Slide key={facility.id}>
              <Box
                style={{
                  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                  borderRadius: '12px',
                  padding: '16px',
                  color: 'white',
                }}
              >
                <Title order={4} mb="xs">
                  {facility.title}
                </Title>
                <Text size="sm" mb="sm">
                  {facility.description}
                </Text>
                <Link href={facility.link} passHref>
                  <Text
                    size="sm"
                    style={{ textDecoration: 'underline', cursor: 'pointer', color: '#9BD0FF' }}
                  >
                    Lebih Lanjut
                  </Text>
                </Link>
              </Box>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>
    </Container>
    </>
  );
};

export default MapWithPopup;
