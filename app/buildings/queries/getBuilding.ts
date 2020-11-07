import { Ctx } from 'blitz';

import db, { FindFirstBuildingArgs, Building } from 'db';

type GetBuildingInput = Pick<FindFirstBuildingArgs, 'where'>;

type energy_data = {
  heating: number;
  electricity: number;
};

type ApiBuilding =
  | (Building & {
      energy_consumption?: energy_data;
    })
  | null;

type energy_consumption_options = {
  [key: string]: energy_data;
};

// from https://www.hel.fi/hel2/tietokeskus/data/dokumentit/data_atlas.pdf
const energy_consumption_omakotitalo: energy_consumption_options = {
  '201': {
    heating: 116,
    electricity: 12,
  },
  '200': {
    heating: 116,
    electricity: 12,
  },
  '199': {
    heating: 172,
    electricity: 10,
  },
  '198': {
    heating: 172,
    electricity: 10,
  },
  '197': {
    heating: 228,
    electricity: 8,
  },
  '196': {
    heating: 228,
    electricity: 8,
  },
}
const energy_consumption: energy_consumption_options = {
  '201': {
    heating: 82,
    electricity: 16,
  },
  '200': {
    heating: 112,
    electricity: 16,
  },
  '199': {
    heating: 132,
    electricity: 15,
  },
  '198': {
    heating: 135,
    electricity: 15,
  },
  '197': {
    heating: 136,
    electricity: 14,
  },
  '196': {
    heating: 140,
    electricity: 14,
  },
  '195': {
    heating: 143,
    electricity: 13,
  },
  '194': {
    heating: 147,
    electricity: 13,
  },
};

export default async function getBuilding({ where }: GetBuildingInput, ctx: Ctx) {
  const building: ApiBuilding = await db.building.findFirst({
    where,
    include: { Renovation: true },
  });

  if (building?.construction_date && (building.area_living || building.area_floors)) {
    const energy = building.category === "Omakotitalo" ?
    energy_consumption_omakotitalo[
      Math.floor(building.construction_date.getFullYear() / 10).toString()
    ] || {
      heating: 286,
      electricity: 8,
    }
    : energy_consumption[
      Math.floor(building.construction_date.getFullYear() / 10).toString()
    ] || {
      heating: 130,
      electricity: 12,
    };
    const area = building.area_living || building.area_floors;
    if (energy && area) {
      building.energy_consumption = {
        electricity: energy.electricity * area,
        heating: energy.heating * area,
      };
    }
  }
  /*
  {
    "pipes": 50,
    "facade": {
        "Puu": 50,
        "Rappaus": 80,
        "Tiili": 80,
        "Betoni tai kevytbetoni": 45,
        "Muu": 50,
        "Teräs": 50,
    },
    "roof": 35
  }
  */
  return building;
}
