import React, { Suspense } from 'react';

import { useQuery, useParam, BlitzPage, NotFoundError } from 'blitz';
import styled from 'styled-components';

import getBuilding from 'app/buildings/queries/getBuilding';
import Layout from 'app/layouts/Layout';
import { Card as OriginalCard } from 'app/styles';
import { calculateRepairDebt, getImprovable, getOffers } from 'app/utils/buildingScores';
import { AdvancedFucker } from 'components/Fucker';
import Hero from 'components/Hero';
import { DotsLoadingText } from 'components/Loaders/Dots';
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
  if (!building) throw NotFoundError;

  const improvable = getImprovable(building);
  const debts = calculateRepairDebt(building);
  const offers = getOffers(building);

  const title = `${building?.location_street_address}${
    building?.location_street_number ? ' ' + building.location_street_number : ''
  }, ${building?.location_post_number} Helsinki`;

  return (
    <Layout>
      <Hero title={title} image={building.image_url} goBack />

      <Content>
        <ContentWrapper>
          <Column className="map-column">
            <Map selectedBuildingId={building.building_id} />

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
            {improvable && (
              <AdvancedFucker
                title="Electric improvement potential"
                value={improvable}
                thresholds={{ low: 0, high: 30 }}
                unit="%"
              />
            )}
            {offers && (
              <AdvancedFucker
                title="Investing in solar panels would pay the investment back in"
                value={offers.payback_time}
                thresholds={{ low: 0, high: 30 }}
                unit="years"
              />
            )}

            {building?.Renovation?.length !== 0 && (
              <HistoryWrapper>
                <SubTitle>History</SubTitle>
                <RenovationList>
                  {building.Renovation?.sort((a, b) => b.end_year - a.end_year).map((reno) => {
                    const renoYears = `${reno.start_year}${
                      reno.end_year && reno.start_year != reno.end_year ? ` - ${reno.end_year}` : ''
                    }`;
                    return (
                      <RenovationItem key={reno.id}>
                        <RenovationTitle>
                          <RenovationYears>{renoYears}</RenovationYears>
                          {getIconFromCategory(reno.category as any)}
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
    </Layout>
  );
};

const MainLayout = styled.main`
  min-height: 100vh;
`;

const Content = styled.section`
  display: grid;
  align-items: center;
  grid-template-columns:
    1fr
    min(${(p) => p.theme.rem(1000)}, 100%)
    1fr;
  & > * {
    grid-column: 2;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  gap: ${(p) => p.theme.rem(48)};
  grid-template-columns: 1fr 1fr;
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
  margin-bottom: 1rem;
  color: #000;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  line-height: 1.3;
`;

const DataList = styled.ul`
  padding: 0;
  list-style: none;
`;

const DataItem = styled.li`
  & + & {
    margin-top: 0.5rem;
  }
`;

const ImageRow = styled.ul`
  display: flex;
  padding: 0;
  list-style: none;
`;

const RowItem = styled.li`
  width: 100%;
  height: ${(p) => p.theme.rem(150)};
  & + & {
    margin-left: 1rem;
  }
`;

const BuildingImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${(p) => p.theme.borderRadius.default};
  box-shadow: ${(p) => p.theme.shadow.default};
  object-fit: cover;
`;

const HistoryWrapper = styled.section`
  padding: 1rem;
  margin-top: 2rem;
`;

const RenovationList = styled.ul`
  position: relative;
  padding-left: 2rem;
  border-left: 0.5rem solid ${(p) => p.theme.colors['grey-light']};
  margin-top: 2rem;
  margin-left: 1rem;
  list-style: none;
`;

const RenovationItem = styled.li`
  position: relative;

  &:before {
    position: absolute;
    left: -3.5rem;
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    border: 0.5rem solid ${(p) => p.theme.colors['grey-light']};
    margin-top: -0.6rem;
    background-color: ${(p) => p.theme.colors.white};
    border-radius: 999px;
    content: '';
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
  margin-bottom: 1rem;
  color: #000;
  font-size: 1.5rem;

  & > svg {
    position: absolute;
    top: -1.25rem;
    left: -4.25rem;
    width: 4rem;
    height: 4rem;
    border: 0.5rem solid ${(p) => p.theme.colors.white};
    background-color: ${(p) => p.theme.colors.white};
  }
`;

const ShowBuildingPage: BlitzPage = () => (
  <Suspense fallback={<DotsLoadingText>Ladataan...</DotsLoadingText>}>
    <Building />
  </Suspense>
);

ShowBuildingPage.getLayout = (page) => <Layout title={'Building'}>{page}</Layout>;

export default ShowBuildingPage;
