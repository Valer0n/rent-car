import React, { useState } from 'react';
import './Header.css';
import { createStyles, Header, Group, ActionIcon, Container, Burger, Text, Drawer, } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { BrandInstagram, BrandGooglePlay, BrandApple } from 'tabler-icons-react';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,

        [theme.fn.smallerThan('sm')]: {
            justifyContent: 'flex-start',
        },
    },

    links: {
        width: 260,

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    social: {
        width: 260,

        [theme.fn.smallerThan('sm')]: {
            width: 'auto',
            marginLeft: 'auto',
        },
    },

    burger: {
        marginRight: theme.spacing.md,

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][0],
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
        },
    },
}));
const links = [
    {
        link: "/",
        label: "Home",
    },
    {
        link: "/backoffice",
        label: "Backoffice",
    },
    {
        link: "/faq",
        label: "FAQ",
    },
];
function MyHeader() {
    const [opened, toggleOpened] = useBooleanToggle(false);
    const [openedDrawer, setOpenedDrawer] = useState(false);
    const matches = useMediaQuery("(min-width: 769px)");
    const [active, setActive] = useState(links[0].link);
    const { classes, cx } = useStyles();

    const items = links.map((link) => (
        <Text
            key={link.label}
            href={link.link}
            className={cx(classes.link, { [classes.linkActive]: active === link.link })}
            onClick={() => {
                setActive(link.link);
            }}
            component={NavLink} variant='link' to={link.link}
        >
            {link.label}
        </Text>
    ));

    return (
        <Header height={56} mb={0} styles={{ root: { position: "fixed" } }}>
            <Container className={classes.inner} size={1500}>
                {!matches ? (
                    <>
                        <Drawer
                            opened={openedDrawer}
                            onClose={() => { setOpenedDrawer(false); toggleOpened() }}
                            padding="xl"
                            size="sm"
                            position="left"
                            transition="rotate-left"
                            transitionDuration={800}
                            transitionTimingFunction="ease"
                            overlayOpacity={0.5}
                        >
                            <nav className='nav_burger'>
                                <Group onClick={() => { setOpenedDrawer(false); toggleOpened() }}>{items}  </Group></nav>
                        </Drawer>
                        <Group position="center">
                            <Burger color="#417E27" opened={opened} onClick={() => { toggleOpened(); setOpenedDrawer(true) }} className={classes.burger} />
                        </Group>
                    </>
                ) : (
                    <Group className={classes.links} spacing={5}>
                        {items}
                    </Group>
                )}
                <NavLink to='/' >
                    <img style={{ width: "150px" }} src={require("../../image/logo.png")} alt='logo' />
                </NavLink>
                <Group spacing={0} className={classes.social} position="right" noWrap>
                    <ActionIcon size="lg" component='a' href="https://play.google.com/store/apps/details?id=com.sixt.reservation">
                        <BrandGooglePlay size={18} />
                    </ActionIcon>
                    <ActionIcon size="lg" component='a' href="https://apps.apple.com/ru/app/rentalcars-com-car-rental-app/id570156001?l=uk">
                        <BrandApple size={18} />
                    </ActionIcon>
                    <ActionIcon size="lg" component='a' href="https://instagram.com/rent_carbatista">
                        <BrandInstagram size={18} />
                    </ActionIcon>
                </Group>
            </Container>
        </Header>
    );
}

export default MyHeader;
