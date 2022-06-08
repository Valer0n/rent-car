import React, { useState } from 'react';
import { Modal, Button, createStyles, TextInput, Progress } from "@mantine/core";
import { DatePicker } from '@mantine/dates';
import { useInterval } from '@mantine/hooks';
import emailjs from 'emailjs-com';

const useStyles = createStyles((theme) => ({
    root: {
        position: 'relative',
    },

    input: {
        height: 'auto',
        paddingTop: 18,
    },

    label: {
        position: 'absolute',
        pointerEvents: 'none',
        fontSize: theme.fontSizes.xs,
        paddingLeft: theme.spacing.sm,
        paddingTop: theme.spacing.sm / 2,
        zIndex: 1,
    },

    button: {
        position: 'relative',
        transition: 'background-color 150ms ease',
    },

    progress: {
        position: 'absolute',
        bottom: -1,
        right: -1,
        left: -1,
        top: -1,
        height: 'auto',
        backgroundColor: 'transparent',
        zIndex: 0,
    },

    labelSend: {
        position: 'relative',
        zIndex: 1,
    },
}));

const CustomModal = (props) => {
    const { classes, theme } = useStyles();
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const interval = useInterval(
        () =>
            setProgress((current) => {
                if (current < 100) {
                    return current + 1;
                }

                interval.stop();
                setLoaded(true);
                return 0;
            }),
        20
    );


    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('Rent car', 'rent', e.target, 'odsT7xBoF4sn-LYNF')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    };

    return (
        <>
            <Modal
                opened={props.opened}
                onClose={() => props.setOpened(false)}
                title="Your order!"
            >
                <form onSubmit={sendEmail}>
                    <TextInput label="Your car" defaultValue={props.product.title + ' ' + props.product.model} classNames={classes} name='car' />
                    <TextInput label="Your name" placeholder="What your name?" classNames={classes} name='name' style={{ marginTop: 20 }} />
                    <TextInput label="Your address" placeholder="Rivne, 33000" classNames={classes} style={{ marginTop: 20 }} name='address' />

                    <DatePicker
                        style={{ marginTop: 20 }}
                        label="Departure date"
                        placeholder="When you want to order?"
                        classNames={classes}
                        clearable={true}
                        name="departure"
                        defaultValue={new Date()}
                        minDate={new Date()}
                    />
                    <Button
                        type="submit"
                        style={{ marginTop: 20 }}
                        fullWidth
                        className={classes.button}
                        onClick={() => (loaded ? setLoaded(false) : !interval.active && interval.start())}
                        color={loaded ? 'teal' : theme.primaryColor}
                    >
                        <div className={classes.labelSend}>
                            {progress !== 0 ? 'data is sending' : loaded ? 'Access data sent' : 'Send data'}
                        </div>
                        {progress !== 0 && (
                            <Progress
                                value={progress}
                                className={classes.progress}
                                color={theme.fn.rgba(theme.colors[theme.primaryColor][2], 0.35)}
                                radius="sm"
                            />
                        )}
                    </Button>
                </form>

            </Modal>
        </>
    );
}

export default CustomModal;
