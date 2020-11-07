import styled from 'styled-components';

const Spinner = () => (
  <StyledSpinner viewBox="0 0 50 50">
    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="3" />
  </StyledSpinner>
);

const StyledSpinner = styled.svg`
  width: 30px;
  height: 30px;
  margin: 20px;
  animation: rotate 1s linear infinite;

  & .path {
    animation: dash 1.5s ease-in-out infinite;
    stroke: ${(p) => p.theme.colors.primary};
    stroke-linecap: round;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default Spinner;
