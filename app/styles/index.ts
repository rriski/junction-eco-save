import styled from 'styled-components';
import { Stack } from 'styled-layout';

import { CONTENT_WIDTH } from 'app/utils/constants';
<<<<<<< HEAD
import { Color, Spacing } from 'styles/theme';
=======
import { Color } from 'styles/theme';
>>>>>>> 7936303... Stuff

export const Page = styled.main`
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
`;

export const Content = styled(Stack)`
  position: relative;
  width: 100%;
  max-width: ${CONTENT_WIDTH};
  padding: ${(p) => p.theme.spacing.default};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

export const Button = styled.button.attrs({ type: 'button' })<{
  color?: Color;
}>`
  position: relative;
  ${(p) => p.theme.typography.action}
  padding: ${(p) => p.theme.spacing.default} ${(p) => p.theme.spacing.large};
  background-color: transparent;
  text-align: center;
  transition: color 0.2s 0.1s;
  color: ${(p) => p.theme.colors[p.color || 'primary']};

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    transition: transform 0.15s ease-in-out;
    z-index: -1;
  }

  &:before {
    top: 0;
    left: 0;
    background-color: ${(p) => p.theme.colors.primary};
    transform: scaleX(0);
    transform-origin: center left;
  }

  &:after {
    top: 0;
    left: 0;
    border: solid 2px ${(p) => p.theme.colors[p.color || 'primary']};
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
  background-color: ${(p) => p.theme.colors.primary};
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

<<<<<<< HEAD
export const Card = styled.div<{ spacing?: Spacing }>`
  padding: ${p => p.theme.spacing[p.spacing || 'default']};
  border-radius: ${p => p.theme.borderRadius.default};
  background-color: ${p => p.theme.colors.white};
  box-shadow: ${p => p.theme.shadow.default};
`
=======
export const Card = styled.div`
  padding: ${(p) => p.theme.spacing.default};
  border-radius: ${(p) => p.theme.borderRadius.default};
  background-color: ${(p) => p.theme.colors.white};
`;
>>>>>>> 7936303... Stuff
