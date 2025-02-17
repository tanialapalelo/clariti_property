"use client";

import { beritaData, tentangKamiData } from "@/constants";
import { Project } from "@/lib/shared.types";
import { Carousel } from "@mantine/carousel";
import {
  ActionIcon,
  Anchor,
  AspectRatio,
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
  TextInput,
  UnstyledButton,
  useComputedColorScheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  IconBuilding,
  IconChevronDown,
  IconHomeFilled,
  IconSearch,
  IconShoppingBag,
  IconShoppingBagDiscount,
  type IconProps,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import classes from "../../styles/Header.module.css";
import DropdownHover from "../DropdownHover";
import SearchModal from "../forms/SearchModal";
import { LinksGroup } from "../NavbarLinksGroup";
import ProjectNavigation from "../ProjectNavigation";

interface HeaderLayoutProps {
  projects: Project[];
}

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Open search modal
  const openSearchModal = () => setIsSearchOpen(true);

  // Close search modal
  const closeSearchModal = () => setIsSearchOpen(false);

  const dynamicNavMobile = [
    {
      label: "Tentang Kami",
      links: [
        { label: "Sejarah", link: "/sejarah" },
        { label: "Karir", link: "/karir" },
      ],
    },
    {
      label: "Proyek",
      links: projects.map((project) => ({
        label: project.name,
        link: `/proyek/${project.slug}`,
      })),
    },
    { label: "Fasilitas", singleLink: "/fasilitas" },
    {
      label: "Berita",
      links: [
        { label: "Berita", link: "/berita?category=berita" },
        { label: "Promosi", link: "/berita?category=promosi" },
      ],
    },
    { label: "Hubungi Kami", singleLink: "/kontak-kami" },
  ];

  const mobileLinks = dynamicNavMobile.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));


  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  console.log("computedColorScheme", computedColorScheme);
  const isMobile = useMediaQuery('(max-width: 768px)'); // Mobile detection using Mantine

  return (
    <Box px={0}>
      <header>
        <div className={classes.header}>
          {/* <Group justify="space-between" align="center"> */}
          {/* <div style={{display: "flex", justifyContent: "space-between", textAlign: "center"}}> */}
          <AspectRatio ratio={1}>
            <Link href="/">
              <Image
                // src={computedColorScheme === "light"
                //   ? "/assets/images/clarimond-logo.svg"
                //   : "/assets/images/clarimond-logo-putih.svg"}
                src={"/assets/images/logo-clariti-no-bg.png"}
                alt="icon"
                width={110}
                height={80}
              />
            </Link>
          </AspectRatio>

          {/* Group h="100%" gap={0} visibleFrom="md" style={{ height: "100%" }} */}
          {!isMobile &&
            <div style={{ height: "100%", display: "flex" }}>
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
            </div>
          }


          <Group visibleFrom="md">
            <UnstyledButton onClick={openSearchModal} m={"sm"}>
              <IconSearch />
            </UnstyledButton>
            <Button component={Link} href="tel:+4733378901" h={"100%"} radius={0}>
              +47 333 78 901
            </Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="md"
            my={"auto"}
            mr={"sm"}
          />
          {/* </Group> */}
          {/* </div> */}
        </div>

        {/* Top 5 of Projects  */}
        {/* <Group h="100%" gap={0} visibleFrom="md" justify="center" align="center"> */}
        {!isMobile && <div style={{ height: "60px", display: "flex", justifyContent: "center" }}>
          {projects.map((data) => {
            const IconComponent = getIcon(data.type);
            return (
              <a href={data.slug} key={data.id} className={classes.topProjectLink}>
                <Group wrap="nowrap">
                  <IconComponent size={22} />
                  <div>
                    <Text size="sm" fw={500}>
                      {data.acf.hero.title}
                    </Text>
                  </div>
                </Group>
              </a>
            );
          })}
        </div>
        }

        <Carousel
          height={"auto"}
          loop
          hiddenFrom="md"
          slideSize="100%"
          slideGap="md"
        >
          {projects.map((data, index) => {
            const IconComponent = getIcon(data.type);
            return (
              <Carousel.Slide key={index}>
                <Group className={classes.carouselGroup} justify="center">
                  <Anchor
                    href="#"
                    key={data.id}
                    className={classes.topProjectLink}
                    h={40}
                  >
                    <Group wrap="nowrap" align="flex-start">
                      <IconComponent size={22} />
                      <div style={{ width: "auto" }}>
                        <Text size="sm" fw={500}>
                          {data.acf.hero.title}
                        </Text>
                      </div>
                    </Group>
                  </Anchor>
                </Group>
              </Carousel.Slide>
            );
          })}
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
              src="/assets/images/logo-clariti-no-bg.png"
              alt="icon"
              width={100}
              height={60}
              style={{marginLeft: 7}}
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
            <TextInput
              placeholder="Type to search..."
              // variant="unstyled"
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              rightSection={
                <ActionIcon
                  variant="transparent"
                  onClick={handleSearch}
                  style={{ marginRight: 10 }}
                >
                  <IconSearch />
                </ActionIcon>
              }
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
