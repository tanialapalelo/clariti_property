import { Text } from '@mantine/core';
import classes from '../../styles/TextWithIcon.module.css';

interface TextIconProps {
    icon: React.ReactNode; // Accept pre-rendered React elements
    label: string
}

const TextWithIcon = ({ icon, label }: TextIconProps) => {
    return (
        <>
            <Text
                className={classes.link}
            >
                {icon} {/* Directly render the passed React element */}
                {label}
            </Text>
        </>
    )
}

export default TextWithIcon