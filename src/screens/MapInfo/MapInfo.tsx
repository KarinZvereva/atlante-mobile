import React from 'react';
import {Image, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {RoundImageButton} from '../../common/components/RoundImageButton';
import {icons, images} from '../../common/constants';
import {mapsInfoStyles} from './MapInfo.styles';
import { useTranslation } from 'react-i18next';

export const MapInfo = React.memo(() => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={mapsInfoStyles.page}>
      <View style={{alignContent: 'center', alignItems: 'center'}}>
        <Image source={images.logo_calice} style={mapsInfoStyles.logo} />
      </View>
      <ScrollView style={mapsInfoStyles.scroll_container}>
        <View style={mapsInfoStyles.centered_container}>
          <View style={mapsInfoStyles.info_row}>
            <RoundImageButton borderRadius={20} image={icons.touch} />
            <View style={mapsInfoStyles.horizontal_divider_5}></View>
            <Text style={mapsInfoStyles.info_row_text}>
              {t('map_info.winery_detail')}
            </Text>
          </View>
          <View style={mapsInfoStyles.info_row}>
            <RoundImageButton borderRadius={20} image={icons.touch} />
            <View style={mapsInfoStyles.horizontal_divider_5}></View>
            <Text style={mapsInfoStyles.info_row_text}>
              {t('map_info.wineries_near_touch')}
            </Text>
          </View>
          <View style={mapsInfoStyles.info_row}>
            <Image source={icons.posizione} style={mapsInfoStyles.info_image} />
            <View style={mapsInfoStyles.horizontal_divider_5} />
            <Text style={mapsInfoStyles.info_row_text}>
              {t('map_info.map_gps_center')}
            </Text>
          </View>
          <View style={mapsInfoStyles.info_row}>
            <Image source={icons.intorno} style={mapsInfoStyles.info_image} />
            <View style={mapsInfoStyles.horizontal_divider_5} />
            <Text style={mapsInfoStyles.info_row_text}>
              {t('map_info.wineries_near_gps')}
            </Text>
          </View>
          <View style={mapsInfoStyles.info_row}>
            <Image source={icons.cerca} style={mapsInfoStyles.info_image} />
            <View style={mapsInfoStyles.horizontal_divider_5} />
            <Text style={mapsInfoStyles.info_row_text}>
              {t('map_info.wineries_search')}
            </Text>
          </View>
          <View style={mapsInfoStyles.info_row}>
            <Image source={icons.reload} style={mapsInfoStyles.info_image} />
            <View style={mapsInfoStyles.horizontal_divider_5} />
            <Text style={mapsInfoStyles.info_row_text}>
              {t('map_info.map_reset')}
            </Text>
          </View>
          <View style={mapsInfoStyles.info_row}>
            <Image
              source={icons.clean_maps}
              style={mapsInfoStyles.info_image}
            />
            <View style={mapsInfoStyles.horizontal_divider_5}></View>
            <Text style={mapsInfoStyles.info_row_text}>
              {t('map_info.map_clean')}
            </Text>
          </View>
          <View style={mapsInfoStyles.vertical_divider_10} />
          <Text style={mapsInfoStyles.search_text}>
            {t('map_info.info_row_1')}
          </Text>
          <Text style={mapsInfoStyles.search_text}>
            {t('map_info.info_row_2')}
          </Text>
          <Text style={mapsInfoStyles.search_text}>
            {t('map_info.info_row_3')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});
