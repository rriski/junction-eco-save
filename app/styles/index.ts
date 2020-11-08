import styled from 'styled-components';
import { Stack } from 'styled-layout';

import { CONTENT_WIDTH } from 'app/utils/constants';
import SaveIcon from 'static/svg/save.svg';
import { Spacing } from 'styles/theme';

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

export const ListButton = styled.button`
  ${(p) => p.theme.typography.body}
  width: 100%;
  padding: ${(p) => p.theme.spacing.medium} ${(p) => p.theme.spacing.medium};
  border-bottom: solid 1px ${(p) => p.theme.colors['grey-light']};
  background: transparent;
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: ${(p) => p.theme.colors['light-green']};
  }
`;

export const ButtonLink = styled.a`
  ${(p) => p.theme.typography.action}
  display: block;
  width: 70%;
  flex: 1;
  padding: ${(p) => p.theme.spacing.default} ${(p) => p.theme.spacing.medium};
  margin-left: auto;
  background-color: ${(p) => p.theme.colors.turquoise};
  border-radius: 999px;
  box-shadow: ${(p) => p.theme.shadow.default};
  color: ${(p) => p.theme.colors.white};
  font-weight: 600;
  text-align: center;
  transition: all 0.1s;
  cursor: pointer;

  &:hover {
    background-color: ${(p) => p.theme.colors.teal};
  }

  @media only screen and (max-width: 600px) {
    margin: 0 auto;
  }
`;

interface CircleButtonProps {
  readonly small?: boolean;
}

export const CircleButton = styled.button<CircleButtonProps>`
  display: flex;
  width: ${(p) => (p.small ? p.theme.rem(40) : p.theme.rem(50))};
  height: ${(p) => (p.small ? p.theme.rem(40) : p.theme.rem(50))};
  align-items: center;
  justify-content: center;

  padding: ${(p) => p.theme.spacing.small};

  border: 0;
  background-color: white;

  border-radius: 50%;
  color: ${(p) => p.theme.colors.grey};

  cursor: pointer;
  text-align: center;
  transition-duration: 250ms;
  transition-property: transform;
  transition-timing-function: ease;

  :focus {
    outline: none;
  }
`;

export const SaveButton = styled(SaveIcon)<{ selected: boolean }>`
  color: ${(p) => p.theme.colors[p.selected ? 'red' : 'grey']};
  cursor: pointer;
  fill: ${(p) => (p.selected ? p.theme.colors.red : 'transparent')};
  transition: color 0.1s, fill 0.1s;
`;
