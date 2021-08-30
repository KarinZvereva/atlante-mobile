import {MapTypes} from 'react-native-maps';
import {MapActionsType} from './map.constants';

export interface IMapContextData {
  mapsType: MapTypes;
  searchAroundMeRadius: number;
  searchAroundPointRadius: number;
}

export interface MapActions<T = MapTypes | number> {
  type: MapActionsType;
  payload?: T;
}
