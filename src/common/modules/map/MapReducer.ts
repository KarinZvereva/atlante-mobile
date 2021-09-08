import {MapTypes} from 'react-native-maps';
import {MapActionsType} from './map.constants';
import {IMapContextData, MapActions} from './map.interface';

export const InitialMapState: IMapContextData = {
  configuration: {
    mapsType: 'standard',
    searchAroundMeRadius: 40,
    searchAroundPointRadius: 40,
  },
  extraFilter: {},
};

export const MapReducer: React.Reducer<IMapContextData, MapActions> = (
  prevState: IMapContextData,
  action: MapActions,
) => {
  switch (action.type) {
    case MapActionsType.CHANGE_MAP_TYPE:
      return {
        ...prevState,
        configuration: {
          ...prevState.configuration,
          mapsType: action.payload as MapTypes,
        },
      };
    case MapActionsType.CHANGE_SEARCH_AROUND_ME:
      return {
        ...prevState,
        configuration: {
          ...prevState.configuration,
          searchAroundMeRadius: action.payload as number,
        },
      };
    case MapActionsType.CHANGE_SEARCH_AROUND_POINT:
      return {
        ...prevState,
        configuration: {
          ...prevState.configuration,
          searchAroundPointRadius: action.payload as number,
        },
      };
    case MapActionsType.CHANGE_FILTER_REGION:
      return {
        ...prevState,
        extraFilter: {
          ...prevState.extraFilter,
          region: action.payload as string,
        },
      };
    case MapActionsType.CHANGE_FILTER_PROVINCE:
      return {
        ...prevState,
        extraFilter: {
          ...prevState.extraFilter,
          province: action.payload as string,
        },
      };
    case MapActionsType.CHANGE_BNB_FLAG:
      return {
        ...prevState,
        extraFilter: {
          ...prevState.extraFilter,
          withBnB: action.payload as boolean,
        },
      };
    case MapActionsType.CHANGE_REST_FLAG:
      return {
        ...prevState,
        extraFilter: {
          ...prevState.extraFilter,
          withRestaurant: action.payload as boolean,
        },
      };
    case MapActionsType.RESET_EXTRA_FILTER:
      return {
        ...prevState,
        extraFilter: {},
      };
    default:
      return {...prevState};
  }
};
