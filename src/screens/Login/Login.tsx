import React, {useCallback, useContext, useState} from 'react';
import {Text, View, ActivityIndicator, Image, SafeAreaView, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {markerDefaultGreen} from '../../common/constants';
import {AuthContext, AuthDal} from '../../common/modules/auth';
import {styles} from './Login.styles';
import {LoginManager, Settings, AccessToken} from 'react-native-fbsdk-next';
import appleAuth from '@invertase/react-native-apple-authentication'
import {images} from '../../common/constants';
import {useTranslation} from 'react-i18next'
import {ProfileDal} from '../Profile/Profile.dal';
import {getDeviceLang} from '../../localization/i18n';
import {ProfileSettingsApiOutputData} from '../../common/interfaces';
import {GoogleSignin,  statusCodes} from '@react-native-google-signin/google-signin';

export function Login(props: any) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {data, actionsProvider} = useContext(AuthContext);
  const {t, i18n} = useTranslation();


  const LoginGoogle = async () => {

    console.log("Google sign in start...")
    console.log("Google sign in configure...")
    GoogleSignin.configure();

    setError('');
    setIsError(false);
    setLoading(true);

    try {
      console.log("Google check play services...")
      await GoogleSignin.hasPlayServices();
      console.log("Google sign in...")
      const userInfo = await GoogleSignin.signIn();
      /**
      {
        idToken: string,
        serverAuthCode: string,
        scopes: Array<string>, // on iOS this is empty array if no additional scopes are defined
        user: {
          email: string,
          id: string,
          givenName: string,
          familyName: string,
          photo: string, // url
          name: string // full name
        }
      }
       */

      console.log("Google User", userInfo)

      if ( userInfo.idToken ) {
        const googleToken = userInfo.idToken;
        AuthDal.googlelogin({googleToken})
        .then((res: any) => {
          console.log("Result : ", res)
          if (!res.token || !res.refreshToken) {
            setError(t('error.login.0007'));
            setIsError(true);
            setLoading(false);
            return;
          }

          if (actionsProvider) {
            ProfileDal.loadSettings(res.token)
            .then((result) => {
              if (result && result.success) {
                const lang = result.data?.language;
                actionsProvider?.settings(result);
                i18n.changeLanguage(lang);
                actionsProvider.signIn(res);
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
                i18n.changeLanguage(lang);
                actionsProvider.signIn(res);
              } else if ( err === 422) { // No User token
                setError(t("error.profile.0007"));
                setIsError(true);
                setLoading(false);
                return;
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
        .catch((err: any) => {
          console.log(JSON.stringify(err));
          setError(JSON.stringify(err));
          setIsError(true);
          setLoading(false);
        });

        //console.log(`Google Authentication Completed, ${user}, ${email}`);
      } else {
        // no token - failed sign-in?
        setError(t('error.login.0007'));
        setIsError(true);
        setLoading(false);
      }        
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        setError(t('error.login.0004'));
        setIsError(true);
        setLoading(false);
        return;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        setError(t('error.login.0009'));
        setIsError(true);
        setLoading(false);
        return;
      } else {
        // some other error happened
        console.error(error);
        setError(error);
        setIsError(true);
        setLoading(false);
        return;
      }
    }
  }


  const LoginApple = async () => {
    /**
     * You'd technically persist this somewhere for later use.
     */
    let user = null;
    setError('');
    setIsError(false);
    setLoading(true);

    // start a login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const {
        user: newUser,
        email,
        nonce,
        identityToken,
        realUserStatus /* etc */,
      } = appleAuthRequestResponse;

      user = newUser;

      if (identityToken) {
        const appleToken = identityToken;

        AuthDal.applelogin({appleToken})
        .then((res: any) => {
          console.log("Result : ", res)
          if (!res.token || !res.refreshToken) {
            setError(t('error.login.0003'));
            setIsError(true);
            setLoading(false);
            return;
          }

          if (actionsProvider) {
            ProfileDal.loadSettings(res.token)
            .then((result) => {
              if (result && result.success) {
                const lang = result.data?.language;
                actionsProvider?.settings(result);
                i18n.changeLanguage(lang);
                actionsProvider.signIn(res);
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
                i18n.changeLanguage(lang);
                actionsProvider.signIn(res);
              } else if ( err === 422) { // No User token
                setError(t("error.profile.0007"));
                setIsError(true);
                setLoading(false);
                return;
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
      } else {
        // no token - failed sign-in?
        setError(t('error.login.0003'));
        setIsError(true);
        setLoading(false);
      }

      if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }

      console.log(`Apple Authentication Completed, ${user}, ${email}`);
    } catch (error:any) {
      if (error.code === appleAuth.Error.CANCELED) {
        setError(t('error.login.0004'));
        setIsError(true);
        setLoading(false);
        return;
      } else {
        console.error(error);
        setError(error);
        setIsError(true);
        setLoading(false);
        return;
      }
    }
  }

  /**
   * Execute Facebook Login
   */
  const LoginFb = useCallback(() => {
    Settings.initializeSDK(); // Possibly only do this for iOS if no need to handle a GDPR-type flow
    setError('');
    setIsError(false);
    setLoading(true);

    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          setError(t('error.login.0005'));
          setIsError(true);
          setLoading(false);
          return;
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const facebookToken =
              data?.accessToken != null ? data?.accessToken : '';

            AuthDal.facebooklogin({facebookToken})
              .then((res: any) => {
                if (!res.token || !res.refreshToken) {
                  setError(t('error.login.0006'));
                  setIsError(true);
                  setLoading(false);
                  return;
                }

                if (actionsProvider) {
                  ProfileDal.loadSettings(res.token)
                  .then((result) => {
                    if (result && result.success) {
                      const lang = result.data?.language;
                      actionsProvider?.settings(result);
                      i18n.changeLanguage(lang);
                      actionsProvider.signIn(res);
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
                      i18n.changeLanguage(lang);
                      actionsProvider.signIn(res);
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
          });
        }
      })
      .catch((err) => {
        console.error('Login Error ' + err.toString());
        setError(JSON.stringify(err));
        setIsError(true);
        setLoading(false);
      });
  }, []);

  /**
   * Smart Login with credentials stored
   */
  const LoginSmart = useCallback(() => {
    const userName = data.userName;
    const password = data.password;

    if (userName && password) {
      AuthDal.login({userName, password})
        .then((res: any) => {
          if (!res.token || !res.refreshToken) {
            setError('Dati errati');
            setIsError(true);
            setLoading(false);
            return;
          }
          if (actionsProvider) {  //actionsProvider.signIn(res);

            ProfileDal.loadSettings(res.token)
            .then((result) => {
              if (result && result.success) {
                actionsProvider?.settings(result);
                i18n.changeLanguage(result.data?.language);
                actionsProvider.signIn(res);
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
                i18n.changeLanguage(lang);
                actionsProvider.signIn(res);
                setLoading(false);
              } else if ( err === 422) { // No User token
                setError(t("error.profile.0007"));
                setIsError(true);
                setLoading(false);
                return;
              } else {
                setError(err);
                setIsError(true);
                setLoading(false);
                return;
              }
            });

          }
        })
        .catch((err) => {
          console.error(JSON.stringify(err));
          setError(JSON.stringify(err));
          setIsError(true);
          setLoading(false);
        });
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        {!data.userToken && data.userName && !isLoading && LoginSmart()}
        {!isLoading && (
          <>
            <Image
              style={styles.image}
              source={require('../../assets/img/login_logo.png')}
            />
            <LinearGradient
              colors={['#659a4a', '#4b7240']}
              style={styles.loginBtn}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('LoginStandard')}
                disabled={!actionsProvider}>
                <View style={styles.loginBtnSubView}>
                  <Text style={styles.loginText}>{t('login.standard')}</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
            <Text style={styles.separatorText}>{t('login.or')}</Text>
            {Platform.OS == 'android' && (
              <>
                <View style={styles.separatorButton}/>            
                <LinearGradient
                  colors={['#4285F4', '#4285F4', '#4285F4']}
                  style={styles.loginGoogleBtn}>
                  <TouchableOpacity
                    onPress={() => LoginGoogle()}
                    disabled={!actionsProvider}>
                    <View style={styles.loginBtnSubView}>
                      <Image
                        source={images.google_logo}
                        style={styles.google_logo}
                      />
                      <Text style={styles.loginGoogleText}>{t('login.google')}</Text>
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              </>
            )}
            <View style={styles.separatorButton}/>
            <LinearGradient
              colors={['#1778F2', '#1778F2', '#1778F2']}
              style={styles.loginFbBtn}>
              <TouchableOpacity
                onPress={() => LoginFb()}
                disabled={!actionsProvider}>
                <View style={styles.loginBtnSubView}>
                  <Image
                    source={images.facebook_logo}
                    style={styles.facebook_logo}
                  />
                  <Text style={styles.loginFbText}>{t('login.facebook')}</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
            {Platform.OS == 'ios' && (
              <>
                <View style={styles.separatorButton}/>
                <LinearGradient
                  colors={['#000000', '#000000', '#000000']}
                  style={styles.appleButton}>
                  <TouchableOpacity
                    onPress={() => LoginApple()}
                    disabled={!actionsProvider}>
                    <View style={styles.loginBtnSubView}>
                      <Image
                        source={images.apple_logo}
                        style={styles.apple_logo}
                      />
                      <Text style={styles.loginAppleText}>{t('login.apple')}</Text>
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              </>
            )}
          </>
        )}
        {isLoading && (
          <View>
            <ActivityIndicator size="large" color={markerDefaultGreen} />
          </View>
        )}
        {isError && (
          <View>
            <Text style={{paddingTop: 5, color: 'red'}}>{error}</Text>
          </View>
        )}
      </View>
      </SafeAreaView>
  );
}
