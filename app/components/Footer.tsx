import styled from 'styled-components';
import { Stack } from 'styled-layout';

import LogoSvg from 'static/svg/logo.svg';
import { Subtitle } from 'styles/typography';

const Footer = () => {
  return (
    <StyledFooter>
      <Stack align="center">
        <Subtitle weight="bold">Copyright </Subtitle>
        <Logo />
      </Stack>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  padding: ${(p) => p.theme.spacing.small};
  margin-top: ${(p) => p.theme.spacing.large};
  background-color: ${(p) => p.theme.colors.primary}; ;
`;

const Logo = styled(LogoSvg)`
  max-height: 80px;
  cursor: pointer;
  filter: brightness(0) invert(1);
  transition: color 0.1s, fill 0.1s;
`;

export default Footer;
