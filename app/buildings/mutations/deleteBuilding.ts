import { Ctx } from 'blitz';

import db, { BuildingDeleteArgs } from 'db';

type DeleteBuildingInput = Pick<BuildingDeleteArgs, 'where'>;

export default async function deleteBuilding({ where }: DeleteBuildingInput, ctx: Ctx) {
  ctx.session.authorize();

  const building = await db.building.delete({ where });

  return building;
}
