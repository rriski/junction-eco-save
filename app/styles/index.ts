import styled from 'styled-components';
import { Stack } from 'styled-layout';

import { CONTENT_WIDTH } from 'app/utils/constants';
import { Color, Spacing } from 'styles/theme';

export const Page = styled.main`
  overflow: hidden;
  width: 100vw;
  min-height: 100vh;
`;

export const Content = styled(Stack)`
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  max-width: ${CONTENT_WIDTH};
  flex-direction: column;
  padding: ${(p) => p.theme.spacing.default};
  margin: 0 auto;
`;

export const Button = styled.button.attrs({ type: 'button' })<{
  color?: Color;
}>`
  position: relative;
  ${(p) => p.theme.typography.action}
  padding: ${(p) => p.theme.spacing.default} ${(p) => p.theme.spacing.large};
  background-color: transparent;
  color: ${(p) => p.theme.colors[p.color || 'primary']};
  text-align: center;
  transition: color 0.2s 0.1s;

  &:before,
  &:after {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: '';
    transition: transform 0.15s ease-in-out;
  }

  &:before {
    top: 0;
    left: 0;
    background-color: ${(p) => p.theme.colors.primary};
    transform: scaleX(0);
    transform-origin: center left;
  }

  &:after {
    z-index: -1;
    top: 0;
    left: 0;
    border: solid 2px ${(p) => p.theme.colors[p.color || 'primary']};
  }

  &:hover {
    color: ${(p) => p.theme.colors.white};

    &:before {
      transform: scaleX(1);
    }
    &:after {
      opacity: 0.4;
      transform: translate(5px, -5px);
    }
  }
`;

export const ButtonSoft = styled.button`
  ${(p) => p.theme.typography.action}
  width: 100%;
  padding: ${(p) => p.theme.spacing.default};
  background-color: ${(p) => p.theme.colors.primary};
  border-radius: 5px;
  color: ${(p) => p.theme.colors.white};
  transition: background-color 0.1s;

  &:hover {
    background-color: rgba(${(p) => p.theme.colors.white}, 0.9);
  }
`;

export const Divider = styled.div`
  width: 20rem;
  height: 0.1rem;
  margin: ${(p) => p.theme.spacing.large} auto;
  background-color: ${(p) => p.theme.colors.grey};
`;

export const Card = styled.div<{ spacing?: Spacing }>`
  padding: ${(p) => p.theme.spacing[p.spacing || 'default']};
  background-color: ${(p) => p.theme.colors.white};
  border-radius: ${(p) => p.theme.borderRadius.default};
  box-shadow: ${(p) => p.theme.shadow.default};
`;

export const DetailGrid = styled.div`
  display: grid;
  align-items: center;
  gap: ${(p) => p.theme.spacing.xxsmall} ${(p) => p.theme.spacing.default};
  grid-template-columns: 1fr auto;
  line-height: 1;
`;
