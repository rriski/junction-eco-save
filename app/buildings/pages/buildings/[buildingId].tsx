import React, { Suspense } from 'react';

import { useQuery, useParam, BlitzPage } from 'blitz';
import styled from 'styled-components';

import getBuilding from 'app/buildings/queries/getBuilding';
import Layout from 'app/layouts/Layout';
import { Card as OriginalCard } from 'app/styles';
import { calculateRepairDebt } from 'app/utils/buildingScores';
import Fucker, { AdvancedFucker } from 'components/Fucker';
import { Map } from 'components/PropertyMap';
import FacadeIcon from 'static/svg/julkisivu.svg';
import RoofIcon from 'static/svg/kattoremppa.svg';
import PipesIcon from 'static/svg/putki.svg';

const getIconFromCategory = (category: 'pipes' | 'facade' | 'roof' | undefined) => {
  if (category === 'pipes') return <PipesIcon />;
  else if (category === 'facade') return <FacadeIcon />;
  else if (category === 'roof') return <RoofIcon />;
  else return null;
};

export const Building = () => {
  const buildingId = useParam('buildingId', 'number');
  const [building] = useQuery(getBuilding, { where: { id: buildingId } });

  const debts = calculateRepairDebt(building);

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
              </DataList>
            </Card>

            <Fucker category="Energy efficiency" kpi="33%" />
            <AdvancedFucker
              title="Pipe repair debt"
              value={debts.pipes}
              thresholds={debts.thresholds.pipes}
            />
            <AdvancedFucker
              title="Facade repair debt"
              value={debts.facade}
              thresholds={debts.thresholds.facade}
            />
            <AdvancedFucker
              title="Roof repair debt"
              value={debts.roof}
              thresholds={debts.thresholds.roof}
            />
            <Fucker category="Improvement potential" kpi="69%" />

            {building?.Renovation && (
              <HistoryWrapper>
                <SubTitle>History</SubTitle>
                <RenovationList>
                  {building.Renovation.sort((a, b) => b.end_year - a.end_year).map((reno) => {
                    const renoYears = `${reno.start_year}${
                      reno.end_year && reno.start_year != reno.end_year ? ` - ${reno.end_year}` : ''
                    }`;
                    return (
                      <RenovationItem key={reno.id}>
                        <RenovationTitle>
                          <RenovationYears>{renoYears}</RenovationYears>
                          {getIconFromCategory(reno.category)}
                        </RenovationTitle>
                        {reno.description}
                      </RenovationItem>
                    );
                  })}
                </RenovationList>
              </HistoryWrapper>
            )}
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

const HistoryWrapper = styled.section`
  margin-top: 2rem;
  padding: 1rem;
`;

const RenovationList = styled.ul`
  list-style: none;
  padding-left: 2rem;
  margin-left: 1rem;
  margin-top: 2rem;
  border-left: 0.5rem solid ${(p) => p.theme.colors['grey-light']};
`;

const RenovationItem = styled.li`
  position: relative;

  &:before {
    content: '';
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    left: -3.5rem;
    margin-top: -0.6rem;
    border-radius: 999px;
    background-color: ${(p) => p.theme.colors.white};
    border: 0.5rem solid ${(p) => p.theme.colors['grey-light']};
  }

  & + & {
    margin-top: 3rem;
  }
`;

const RenovationYears = styled.div`
  color: ${(p) => p.theme.colors['grey-dark']};
  font-size: 1rem;
  font-weight: bold;
`;

const RenovationTitle = styled.h3`
  color: #000;
  font-size: 1.5rem;
  margin-bottom: 1rem;

  & > svg {
    width: 4rem;
    height: 4rem;
    position: absolute;
    top: -1.25rem;
    left: -4.25rem;
    background-color: ${(p) => p.theme.colors.white};
    border: 0.5rem solid ${(p) => p.theme.colors.white};
  }
`;

const ShowBuildingPage: BlitzPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Building />
  </Suspense>
);

ShowBuildingPage.getLayout = (page) => <Layout title={'Building'}>{page}</Layout>;

export default ShowBuildingPage;
