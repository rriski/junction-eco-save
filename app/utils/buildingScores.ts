import getBuilding from 'app/buildings/queries/getBuilding';

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
type Building = ThenArg<ReturnType<typeof getBuilding>>;
type Category = 'pipes' | 'facade' | 'roof';

export function calculateRepairDebt(building: Building) {
  const getLatest = (category: Category) =>
    building!.Renovation?.reduce(
      (max, curr) =>
        curr.category === category ? (curr.end_year > max ? curr.end_year : max) : max,
      0
    ) || 0;

  const weights = {
    pipes: 50,
    facade: {
      Puu: 50,
      Rappaus: 80,
      Tiili: 80,
      'Betoni tai kevytbetoni': 45,
      Muu: 50,
      Teräs: 50,
    },
    roof: 35,
  };

  const buildingMaterial = building!.construction_material as keyof typeof weights.facade;
  const yearBuilt = building!.construction_date?.getFullYear() as number;

  const getYearDiff = (cat: Category) => (getLatest(cat) || yearBuilt) - new Date().getFullYear();

  const pipeDiff = getYearDiff('pipes');
  const facadeDiff = getYearDiff('facade');
  const roofDiff = getYearDiff('roof');

  const pipeValue = weights.pipes + pipeDiff;
  const facadeValue = weights.facade[buildingMaterial] + facadeDiff;
  const roofValue = weights.roof + roofDiff;

  return {
    pipes: pipeValue,
    facade: facadeValue,
    roof: roofValue,
    thresholds: {
      pipes: { low: (weights.pipes / 2) * -1, high: weights.pipes / 2 },
      facade: {
        low: (weights.facade[buildingMaterial] / 2) * -1,
        high: weights.facade[buildingMaterial] / 2,
      },
      roof: { low: (weights.roof / 2) * -1, high: weights.roof / 2 },
    },
  };
}
