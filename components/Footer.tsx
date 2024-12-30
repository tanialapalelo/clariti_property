"use client"

import { IconBrandInstagram, IconBrandTwitter, IconBrandWhatsapp, IconBrandYoutube, IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';
import { ActionIcon, Button, Container, Group, Text, TextInput, Title } from '@mantine/core';
import classes from '../styles/Footer.module.css';
// import { useForm } from '@mantine/form';

const data = [
    {
        title: 'Get In Touch',
        links: [
            { label: ' Enquiries +62 818 0621 8999', link: '#', icon: IconBrandWhatsapp },
            { label: 'After Sales +62 8389 749 8999', link: '#', icon: IconBrandWhatsapp },
            { label: '+62 8389 749 8999', link: '#', icon: IconBrandWhatsapp },
            { label: 'info@southcity.co.id', link: '#', icon: IconMail },
            { label: 'recruitment@southcity.co.id', link: '#', icon: IconMail },
        ],
    },
    {
        title: 'SouthCity Head Office',
        links: [
            { label: 'ASG Tower Lv. 15 ,Jl. Pantai Indah Utara 1, Indonesia', link: '#', icon: IconMapPin },
            { label: '+62 21 8051 1626', link: '#', icon: IconPhone },
        ],
    },
    {
        title: 'SouthCity Marketing Gallery',
        links: [
            { label: 'Jl. Raya SouthCity Utara,Lot 5 No. 12, Indonesia', link: '#', icon: IconMapPin },
            { label: '+62 21 749 8999', link: '#', icon: IconPhone },
        ],
    },
];

export function Footer() {
    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text<'a'>
                key={index}
                className={classes.link}
                component="a"
                href={link.link}
                onClick={(event) => event.preventDefault()}
            >
                <link.icon size={22} />
                {link.label}
            </Text>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });


    // const form = useForm({
    //     mode: 'uncontrolled',
    //     initialValues: {
    //         email: '',
    //     },
    // });


    return (
        <footer className={classes.footer}>
            <Container className={classes.inner} size={'xl'}>
                <div className={classes.logo}>
                    <Title styles={{ root: { color: "white" } }} order={3}>Don`&apos;`t miss out, Stay in touch</Title>
                    <div className={classes.controls}>
                        <TextInput
                            placeholder="Your email"
                            classNames={{ input: classes.input, root: classes.inputWrapper }}
                        />
                        <Button className={classes.control}>Subscribe</Button>
                    </div>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter} size={'xl'}>
                <Text c="dimmed" size="sm">
                    ©  2024 clariti.co.id by Tania Lapalelo. All Rights Reserved.
                </Text>

                <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandTwitter size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandYoutube size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}