import React, { useState } from "react";
import {
    Card,
    Image,
    Text,
    Group,
    Badge,
    createStyles,
    Center,
    Button,
} from "@mantine/core";
import CustomModal from "../Modal/CustomModal";
import { GasStation, Gauge, ManualGearbox, Users } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.white,
    },

    imageSection: {
        padding: theme.spacing.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
    },

    label: {
        marginBottom: theme.spacing.xs,
        lineHeight: 1,
        fontWeight: 700,
        fontSize: theme.fontSizes.xs,
        letterSpacing: -0.25,
        textTransform: "uppercase",
    },

    section: {
        padding: theme.spacing.md,
        borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
    },

    icon: {
        marginRight: 5,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[2]
                : theme.colors.gray[7],
    },
}));

const ProductCard = (props) => {
    const { classes } = useStyles();
    const [opened, setOpened] = useState(false);

    const features = props.product.features.map((feature, index) => {
        const icons = {
            passengers: <Users size={18} className={classes.icon} />,
            consumption: <Gauge size={18} className={classes.icon} />,
            gearbox: <ManualGearbox size={18} className={classes.icon} />,
            fuelType: <GasStation size={18} className={classes.icon} />,
        };

        const icon = Object.keys(feature)[0];

        return (
            <Center key={index}>
                {icons[icon]}
                <Text size="sm">{Object.values(feature)[0]}</Text>
            </Center>
        );
    });


    return (
        <>
            <Card withBorder radius="md" className={classes.card}>
                <Card.Section className={classes.imageSection}>
                    <Image src={props.product.image} alt={props.product.title} />
                </Card.Section>

                <Group position="apart" mt="md">
                    <div>
                        <Text size="md" weight={700}>{props.product.title} {props.product.model}</Text>
                        <Text size="xs" color="dimmed">{props.capitalizeFirstLetter(props.product.typeCar)}</Text>
                    </div>
                    <Badge variant="outline">{props.product.discount}% off</Badge>
                </Group>

                <Card.Section className={classes.section} mt="md">
                    <Text size="sm" color="dimmed" className={classes.label}>
                        Basic configuration
                    </Text>
                    <Group spacing={8} mb={-8}>
                        {features}
                    </Group>
                </Card.Section>

                <Card.Section className={classes.section}>
                    <Group spacing={30}>
                        <div>
                            <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                                {props.product.price}$
                            </Text>
                            <Text
                                size="sm"
                                color="dimmed"
                                weight={500}
                                sx={{ lineHeight: 1 }}
                                mt={3}
                            >
                                per day
                            </Text>
                        </div>

                        <Button
                            radius="xl"
                            style={{ flex: 1 }}
                            onClick={(e) => { console.log(props.product.title); setOpened(true) }}
                        >
                            Rent now
                        </Button>
                    </Group>
                </Card.Section>
            </Card>
            <CustomModal opened={opened} setOpened={setOpened} product={props.product} />

        </>
    );
}

export default ProductCard;