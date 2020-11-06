import XYZ from 'ol/source/XYZ';

function XYZSource({url, attributions, maxZoom}) {
  return new XYZ({url, attributions, maxZoom});
}

export default XYZSource;