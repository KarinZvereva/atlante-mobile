import {useNavigation} from '@react-navigation/core';
import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {defaultRed, images} from '../../common/constants';
import {remotePickerBuilder} from '../../common/hoc/pickerFactory/pickerFactory';
import {MapActionsType} from '../../common/modules/map/map.constants';
import {MapContext} from '../../common/modules/map/MapContext';
import {provinceDal, regionDal} from './MapFilters.dal';
import {mapFiltersStyles} from './MapFilters.styles';

const ProvincePicker = remotePickerBuilder(provinceDal);
const RegionPicker = remotePickerBuilder(regionDal);

export const MapFilters: FC = () => {
  // State
  const [_province, setProvince] = useState<string>();
  const [_region, setRegion] = useState<string>();
  const [_withBnB, setWithBnB] = useState<boolean>();
  const [_withRestaurant, setWithRestaurant] = useState<boolean>();
  const [regionDisabled, setRegionDisabled] = useState(false);

  // Context
  const {
    data: {
      extraFilter: {province, region, withBnB, withRestaurant},
    },
    actionProvider,
  } = useContext(MapContext);

  // Navigation
  const navigator = useNavigation();

  const onApplyFilters = useCallback(() => {
    actionProvider?.changeExtraFilter(MapActionsType.CHANGE_EXTRA_FILTER, {
      region: _region,
      province: _province,
      withBnB: _withBnB,
      withRestaurant: _withRestaurant,
    });
    // setClosePage(true);
    navigator.goBack();
  }, [actionProvider, _region, _province, _withBnB, _withRestaurant]);

  // Effects
  useEffect(() => {
    setProvince(province);
    setRegion(region);
    setWithBnB(withBnB);
    setWithRestaurant(withRestaurant);
  }, []);

  useEffect(() => {
    if (_province && !_region) setRegionDisabled(true);
    else if (regionDisabled) setRegionDisabled(false);
  }, [_province, _region, regionDisabled]);

  return (
    <SafeAreaView style={mapFiltersStyles.page}>
      <ScrollView style={mapFiltersStyles.scroll_container}>
        <Image source={images.logo_calice} style={mapFiltersStyles.logo} />
        <View style={mapFiltersStyles.option_container}>
          <View>
            <Text style={mapFiltersStyles.option_title_text}>
              Visualizza le cantine della seguente regione e/o provincia:
            </Text>
          </View>
          {Platform.OS == 'android' && <View style={mapFiltersStyles.vertical_divider} />}
          <View style={Platform.OS == 'android' ?  mapFiltersStyles.form_item_container_with_label_inline : mapFiltersStyles.form_item_container_with_label_inline_ios}>
            <Text style={mapFiltersStyles.option_text_label}>Regione</Text>
            <View style={Platform.OS == 'android' ? mapFiltersStyles.input_view_text : mapFiltersStyles.input_view_text_ios}>
              <RegionPicker
                style={Platform.OS == 'android' ?  mapFiltersStyles.pickers_style : mapFiltersStyles.pickers_style_ios}
                itemStyle={mapFiltersStyles.pickers_item_style}
                selectedValue={_region}
                onValueChange={(itemValue, _itemIndex) => {
                  setRegion(itemValue as string);
                  setProvince(undefined);
                }}
                enabled={!regionDisabled}
              />
            </View>
          </View>
          {Platform.OS == 'android' && <View style={mapFiltersStyles.vertical_divider} />}
          <View style={Platform.OS == 'android' ?  mapFiltersStyles.form_item_container_with_label_inline : mapFiltersStyles.form_item_container_with_label_inline_ios}>
            <Text style={mapFiltersStyles.option_text_label}>Provincia</Text>
            <View style={Platform.OS == 'android' ? mapFiltersStyles.input_view_text : mapFiltersStyles.input_view_text_ios}>
              <ProvincePicker
                style={Platform.OS == 'android' ?  mapFiltersStyles.pickers_style : mapFiltersStyles.pickers_style_ios}
                itemStyle={mapFiltersStyles.pickers_item_style}
                selectedValue={_province}
                onValueChange={(itemValue, _itemIndex) =>
                  setProvince(itemValue as string)
                }
                remoteFilter={_region ? {region: _region} : undefined}
              />
            </View>
          </View>
          {Platform.OS == 'android' && <View style={mapFiltersStyles.vertical_divider} />}
          <View>
            <Text style={mapFiltersStyles.option_title_text}>
              Visualizza le cantine che offrono i seguenti servizi:
            </Text>
          </View>
          <View style={mapFiltersStyles.vertical_divider} />
          <View style={mapFiltersStyles.form_item_container_with_label_inline}>
            <Text style={mapFiltersStyles.option_text_label}>Dormire</Text>
            <View style={mapFiltersStyles.input_view}>
              <Switch
                trackColor={{false: '#cecece', true: '#cecece'}}
                thumbColor={_withBnB ? defaultRed : '#2fcc5b'}
                ios_backgroundColor="#3e3e3e"
                value={_withBnB}
                onValueChange={() => setWithBnB((previus) => !previus)}
              />
            </View>
          </View>
          <View style={mapFiltersStyles.vertical_divider} />
          <View style={mapFiltersStyles.form_item_container_with_label_inline}>
            <Text style={mapFiltersStyles.option_text_label}>Mangiare</Text>
            <View style={mapFiltersStyles.input_view}>
              <Switch
                trackColor={{false: '#cecece', true: '#cecece'}}
                thumbColor={_withRestaurant ? defaultRed : '#2fcc5b'}
                ios_backgroundColor="#3e3e3e"
                value={_withRestaurant}
                onValueChange={() => setWithRestaurant((previus) => !previus)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={mapFiltersStyles.button_container}>
        <LinearGradient
          colors={['#ce8a86', '#bd6665', '#a92a3f']}
          style={mapFiltersStyles.saveBtn}>
          <TouchableOpacity onPress={onApplyFilters}>
            <View style={mapFiltersStyles.modifyBtnSubView}>
              <Text style={mapFiltersStyles.buttonText}>Applica</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};
