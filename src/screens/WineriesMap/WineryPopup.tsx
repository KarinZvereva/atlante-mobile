import React from 'react';
import {Winery} from '../../common/interfaces';
import {View, Text, Image, StyleSheet} from 'react-native';
import {defaultRed, icons, markerDefaultGreen} from '../../common/constants';

interface IWineryPopupProps {
  winery: Winery;
  style?: any;
  children?: any;
}

const wineryPopupStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderColor: markerDefaultGreen,
    borderWidth: 3,
    borderStyle: 'solid',
    borderRadius: 6,
  },
  internal_container: {
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
  },
  // fixed_message_text: {
  //   fontSize: 8,
  //   justifyContent: 'center',
  //   textAlign: 'center',
  //   fontFamily: 'Novecentosanswide-Normal',
  //   marginBottom: 15,
  //   marginHorizontal: 25,
  // },
  marker_image_wrapper: {
    height: 70,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'absolute',
    top: -10,
    right: 5,
  },
  marker_image: {
    width: 25,
    height: 35,
    resizeMode: 'contain',
  },
  winery_name_text: {
    padding: 20,
    fontSize: 16,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
  winery_vigneron_text: {
    fontSize: 12,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
    marginBottom: 15,
  },
});

export const WineryPopup = React.memo(({winery}: IWineryPopupProps) => {
  return (
    <View style={wineryPopupStyles.container}>
      <View style={wineryPopupStyles.internal_container}>
        {/* <Text style={wineryPopupStyles.fixed_message_text}>
          Premi per aprire i dettagli
        </Text> */}
        <Text style={wineryPopupStyles.marker_image_wrapper}>
          <Image
            style={wineryPopupStyles.marker_image}
            source={icons.winery_marker}
          />
        </Text>
        <Text style={[wineryPopupStyles.winery_name_text]}>{winery.name}</Text>
        {winery.vigneron && (
          <Text style={wineryPopupStyles.winery_vigneron_text}>
            {winery.vigneron}
          </Text>
        )}
      </View>
    </View>
  );
});
