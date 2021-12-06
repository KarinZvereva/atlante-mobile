import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import {Header} from '../../common/components/Header/Header';
import {RoundImageButton} from '../../common/components/RoundImageButton';
import {icons, images} from '../../common/constants';
import {useAuth} from '../../common/customHooks';
import {IRouteProps} from '../../common/interfaces';
import {sendEmail} from '../../common/modules/email/sendEmail';
import {openLink} from '../../common/modules/linking';
import {homeStyles} from './Home.styles';
import {useTranslation} from 'react-i18next';

export function Home(props: IRouteProps) {
  /** Navigation */
  const navigation = useNavigation();

  /** I18n */
  const {t} = useTranslation();

  /** Auth */
  const isLogged = useAuth();

  /** Effects */
  useEffect(() => {
    if (!isLogged) navigation.navigate('SignIn');
  }, [isLogged]);

  /** Callbacks */
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
    <SafeAreaView style={homeStyles.page}>
      <View>
        <Header {...props} showName="Home" />
      </View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={homeStyles.scroll_container}>
        <View style={homeStyles.centered_container}>
          <Image
            source={images.logo_calice}
            style={Platform.OS == 'ios' ? homeStyles.logo_ios : homeStyles.logo}
          />
          <Text style={homeStyles.title}>{t('home.title_1')}</Text>
          <Text style={[homeStyles.title, {marginBottom: 60}]}>
            {t('home.title_2')}
          </Text>
          <View style={homeStyles.maps_container}>
            <RoundImageButton
              style={homeStyles.map_images}
              borderRadius={40}
              image={icons.ristori_home}
              onPress={() => {
                navigation.navigate('Wineries Map');
              }}
            />
            <RoundImageButton
              style={homeStyles.map_images}
              borderRadius={40}
              image={icons.cantine_home}
              onPress={() => {
                navigation.navigate('Wineries Map');
              }}
            />
            <RoundImageButton
              style={homeStyles.map_images}
              borderRadius={40}
              image={icons.fiere_home}
              onPress={() => {
                navigation.navigate('Wineries Map');
              }}
            />
          </View>
          <Text style={homeStyles.goToWineriesText}>{t('home.map')}</Text>
          <Text style={homeStyles.keepInTouchText}>{t('home.contact')}</Text>
          <View style={homeStyles.socialIcons}>
            <RoundImageButton
              borderRadius={20}
              style={{marginRight: 10}}
              image={icons.facebook}
              onPress={() => {
                openLink('https://www.facebook.com/NaTourWine');
              }}
            />
            <RoundImageButton
              borderRadius={20}
              style={{marginRight: 10}}
              image={icons.insta}
              onPress={() => {
                openLink('https://www.instagram.com/natourwine_official/');
              }}
            />
            <RoundImageButton
              borderRadius={20}
              style={{marginRight: 10}}
              image={icons.tele}
              onPress={() => openTelegram()}
            />
            <RoundImageButton
              borderRadius={20}
              style={{marginRight: 10}}
              image={icons.youtube}
              onPress={() => {
                openLink(
                  'https://www.youtube.com/channel/UC0B5koohj5rimZpW9NqMr8w',
                );
              }}
            />
            <RoundImageButton
              borderRadius={20}
              style={{marginRight: 10}}
              image={icons.web}
              onPress={() => {
                openLink('https://atlantevignaiolinaturali.wordpress.com/');
              }}
            />
            <RoundImageButton
              borderRadius={20}
              image={icons.mail}
              onPress={() => openMail()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
