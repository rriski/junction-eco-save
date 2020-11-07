import styled from 'styled-components';
import { Stack } from 'styled-layout';

import Fucker from 'components/Fucker'
import { Card } from 'styles/index'
import { Subtitle, Text } from 'styles/typography'
import { Property } from 'types/index';

const DetailsCard = (property: Property) => (
  <Wrapper>
    <Card spacing="medium">
      <Subtitle>{property.address}, {property.postalCode}, {property.city}</Subtitle>

      <table>
        <tbody>
          <tr>
            <td><Text>EcoSave potential</Text></td>
            <td><Text weight="bold">{property.ecosave} %</Text></td>
          </tr>

          <tr>
            <td><Text>Last renovation</Text></td>
            <td><Text weight="bold">{property.lastRenovation}</Text></td>
          </tr>
        </tbody>
      </table>
    </Card>

    <Fucker indicator={20} category="Energy consumption" kpi="2000 kW" />

    <Fucker indicator={20} category="Energy consumption" kpi="2000 kW" />
  </Wrapper>
)

const Wrapper = styled(Stack)`
  padding: ${p => p.theme.spacing.default};
`

export default DetailsCard;