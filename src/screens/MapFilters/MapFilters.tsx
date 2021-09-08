import {useNavigation} from '@react-navigation/core';
import React, {FC, useCallback, useContext, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {defaultRed, markerDefaultGreen} from '../../common/constants';
import {MapActionsType} from '../../common/modules/map/map.constants';
import {MapContext} from '../../common/modules/map/MapContext';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  scroll_container: {
    flex: 1,
    marginHorizontal: 10,
  },
  option_container: {
    width: '100%',
    flexDirection: 'column',
    padding: 15,
  },
  form_item_container_with_label_inline: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    height: 'auto',
    marginTop: 20,
    marginBottom: 20,
  },
  vertical_divider: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  form_item_container_with_label_above: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
  option_title_text: {
    fontSize: 21,
    fontFamily: 'Novecentosanswide-Bold',
  },
  option_text_label: {
    fontSize: 17,
    fontFamily: 'Novecentosanswide-Normal',
    textAlignVertical: 'center',
    position: 'absolute',
    left: 0,
  },
  input_view_text: {
    backgroundColor: markerDefaultGreen,
    borderRadius: 30,
    width: '70%',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  input_view: {
    width: '70%',
    alignItems: 'center',
    alignContent: 'center',
    position: 'absolute',
    right: 0,
  },
  text_input: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
  button_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    bottom: 15,
  },
  saveBtn: {
    width: '40%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginRight: 5,
  },
  undoBtn: {
    width: '40%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    width: '100%',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
  modifyBtnSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
});

export const MapFilters: FC = () => {
  // Context
  const {
    data: {
      extraFilter: {province, region, withBnB, withRestaurant},
    },
    actionProvider,
  } = useContext(MapContext);

  // State
  const [_province, setProvince] = useState(province);
  const [_region, setRegion] = useState(region);
  const [_withBnB, setWithBnB] = useState(withBnB);
  const [_withRestaurant, setWithRestaurant] = useState(withRestaurant);

  // Navigation
  const navigator = useNavigation();

  // Callback
  const onResetFilters = useCallback(() => {
    setProvince(undefined);
    setRegion(undefined);
    setWithBnB(undefined);
    setWithRestaurant(undefined);
  }, []);

  const onApplyFilters = useCallback(() => {
    if (_region)
      actionProvider?.changeExtraFilter(
        MapActionsType.CHANGE_FILTER_REGION,
        _region,
      );

    if (_province)
      actionProvider?.changeExtraFilter(
        MapActionsType.CHANGE_FILTER_PROVINCE,
        _province,
      );

    if (_withBnB !== undefined)
      actionProvider?.changeExtraFilter(
        MapActionsType.CHANGE_BNB_FLAG,
        _withBnB,
      );

    if (_withRestaurant !== undefined)
      actionProvider?.changeExtraFilter(
        MapActionsType.CHANGE_REST_FLAG,
        _withRestaurant,
      );
  }, [actionProvider]);

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView style={styles.scroll_container}>
        <View style={styles.option_container}>
          <View>
            <Text style={styles.option_title_text}>
              Visualizza le cantine della seguente regione e/o provincia:
            </Text>
          </View>
          <View style={styles.vertical_divider} />
          <View style={styles.form_item_container_with_label_inline}>
            <Text style={styles.option_text_label}>Provincia</Text>
            <View style={styles.input_view_text}>
              <TextInput
                style={{fontFamily: 'Novecentosanswide-Normal'}}
                placeholder="..."
                placeholderTextColor="#ffffff"
                value={_province}
                onChangeText={(value) => setProvince(value)}
              />
            </View>
          </View>
          <View style={styles.vertical_divider} />
          <View style={styles.form_item_container_with_label_inline}>
            <Text style={styles.option_text_label}>Regione</Text>
            <View style={styles.input_view_text}>
              <TextInput
                style={{fontFamily: 'Novecentosanswide-Normal'}}
                placeholder="..."
                value={_region}
                placeholderTextColor="#ffffff"
                onChangeText={(value) => setRegion(value)}
              />
            </View>
          </View>
          <View style={styles.vertical_divider} />
          <View>
            <Text style={styles.option_title_text}>
              Visualizza le cantine che offrono i seguenti servizi:
            </Text>
          </View>
          <View style={styles.vertical_divider} />
          <View style={styles.form_item_container_with_label_inline}>
            <Text style={styles.option_text_label}>Dormire</Text>
            <View style={styles.input_view}>
              <Switch
                trackColor={{false: '#cecece', true: '#cecece'}}
                thumbColor={_withBnB ? defaultRed : '#2fcc5b'}
                ios_backgroundColor="#3e3e3e"
                value={_withBnB}
                onValueChange={() => setWithBnB((previus) => !previus)}
              />
            </View>
          </View>
          <View style={styles.vertical_divider} />
          <View style={styles.form_item_container_with_label_inline}>
            <Text style={styles.option_text_label}>Mangiare</Text>
            <View style={styles.input_view}>
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
      <View style={styles.button_container}>
        <LinearGradient
          colors={['#ce8a86', '#bd6665', '#a92a3f']}
          style={styles.saveBtn}>
          <TouchableOpacity onPress={onApplyFilters}>
            <View style={styles.modifyBtnSubView}>
              <Text style={styles.buttonText}>Applica</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={['#423E3F', '#605D5E', '#7F7C7D']}
          style={styles.undoBtn}>
          <TouchableOpacity onPress={onResetFilters}>
            <View style={styles.modifyBtnSubView}>
              <Text style={styles.buttonText}>Azzera</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};
