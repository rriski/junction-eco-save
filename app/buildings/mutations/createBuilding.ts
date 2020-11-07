import { Ctx } from 'blitz';

import db, { BuildingCreateArgs } from 'db';

type CreateBuildingInput = Pick<BuildingCreateArgs, 'data'>;
export default async function createBuilding({ data }: CreateBuildingInput, ctx: Ctx) {
  ctx.session.authorize();

  const building = await db.building.create({ data });

  return building;
}
