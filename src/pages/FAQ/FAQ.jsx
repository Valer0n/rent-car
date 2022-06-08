import React from 'react';
import { Container, Title, Accordion, createStyles } from '@mantine/core';
import MyHeader from '../../components/Header/Header';

const useStyles = createStyles((theme, _params, getRef) => {
    const control = getRef('control');

    return {
        wrapper: {
            paddingTop: theme.spacing.xl * 2,
            paddingBottom: theme.spacing.xl * 2,
            minHeight: 650,
        },

        title: {
            fontWeight: 400,
            marginBottom: theme.spacing.xl * 1.5,
        },

        control: {
            ref: control,

            '&:hover': {
                backgroundColor: 'transparent',
            },
        },

        item: {
            borderRadius: theme.radius.md,
            marginBottom: theme.spacing.lg,

            border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[3]
                }`,
        },

        itemOpened: {
            [`& .${control}`]: {
                color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
            },
        },
    };
});

const FAQ = () => {
    const { classes } = useStyles();
    return (
        <Container size={1500} className={classes.wrapper} mt={50}>
            <Title align="center" className={classes.title}>
                Frequently Asked Questions
            </Title>
            <Accordion
                iconPosition="right"
                classNames={{
                    item: classes.item,
                    itemOpened: classes.itemOpened,
                    control: classes.control,
                }}
            >
                <Accordion.Item label="Do I need to confirm my bookings?">
                    There’s no need because at Marketplace you’ve already told us which of your cars are available. Once the customer makes a reservation, all you need to do is ensure the car they’ve booked is ready on the right date and time.
                </Accordion.Item>
                <Accordion.Item label="What happens if a booking is cancelled??">If the customer cancels we will let you know as soon as we know so you can make the vehicle available once again for other customers. You can see the full details on the cancellation policy in the ‘Set your policies’ section in the registration process.</Accordion.Item>
                <Accordion.Item label="What happens if I don’t have the right car for a booking?">
                    Marketplace is built on trust. Customers trust that you will have the right car available. If you can’t honour the original booking it will be up to you to arrange a suitable alternative (either another car of the same grade or better).
                </Accordion.Item>
                <Accordion.Item label="If there is a specific color/make/model of car I want, can I request it?">
                    The color, make, and model are based on availability at the time of pickup and cannot be guaranteed at the time of booking. If there are multiple models under the same car classification, car companies will state the most popular model followed by “or similar.” For example, an intermediate car with Avis will be a “Chevrolet Cruze or similar.”
                </Accordion.Item>
                <Accordion.Item label="Do I need any payment information to reserve the car?">
                    No, a credit card is not required to reserve a car online
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}

export default FAQ;