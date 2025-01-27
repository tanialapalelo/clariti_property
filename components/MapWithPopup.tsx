import { Container, Image, ActionIcon, Popover, Text, Box, Title } from '@mantine/core';
import { Carousel } from "@mantine/carousel";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconBarbellFilled, IconHomeFilled, IconProps, IconShoppingCartFilled, IconWifi } from '@tabler/icons-react';
import { MapProps } from '@/lib/shared.types';
import { useMediaQuery } from '@mantine/hooks';

const iconMapping: Record<string, React.FC<IconProps>> = {
  home: IconHomeFilled,
  wifi: IconWifi,
  shopping: IconShoppingCartFilled,
  football: IconBarbellFilled,
};

const getIcon = (type: string) => {
  return iconMapping[type] || iconMapping.Default;
};

const MapWithPopup = ({ facilities }: { facilities: MapProps[] }) => {
  const [opened, setOpened] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)'); // Mobile detection using Mantine

  return (
    <>
      <Container style={{ position: 'relative', maxWidth: '100%', padding: 0 }}>
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV8fHx8&auto=format&fit=crop&w=720&q=80"
          alt="Background Image"
          style={{
            width: '100%',
            height: isMobile ? '50vh' : '100vh', // Smaller image height for mobile
            objectFit: 'cover',
          }}
        />

        {/* Icons on the Image */}
        {facilities.map((data) => {
          const Icon = getIcon(data.icon);
          return (
            <motion.div
              key={data.id}
              whileHover={!isMobile ? { scale: 1.3 } : undefined}
              whileTap={!isMobile ? { scale: 0.9 } : undefined}
              onMouseEnter={!isMobile ? () => setOpened(data.id) : undefined}
              onMouseLeave={!isMobile ? () => setTimeout(() => setOpened(null), 300) : undefined}
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
                {Icon && <Icon/>}
              </ActionIcon>
            </motion.div>
          );
        })}

        {isMobile && (
          // Mobile View: Show Carousel for Details
          <Box mt="lg" style={{ display: 'block', maxWidth: '100%' }}>
            <Carousel
              slideSize="80%"
              slideGap="md"
              align="start"
              loop
              withIndicators
            >
              {facilities.map((facility) => {
                const Icon = getIcon(facility.icon);
                return (
                  <Carousel.Slide key={facility.id}>
                    <Box
                      style={{
                        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                        borderRadius: '12px',
                        padding: '16px',
                        color: 'white',
                        textAlign: 'center',
                      }}
                    >
                      <ActionIcon size="xl" mb="sm">
                        {Icon && <Icon size={30} />}
                      </ActionIcon>
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
                );
              })}
            </Carousel>
          </Box>
        )}

        {!isMobile &&
          // Desktop View: Show Popovers
          facilities.map((data) => {
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
                      {Icon && <Icon />}
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
            );
          })}
      </Container>
    </>
  );
};

export default MapWithPopup;
