import { FC } from 'react';

import styled from 'styled-components';

import Logo from 'public/logo.svg';
import { Content } from 'styles/index';
import { Color } from 'styles/theme';
import { Title, Text } from 'styles/typography';

interface Props {
  title?: string;
  image?: string;
  color?: Color;
  icon?: boolean;
}

const Hero: FC<Props> = ({ children, title, image, color }) => {
  return (
    <Wrapper>
      <Background>
        {image && <BackgroundImage src={image} />}
        {color && <BackgroundOverlay color={color} />}
      </Background>

      <HeaderBar>
        <Logo size={20} />
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
  padding-bottom: ${(p) => p.theme.spacing.default};
`;

const BackgroundOverlay = styled.div<{ color: Color }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      to bottom,
      ${(p) => `${p.theme.colors.turquoise}cc`},
      ${(p) => `${p.theme.colors.turquoise}cc`}
    ),
    url('https://www.alvsbytalo.fi/globalassets/houses/lasse/finland/lasse_alvsbytalo_talopaketti_harmaa_1600x900_200619.jpg?w=1920&h=888&mode=crop&scale=both&quality=70');
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

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeaderBar = styled.div`
  width: 100vw;
  height: 4rem;
  padding: ${(p) => p.theme.spacing.default};
  color: ${(p) => p.theme.colors.white};
`;

const HeroTitle = styled(Title).attrs({ as: 'h1' })`
  max-width: ${(p) => p.theme.rem(600)};
  font-size: 2.4rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  line-height: 1.3;
  text-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.5);
  color: ${(p) => p.theme.colors.white};
  text-align: center;
`;

const HeroContent = styled(Text)`
  font-size: ${(p) => p.theme.rem(20)};
  color: ${(p) => p.theme.colors.white};
  max-width: ${(p) => p.theme.rem(600)};
  font-weight: 600;
  text-align: center;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
`;

export default Hero;
