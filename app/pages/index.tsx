import { useState, Suspense, useEffect } from 'react';

import { BlitzPage } from 'blitz';

import { getSavedBuildings } from 'app/utils/localStorage';
import Hero from 'components/Hero';
import { DotsLoadingText } from 'components/Loaders/Dots';
import PropertyMap from 'components/PropertyMap';
import SavedProperties from 'components/SavedProperties';
import { Building } from 'db';
import Layout from 'layouts/Layout';

const Index: BlitzPage = () => {
  const [savedBuildings, setSavedBuildings] = useState<Building[]>([]);

  useEffect(() => {
    const saved = getSavedBuildings();
    if (saved) {
      setSavedBuildings(saved);
    }
  }, []);

  return (
    <Suspense fallback={<DotsLoadingText>Ladataan...</DotsLoadingText>}>
      <Layout title="Eco Save">
        <Hero
          image="https://www.alvsbytalo.fi/globalassets/houses/lasse/finland/lasse_alvsbytalo_talopaketti_harmaa_1600x900_200619.jpg?w=1920&h=888&mode=crop&scale=both&quality=70"
          color="turquoise"
          icon
        >
          Katselmoi energiasäästösi kestävillä uusiutuvan energian kiinteistöratkaisuilla
        </Hero>

        <PropertyMap savedBuildings={savedBuildings} setSavedBuildings={setSavedBuildings} />

        <SavedProperties savedBuildings={savedBuildings} />
      </Layout>
    </Suspense>
  );
};

export default Index;
