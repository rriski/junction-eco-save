import { Suspense } from 'react';

import { BlitzPage } from 'blitz';

import Hero from 'components/Hero';
import { DotsLoadingText } from 'components/Loaders/Dots';
import PropertyMap from 'components/PropertyMap';
import SavedProperties from 'components/SavedProperties';
import Search from 'components/Search';
import Layout from 'layouts/Layout';

const Index: BlitzPage = () => {
  return (
    <Suspense fallback={<DotsLoadingText>Ladataan</DotsLoadingText>}>
      <Layout title="Boi :D">
        <Hero
          title="Timon hieno kartta"
          image="https://www.alvsbytalo.fi/globalassets/houses/lasse/finland/lasse_alvsbytalo_talopaketti_harmaa_1600x900_200619.jpg?w=1920&h=888&mode=crop&scale=both&quality=70"
          color="turquoise"
          icon
        />

        <PropertyMap />

        <SavedProperties />
      </Layout>
    </Suspense>
  );
};

export default Index;
