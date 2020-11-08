import { Fill, Stroke, Style } from 'ol/style';

import theme from 'styles/theme';

const styles = {
  Buildings: new Style({
    stroke: new Stroke({
      color: theme.colors.teal,
      lineDash: [1],
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 0, 0.05)',
    }),
  }),
  HighlightedBuilding: new Style({
    stroke: new Stroke({
      color: theme.colors.red,
      lineDash: [1],
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(255, 200, 0, 0.4)',
    }),
  }),
};

export default styles;
