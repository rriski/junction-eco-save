import { Link } from 'blitz';
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
      {image && <Background src={image} />}

      <HeaderBar justify="center">
        {icon && !goBack && <Logo />}

        {goBack && (
          <Link href="/">
            <HeroLink>
              <Arrow />
            </HeroLink>
          </Link>
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
`;

const Background = styled.div<{ src: string }>`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  min-height: ${(p) => p.theme.rem(300)};
  max-height: ${(p) => p.theme.rem(400)};
  background-image: linear-gradient(
      to bottom,
      ${(p) => `${p.theme.colors.turquoise}cc`},
      ${(p) => `${p.theme.colors.turquoise}cc`}
    ),
    url(${(p) => `${p.src}`});
  background-position: center center;
  background-size: cover;
  z-index: -1;
`;

const HeaderBar = styled(Content)`
  display: flex;
  width: 100vw;
  color: ${(p) => p.theme.colors.white};
  z-index:1000000;
`;

const HeroLink = styled.a`
  transition: all 0.1s;

  &:hover {
    transform: translateX(-0.5rem);
  }
`;

const HeroTitle = styled(Title).attrs({ as: 'h1' })`
  max-width: ${(p) => p.theme.rem(600)};
  color: ${(p) => p.theme.colors.white};
  font-size: ${(p) => p.theme.rem(48)};
  font-weight: bold;
  letter-spacing: 0.1rem;
  line-height: 1.3;
  text-align: center;
  margin: 0;
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
