import { AspectRatio, Card, Text } from '@mantine/core';
import classes from '../styles/ArticleCard.module.css';
import Image from 'next/image';

interface SuperHeroesProps {
  name: string;
  title: string;
  image: string;
}

const Superheroes = ({ name, title, image }: SuperHeroesProps) => {
  return (
    <Card mx="auto" radius="md" className={classes.card} style={{ marginBottom: 12 }}>
      <AspectRatio ratio={1920 / 1920}>
        <Image src={image} alt={title} width={500} height={300} />
      </AspectRatio>
      <Text className={classes.title} ta="center">
        {name}
      </Text>
      <Text c="dimmed" size="xs" ta="center">
        {title}
      </Text>
    </Card>
  );
};

export default Superheroes;
