import React, { Suspense } from 'react';

import { Link, usePaginatedQuery, useRouter, BlitzPage } from 'blitz';

import getBuildings from 'app/buildings/queries/getBuildings';
import Layout from 'app/layouts/Layout';

const ITEMS_PER_PAGE = 100;

export const BuildingsList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ buildings, hasMore }] = usePaginatedQuery(getBuildings, {
    orderBy: { id: 'asc' },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {buildings.map((building) => (
          <li key={building.id}>
            <Link href="/buildings/[buildingId]" as={`/buildings/${building.id}`}>
              <a>{building.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const BuildingsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/buildings/new">
          <a>Create Building</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <BuildingsList />
      </Suspense>
    </div>
  );
};

BuildingsPage.getLayout = (page) => <Layout title={'Buildings'}>{page}</Layout>;

export default BuildingsPage;
