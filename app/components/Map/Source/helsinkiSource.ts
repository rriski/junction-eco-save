import { GeoJSON, WFS } from 'ol/format';
import { like as likeFilter } from 'ol/format/filter';
import { bbox } from 'ol/loadingstrategy';
import VectorSource from 'ol/source/Vector';

const API_URL_BASE = 'https://kartta.hel.fi/ws/geoserver/avoindata/wfs';

/** useless shit atm */
export function getFeaturesByBbox() {
  return new VectorSource({
    format: new GeoJSON(),
    url: (extent) => {
      return `${API_URL_BASE}${
        '?' +
        'version=1.1.0&request=GetFeature&typename=avoindata:Kiinteisto_alue&' +
        'outputFormat=application/json&srsname=EPSG:3857&' +
        'bbox='
      }${extent.join(',')},EPSG:3857`;
    },
    strategy: bbox,
  });
}

type CommonKeys = 'id' | 'datanomistaja' | 'paivitetty_tietopalveluun';

export type HelsinkiNamesKey =
  | 'kunta'
  | 'tyyppi'
  | 'nimi'
  | 'nimi_sv'
  | 'east_etrs_gk'
  | 'north_etrs_gk'
  | CommonKeys;

export type PropertyAreaKey =
  | 'kiinteistotunnus'
  | 'kiinteisto'
  | 'kunta'
  | 'sijaintialue'
  | 'ryhma'
  | 'yksikko'
  | 'rekisterointipvm'
  | 'luontipvm'
  | 'muokkauspvm'
  | CommonKeys;

type FeatureTypeKeys = {
  'avoindata:Helsinki_nimisto': HelsinkiNamesKey;
  'avoindata:Kiinteisto_alue': PropertyAreaKey;
};

export type FeatureType = keyof FeatureTypeKeys;

export async function getFeaturesByFilter<T extends FeatureType>(
  featureType: T,
  filterKey: FeatureTypeKeys[T],
  filterValue: string,
  vectorSource: VectorSource
) {
  const featureRequest = new WFS().writeGetFeature({
    srsName: 'EPSG:3857',
    featureTypes: [featureType],
    featureNS: '',
    featurePrefix: '',
    outputFormat: 'application/json',
    filter: likeFilter(filterKey, filterValue),
  });

  const response = await fetch(API_URL_BASE, {
    method: 'POST',
    body: new XMLSerializer().serializeToString(featureRequest),
  });
  const jsonResult = await response.json();
  const features = new GeoJSON().readFeatures(jsonResult);
  vectorSource.addFeatures(features);
}
