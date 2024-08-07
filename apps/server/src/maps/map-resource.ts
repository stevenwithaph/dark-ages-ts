import { MapInfo } from './map-info';

export interface MapResource {
  info: MapInfo;
  data: Uint16Array;
}
