import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {Header} from '../../common/components/Header/Header';
import {RoundImageButton} from '../../common/components/RoundImageButton';
import {images} from '../../common/constants';
import {sendEmail} from '../../common/modules/email/sendEmail';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
  },
  centered_container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 210,
    width: 210,
    resizeMode: 'center',
    position: 'absolute',
    top: 10,
  },
  title: {
    fontSize: 21,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
  goToWineriesText: {
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
    margin: 10,
  },
  keepInTouchText: {
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
    position: 'absolute',
    bottom: 70,
  },
  socialIcons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
  },
});

export function Home(props: any) {
  const navigation = useNavigation();

  const openLink = useCallback(async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  const openMail = useCallback(() => {
    sendEmail('atlantevignaiolinaturali@gmail.com');
  }, []);

  const openTelegram = useCallback(async () => {
    const browserUrl = 'http://www.telegram.me/UFLTC0ER51AxMDNk';
    const tgUrl = 'tg://resolve?domain=UFLTC0ER51AxMDNk';
    let supported = await Linking.canOpenURL(tgUrl);
    if (supported) {
      await Linking.openURL(tgUrl);
    } else {
      await Linking.openURL(browserUrl);
    }
  }, []);

  return (
    <View style={styles.page}>
      <View>
        <Header {...props} showName="Home" />
      </View>
      <View style={styles.centered_container}>
        <Image source={images.logo_calice} style={styles.logo} />
        <Text style={styles.title}>Benvenuto</Text>
        <Text style={[styles.title, {marginBottom: 60}]}>Bevitore Errante</Text>
        <RoundImageButton
          borderRadius={40}
          image={images.wineries_map_big}
          onPress={() => {
            navigation.navigate('Wineries Map');
          }}
        />
        <Text style={styles.goToWineriesText}>
          Visita la mappa delle cantine
        </Text>
        <Text style={styles.keepInTouchText}>Resta in contatto con noi</Text>
        <View style={styles.socialIcons}>
          <RoundImageButton
            borderRadius={20}
            style={{marginRight: 10}}
            image={images.facebook}
            onPress={() => {
              openLink('https://www.facebook.com/140077001562439');
            }}
          />
          <RoundImageButton
            borderRadius={20}
            style={{marginRight: 10}}
            image={images.insta}
            onPress={() => {
              openLink('https://www.instagram.com/natourwine_official/');
            }}
          />
          <RoundImageButton
            borderRadius={20}
            style={{marginRight: 10}}
            image={images.tele}
            onPress={() => openTelegram()}
          />
          <RoundImageButton
            borderRadius={20}
            style={{marginRight: 10}}
            image={images.youtube}
            onPress={() => {
              openLink(
                'https://www.youtube.com/channel/UC0B5koohj5rimZpW9NqMr8w',
              );
            }}
          />
          <RoundImageButton
            borderRadius={20}
            style={{marginRight: 10}}
            image={images.web}
            onPress={() => {
              openLink('https://atlantevignaiolinaturali.wordpress.com/');
            }}
          />
          <RoundImageButton
            borderRadius={20}
            image={images.mail}
            onPress={() => openMail()}
          />
        </View>
      </View>
    </View>
  );
}
