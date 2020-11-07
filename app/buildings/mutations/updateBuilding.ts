import { Ctx } from 'blitz';

import db, { BuildingUpdateArgs } from 'db';

type UpdateBuildingInput = Pick<BuildingUpdateArgs, 'where' | 'data'>;

export default async function updateBuilding({ where, data }: UpdateBuildingInput, ctx: Ctx) {
  ctx.session.authorize();

  const building = await db.building.update({ where, data });

  return building;
}
