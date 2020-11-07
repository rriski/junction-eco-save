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
