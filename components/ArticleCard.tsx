import { AspectRatio, Card, Image, Text } from '@mantine/core';
import Link from 'next/link';
import classes from '../styles/ArticleCard.module.css';

interface ArticleProps {
  title: string;
  date: string;
  image: string;
}

const ArticleCard = ({ title, date, image }: ArticleProps) => {
  return (
    <Card p="md" radius="md" className={classes.card} style={{ flex: 1, minWidth: '30%', maxWidth: '30%', height: '350px' }}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={image} alt={title} />
      </AspectRatio>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
        <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
          {date}
        </Text>
      </div>
      <Text className={classes.title} mt={5}>
        {title}
      </Text>
      <Link href="/tes">Read More</Link>
    </Card>
  );
};

export default ArticleCard;
