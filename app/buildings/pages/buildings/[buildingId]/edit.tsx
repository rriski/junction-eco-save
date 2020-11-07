import React, { Suspense } from 'react';
import Layout from 'app/layouts/Layout';
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from 'blitz';
import getBuilding from 'app/buildings/queries/getBuilding';
import updateBuilding from 'app/buildings/mutations/updateBuilding';
import BuildingForm from 'app/buildings/components/BuildingForm';

export const EditBuilding = () => {
  const router = useRouter();
  const buildingId = useParam('buildingId', 'number');
  const [building, { mutate }] = useQuery(getBuilding, { where: { id: buildingId } });
  const [updateBuildingMutation] = useMutation(updateBuilding);

  return (
    <div>
      <h1>Edit Building {building.id}</h1>
      <pre>{JSON.stringify(building)}</pre>

      <BuildingForm
        initialValues={building}
        onSubmit={async () => {
          try {
            const updated = await updateBuildingMutation({
              where: { id: building.id },
              data: { name: 'MyNewName' },
            });
            await mutate(updated);
            alert('Success!' + JSON.stringify(updated));
            router.push('/buildings/[buildingId]', `/buildings/${updated.id}`);
          } catch (error) {
            console.log(error);
            alert('Error creating building ' + JSON.stringify(error, null, 2));
          }
        }}
      />
    </div>
  );
};

const EditBuildingPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditBuilding />
      </Suspense>

      <p>
        <Link href="/buildings">
          <a>Buildings</a>
        </Link>
      </p>
    </div>
  );
};

EditBuildingPage.getLayout = (page) => <Layout title={'Edit Building'}>{page}</Layout>;

export default EditBuildingPage;