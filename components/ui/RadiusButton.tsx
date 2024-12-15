import { Button } from "@mantine/core"

interface ButtonProps{
  description: string
}

const RadiusButton = ({description}: ButtonProps) => {
  return (
    <>
        <Button radius="xl" justify="center">{description}</Button>
    </>
  )
}

export default RadiusButton