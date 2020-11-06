import styled from 'styled-components';

import { Text } from 'styles/typography'
import { KPI } from 'types/index';

const Fucker = ({ category, kpi }: KPI) => {
  return (
    <PillBadge>
      <Indicator />

      <Text>{category}</Text>

      <Text weight="bold">{kpi}</Text>
    </PillBadge>
  )
}
const PillBadge = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: ${p => p.theme.spacing.default};
  align-items: center;
  padding: ${p => p.theme.spacing.default} ${p => p.theme.spacing.medium};
  border-radius: 999px;
  background-color: ${p => p.theme.colors.white};
  box-shadow: ${p => p.theme.shadow.default};
`

const Indicator = styled.div`
  width: ${p => p.theme.rem(15)};
  height: ${p => p.theme.rem(15)};
  border-radius: 999px;
  background-color: ${p => p.theme.colors.primary};
`

export default Fucker;