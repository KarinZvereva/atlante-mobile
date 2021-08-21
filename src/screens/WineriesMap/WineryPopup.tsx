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
    minWidth: 150,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
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
  marker_image_wrapper: {
    height: 50,
    position: 'absolute',
    alignSelf: 'center',
    top: -25,
  },
  marker_image: {
    width: 100,
    height: 45,
    resizeMode: 'contain',
  },
  winery_name_text: {
    paddingTop: 18,
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
  winery_vigneron_text: {
    fontSize: 14,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
    marginBottom: 5,
  },
});

export const WineryPopup = React.memo(({winery}: IWineryPopupProps) => {
  return (
    <View style={wineryPopupStyles.container}>
      <View style={wineryPopupStyles.internal_container}>
        <Text style={wineryPopupStyles.marker_image_wrapper}>
          <Image
            style={wineryPopupStyles.marker_image}
            source={icons.natourwine_popup}
          />
        </Text>
        {winery.subName1 && winery.subName2 ? (
          <View>
            <Text
              style={[
                wineryPopupStyles.winery_name_text,
                {
                  alignContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                },
              ]}>
              {winery.subName1}
            </Text>
            <Text
              style={[
                {
                  fontSize: 18,
                  fontFamily: 'Novecentosanswide-Normal',
                  textAlign: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                },
                !winery.vigneron ? {marginBottom: 5} : {},
              ]}>
              {winery.subName2}
            </Text>
          </View>
        ) : (
          <Text
            style={[
              wineryPopupStyles.winery_name_text,
              !winery.vigneron ? {marginBottom: 5} : {},
            ]}>
            {winery.name}
          </Text>
        )}
        {winery.vigneron && (
          <Text style={wineryPopupStyles.winery_vigneron_text}>
            {winery.vigneron}
          </Text>
        )}
      </View>
    </View>
  );
});
