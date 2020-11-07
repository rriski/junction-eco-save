import React, { Suspense } from 'react';

import { useQuery, useParam, BlitzPage } from 'blitz';
import styled from 'styled-components';

import getBuilding from 'app/buildings/queries/getBuilding';
import Layout from 'app/layouts/Layout';
import { Card as OriginalCard } from 'app/styles';
import Fucker from 'components/Fucker';
import { Map } from 'components/PropertyMap';

export const Building = () => {
  const buildingId = useParam('buildingId', 'number');
  const [building] = useQuery(getBuilding, { where: { id: buildingId } });

  const title = `${building?.location_street_address}${
    building?.location_street_number ? ' ' + building.location_street_number : ''
  }, ${building?.location_post_number} Helsinki`;

  return (
    <MainLayout>
      <Header>
        <Title>{title}</Title>
      </Header>

      <Content>
        <ContentWrapper>
          <Column className="map-column">
            <Map setBuildingId={() => undefined} />

            <ImageRow>
              <RowItem>
                <BuildingImage src="https://cataas.com/cat" />
              </RowItem>

              <RowItem>
                <BuildingImage src="https://cataas.com/cat" />
              </RowItem>

              <RowItem>
                <BuildingImage src="https://cataas.com/cat" />
              </RowItem>
            </ImageRow>
          </Column>

          <Column>
            <Card>
              <SubTitle>General info</SubTitle>
              <DataList>
                <DataItem>
                  Year of construction: {building?.construction_date?.getFullYear()}
                </DataItem>
                <DataItem>Heating: {building?.heating_category}</DataItem>
                <DataItem>Source of heat: {building?.fuel_category}</DataItem>
                <DataItem>Building material: {building?.construction_material}</DataItem>
                <DataItem>Living area: {building?.area_living} m2</DataItem>
                <pre>{JSON.stringify(building, null, 2)}</pre>
              </DataList>
            </Card>

            <Fucker category="Energy efficiency" kpi="33%" />

            <Fucker category="Repair debt" kpi="12%" />

            <Fucker category="Improvement potential" kpi="69%" />
          </Column>
        </ContentWrapper>
      </Content>
    </MainLayout>
  );
};

const MainLayout = styled.main`
  min-height: 100vh;
`;

const Header = styled.header`
  min-height: ${(p) => p.theme.rem(300)};
  max-height: ${(p) => p.theme.rem(400)};
  background-image: linear-gradient(
      to bottom,
      ${(p) => `${p.theme.colors.turquoise}cc`},
      ${(p) => `${p.theme.colors.turquoise}cc`}
    ),
    url('https://www.alvsbytalo.fi/globalassets/houses/lasse/finland/lasse_alvsbytalo_talopaketti_harmaa_1600x900_200619.jpg?w=1920&h=888&mode=crop&scale=both&quality=70');
  background-size: cover;

  display: grid;
  grid-template-columns: 1fr min(${(p) => p.theme.rem(1000)}, 100%) 1fr;
  align-items: center;

  & > * {
    grid-column: 2;
  }
`;

const Title = styled.h1`
  color: ${(p) => p.theme.colors.white};
  font-size: ${(p) => p.theme.rem(48)};
  text-shadow: ${(p) => p.theme.shadow.text};
`;

const Content = styled.section`
  display: grid;
  grid-template-columns:
    1fr
    min(${(p) => p.theme.rem(1000)}, 100%)
    1fr;
  align-items: center;
  margin-top: -${(p) => p.theme.rem(48)};
  & > * {
    grid-column: 2;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(p) => p.theme.rem(48)};
`;

const Column = styled.section`
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 1rem;
  }
  &.map-column > div {
    max-height: ${(p) => p.theme.rem(400)};
  }
`;

const Card = styled(OriginalCard)`
  width: 100%;
`;

const SubTitle = styled.h2`
  color: #000;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  line-height: 1.3;
  margin-bottom: 1rem;
`;

const DataList = styled.ul`
  list-style: none;
  padding: 0;
`;

const DataItem = styled.li`
  & + & {
    margin-top: 0.5rem;
  }
`;

const ImageRow = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
`;

const RowItem = styled.li`
  height: ${(p) => p.theme.rem(150)};
  width: 100%;
  & + & {
    margin-left: 1rem;
  }
`;

const BuildingImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: ${(p) => p.theme.shadow.default};
  border-radius: ${(p) => p.theme.borderRadius.default};
`;

const ShowBuildingPage: BlitzPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Building />
  </Suspense>
);

ShowBuildingPage.getLayout = (page) => <Layout title={'Building'}>{page}</Layout>;

export default ShowBuildingPage;
