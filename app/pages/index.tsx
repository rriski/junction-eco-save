import { Suspense } from 'react';

import { BlitzPage } from 'blitz';
import { useRouter } from 'next/router';

import Hero from 'components/Hero';
import PropertyMap from 'components/PropertyMap';
import SavedProperties from 'components/SavedProperties';
import Layout from 'layouts/Layout';

const Index: BlitzPage = () => {
  const router = useRouter();

  return (
    <Suspense fallback="Loading...">
      <Layout title="Boi :D">
        <Hero
          title="Turtuli"
          image="https://www.alvsbytalo.fi/globalassets/houses/lasse/finland/lasse_alvsbytalo_talopaketti_harmaa_1600x900_200619.jpg?w=1920&h=888&mode=crop&scale=both&quality=70"
        />

        <PropertyMap />

        <SavedProperties />
      </Layout>
    </Suspense>
  );
};

export default Index;
