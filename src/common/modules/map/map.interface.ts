import {MapTypes} from 'react-native-maps';
import {GenericActions} from '../../interfaces/reducers';
import {MapActionsType} from './map.constants';

export type MapActionChangeConfiguration =
  | MapActionsType.CHANGE_MAP_TYPE
  | MapActionsType.CHANGE_SEARCH_AROUND_ME
  | MapActionsType.CHANGE_SEARCH_AROUND_POINT;

export type MapActionChangeExtraFilter =
  | MapActionsType.CHANGE_FILTER_REGION
  | MapActionsType.CHANGE_FILTER_PROVINCE
  | MapActionsType.CHANGE_BNB_FLAG
  | MapActionsType.CHANGE_REST_FLAG
  | MapActionsType.CHANGE_EXTRA_FILTER
  | MapActionsType.RESET_EXTRA_FILTER;

export interface IMapActionProvider {
  changeConfiguration: (
    what: MapActionChangeConfiguration,
    data: MapTypes | number,
  ) => Promise<void>;
  changeExtraFilter: (
    what: MapActionChangeExtraFilter,
    data: string | boolean | IMapExtraFilterData,
  ) => Promise<void>;
}

export interface IMapConfigurationData {
  mapsType: MapTypes;
  searchAroundMeRadius: number;
  searchAroundPointRadius: number;
}

export interface IMapExtraFilterData {
  region?: string;
  province?: string;
  withBnB?: boolean;
  withRestaurant?: boolean;
  //filterReset?: boolean;
}

export interface IMapContextData {
  configuration: IMapConfigurationData;
  extraFilter: IMapExtraFilterData;
}

export interface MapState {
  data: IMapContextData;
  actionProvider?: IMapActionProvider;
}

export interface MapActions
  extends GenericActions<
    MapActionsType,
    MapTypes | number | string | boolean | IMapExtraFilterData
  > {}
