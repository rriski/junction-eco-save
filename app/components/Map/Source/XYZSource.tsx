import XYZ, { Options } from 'ol/source/XYZ';

function XYZSource({ url, attributions, maxZoom }: Options): XYZ {
  return new XYZ({ url, attributions, maxZoom });
}

export default XYZSource;
