import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, Switch} from 'react-native';
import {MapTypes} from 'react-native-maps';
import {useDebouncedCallback} from 'use-debounce/lib';
import {defaultRed} from '../../common/constants';
import {MapActionsType} from '../../common/modules/map/map.constants';
import {MapContext} from '../../common/modules/map/MapContext';
import {mapSettingsStyles} from './MapSettings.styles';

export const MapSettings = () => {
  // Context
  const {
    data: {mapsType, searchAroundMeRadius, searchAroundPointRadius},
    actionProvider,
  } = useContext(MapContext);

  // State
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
  const [mapType, setMapType] = useState<MapTypes>(mapsType);
  const [switchType, setSwitchType] = useState<boolean>(
    mapsType === 'standard' ? false : true,
  );
  const [rangeAroundMe, setRangeAroundMe] = useState(searchAroundMeRadius);
  const [rangeAroundP, setRangeAroundP] = useState(searchAroundPointRadius);

  // Debounced callback
  const changeRangeAroundMeclbk = useDebouncedCallback(
    (values) => setRangeAroundMe(values[0]),
    500,
  );
  const changeRangeAroundPclbk = useDebouncedCallback(
    (values) => setRangeAroundP(values[0]),
    500,
  );

  // Effect
  useEffect(() => {
    if (switchType) setMapType('satellite');
    else setMapType('standard');
  }, [switchType]);

  useEffect(() => {
    actionProvider?.changeData(MapActionsType.CHANGE_MAP_TYPE, mapType);
  }, [mapType]);

  useEffect(() => {
    actionProvider?.changeData(
      MapActionsType.CHANGE_SEARCH_AROUND_ME,
      rangeAroundMe,
    );
  }, [rangeAroundMe]);

  useEffect(() => {
    actionProvider?.changeData(
      MapActionsType.CHANGE_SEARCH_AROUND_POINT,
      rangeAroundP,
    );
  }, [rangeAroundP]);

  return (
    <SafeAreaView style={mapSettingsStyles.page}>
      <ScrollView
        style={mapSettingsStyles.scroll_container}
        scrollEnabled={scrollEnabled}>
        <View style={mapSettingsStyles.option_container}>
          <View>
            <Text style={mapSettingsStyles.option_title_text}>
              Selezione tipologia mappa stradale o satellitare
            </Text>
          </View>
          <View style={mapSettingsStyles.form_item_container_with_label_inline}>
            <Text style={mapSettingsStyles.option_text_label}>
              {mapType === 'standard' ? 'Stradale' : 'Satellitare'}
            </Text>
            <Switch
              trackColor={{false: '#cecece', true: '#cecece'}}
              thumbColor={switchType ? defaultRed : '#2fcc5b'}
              ios_backgroundColor="#3e3e3e"
              value={switchType}
              onValueChange={() => setSwitchType((previus) => !previus)}
            />
          </View>
        </View>
        <View style={mapSettingsStyles.option_container}>
          <View>
            <Text style={mapSettingsStyles.option_title_text}>
              Raggio di visualizzazione intorno alla mia posizione
            </Text>
            <View
              style={mapSettingsStyles.form_item_container_with_label_inline}>
              <Text style={mapSettingsStyles.option_text_label}>
                {rangeAroundMe}
              </Text>
              <MultiSlider
                values={[rangeAroundMe]}
                sliderLength={250}
                min={15}
                max={60}
                onValuesChangeStart={() => setScrollEnabled(false)}
                onValuesChange={changeRangeAroundMeclbk}
                onValuesChangeFinish={() => setScrollEnabled(true)}
              />
            </View>
          </View>
        </View>
        <View style={mapSettingsStyles.option_container}>
          <View>
            <Text style={mapSettingsStyles.option_title_text}>
              Raggio di visualizzazione intorno al punto della mappa
            </Text>
            <View
              style={mapSettingsStyles.form_item_container_with_label_inline}>
              <Text style={mapSettingsStyles.option_text_label}>
                {rangeAroundP}
              </Text>
              <MultiSlider
                values={[rangeAroundP]}
                sliderLength={250}
                min={15}
                max={60}
                onValuesChangeStart={() => setScrollEnabled(false)}
                onValuesChange={changeRangeAroundPclbk}
                onValuesChangeFinish={() => setScrollEnabled(true)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
