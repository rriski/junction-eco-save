import { Link } from 'blitz';
import styled from 'styled-components';
import { Stack } from 'styled-layout';

import { CONTENT_WIDTH } from 'app/utils/constants';
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
  text-align: left;
  width: 100%;
  padding: ${(p) => p.theme.spacing.medium} ${(p) => p.theme.spacing.medium};
  cursor: pointer;
  border-bottom: solid 1px ${(p) => p.theme.colors['grey-light']};
  background: transparent;

  &:hover {
    background-color: ${(p) => p.theme.colors['light-green']};
  }
`;

export const ButtonLink = styled(Link)`
  ${(p) => p.theme.typography.action}
  width: 100%;
  padding: ${(p) => p.theme.spacing.small} ${(p) => p.theme.spacing.default};
  text-align: center;
  background-color: ${(p) => p.theme.colors.turquoise};
  border: solid 2px red;

  &:hover {
    background-color: rgba(${(p) => p.theme.colors.turquoise}, 0.9);
  }
`;
