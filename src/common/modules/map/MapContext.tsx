import React from 'react';
import {MapState} from './map.interface';
import {InitialMapState} from './MapReducer';

export const MapContext = React.createContext<MapState>({
  data: {...InitialMapState},
});
