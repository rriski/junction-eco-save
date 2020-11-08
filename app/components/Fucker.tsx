import styled from 'styled-components';

import InfoModal from 'components/InfoModal';
import { Text } from 'styles/typography';

type FuckerProps = {
  type: 'pipe' | 'facade' | 'roof' | 'electric' | 'solar';
  title: string;
  value: number;
  thresholds: { low: number; high: number };
  unit?: string;
  inverse?: boolean;
  includeInfo?: boolean;
};

const modalContents = {
  pipe: {
    content:
      'Plumbing renovation should be done approximately every 50 years. The score is the difference between the last pipe renovation and the optimal interval of pipe renovation. A negative score means that a renovation is already due. A positive score indicates that the plumbing should still last as many years as the score.',
  },
  facade: {
    content:
      'Facade renovation should be done approximately every 30-80 years depending on the facade material. The score is the difference between the last facade renovation and the optimal interval of facade renovation. A negative score means that a renovation is already due. A positive score indicates that the facade should still last as many years as the score.',
  },
  roof: {
    content:
      'Roof renovation should be done approximately every 35 years. The score is the difference between the last roof renovation and the optimal interval of roof renovation. A negative score means that a renovation is already due. A positive score indicates that the roof should still last as many years as the score.',
  },
  electric: {
    content:
      'Electric improvement potential indicates how much of the buildings electrical needs could be covered via photovoltaic energy (solar panels).',
  },
  solar: {
    content: 'The estimate is based on current technology and electricity prices.',
  },
};

export const AdvancedFucker = ({
  type,
  title,
  value,
  thresholds,
  unit,
  inverse,
  includeInfo = false,
}: FuckerProps) => {
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
      {includeInfo && (
        <InfoModal
          metric={`${value} ${unit ? ' ' + unit : ''}`}
          title={title}
          content={modalContents[type]?.content}
        />
      )}
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
  grid-template-columns: auto 1fr auto auto;
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
