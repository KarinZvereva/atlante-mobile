import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Header} from '../../common/components/Header/Header';
import {images, markerDefaultGreen} from '../../common/constants';
import {styles} from './Info.styles';
import {useState, useEffect} from 'react';
import {infoCountCall} from './Info.dal';
import {remotePickerBuilder} from '../../common/hoc/pickerFactory/pickerFactory';
import {provinceDal, regionDal} from '../MapFilters/MapFilters.dal';
import {getVersion, getBuildNumber} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/core';
import {useAuth} from '../../common/customHooks';

const ProvincePicker = remotePickerBuilder(provinceDal);
const RegionPicker = remotePickerBuilder(regionDal);

enum CountType {
  Global = 1,
  Region,
  Province,
}

export function Info(props: any) {
  // State
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [countGlobal, setGlobalCount] = useState<number>();
  const [countRegion, setRegionCount] = useState<number>();
  const [countProvince, setProvinceCount] = useState<number>();
  const [version, setVersion] = useState<string>();
  const [buildNumber, setBuildNumber] = useState<string>();
  const [_province, setProvince] = useState<string>();
  const [_region, setRegion] = useState<string>();
  const [regionDisabled, setRegionDisabled] = useState(false);

  const loadCount = (countType: CountType, data: string | undefined) => {
    setError('');
    setIsError(false);

    var region = undefined;
    var province = undefined;

    switch (countType) {
      case CountType.Region:
        if (data) region = data;
        else {
          setRegionCount(undefined);
          return;
        }
        break;
      case CountType.Province:
        if (data) province = data;
        else {
          setProvinceCount(undefined);
          return;
        }
        break;
      default:
        break;
    }

    infoCountCall
      .count({region, province})
      .then((result) => {
        if (result) {
          switch (countType) {
            case CountType.Region:
              setRegionCount(result?.value);
              setProvinceCount(undefined);
              break;
            case CountType.Province:
              setProvinceCount(result?.value);
              break;
            default:
              setGlobalCount(result?.value);
              break;
          }
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        setError(JSON.stringify(err));
        setIsError(true);
      });
  };

  /** Navigation */
  const navigation = useNavigation();

  /** Auth */
  const isLogged = useAuth();

  /** Effects */
  useEffect(() => {
    if (!isLogged) navigation.navigate('SignIn');
  }, [isLogged]);

  // Effects
  useEffect(() => {
    loadCount(CountType.Global, undefined);
  });

  useEffect(() => {
    setVersion(getVersion());
    setBuildNumber(getBuildNumber());
  }, []);

  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.page}>
      {!isLoading && (
        <>
          <Header {...props} showName={t('info.header')} />
          <ScrollView style={styles.scroll_container}>
            <View style={styles.centered_container}>
              <Image source={images.logo_calice} style={styles.logo} />
              <Text style={[styles.infoText]}>{t('info.info_row_1')}</Text>
              <Text style={[styles.infoText]}>{t('info.info_row_2')}</Text>
              <Text style={[styles.infoText]}>{t('info.info_row_3')}</Text>
              <Text style={[styles.infoText]}>{t('info.info_row_4')}</Text>
              <Text style={[styles.infoText]}>{t('info.info_row_5')}</Text>
              <Text style={[styles.infoText]}>{t('info.info_row_6')}</Text>
              <Text style={[styles.infoText]}>{t('info.info_row_7')}</Text>
              <Text style={[styles.infoText]}>{t('info.info_row_8')}</Text>
            </View>
            <View style={styles.option_container}>
              <View>
                <Text style={styles.option_title_text}>
                  {t('info.wineries_total')} {countGlobal}
                </Text>
              </View>
              <View style={styles.vertical_divider} />
              <View>
                <Text style={styles.option_title_text}>
                  {t('info.location_title')}
                </Text>
              </View>
              <View
                style={
                  Platform.OS == 'android'
                    ? styles.vertical_divider
                    : styles.vertical_divider_ios
                }
              />
              <View
                style={
                  Platform.OS == 'android'
                    ? styles.form_item_container_with_label_inline
                    : styles.form_item_container_with_label_inline_ios
                }>
                <Text
                  style={
                    Platform.OS == 'android'
                      ? styles.option_text_label
                      : {...styles.option_text_label, ...{marginRight: 14}}
                  }>
                  {t('info.region')}
                </Text>
                <View
                  style={
                    Platform.OS == 'android'
                      ? styles.input_view_text
                      : styles.input_view_text_ios
                  }>
                  <RegionPicker
                    style={
                      Platform.OS == 'android'
                        ? styles.pickers_style
                        : styles.pickers_style_ios
                    }
                    itemStyle={styles.pickers_item_style}
                    selectedValue={_region}
                    onValueChange={(itemValue, _itemIndex) => {
                      setRegion(itemValue as string);
                      setProvince(undefined);
                      loadCount(CountType.Region, itemValue as string);
                    }}
                    enabled={!regionDisabled}
                  />
                </View>
                <Text
                  style={
                    Platform.OS == 'android'
                      ? styles.count_text_label
                      : styles.count_text_label_ios
                  }>
                  {countRegion}
                </Text>
              </View>
              <View
                style={
                  Platform.OS == 'android'
                    ? styles.form_item_container_with_label_inline
                    : styles.form_item_container_with_label_inline_ios
                }>
                <Text style={styles.option_text_label}>
                  {t('info.province')}
                </Text>
                <View
                  style={
                    Platform.OS == 'android'
                      ? {
                          ...styles.input_view_text,
                          ...styles.input_view_province_text,
                        }
                      : styles.input_view_text_ios
                  }>
                  <ProvincePicker
                    style={
                      Platform.OS == 'android'
                        ? styles.pickers_style
                        : styles.pickers_style_ios
                    }
                    itemStyle={styles.pickers_item_style}
                    selectedValue={_province}
                    onValueChange={(itemValue, _itemIndex) => {
                      setProvince(itemValue as string);
                      loadCount(CountType.Province, itemValue as string);
                    }}
                    remoteFilter={_region ? {region: _region} : undefined}
                  />
                </View>
                <Text
                  style={
                    Platform.OS == 'android'
                      ? styles.count_text_label
                      : styles.count_text_label_ios
                  }>
                  {countProvince}
                </Text>
              </View>
            </View>
            <View style={{marginLeft: 10}}>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <Text style={styles.option_title_text}>Info App</Text>
              </View>
              <View style={styles.option_container}>
                <Text style={styles.option_text_label}>
                  versione: {version || 0.0}
                </Text>
              </View>
              <View style={styles.option_container}>
                <Text style={styles.option_text_label}>
                  build number:{buildNumber || 0}
                </Text>
              </View>
            </View>
          </ScrollView>
        </>
      )}
      {isLoading && (
        <View>
          <ActivityIndicator size="large" color={markerDefaultGreen} />
        </View>
      )}
      {isError && (
        <View>
          <Text style={{paddingTop: 5, color: 'red'}}>{error}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
