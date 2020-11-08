import styled from 'styled-components';

import Arrow from 'public/static/svg/arrow.svg';
import Logo from 'public/static/svg/hero-logo.svg';
import { Content } from 'styles/index';
import { Text, Title } from 'styles/typography';

interface Props {
  title?: string;
  image?: string;
  icon?: boolean;
  goBack?: boolean;
}

const Hero: React.FC<Props> = ({ children, title, image, icon, goBack }) => {
  return (
    <Wrapper>
      {image && (
        <Background>
          <BackgroundOverlay src={image} />
        </Background>
      )}

      <HeaderBar>
        {icon && <Logo />}
        {goBack && (
          <HeroLink href="/">
            <Arrow />
          </HeroLink>
        )}
      </HeaderBar>

      <Content align="center">
        {title && <HeroTitle>{title}</HeroTitle>}

        <HeroContent>{children}</HeroContent>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  width: 100vw;
  padding: ${(p) => p.theme.spacing.large} 0;
`;

const BackgroundOverlay = styled.div<{ src: string }>`
  position: absolute;
  width: 100%;
  min-height: ${(p) => p.theme.rem(300)};
  max-height: ${(p) => p.theme.rem(400)};
  background-image: linear-gradient(
      to bottom,
      ${(p) => `${p.theme.colors.turquoise}cc`},
      ${(p) => `${p.theme.colors.turquoise}cc`}
    ),
    url(${(p) => `${p.src}`});
  background-size: cover;
`;

const Background = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  left: 0;
  min-height: ${(p) => p.theme.rem(400)};
`;

const HeaderBar = styled.div`
  position: absolute;
  top: ${(p) => p.theme.spacing.small};
  left: ${(p) => p.theme.spacing.default};
  display: flex;
  width: 100vw;
  height: 4rem;
  align-items: center;
  color: ${(p) => p.theme.colors.white};
`;

const HeroLink = styled.a`
  transition: all 0.1s;
  &:hover {
    transform: scale(1.02);
  }
`;

const HeroTitle = styled(Title).attrs({ as: 'h1' })`
  max-width: ${(p) => p.theme.rem(600)};
  color: ${(p) => p.theme.colors.white};
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  line-height: 1.3;
  text-align: center;
  text-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.5);
`;

const HeroContent = styled(Text)`
  margin: ${(p) => p.theme.spacing.xlarge} 0;
  color: ${(p) => p.theme.colors.white};
  font-size: ${(p) => p.theme.rem(20)};
  font-weight: 600;
  text-align: center;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
`;

export default Hero;
