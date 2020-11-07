import styled from 'styled-components';

import { Color } from './theme';

const BaseText = styled.span<{
  color?: Color;
  weight?: 'normal' | 'bold' | 'light';
  lineHeight?: number;
  align?: 'left' | 'center' | 'right';
}>`
  margin: 0;
  padding: 0;
  color: ${(p) => (p.color ? p.theme.colors[p.color] : 'inherit')};
  font-weight: ${(p) => p.weight || 'inherit'};
  line-height: ${(p) => p.lineHeight || 'inherit'};
  text-align: ${(p) => p.align || 'inherit'};
`;

export const Title = styled(BaseText).attrs({ as: 'h2' })`
  ${(p) => p.theme.typography.title}
`;

export const Subtitle = styled(BaseText).attrs({ as: 'h3' })`
  ${(p) => p.theme.typography.subtitle}
  font-weight: 800;
`;

export const Text = styled(BaseText).attrs({ as: 'p' })`
  ${(p) => p.theme.typography.body}
`;

export const Detail = styled(BaseText).attrs({ as: 'span' })`
  ${(p) => p.theme.typography.detail}
`;

export const Small = styled(BaseText).attrs({ as: 'span' })`
  ${(p) => p.theme.typography.small}
`;
