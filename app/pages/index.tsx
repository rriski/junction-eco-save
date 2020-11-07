<<<<<<< HEAD
import React from 'react'

<<<<<<< HEAD
import Head from 'components/Head';
import Hero from 'components/Hero';
import PropertyMap from 'components/PropertyMap';
import SavedProperties from 'components/SavedProperties';
import { Page } from 'styles/index'
=======

import Head from 'components/Head';
import Hero from 'components/Hero';
import {Card, Content, Page} from 'styles/index'
>>>>>>> 3452ce2... Lint stuff
=======
import React from 'react';

import Head from 'components/Head';
import Hero from 'components/Hero';
import { Card, Content, Page } from 'styles/index';
>>>>>>> 7936303... Stuff

const Index = () => {
  return (
    <Page>
      <Head title="Main page" />

      <Hero
        title="Turtuli"
        image="https://www.alvsbytalo.fi/globalassets/houses/lasse/finland/lasse_alvsbytalo_talopaketti_harmaa_1600x900_200619.jpg?w=1920&h=888&mode=crop&scale=both&quality=70"
      />

<<<<<<< HEAD
      <PropertyMap />

      <SavedProperties />
=======
      <Content>
        <Card>Tähän matskuu boi</Card>
      </Content>
>>>>>>> 7936303... Stuff
    </Page>
  );
};

export default Index;
