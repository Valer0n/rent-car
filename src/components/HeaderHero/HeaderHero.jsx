import React from 'react';
import { createStyles, Title, Text, Button, Container, useMantineTheme, Anchor } from '@mantine/core';
import ChangeThema from '../ChangeThema/ChangeThema';
import { ReactComponent as Dots } from '../../image/svg-icons/dots.svg';
import { useWindowScroll } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 120,
    paddingBottom: 80,

    '@media (max-width: 755px)': {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  dots: {
    position: 'absolute',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],

    '@media (max-width: 755px)': {
      display: 'none',
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  description: {
    textAlign: 'center',

    '@media (max-width: 520px)': {
      textAlign: 'left',
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: 'flex',
    justifyContent: 'center',

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      height: 42,
      fontSize: theme.fontSizes.md,

      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));


function HeaderHero() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Container className={classes.wrapper} size={1500}>
      <Dots className={classes.dots} style={{ left: 0, top: 70 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 70 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 210 }} />
      <Dots className={classes.dots} style={{ right: 10, top: 120 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Easy and fast way{' '}
          <Text component="span" color={theme.primaryColor} inherit>
            to rent a car
          </Text>{' '}
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            Browse the world’s largest car sharing marketplace
            Whether it’s an SUV for a family road trip, a pickup truck for some errands, or a classic sports car for a special night out, find the perfect car for all kinds of occasions and budgets.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} size="lg" variant="default" color="gray" mr={10}>
            Booking
          </Button>

          <Button className={classes.control} size="lg" onClick={() => scrollTo({ y: 520 })}>
            View car
          </Button>

        </div>
        <ChangeThema />
      </div>
    </Container>
  );
}


export default HeaderHero;