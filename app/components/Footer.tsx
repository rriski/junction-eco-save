import styled from 'styled-components';

import LogoSvg from 'static/svg/logo.svg';
import { Content } from 'styles/index';

const Footer = () => {
  return (
    <StyledFooter>
      <Content align="center" spacing="large">
        <Logo />

        <a href="https://github.com/rriski/junction2020-winners">Check out on GitHub</a>
      </Content>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  padding: ${(p) => p.theme.spacing.xxxlarge} ${(p) => p.theme.spacing.default};
  margin-top: ${(p) => p.theme.spacing.xxxlarge};
  background-color: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors['grey-light']};
`;

const Logo = styled(LogoSvg)`
  max-height: 80px;
  filter: brightness(0) invert(1);
  transition: color 0.1s, fill 0.1s;
`;

export default Footer;
