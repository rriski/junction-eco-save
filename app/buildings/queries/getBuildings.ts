import { Ctx } from 'blitz';

import db, { FindManyBuildingArgs } from 'db';

type GetBuildingsInput = Pick<FindManyBuildingArgs, 'where' | 'orderBy' | 'skip' | 'take'>;

export default async function getBuildings(
  { where, orderBy, skip = 0, take }: GetBuildingsInput,
  ctx: Ctx
) {
  ctx.session.authorize();

  const buildings = await db.building.findMany({
    where,
    orderBy,
    take,
    skip,
  });

  const count = await db.building.count();
  const hasMore = typeof take === 'number' ? skip + take < count : false;
  const nextPage = hasMore ? { take, skip: skip + take! } : null;

  return {
    buildings,
    nextPage,
    hasMore,
    count,
  };
}
