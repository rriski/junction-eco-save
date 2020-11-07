import React from 'react';
import Layout from 'app/layouts/Layout';
import { Link, useRouter, useMutation, BlitzPage } from 'blitz';
import createBuilding from 'app/buildings/mutations/createBuilding';
import BuildingForm from 'app/buildings/components/BuildingForm';

const NewBuildingPage: BlitzPage = () => {
  const router = useRouter();
  const [createBuildingMutation] = useMutation(createBuilding);

  return (
    <div>
      <h1>Create New Building</h1>

      <BuildingForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const building = await createBuildingMutation({ data: { name: 'MyName' } });
            alert('Success!' + JSON.stringify(building));
            router.push('/buildings/[buildingId]', `/buildings/${building.id}`);
          } catch (error) {
            alert('Error creating building ' + JSON.stringify(error, null, 2));
          }
        }}
      />

      <p>
        <Link href="/buildings">
          <a>Buildings</a>
        </Link>
      </p>
    </div>
  );
};

NewBuildingPage.getLayout = (page) => <Layout title={'Create New Building'}>{page}</Layout>;

export default NewBuildingPage;
