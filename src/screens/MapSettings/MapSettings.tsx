import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, Switch} from 'react-native';
import {MapTypes} from 'react-native-maps';
import {defaultRed} from '../../common/constants';
import {MapActionsType} from '../../common/modules/map/map.constants';
import {MapContext} from '../../common/modules/map/MapContext';

export const MapSettings = () => {
  // Context
  const {data, actionProvider} = useContext(MapContext);

  // State
  const [mapType, setMapType] = useState<MapTypes>(data.mapsType);
  const [switchType, setSwitchType] = useState<boolean>(
    data.mapsType === 'standard' ? false : true,
  );

  useEffect(() => {
    if (switchType) setMapType('satellite');
    else setMapType('standard');
  }, [switchType]);

  useEffect(() => {
    actionProvider?.changeData(MapActionsType.CHANGE_MAP_TYPE, mapType);
  }, [mapType]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Tipo Mappa</Text>
        </View>
        <View>
          <Text>{mapType}</Text>
          <Switch
            trackColor={{false: '#cecece', true: '#cecece'}}
            thumbColor={switchType ? defaultRed : '#2fcc5b'}
            ios_backgroundColor="#3e3e3e"
            value={switchType}
            onValueChange={() => setSwitchType((previus) => !previus)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
