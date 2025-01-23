import { Container, Text, Title } from '@mantine/core'
import React from 'react'


interface SectionProps{
    title: string
    description: string
}
const Section = ({title, description}: SectionProps) => {
  return (
    <>
    <Container
      styles={{
        root: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: "2% 0"
        },
      }}
    >
        <Title mx={"auto"} p={"sm"}>{title}</Title>
        <Text my="md" mx={"auto"} px={'sm'}>
          {description}
        </Text>
      </Container>
    </>
  )
}

export default Section