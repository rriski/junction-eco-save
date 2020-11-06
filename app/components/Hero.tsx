import { Color } from 'ol/color';
import styled from 'styled-components';

import { Content } from 'styles/index';

interface Props {
  title: string;
  image?: string;
  color?: Color;
}

const Hero = ({ title, image, color }: Props) => {
  return (
    <Wrapper>
      <Background color={color}>
        {image && <BackgroundImage src={image} />}
      </Background>

      <Content>
        <Title>{title}</Title>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  width: 100vw;
  padding: ${p => p.theme.spacing.xxlarge};
`;

const Background = styled.div<{ color?: Color }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-height: ${p => p.theme.rem(300)};
  z-index: -1;
  background-color: ${p => p.theme.colors[p.color || 'grey-light']};
`

const BackgroundImage = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  object-fit: cover;
`

const Title = styled.h1`
  ${p => p.theme.typography.title};
  color: ${p => p.theme.colors.white};
`

export default Hero;
