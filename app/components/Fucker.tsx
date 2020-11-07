import styled from 'styled-components';

import { Text } from 'styles/typography';
import { KPI } from 'types/index';

const Fucker = ({ category, kpi }: KPI) => {
  return (
    <PillBadge>
      <Indicator />

      <Text>{category}</Text>

      <Text weight="bold">{kpi}</Text>
    </PillBadge>
  );
};

const PillBadge = styled.div`
  display: grid;
  align-items: center;
  padding: ${(p) => p.theme.spacing.default} ${(p) => p.theme.spacing.medium};
  background-color: ${(p) => p.theme.colors.white};
  border-radius: 999px;
  box-shadow: ${(p) => p.theme.shadow.default};
  gap: ${(p) => p.theme.spacing.default};
  grid-template-columns: auto 1fr auto;
`;

const Indicator = styled.div<{ what?: 'good' | 'ok' | 'bad' }>`
  width: ${(p) => p.theme.rem(15)};
  height: ${(p) => p.theme.rem(15)};
  background-color: ${(p) =>
    p.what === 'good'
      ? p.theme.colors.primary
      : p.what === 'ok'
      ? p.theme.colors.orangeish
      : p.what === 'bad'
      ? p.theme.colors.red
      : p.theme.colors.grey};
  border-radius: 999px;
`;

export default Fucker;

type FuckerProps = {
  title: string;
  value: number;
  thresholds: { low: number; high: number };
  unit?: string;
  inverse?: boolean;
};

export const AdvancedFucker = ({ title, value, thresholds, unit, inverse }: FuckerProps) => {
  return (
    <PillBadge>
      <Indicator
        what={
          inverse
            ? value > thresholds.high
              ? 'bad'
              : value > thresholds.low
              ? 'ok'
              : 'good'
            : value < thresholds.low
            ? 'bad'
            : value < thresholds.high
            ? 'ok'
            : 'good'
        }
      />

      <Text>{title}</Text>

      <Text weight="bold">
        {value}
        {unit ? ' ' + unit : ''}
      </Text>
    </PillBadge>
  );
};
