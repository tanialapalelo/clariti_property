import { Button, Center, Group, Title } from '@mantine/core';
import classes from '../styles/not-found.module.css';

const NotFound = () => {
    return (

        <Center style={{ height: "100vh" }}>
            <div>
                <div className={classes.label}>404</div>
                <Title className={classes.title}>We are sorry, but the page you requested was not found</Title>
                <Group justify="center" my={'md'}>
                    <Button radius={'xl'} component="a" href="/">Back to Home</Button>
                </Group>
            </div>
        </Center>
    )
}

export default NotFound