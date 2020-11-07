import styled from 'styled-components';

import SaveIcon from 'static/svg/lightning.svg';
import { Content } from 'styles/index';
import { Color } from 'styles/theme';

interface Props {
  title: string;
  image?: string;
  color?: Color;
  icon?: boolean;
}

const Hero = ({ title, image, color, icon }: Props) => {
  return (
    <Wrapper>
      <Background>
        {image && <BackgroundImage src={image} />}
        {color && <BackgroundOverlay color={color} />}
      </Background>

      <TitleWrapper>
        <Title>{title}</Title>
        {icon && <SaveIcon />}
      </TitleWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  width: 100vw;
  padding: ${(p) => p.theme.spacing.xxlarge};
`;

const TitleWrapper = styled(Content)`
  flex-direction: row;
`;

const BackgroundOverlay = styled.div<{ color: Color }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(p) => `${p.theme.colors[p.color]}cc`};
`;

const Background = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  left: 0;
  min-height: ${(p) => p.theme.rem(300)};
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  ${(p) => p.theme.typography.hero};
  margin-right: 2rem;
  color: ${(p) => p.theme.colors.white};
`;

export default Hero;
