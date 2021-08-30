import React from 'react';
import {IMapContextData} from './map.interface';
import {InitialMapState} from './MapReducer';

export const MapContext = React.createContext<IMapContextData>({
  ...InitialMapState,
});
