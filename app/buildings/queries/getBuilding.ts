import { Ctx, NotFoundError } from 'blitz';

import db, { FindFirstBuildingArgs } from 'db';

type GetBuildingInput = Pick<FindFirstBuildingArgs, 'where'>;

export default async function getBuilding({ where }: GetBuildingInput, ctx: Ctx) {
  const building = await db.building.findFirst({ where });

  if (!building) throw new NotFoundError();

  return building;
}
