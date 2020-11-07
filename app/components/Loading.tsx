import React from 'react';

import styled from 'styled-components';
import { Spacer, Stack } from 'styled-layout';

import { jump } from 'styles/keyframes';
import { Text } from 'styles/typography';

export const LoadingAnimation = () => (
  <Stack axis="x" spacing="small">
    <Ball />
    <Ball animationDelay={0.2} />
    <Ball animationDelay={0.4} />
  </Stack>
);

interface Props {
  opacity?: number;
}

const Loading: React.FC<Props> = ({ children, opacity = 1 }) => (
  <Wrapper style={{ opacity }}>
    <LoadingAnimation />

    <Spacer />

    <Text color="grey-dark">{children}</Text>
  </Wrapper>
);

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.colors.white};
  z-index: 100;
`;

const Ball = styled.div<{ animationDelay?: number }>`
  width: ${(p) => p.theme.rem(10)};
  height: ${(p) => p.theme.rem(10)};
  border-radius: 999px;
  background-color: ${(p) => p.theme.colors.primary};
  animation: ${jump} 1s infinite cubic-bezier(0.31, 0.44, 0.445, 1.65);
  animation-delay: ${(p) => p.animationDelay || 0}s;
`;

export default Loading;
