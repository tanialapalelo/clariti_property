import { Button, Container, Group, Title } from '@mantine/core';
import classes from '../styles/not-found.module.css';

const NotFound = () => {
    return (
        <Container>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>we are sorry, but the page you requested was not found</Title>
            <Group justify="center" my={'md'}>
                <Button radius={'xl'} component="a" href="/">Back to Home</Button>
            </Group>
        </Container>
    )
}

export default NotFound