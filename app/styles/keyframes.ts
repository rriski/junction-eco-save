import { keyframes } from 'styled-components';

export const jump = keyframes`
  0%, 100% {
    transform: translateY(0rem);
  }
  50% {
    transform: translateY(-1rem);
  }
`;
