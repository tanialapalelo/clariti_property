import { Container } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import ArticleCard from './ArticleCard';
import { dataBerita } from '@/constants';


interface Article {
  title: string;
  image: string;
  date: string;
}

export function CardsCarousel() {
  // Group dataBerita into chunks of 3 using reduce for better readability
  const chunkedData: Article[][] = [];
  for (let i = 0; i < dataBerita.length; i += 3) {
    chunkedData.push(dataBerita.slice(i, i + 3));
  }


  return (
    <Container py="xl">
      <Carousel withIndicators loop slideSize="100%" align="start" withControls>
        {chunkedData.map((group, index) => (
          <Carousel.Slide key={index}>
            <div style={{ display: 'flex' }}>
              {group.map((article) => (
                <ArticleCard key={article.title} {...article} />
              ))}
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
}
