import { css as cssFn, ThemedCssFunction } from 'styled-components';

// Avoid circular dependency from DefaultTheme redeclaration
const css = cssFn as ThemedCssFunction<never>;

const pxToRem = (px: number) => `${px / 16}rem`;

const theme = {
  rem: pxToRem,
  colors: {
    black: '#555',
    white: '#fff',
    grey: '#858585',
    'grey-light': '#ededed',
    'grey-dark': '#545454',
    primary: '#27AF81',
    magenta: '#E1034F',
    red: '#F94F59',
    teal: '#017E8A',
    orangeish: '#FFCE00',
    'light-green': '#CFEB99',
    'light-pink': '#FEEAE4',
    turquoise: '#1FD8AB',
  },
  spacing: {
    none: '0rem',
    xxsmall: '0.125rem',
    xsmall: '0.25rem',
    small: '0.5rem',
    default: '1rem',
    medium: '1.5rem',
    large: '2rem',
    xlarge: '2.5rem',
    xxlarge: '3rem',
    xxxlarge: '4rem',
  },
  typography: {
    hero: css`
      font-family: 'Open Sans', sans-serif;
      font-size: 5rem;
      font-weight: bold;
      letter-spacing: 0.1rem;
      line-height: 1.3;
      text-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.5);
    `,
    title: css`
      font-family: 'Open Sans', sans-serif;
      font-size: 2.5rem;
      font-weight: bold;
      letter-spacing: 0.1rem;
      line-height: 1.3;
    `,
    'title-2': css`
      font-family: 'Open Sans', sans-serif;
      font-size: 1.8rem;
      font-weight: bold;
      letter-spacing: 0.1rem;
      line-height: 1.3;
    `,
    subtitle: css`
      font-family: 'Open Sans', sans-serif;
      font-size: 1.4rem;
      font-weight: semibold;
      letter-spacing: 0.1rem;
      line-height: 1.5;
    `,
    body: css`
      font-family: 'Open Sans', sans-serif;
      font-size: 1rem;
      line-height: 1.8;
    `,
    detail: css`
      font-family: 'Open Sans', sans-serif;
      font-size: 0.9rem;
      line-height: 1.2;
    `,
    small: css`
      font-family: 'Open Sans', sans-serif;
      font-size: 0.7rem;
      line-height: 1.2;
    `,
    action: css`
      font-family: 'Open Sans', sans-serif;
      font-size: 1rem;
      letter-spacing: 0.1rem;
      line-height: 1.4;
    `,
  },
  shadow: {
    light: '0 0.125rem 0.5rem rgba(0, 0, 0, 0.1)',
    default: '0 0.125rem 0.5rem rgba(0, 0, 0, 0.2)',
    strong: '0 0.125rem 0.5rem rgba(0, 0, 0, 0.5)',
    text: '0 0.25rem 0.25rem rgba(0, 0, 0, 0.5)',
  },
  borderRadius: {
    small: pxToRem(5),
    default: pxToRem(15),
    large: pxToRem(30),
  },
};

export type Theme = typeof theme;

export type Color = keyof Theme['colors'];

export type Spacing = keyof Theme['spacing'];

export type Typography = keyof Theme['typography'];

export default theme;
