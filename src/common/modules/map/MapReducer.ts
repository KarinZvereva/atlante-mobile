import {MapTypes} from 'react-native-maps';
import {MapActionsType} from './map.constants';
import {MapActions} from './map.interface';
import {IMapContextData} from './map.interface';

export const InitialMapState: IMapContextData = {
  mapsType: 'standard',
  searchAroundMeRadius: 40,
  searchAroundPointRadius: 40,
};

export const MapReducer: React.Reducer<IMapContextData, MapActions> = (
  prevState: IMapContextData,
  action: MapActions,
) => {
  switch (action.type) {
    case MapActionsType.CHANGE_MAP_TYPE:
      return {...prevState, mapsType: action.payload as MapTypes};
    case MapActionsType.CHANGE_SEARCH_AROUND_ME:
      return {...prevState, searchAroundMeRadius: action.payload as number};
    case MapActionsType.CHANGE_SEARCH_AROUND_POINT:
      return {...prevState, searchAroundPointRadius: action.payload as number};
    default:
      return {...prevState};
  }
};
