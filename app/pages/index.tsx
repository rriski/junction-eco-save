import React from 'react'

import Head from 'components/Head';
import Hero from 'components/Hero';
import PropertyMap from 'components/PropertyMap';
import SavedProperties from 'components/SavedProperties';
import { Page } from 'styles/index'

const Index = () => {
  return (
    <Page>
      <Head title="Main page" />

      <Hero title="Turtuli" image="https://www.alvsbytalo.fi/globalassets/houses/lasse/finland/lasse_alvsbytalo_talopaketti_harmaa_1600x900_200619.jpg?w=1920&h=888&mode=crop&scale=both&quality=70" />

      <PropertyMap />

      <SavedProperties />
    </Page>
  )
}

export default Index;
