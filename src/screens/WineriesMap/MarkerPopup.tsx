import React, {useState, useEffect} from 'react';
import {Winery} from '../../common/interfaces';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import {wineryLogoDal} from './WineriesMap.dal';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    width: 140,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#4da2ab',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#007a87',
    borderWidth: 0.5,
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#4da2ab',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

interface IMarkerPopupProps {
  winery: Winery;
  style?: any;
  children?: any;
}

export const MarkerPopup = React.memo(({winery}: IMarkerPopupProps) => {
  const [logo, setLogo] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    wineryLogoDal
      .getById(winery._id)
      .then((result) => {
        if (result && result.data) {
          setLogo(result.data.logo);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(JSON.stringify(error));
        Alert.alert('Logo non caricato');
        setLoading(false);
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {!loading && !logo && <Text>NO LOGO</Text>}
          {!loading && logo && (
            <Text style={{height: 140}}>
              <Image
                source={{uri: logo}}
                style={{width: 120, height: 120, resizeMode: 'contain'}}
              />
            </Text>
          )}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{height: 60}}>
              <Image
                source={require('../../assets/icon/tel_popup.png')}
                style={{
                  width: 40,
                  height: 40,
                  margin: 20,
                  resizeMode: 'contain',
                }}
              />
            </Text>
            <Text style={{height: 60}}>
              <Image
                source={require('../../assets/icon/mail_popup.png')}
                style={{
                  width: 40,
                  height: 40,
                  margin: 20,
                  resizeMode: 'contain',
                }}
              />
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{height: 60}}>
              <Image
                source={require('../../assets/icon/web_popup.png')}
                style={{
                  width: 40,
                  height: 40,
                  margin: 20,
                  resizeMode: 'contain',
                }}
              />
            </Text>
            <Text style={{height: 60}}>
              <Image
                source={require('../../assets/icon/go_to_popup.png')}
                style={{
                  width: 40,
                  height: 40,
                  margin: 20,
                  resizeMode: 'contain',
                }}
              />
            </Text>
          </View>
        </View>
      </View>
      <Text>{winery.name}</Text>
      {winery.vigneron && <Text>{winery.vigneron}</Text>}
      <Text>{winery.address}</Text>
      <Text>{winery.city}</Text>
      <Text>{winery.province}</Text>
      <Text>{winery.region}</Text>
    </View>
  );
});
