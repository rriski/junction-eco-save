import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

import theme from 'styles/theme';

const styles = {
  Point: new Style({
    image: new CircleStyle({
      radius: 10,
      fill: undefined,
      stroke: new Stroke({
        color: theme.colors.magenta,
      }),
    }),
  }),
  Polygon: new Style({
    stroke: new Stroke({
      color: theme.colors.teal,
      lineDash: [1],
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.15)',
    }),
  }),
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: theme.colors.red,
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.15)',
    }),
  }),
};

export default styles;
