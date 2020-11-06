import styled from "styled-components";

import { Color } from "./theme";

const BaseText = styled.span<{ color?: Color }>`
  color: inherit;
  margin: 0;
  padding: 0;
  color: ${(p) => (p.color ? p.theme.colors[p.color] : "inherit")};
`;

export const Title = styled(BaseText).attrs({ as: "h2" })`
  ${(p) => p.theme.typography.title}
`;

export const Subtitle = styled(BaseText).attrs({ as: "h3" })`
  ${(p) => p.theme.typography.subtitle}
`;

export const Text = styled(BaseText).attrs({ as: "p" })`
  ${(p) => p.theme.typography.body}
`;
