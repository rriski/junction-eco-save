import { Suspense } from 'react';

import { BlitzPage, Link, useMutation, useParam, useQuery, useRouter } from 'blitz';

import BuildingForm from 'app/buildings/components/BuildingForm';
import updateBuilding from 'app/buildings/mutations/updateBuilding';
import getBuilding from 'app/buildings/queries/getBuilding';
import Layout from 'app/layouts/Layout';
import { DotsLoadingText } from 'components/Loaders/Dots';

export const EditBuilding = () => {
  const router = useRouter();
  const buildingId = useParam('buildingId', 'number');
  const [building, { mutate }] = useQuery(getBuilding, { where: { id: buildingId } });
  const [updateBuildingMutation] = useMutation(updateBuilding);

  return (
    <div>
      <h1>Edit Building {(building as any).id}</h1>
      <pre>{JSON.stringify(building)}</pre>

      <BuildingForm
        initialValues={building}
        onSubmit={async () => {
          try {
            const updated = await updateBuildingMutation({
              where: { id: building!.id },
              data: { name: 'MyNewName' } as any,
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
      <Suspense fallback={<DotsLoadingText>Ladataan...</DotsLoadingText>}>
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
