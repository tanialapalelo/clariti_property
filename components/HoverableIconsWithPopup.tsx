import { Container, Image, ActionIcon, Popover, Text } from '@mantine/core';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconBallFootball, IconHome, IconShoppingBag, IconWifi } from '@tabler/icons-react';


const HoverableIconsWithPopup = () => {
  const [opened, setOpened] = useState(false);

  // Data for the icons (position and content)
  const iconData = [
    { id: 'home', icon: <IconHome size={30} />, label: 'Home', x: '10%', y: '20%' },
    { id: 'wifi', icon: <IconWifi size={30} />, label: 'Free Wi-Fi', x: '30%', y: '40%' },
    { id: 'shopping', icon: <IconShoppingBag size={30} />, label: 'Shopping', x: '50%', y: '60%' },
    { id: 'football', icon: <IconBallFootball size={30} />, label: 'Football Field', x: '70%', y: '80%' }
  ];

  return (
    <Container style={{ position: 'relative', maxWidth: '100%', padding: 0 }}>
      <Image
        src="/assets/images/masterplan.jpg"
        alt="Background Image"
        style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
      />

      {iconData.map((data) => (
        <Popover
          key={data.id}
          opened={opened === data.id}
          onClose={() => setOpened(false)}
          position="bottom"
          withArrow
          transition="fade"
          radius="md"
          style={{
            position: 'absolute',
            top: data.y,
            left: data.x,
            // transform: 'translate(-50%, -50%)'
          }}
        >
          <Popover.Target>
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onHoverStart={() => setOpened(data.id)}
              onHoverEnd={() => setOpened(false)}
              style={{ cursor: 'pointer' }}
            >
              <ActionIcon variant="outline" size="lg">
                {data.icon}
              </ActionIcon>
            </motion.div>
          </Popover.Target>
          <Popover.Dropdown>
            <Text>{data.label}</Text>
          </Popover.Dropdown>
        </Popover>
      ))}
    </Container>
  );
};

export default HoverableIconsWithPopup;
