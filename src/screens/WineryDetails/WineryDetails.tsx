import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {
  Alert,
  ActivityIndicator,
  Linking,
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import {RoundImageButton} from '../../common/components/RoundImageButton';
import {images, markerDefaultGreen} from '../../common/constants';
import {Winery} from '../../common/interfaces';
import {sendEmail} from '../../common/modules/email/sendEmail';
import {openLink} from '../../common/modules/linking';
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
  flex_container: {
    flex: 1,
  },
  centered_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 280,
    height: 280,
  },
  logoImage: {width: 280, height: 280, justifyContent: 'center'},
  title_text: {
    fontSize: 24,
    fontFamily: 'Novecentosanswide-Bold',
    marginBottom: 15,
  },
  subtitle_text: {
    fontSize: 21,
    fontFamily: 'Novecentosanswide-Bold',
    marginBottom: 10,
  },
  normal_text: {
    fontSize: 16,
    fontFamily: 'Novecentosanswide-Normal',
    marginBottom: 5,
  },
});

export const WineryDetail = React.memo((props: IWineryDetailProps) => {
  const {winery: wineryProps} = props.route.params || {};
  const [winery, setWinery] = useState<Winery>(props.route.params?.winery);
  const [logo, setLogo] = useState<string | null | undefined>(winery.logo);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (wineryProps) setWinery(wineryProps);
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
        <View style={[styles.flex_container, styles.centered_container]}>
          <ActivityIndicator size="large" color={markerDefaultGreen} />
        </View>
      )}
      {!loading && winery && logo && (
        <View style={styles.flex_container}>
          <View style={styles.centered_container}>
            <View style={styles.logo}>
              <Image source={{uri: logo}} style={styles.logoImage} />
            </View>
          </View>
          <View
            style={{
              height: 70,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <RoundImageButton
              borderRadius={30}
              image={images.tel_popup}
              onPress={() =>
                winery.telephone && openLink(`tel:${winery.telephone}`)
              }
            />
            <RoundImageButton
              borderRadius={30}
              image={images.mail_popup}
              onPress={() => winery.email && sendEmail(winery.email)}
            />
            <RoundImageButton
              borderRadius={30}
              image={images.web_popup}
              onPress={() => winery.webSite && openLink(winery.webSite)}
            />
            <RoundImageButton
              borderRadius={30}
              image={images.go_to_popup}
              onPress={() => {
                const scheme = Platform.select({
                  ios: 'maps:0,0?q=',
                  android: 'geo:0,0?q=',
                });

                const latLng = `${winery.location?.latitude},${winery.location?.longitude}`;
                const label = `${winery.name}`;
                const url = Platform.select({
                  ios: `${scheme}${label}@${latLng}`,
                  android: `${scheme}${latLng}(${label})`,
                });

                url && openLink(url);
              }}
            />
          </View>
          <View style={{margin: 15, width: '50%'}}>
            <Text style={styles.title_text}>{winery.name}</Text>
            {winery.vigneron && (
              <Text style={styles.normal_text}>{winery.vigneron}</Text>
            )}
            <Text style={styles.normal_text}>{winery.address}</Text>
            <Text style={styles.normal_text}>{winery.city}</Text>
            <Text style={styles.normal_text}>{winery.province}</Text>
            <Text style={styles.normal_text}>{winery.region}</Text>
          </View>
        </View>
      )}
    </View>
  );
});
