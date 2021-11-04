import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Switch,
  Image,
} from 'react-native';
import {MapTypes} from 'react-native-maps';
import {defaultRed, images} from '../../common/constants';
import {MapActionsType} from '../../common/modules/map/map.constants';
import {MapContext} from '../../common/modules/map/MapContext';
import {mapSettingsStyles} from './MapSettings.styles';
import { useTranslation } from 'react-i18next';

export const MapSettings = () => {
  // Context
  const {
    data: {
      configuration: {mapsType, searchAroundMeRadius, searchAroundPointRadius},
    },
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

  // Effect
  useEffect(() => {
    if (switchType) setMapType('satellite');
    else setMapType('standard');
  }, [switchType]);

  useEffect(() => {
    actionProvider?.changeConfiguration(
      MapActionsType.CHANGE_MAP_TYPE,
      mapType,
    );
  }, [mapType]);

  const { t } = useTranslation();

  return (
    <SafeAreaView style={mapSettingsStyles.page}>
      <ScrollView
        style={mapSettingsStyles.scroll_container}
        scrollEnabled={scrollEnabled}>
        <Image source={images.logo_calice} style={mapSettingsStyles.logo} />
        <View style={mapSettingsStyles.option_container}>
          <View>
            <Text style={mapSettingsStyles.option_title_text}>
              {t('map_settings.map_type_title')}
            </Text>
          </View>
          <View style={mapSettingsStyles.form_item_container_with_label_inline}>
            <Text style={mapSettingsStyles.option_text_label}>
              {mapType === 'standard' ? t('map_settings.map_type_road') : t('map_settings.map_type_satellite')}
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
              {t('map_settings.map_radius_gps')}
            </Text>
            <View
              style={mapSettingsStyles.form_item_container_with_label_inline}>
              <Text style={mapSettingsStyles.option_text_label}>
                {rangeAroundMe} km
              </Text>
              <MultiSlider
                values={[rangeAroundMe]}
                sliderLength={250}
                min={15}
                max={60}
                onValuesChangeStart={() => setScrollEnabled(false)}
                onValuesChange={(values) => setRangeAroundMe(values[0])}
                onValuesChangeFinish={(values) => {
                  setScrollEnabled(true);
                  setRangeAroundMe(values[0]);
                  actionProvider?.changeConfiguration(
                    MapActionsType.CHANGE_SEARCH_AROUND_ME,
                    values[0],
                  );
                }}
              />
            </View>
          </View>
        </View>
        <View style={mapSettingsStyles.option_container}>
          <View>
            <Text style={mapSettingsStyles.option_title_text}>
              {t('map_settings.map_radius_point')}
            </Text>
            <View
              style={mapSettingsStyles.form_item_container_with_label_inline}>
              <Text style={mapSettingsStyles.option_text_label}>
                {rangeAroundP} km
              </Text>
              <MultiSlider
                values={[rangeAroundP]}
                sliderLength={250}
                min={15}
                max={60}
                onValuesChangeStart={() => setScrollEnabled(false)}
                onValuesChange={(values) => setRangeAroundP(values[0])}
                onValuesChangeFinish={(values) => {
                  setScrollEnabled(true);
                  setRangeAroundP(values[0]);
                  actionProvider?.changeConfiguration(
                    MapActionsType.CHANGE_SEARCH_AROUND_POINT,
                    values[0],
                  );
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
