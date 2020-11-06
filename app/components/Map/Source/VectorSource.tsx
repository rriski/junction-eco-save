import VectorSource from 'ol/source/Vector';

function Vector({features}) {
  return new VectorSource({
    features
  });
}

export default Vector;