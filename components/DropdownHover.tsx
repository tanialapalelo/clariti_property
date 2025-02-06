import { Anchor, Group, UnstyledButton } from "@mantine/core"
import Link from "next/link"
import classes from '../styles/DropdownHover.module.css';


interface DropdownHoverItem {
    title: string;
    link: string;
}

interface DropdownHoverProps {
    data: DropdownHoverItem[];
}

const DropdownHover: React.FC<DropdownHoverProps> = ({ data }) => {
    return (
        <>
            {data.map((item) => (

                <Anchor href={item.link} key={item.title}>
                    <UnstyledButton className={classes.subLink}>
                        <Group wrap="nowrap" align="flex-start">
                            {item.title}
                        </Group>
                    </UnstyledButton>
                </Anchor>
            ))}
        </>
    )
}

export default DropdownHover