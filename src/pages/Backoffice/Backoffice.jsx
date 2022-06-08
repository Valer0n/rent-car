import React from "react";
import { Container, Text, Button, createStyles, Title, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../HOC/Auth";

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

const Backoffice = () => {
    const { classes } = useStyles();
    const { signOut } = useAuth();
    const navigate = useNavigate();


    return (
        <>
            <Container size={1500} className={classes.root}>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>Nothing to see here</Title>
                        <Text color="dimmed" size="lg" align="center" className={classes.description}>
                            This page is under construction. Please comming soon!
                        </Text>
                        <Group position="center" mb={30}>
                            <Button size="md" onClick={() => navigate('/', { replace: true })}>Take me back to home page</Button>
                        </Group>
                        <Group position="center">
                            <Button style={{ backgroundColor: 'red' }} onClick={() => signOut(() => navigate('/', { replace: false }))}> Log Out </Button>
                        </Group>
                    </div>
                </div>
            </Container>
        </>
    )
}
export default Backoffice;