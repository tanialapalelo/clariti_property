"use client";

import { beritaData, navMobile, tentangKamiData } from "@/constants";
import { Carousel } from "@mantine/carousel";
import {
  Anchor,
  AspectRatio,
  Autocomplete,
  Box,
  Burger,
  Button,
  Center,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBuilding,
  IconBuildingBank,
  IconBuildingStore,
  IconChevronDown,
  IconHome,
  IconHomeFilled,
  IconMotorbike,
  IconSearch,
  IconShoppingBag,
  IconShoppingBagDiscount,
  type IconProps
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import classes from "../../styles/Header.module.css"; ///../styles/Header.module.css
import DropdownHover from "../DropdownHover";
import { LinksGroup } from "../NavbarLinksGroup";
import { useState } from "react";
import SearchModal from "../shared/SearchModal";
import ProjectNavigation from "../ProjectNavigation";
import { Project } from "@/lib/shared.types";

interface HeaderLayoutProps {
  projects: Project[];
}


const topProject = [
  {
    icon: IconHome,
    title: "The Parc",
  },
  {
    icon: IconBuilding,
    title: "Fortuna Residence",
  },
  {
    icon: IconBuildingStore,
    title: "Clariti Square",
  },
  {
    icon: IconBuildingBank,
    title: "Clariti Hive",
  },
  {
    icon: IconMotorbike,
    title: "Clariti Activities",
  },
];

const iconMapping: Record<string, React.FC<IconProps>> = {
  "Landed Housing": IconHomeFilled,
  "Apartment": IconBuilding,
  "Shophouse": IconShoppingBagDiscount,
  "Commercial": IconShoppingBag,
};

const getIcon = (type: string) => {
  return iconMapping[type] || IconBuilding; // Default icon
};

export function HeaderLayout({ projects }: HeaderLayoutProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  // const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Open search modal
  const openSearchModal = () => setIsSearchOpen(true);

  // Close search modal
  const closeSearchModal = () => setIsSearchOpen(false);


  const chunkedData: Project[][] = [];
  for (let i = 0; i < projects.length; i += 3) {
    chunkedData.push(projects.slice(i, i + 3));
  }

  const mobileLinks = navMobile.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Box pb={{base: 40, md: 55}}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <AspectRatio ratio={1920 / 1920}>
            <Link href="/">
              <Image
                src="/assets/images/logo.webp"
                alt="icon"
                width={95}
                height={50}
              />
            </Link>
          </AspectRatio>

          <Group h="100%" gap={0} visibleFrom="md">
            <HoverCard
              width={200}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Tentang Kami.
                    </Box>
                    <IconChevronDown size={16} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <DropdownHover data={tentangKamiData} />
              </HoverCard.Dropdown>
            </HoverCard>

            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Proyek
                    </Box>
                    <IconChevronDown size={16} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <ProjectNavigation projects={projects} />
              </HoverCard.Dropdown>
            </HoverCard>

            <Link href="/fasilitas" className={classes.link}>
              Fasilitas
            </Link>

            <HoverCard
              width={200}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <div className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Berita
                    </Box>
                    <IconChevronDown size={16} />
                  </Center>
                </div>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <DropdownHover data={beritaData} />
              </HoverCard.Dropdown>
            </HoverCard>

            <a href="/kontak-kami" className={classes.link}>
              Hubungi Kami
            </a>
          </Group>

          <Group visibleFrom="md">
            <UnstyledButton onClick={openSearchModal}>
              <IconSearch />
            </UnstyledButton>
            <Button component={Link} href="tel:+4733378901" variant="filled">
              +47 333 78 901
            </Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="md"
          />
        </Group>

        {/* Top 5 of Projects  */}
        <Group h="100%" gap={0} visibleFrom="md" justify="center">
          {projects.map((data) => {
            
            const IconComponent = getIcon(data.type);
            return (
              <a href="#" key={data.id} className={classes.topProjectLink}>
                <Group wrap="nowrap" align="flex-start">
                <IconComponent size={22} />
                  <div>
                    <Text size="sm" fw={500}>
                      {data.acf.hero.title}
                    </Text>
                  </div>
                </Group>
              </a>
            )
        })}
        </Group>
        
        <Carousel height={"auto"} loop hiddenFrom="md" slideSize="100%" slideGap="md">
          {chunkedData.map((chunk, index) => (
            <Carousel.Slide key={index}>
              <Group>
                {chunk.map((data) => {
                  const IconComponent = getIcon(data.type);

                  return (
                    <Anchor href="#" key={data.id} className={classes.topProjectLink} h={40}>
                      <Group wrap="nowrap" align="flex-start">
                        <IconComponent size={22} />
                        <div>
                          <Text size="sm" fw={500}>
                            {data.acf.hero.title}
                          </Text>
                        </div>
                      </Group>
                    </Anchor>
                  );
                })}
              </Group>
            </Carousel.Slide>
          ))}
        </Carousel>
      </header>
      {/* mobile */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={
          <Link href={"/"}>
            <Image
              src="/assets/images/logo.webp"
              alt="icon"
              width={100}
              height={60}
            />
          </Link>
        }
        hiddenFrom="md"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <div className={classes.linksInner}>{mobileLinks}</div>
          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            <Autocomplete
              className={classes.search}
              placeholder="Search"
              leftSection={<IconSearch size={16} stroke={1.5} />}
              data={[
                "React",
                "Angular",
                "Vue",
                "Next.js",
                "Riot.js",
                "Svelte",
                "Blitz.js",
              ]}
            />
            <Button component={Link} href="tel:+4733378901" variant="filled">
              +47 333 78 901
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>

      {/* Search Modal */}
      {isSearchOpen && <SearchModal close={closeSearchModal} />}
    </Box>
  );
}
