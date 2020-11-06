import { getRenderPixel } from "ol/render";
import { css as cssFn, ThemedCssFunction } from "styled-components";

// Avoid circular dependency from DefaultTheme redeclaration
const css = cssFn as ThemedCssFunction<never>;

const pxToRem = (px: number) => `${px / 16}rem`;

const theme = {
  rem: pxToRem,
  colors: {
    black: "#2b2b2b",
    white: "#fff",
    grey: "#858585",
    "grey-light": "#ededed",
    "grey-dark": "#545454",
    alert: "#d40038",
    success: "#00e074",
    primary: "green",
  },
  spacing: {
    none: "0rem",
    xxsmall: "0.125rem",
    xsmall: "0.25rem",
    small: "0.5rem",
    default: "1rem",
    medium: "1.5rem",
    large: "2rem",
    xlarge: "2.5rem",
    xxlarge: "3rem",
    xxxlarge: "4rem",
  },
  typography: {
    title: css`
      font-family: "Playfair Display", serif;
      font-size: 2.5rem;
      font-weight: bold;
      line-height: 1.3;
      letter-spacing: 0.1rem;
    `,
    subtitle: css`
      font-family: "Playfair Display", serif;
      font-size: 1.8rem;
      font-weight: semibold;
      line-height: 1.5;
      letter-spacing: 0.1rem;
    `,
    body: css`
      font-family: "Open sans", sans-serif;
      font-size: 1rem;
      font-weight: normal;
      line-height: 1.8;
    `,
    small: css`
      font-family: "Open sans", sans-serif;
      font-size: 0.7rem;
      font-weight: lighter;
      line-height: 1.2;
    `,
    action: css`
      font-family: "Playfair Display", serif;
      font-size: 1rem;
      font-weight: bold;
      line-height: 1.4;
      letter-spacing: 0.2rem;
    `,
  },
  shadow: {
    light: "0 0.125rem 0.5rem rgba(0, 0, 0, 0.1)",
    default: "0 0.125rem 0.5rem rgba(0, 0, 0, 0.2)",
    strong: "0 0.125rem 0.5rem rgba(0, 0, 0, 0.5)",
  },
};

export type Theme = typeof theme;

export type Color = keyof Theme["colors"];

export type Spacing = keyof Theme["spacing"];

export type Typography = keyof Theme["typography"];

export default theme;
