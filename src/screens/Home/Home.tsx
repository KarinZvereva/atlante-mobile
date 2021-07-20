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
    margin: 15,
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
        <Image
          source={require('../../assets/img/logo_calice.png')}
          style={{
            height: 210,
            width: 210,
            resizeMode: 'center',
            position: 'absolute',
            top: 10,
          }}
        />
        <Text style={styles.title}>Benvenuto</Text>
        <Text style={[styles.title, {marginBottom: 60}]}>Bevitore Errante</Text>
        <TouchableOpacity
          style={{
            height: 80,
            width: 80,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
          }}
          onPress={() => {
            navigation.navigate('Wineries Map');
          }}>
          <Image
            source={require('../../assets/icon/wineries_map_big.png')}
            style={{
              height: 80,
              width: 80,
              resizeMode: 'center',
              marginTop: 20,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.goToWineriesText}>
          Visita la mappa delle cantine
        </Text>
        <Text style={styles.keepInTouchText}>Resta in contatto con noi</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}
            onPress={() => {
              openLink('https://www.facebook.com/140077001562439');
            }}>
            <Image
              source={require('../../assets/icon/facebook.png')}
              style={{height: 40, width: 40, resizeMode: 'center'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              marginRight: 10,
              marginLeft: 10,
            }}
            onPress={() => {
              openLink('https://www.instagram.com/natourwine_official/');
            }}>
            <Image
              source={require('../../assets/icon/insta.png')}
              style={{
                height: 40,
                width: 40,
                resizeMode: 'center',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              marginRight: 10,
            }}
            onPress={() => openTelegram()}>
            <Image
              source={require('../../assets/icon/tele.png')}
              style={{height: 40, width: 40, resizeMode: 'center'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              marginRight: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}
            onPress={() => {
              openLink(
                'https://www.youtube.com/channel/UC0B5koohj5rimZpW9NqMr8w',
              );
            }}>
            <Image
              source={require('../../assets/icon/you.png')}
              style={{
                height: 40,
                width: 40,
                resizeMode: 'center',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              marginRight: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              openLink('https://atlantevignaiolinaturali.wordpress.com/');
            }}>
            <Image
              source={require('../../assets/icon/web.png')}
              style={{height: 40, width: 40, resizeMode: 'center'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}
            onPress={() => openMail()}>
            <Image
              source={require('../../assets/icon/mail.png')}
              style={{
                height: 40,
                width: 40,
                resizeMode: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
