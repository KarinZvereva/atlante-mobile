import React from 'react';
import {Winery} from '../../common/interfaces';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {defaultRed, icons, markerDefaultGreen} from '../../common/constants';

interface IMarkerPopupProps {
  winery: Winery;
  style?: any;
  children?: any;
}

export const MarkerPopup = React.memo(({winery}: IMarkerPopupProps) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        borderColor: markerDefaultGreen,
        borderWidth: 3,
        borderStyle: 'solid',
        borderRadius: 6,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          borderColor: defaultRed,
          borderWidth: 2,
          borderStyle: 'solid',
          margin: 2,
          paddingTop: 10,
          paddingRight: 10,
          paddingLeft: 10,
          paddingBottom: 5,
          borderRadius: 6,
        }}>
        <Text
          style={{
            height: 40,
            alignContent: 'flex-start',
            alignItems: 'flex-start',
            position: 'absolute',
            top: -18,
            right: 1,
          }}>
          <Image
            style={{
              width: 25,
              height: 35,
              resizeMode: 'center',
            }}
            source={icons.winery_marker}
          />
        </Text>
        <Text
          style={{
            fontSize: 16,
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'Novecentosanswide-Normal',
            marginBottom: winery.vigneron ? 5 : 25,
          }}>
          {winery.name}
        </Text>
        {winery.vigneron && (
          <Text
            style={{
              fontSize: 12,
              justifyContent: 'center',
              textAlign: 'center',
              fontFamily: 'Novecentosanswide-Normal',
              marginBottom: 15,
            }}>
            {winery.vigneron}
          </Text>
        )}
        <Text
          style={{
            fontSize: 8,
            justifyContent: 'center',
            textAlign: 'center',
          }}>
          Premi per visualizzare i dettagli della cantina
        </Text>
      </View>
    </View>
  );
});
