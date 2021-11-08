import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Image,
  Switch,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {markerDefaultGreen, images} from '../../common/constants';
import {AuthContext, AuthDal} from '../../common/modules/auth';
import {styles} from './LoginStandard.styles';
import { useTranslation } from 'react-i18next';
import { ProfileDal } from '../Profile/Profile.dal';
import { getDeviceLang } from '../../localization/i18n';
import {ProfileSettingsApiOutputData} from '../../common/interfaces';

export function LoginStandard(props: any) {
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {actionsProvider} = useContext(AuthContext);
  const [isRemember, setRemember] = useState<boolean>(false);
  const {t, i18n} = useTranslation();

  const Login = () => {
    if (!userName || !password) {
      setError(t('error.login.0001'));
      setIsError(true);
      return;
    }

    setError('');
    setIsError(false);
    setLoading(true);
    AuthDal.login({userName, password})
      .then((res) => {
        if (!res.token || !res.refreshToken) {
          setError(t('error.login.0002'));
          setIsError(true);
          setLoading(false);
          return;
        }

        if (isRemember) {
          actionsProvider?.credentialIn({userName, password});
        }

        if (actionsProvider) {
          actionsProvider.signIn(res);  

          ProfileDal.loadSettings(res.token)
          .then((result) => {
            if (result && result.success) {
              const lang = result.data?.language;
              actionsProvider?.settings(result);
              i18n.changeLanguage(lang);
              setLoading(false);
            } else if (result && !result.success) {
              setError(t('error.profile.0006'));
              setIsError(true);
              setLoading(false);
              return;
            }
          })
          .catch((err) => {
            if ( err === 404)  { // No user settings
              //Default su lingua di distema
              const lang = getDeviceLang();
              const userSetting = {"data":{"language": lang}} as ProfileSettingsApiOutputData;
              actionsProvider?.settings(userSetting);
            } else if ( err === 422) { // No User token
              setError(t("error.profile.0007"));
              setIsError(true);
              setLoading(false);
              return;
              setLoading(false);
            } else {
              console.log("Generic err")
              setError(err);
              setIsError(true);
              setLoading(false);
              return;
            }
          });
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        setError(JSON.stringify(err));
        setIsError(true);
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.page}>
      {!isLoading && (
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={styles.scroll_container}>
          <Image source={images.logo_calice} style={styles.logo} />
          <View style={styles.option_container}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Username"
                placeholderTextColor="#ffffff"
                onChangeText={(value) => setUserName(value.trim())}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Password"
                placeholderTextColor="#ffffff"
                secureTextEntry={true}
                onChangeText={(value) => setPassword(value.trim())}
              />
            </View>
            <View style={styles.remember_container}>
              <Switch
                style={
                  Platform.OS == 'ios'
                    ? styles.rememberSwitch_ios
                    : styles.rememberSwitch
                }
                trackColor={{false: '#cecece', true: '#cecece'}}
                thumbColor={isRemember ? markerDefaultGreen : '#a9a9a9'}
                ios_backgroundColor="#cecece"
                value={isRemember}
                onValueChange={() => setRemember((previus) => !previus)}
              />
              <Text style={[styles.rememberText]}>{t('login_standard.remember')}</Text>
            </View>
            <View style={styles.forgot_button}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('AccountRestore')}>
                <Text style={styles.linkText}>{t('login_standard.password_lost')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.forgot_button}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('SignUp')}>
                <Text style={styles.linkText}>
                  {t('login_standard.signup')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.login_button_container}>
            <LinearGradient
              colors={['#ce8a86', '#bd6665', '#a92a3f']}
              style={styles.loginBtn}>
              <TouchableOpacity
                onPress={() => Login()}
                disabled={!actionsProvider}>
                <View style={styles.loginBtnSubView}>
                  <Text style={styles.loginText}>{t('login_standard.login')}</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      )}
      {isLoading && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}>
          <ActivityIndicator size="large" color={markerDefaultGreen} />
        </View>
      )}
      {isError && (
        <View style={{alignSelf: 'center'}}>
          <Text style={{paddingTop: 5, color: 'red'}}>{error}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
