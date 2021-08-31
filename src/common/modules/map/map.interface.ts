import {MapTypes} from 'react-native-maps';
import {MapActionsType} from './map.constants';

export interface IMapActionProvider {
  changeData: (what: MapActionsType, data: MapTypes | number) => Promise<void>;
}

export interface IMapContextData {
  mapsType: MapTypes;
  searchAroundMeRadius: number;
  searchAroundPointRadius: number;
}

export interface MapState {
  data: IMapContextData;
  actionProvider?: IMapActionProvider;
}

export interface MapActions<T = MapTypes | number> {
  type: MapActionsType;
  payload?: T;
}
