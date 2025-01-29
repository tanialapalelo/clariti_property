import { Button } from "@mantine/core"

interface ButtonProps {
  description: string
  link: string
}

const RadiusButton = ({ description, link }: ButtonProps) => {
  return (
    <>
      <Button radius="xl" justify="center" component="a" href={link}>{description}</Button>
    </>
  )
}

export default RadiusButton