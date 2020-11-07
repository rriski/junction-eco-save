import { Head } from 'blitz';
import styled from 'styled-components';

import { Card } from 'app/styles';
import BulbIcon from 'static/svg/bulb.svg';

// ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------
export default function Page404() {
  const statusCode = 404;
  const title = 'This page could not be found';

  return (
    <>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>

      <BackgroundImage />

      <CardWrapper>
        <ErrorCard>
          <TitleWrapper>
            <Title>
              4<Hidden>0</Hidden>4
            </Title>
            <BulbWrapper>
              <BulbIcon />
            </BulbWrapper>
          </TitleWrapper>

          <Text>Energy efficiency not found!</Text>
        </ErrorCard>
      </CardWrapper>
    </>
  );
}

const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;
  height: 70%;
  top: 0;
  left: 0;
  z-index: -1;
  object-fit: cover;
  background-size: cover;
  background-image: linear-gradient(
      to bottom,
      ${(p) => `${p.theme.colors.turquoise}cc`},
      ${(p) => `${p.theme.colors.turquoise}cc`},
      ${(p) => p.theme.colors.white}
    ),
    url('https://www.alvsbytalo.fi/globalassets/houses/lasse/finland/lasse_alvsbytalo_talopaketti_harmaa_1600x900_200619.jpg?w=1920&h=888&mode=crop&scale=both&quality=70');
`;

const CardWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const ErrorCard = styled(Card)`
  padding: 4rem 6rem;
`;

const Title = styled.h1`
  font-size: ${(p) => p.theme.rem(120)};
  color: ${(p) => p.theme.colors['grey-dark']};
  text-align: center;
`;

const TitleWrapper = styled.div`
  position: relative;
  padding-bottom: 2rem;
`;

const Hidden = styled.span`
  color: ${(p) => p.theme.colors.white};
`;

const BulbWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -50%);
`;

const Text = styled.p`
  width: 100%;
  text-align: center;
  font-size: ${(p) => p.theme.rem(36)};
  font-weight: bold;
`;
