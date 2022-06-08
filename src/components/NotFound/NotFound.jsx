import React from 'react';
import { Container, Text, Button, createStyles, Title, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";


const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
    },

    inner: {
        position: 'relative',
    },

    image: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 0,
        opacity: 0.75,
    },

    content: {
        position: 'relative',
        zIndex: 1,

        [theme.fn.smallerThan('sm')]: {
            paddingTop: 120,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 38,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 540,
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl * 1.5,
    },
}));
export default function NotFound() {
    const { classes } = useStyles();
    const navigate = useNavigate();
    return (
        <>
            <Container size={1500} className={classes.root}>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}> Page not found.</Title>
                        <Text color="dimmed" size="lg" align="center" className={classes.description}>
                            Please visit this page!
                        </Text>

                        <Group position='center'>
                            <Button onClick={() => navigate('/', { replace: false })} >Take me back to home page</Button>

                            <Button onClick={() => navigate('/backoffice', { replace: false })}>Backoffice</Button>

                            <Button onClick={() => navigate('/faq', { replace: false })}>FAQ</Button>
                        </Group>
                    </div>
                </div>
            </Container>
        </>
    )
}