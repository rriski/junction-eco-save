import styled from 'styled-components';

import { Color } from './theme';

import { CONTENT_WIDTH } from 'app/utils/constants';

export const Page = styled.main`
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
`

export const Content = styled.div`
  width: 100%;
  max-width: ${CONTENT_WIDTH};
  padding: ${p => p.theme.spacing.default};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: red;
  z-index: 1;
`

export const Button = styled.button.attrs({ type: 'button' })<{
  color?: Color;
}>`
  position: relative;
  ${(p) => p.theme.typography.action}
  padding: ${(p) => p.theme.spacing.default} ${(p) => p.theme.spacing.large};
  background-color: transparent;
  text-align: center;
  transition: color 0.2s 0.1s;
  color: ${(p) => p.theme.colors[p.color || 'alert']};

  &:before, &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    transition: transform 0.15s ease-in-out;
    z-index: -1;
  }

  &:before {
    top: 0;
    left: 0;
    background-color: ${(p) => p.theme.colors.alert};
    transform: scaleX(0);
    transform-origin: center left;
  }

  &:after {
    top: 0;
    left: 0;
    border: solid 2px ${(p) => p.theme.colors[p.color || 'alert']};
    z-index: -1;
  }

  &:hover {
    color: ${(p) => p.theme.colors.white};

    &:before {
      transform: scaleX(1);
    }
    &:after {
      transform: translate(5px, -5px);
      opacity: 0.4;
    }
  }
`;

export const ButtonSoft = styled.button`
  ${(p) => p.theme.typography.action}
  width: 100%;
  padding: ${(p) => p.theme.spacing.default};
  border-radius: 5px;
  background-color: ${(p) => p.theme.colors.alert};
  color: ${(p) => p.theme.colors.white};
  transition: background-color 0.1s;

  &:hover {
    background-color: rgba(${(p) => p.theme.colors.white}, 0.9);
  }
`;

export const Divider = styled.div`
  width: 20rem;
  height: 0.1rem;
  background-color: ${(p) => p.theme.colors.grey};
  margin: ${(p) => p.theme.spacing.large} auto;
`;
