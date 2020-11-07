import styled from 'styled-components';
import { Spacer, Stack } from 'styled-layout';

import { jump } from 'styles/keyframes';
import { Text } from 'styles/typography';

export const DotsLoading = () => (
  <Stack axis="x" spacing="small">
    <Ball />
    <Ball animationDelay={0.2} />
    <Ball animationDelay={0.4} />
  </Stack>
);

interface Props {
  opacity?: number;
}

export const DotsLoadingText: React.FC<Props> = ({ children, opacity = 1 }) => (
  <Wrapper style={{ opacity }}>
    <DotsLoading />

    <Spacer />

    <Text color="grey-dark">{children}</Text>
  </Wrapper>
);

const Wrapper = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.colors.white};
`;

const Ball = styled.div<{ animationDelay?: number }>`
  width: ${(p) => p.theme.rem(10)};
  height: ${(p) => p.theme.rem(10)};
  animation: ${jump} 1s infinite cubic-bezier(0.31, 0.44, 0.445, 1.65);
  animation-delay: ${(p) => p.animationDelay || 0}s;
  background-color: ${(p) => p.theme.colors.primary};
  border-radius: 999px;
`;
