import { Container, Image, ActionIcon, Popover, Text, Box, Title } from '@mantine/core';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconBarbellFilled, IconHomeFilled, IconShoppingCartFilled, IconWifi } from '@tabler/icons-react';

const HoverableImageWithPopup = () => {
  const [opened, setOpened] = useState<string | null>(null);

  const iconData = [
    {
      id: 'home',
      icon: <IconHomeFilled size={30} />,
      title: 'The Parc',
      description: 'A residential project featuring modern apartments with green spaces and premium facilities.',
      link: '/projects/the-parc',
      x: '10%',
      y: '20%'
    },
    {
      id: 'wifi',
      icon: <IconWifi size={30} />,
      title: 'Free Wi-Fi Zone',
      description: 'Enjoy free high-speed internet access across the entire facility.',
      link: '/projects/free-wifi',
      x: '30%',
      y: '40%'
    },
    {
      id: 'shopping',
      icon: <IconShoppingCartFilled size={30} />,
      title: 'Shopping Center',
      description: 'Explore a variety of stores and dining options in our shopping area.',
      link: '/projects/shopping-center',
      x: '50%',
      y: '60%'
    },
    {
      id: 'football',
      icon: <IconBarbellFilled size={30} />,
      title: 'Sports Facility',
      description: 'State-of-the-art football fields and gym for sports enthusiasts.',
      link: '/projects/sports-facility',
      x: '70%',
      y: '80%'
    }
  ];

  return (
    <Container style={{ position: 'relative', maxWidth: '100%', padding: 0 }}>
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
        alt="Background Image"
        style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
      />

      {/* Interactive Icons */}
      {iconData.map((data) => (
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
          {/* Icon Trigger */}
          <Popover.Target>
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setOpened(data.id)}
              onMouseLeave={() => setTimeout(() => setOpened(null), 300)} // Prevent flickering
              style={{
                position: 'absolute',
                left: data.x,
                top: data.y,
                transform: 'translate(-50%, -50%)',
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
                {data.icon}
              </ActionIcon>
            </motion.div>
          </Popover.Target>

          {/* Popup Content */}
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
                  style={{
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    color: '#9BD0FF'
                  }}
                >
                  Lebih Lanjut
                </Text>
              </Link>
            </Box>
          </Popover.Dropdown>
        </Popover>
      ))}
    </Container>
  );
};

export default HoverableImageWithPopup;
