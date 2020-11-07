import VectorSource, { Options } from 'ol/source/Vector';

function Vector({ features }: Options): VectorSource {
  return new VectorSource({
    features,
  });
}

export default Vector;
