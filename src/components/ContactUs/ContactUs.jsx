import React from 'react';
import './ContactUs.css';
import {
    createStyles,
    Text,
    Title,
    SimpleGrid,
    TextInput,
    Textarea,
    Button,
    Group,
    ActionIcon,
    Paper,
    Container
} from '@mantine/core';
import { BrandInstagram, BrandGooglePlay, BrandApple } from 'tabler-icons-react';
import emailjs from 'emailjs-com';


import { ReactComponent as EmailLogo } from '../../image/svg-icons/email.svg';
import { ReactComponent as PhoneLogo } from '../../image/svg-icons/phone.svg';
import { ReactComponent as WorkTimeLogo } from '../../image/svg-icons/work-time.svg';
import { ReactComponent as LocationLogo } from '../../image/svg-icons/location.svg';


const useStyles = createStyles((theme) => {
    const BREAKPOINT = theme.fn.smallerThan('sm');

    return {
        wrapper: {
            display: 'flex',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
            borderRadius: theme.radius.lg,
            padding: 4,
            border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
                }`,

            [BREAKPOINT]: {
                flexDirection: 'column',
            },
        },

        form: {
            boxSizing: 'border-box',
            flex: 1,
            padding: theme.spacing.xl,
            paddingLeft: theme.spacing.xl * 2,
            borderLeft: 0,

            [BREAKPOINT]: {
                padding: theme.spacing.md,
                paddingLeft: theme.spacing.md,
            },
        },

        fields: {
            marginTop: -12,
        },

        fieldInput: {
            flex: 1,

            '& + &': {
                marginLeft: theme.spacing.md,

                [BREAKPOINT]: {
                    marginLeft: 0,
                    marginTop: theme.spacing.md,
                },
            },
        },

        fieldsGroup: {
            display: 'flex',

            [BREAKPOINT]: {
                flexDirection: 'column',
            },
        },

        contacts: {
            boxSizing: 'border-box',
            position: 'relative',
            borderRadius: theme.radius.lg - 2,
            backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${theme.colors[theme.primaryColor][7]
                } 100%)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid transparent',
            padding: theme.spacing.xl,
            flex: '0 0 280px',

            [BREAKPOINT]: {
                marginBottom: theme.spacing.sm,
                paddingLeft: theme.spacing.md,
            },
        },

        title: {
            marginBottom: theme.spacing.xl * 1.5,
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,

            [BREAKPOINT]: {
                marginBottom: theme.spacing.xl,
            },
        },

        control: {
            [BREAKPOINT]: {
                flex: 1,
            },
        },
    };
});


const social = [BrandGooglePlay, BrandApple, BrandInstagram];
const linkTo = ["https://play.google.com/store/apps/details?id=com.sixt.reservation", "https://apps.apple.com/ru/app/rentalcars-com-car-rental-app/id570156001?l=uk", "https://instagram.com/rent_carbatista"];


const ContactUs = (props) => {
    const { classes } = useStyles();


    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('Rent car', 'from_contact_us', e.target, 'odsT7xBoF4sn-LYNF')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    };

    const icons = social.map((Icon, index) => (
        <ActionIcon key={index} size={28} className={classes.social} variant="transparent" component='a' href={linkTo[index]}>
            <Icon size={22} />
        </ActionIcon>
    ));

    return (
        <Container size={1000} >
            <Paper shadow="md" radius="lg">
                <div className={classes.wrapper}>
                    <div className={classes.contacts}>
                        <Text size="lg" weight={700} className={classes.title} sx={{ color: '#fff' }}>
                            <Title className={classes.title}>Contact us</Title>
                        </Text>
                        <Text className={classes.description} mt="sm" mb={30}>
                            Leave your email and we will get back to you within 24 hours
                        </Text>
                        <div className='contact__link' variant='white'>
                            <div className='link__wrapper'>
                                <div className='link__logo'>
                                    <EmailLogo />
                                </div>
                                <div className='link__text'>
                                    <a href='mailto:#'>Email<br />valera@gmail.com</a>
                                </div>
                            </div>
                            <div className='link__wrapper'>
                                <div className='link__logo'>
                                    <PhoneLogo />
                                </div>
                                <div className='link__text'>
                                    <a href="tel:#">Phone<br />+38 (068) 333 33 33</a>
                                </div>
                            </div>
                            <div className='link__wrapper'>
                                <div className='link__logo'>
                                    <LocationLogo />
                                </div>
                                <div className='link__text'>
                                    Address:<br /> Rivne, street Kyivska
                                </div>
                            </div>
                            <div className='link__wrapper'>
                                <div className='link__logo'>
                                    <WorkTimeLogo />
                                </div>
                                <div className='link__text'>
                                    Working hours<br />8 a.m. – 11 p.m.
                                </div>
                            </div>
                        </div>
                        <Group mt="xl">{icons}</Group>
                    </div>


                    <form className={classes.form} onSubmit={sendEmail}>
                        <Text size="lg" weight={700} className={classes.title}>
                            Get in touch
                        </Text>
                        <div className={classes.fields}>
                            <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                                <TextInput
                                    label="Email"
                                    placeholder="your@email.com"
                                    required
                                    classNames={{ input: classes.input, label: classes.inputLabel }}
                                    name='email'
                                />
                                <TextInput
                                    label="Name"
                                    placeholder="Enter your name"
                                    classNames={{ input: classes.input, label: classes.inputLabel }}
                                    name="name"
                                />
                            </SimpleGrid>
                            <Textarea
                                required
                                label="Your message"
                                placeholder="I want to order your goods"
                                minRows={4}
                                mt="md"
                                classNames={{ input: classes.input, label: classes.inputLabel }}
                                name="message"
                            />

                            <Group position="center" mt="md">
                                <Button className={classes.control} type='submit'>Send message</Button>
                            </Group>
                        </div>
                    </form>

                </div >
            </Paper>

        </Container>

    );
}
export default ContactUs;