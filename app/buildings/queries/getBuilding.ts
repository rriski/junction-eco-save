import { Ctx } from 'blitz';

import db, { FindFirstBuildingArgs } from 'db';

type GetBuildingInput = Pick<FindFirstBuildingArgs, 'where'>;

export default async function getBuilding({ where }: GetBuildingInput, ctx: Ctx) {
  const building = await db.building.findFirst({ where });

  return building;
}
