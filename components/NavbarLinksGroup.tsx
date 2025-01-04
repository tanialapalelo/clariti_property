import { useState } from 'react';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import { Anchor, Box, Collapse, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import classes from '../styles/NavbarLinksGroup.module.css';

interface LinksGroupProps {
  icon?: React.FC<{ size?: number; stroke?: number }>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  singleLink?: string | "";
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, singleLink, links }: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Text<'a'>
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            {Icon && <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            }
            {singleLink ? (
              <Anchor href={singleLink} underline='never' className={classes.fontColor}>
                  <Box ml="md">{label}</Box>
              </Anchor>
            ) : (
              <Box ml="md">{label}</Box>
            )}
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
              style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const mockdata = {
  label: 'Releases',
  icon: IconCalendarStats,
  links: [
    { label: 'Upcoming releases', link: '/' },
    { label: 'Previous releases', link: '/' },
    { label: 'Releases schedule', link: '/' },
  ],
};

export function NavbarLinksGroup() {
  return (
    <Box mih={220} p="md">
      <LinksGroup {...mockdata} />
    </Box>
  );
}