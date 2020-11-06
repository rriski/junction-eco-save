import Hero from 'components/Header';
import { Content, Page } from 'styles/index'

const Index = () => {
  return (
    <Page>
      <Hero title="Turtuli" image="https://www.alvsbytalo.fi/globalassets/houses/lasse/finland/lasse_alvsbytalo_talopaketti_harmaa_1600x900_200619.jpg?w=1920&h=888&mode=crop&scale=both&quality=70" />

      <Content>
        Boi heroheroherohero
      </Content>
    </Page>
  )
}

export default Index;
