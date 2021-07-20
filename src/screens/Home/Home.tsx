import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {View, Text, Image, Linking, Alert} from 'react-native';
import {Header} from '../../common/components/Header/Header';
import {RoundImageButton} from '../../common/components/RoundImageButton';
import {images} from '../../common/constants';
import {sendEmail} from '../../common/modules/email/sendEmail';
import {openLink} from '../../common/modules/linking';
import {homeStyles} from './Home.styles';

export function Home(props: any) {
  const navigation = useNavigation();

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
    <View style={homeStyles.page}>
      <View>
        <Header {...props} showName="Home" />
      </View>
      <View style={homeStyles.centered_container}>
        <Image source={images.logo_calice} style={homeStyles.logo} />
        <Text style={homeStyles.title}>Benvenuto</Text>
        <Text style={[homeStyles.title, {marginBottom: 60}]}>
          Bevitore Errante
        </Text>
        <RoundImageButton
          borderRadius={40}
          image={images.wineries_map_big}
          onPress={() => {
            navigation.navigate('Wineries Map');
          }}
        />
        <Text style={homeStyles.goToWineriesText}>
          Visita la mappa delle cantine
        </Text>
        <Text style={homeStyles.keepInTouchText}>
          Resta in contatto con noi
        </Text>
        <View style={homeStyles.socialIcons}>
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
