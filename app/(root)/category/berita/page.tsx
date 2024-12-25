import { Title } from '@mantine/core'
import React from 'react'

const Berita = () => {
  return (
    <>
     <Title
        order={1}
        style={{
          fontWeight: 800,
          textAlign: "center",
          margin: "2.5rem 0",
        }}
      >
        Latest News from Us
      </Title>
    </>
  )
}

export default Berita