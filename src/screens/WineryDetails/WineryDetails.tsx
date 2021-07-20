import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {markerDefaultGreen} from '../../common/constants';
import {Winery} from '../../common/interfaces';
import {wineryLogoDal} from './WineyDetails.dal';

export interface IWineryDetailProps {
  route: RouteProp<Record<string, any>, 'WineryDetails'>;
  navigation: any;
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  centered_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    top: 20,
  },
});

export const WineryDetail = React.memo((props: IWineryDetailProps) => {
  const {winery: wineryProps} = props.route.params || {};
  const [winery, setWinery] = useState<Winery>(props.route.params?.winery);
  const [logo, setLogo] = useState<string | null | undefined>(winery.logo);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (wineryProps) {
      setWinery(wineryProps);
    }
  }, [wineryProps]);

  useEffect(() => {
    if (winery.logo) {
      setLogo(winery.logo);
      return;
    }

    setLoading(true);
    wineryLogoDal
      .getById(winery._id)
      .then((result) => {
        if (result && result.data) {
          setLogo(result.data.logo);
          setLoading(false);
        } else if (result && result.error) {
          Alert.alert(`${JSON.stringify(result.error)}`);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(JSON.stringify(err));
        setLoading(false);
      });
  }, [winery]);

  return (
    <View style={styles.page}>
      {loading && (
        <View style={styles.centered_container}>
          <ActivityIndicator size="large" color={markerDefaultGreen} />
        </View>
      )}
      {!loading && winery && logo && (
        <View style={styles.centered_container}>
          <View>
            <Image
              source={{uri: logo}}
              style={{width: 240, height: 240, resizeMode: 'contain'}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: 60,
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <Image
                source={require('../../assets/icon/tel_popup.png')}
                style={{
                  width: 60,
                  height: 60,
                  margin: 20,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 60,
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <Image
                source={require('../../assets/icon/mail_popup.png')}
                style={{
                  width: 60,
                  height: 60,
                  margin: 20,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 60,
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <Image
                source={require('../../assets/icon/web_popup.png')}
                style={{
                  width: 60,
                  height: 60,
                  margin: 20,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 60,
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <Image
                source={require('../../assets/icon/go_to_popup.png')}
                style={{
                  width: 60,
                  height: 60,
                  margin: 20,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
});
