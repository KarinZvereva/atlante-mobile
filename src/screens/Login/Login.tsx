import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, View, ActivityIndicator, Image, SafeAreaView, ScrollView, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {markerDefaultGreen} from '../../common/constants';
import {AuthContext, AuthDal} from '../../common/modules/auth';
import {styles} from './Login.styles';
import {LoginManager, Settings, AccessToken} from 'react-native-fbsdk-next';
import appleAuth from '@invertase/react-native-apple-authentication'
import {images} from '../../common/constants';
import { useTranslation } from 'react-i18next'

export function Login(props: any) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {data, actionsProvider} = useContext(AuthContext);
  const { t } = useTranslation();


  const LoginApple = async () => {
    /**
     * You'd technically persist this somewhere for later use.
     */
    let user = null;
    console.log('Beginning Apple Authentication');
    setError('');
    setIsError(false);
    setLoading(true);

    // start a login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      console.log('appleAuthRequestResponse', appleAuthRequestResponse);

      const {
        user: newUser,
        email,
        nonce,
        identityToken,
        realUserStatus /* etc */,
      } = appleAuthRequestResponse;

      user = newUser;

      if (identityToken) {
        // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
        console.log('identityToken', identityToken);
        const appleToken = identityToken;

        AuthDal.applelogin({appleToken})
        .then((res) => {
          console.log("Result : ", res)
          if (!res.token || !res.refreshToken) {
            setError("Impossibile eseguire l'accesso con Apple");
            setIsError(true);
            setLoading(false);
            return;
          }

          if (actionsProvider) {
            actionsProvider.signIn(res);
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
        setError("Impossibile eseguire l'accesso con Apple");
        setIsError(true);
        setLoading(false);
      }

      if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }

      console.log(`Apple Authentication Completed, ${user}, ${email}`);
    } catch (error:any) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.log('User canceled Apple Sign in.');
        setError('User canceled Apple Sign in.');
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
          setError('Login Facebook Cancelled');
          setIsError(true);
          setLoading(false);
          return;
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const facebookToken =
              data?.accessToken != null ? data?.accessToken : '';

            AuthDal.facebooklogin({facebookToken})
              .then((res) => {
                if (!res.token || !res.refreshToken) {
                  setError("Impossibile eseguire l'accesso con Facebook");
                  setIsError(true);
                  setLoading(false);
                  return;
                }

                if (actionsProvider) {
                  actionsProvider.signIn(res);
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
        .then((res) => {
          if (!res.token || !res.refreshToken) {
            setError('Dati errati');
            setIsError(true);
            setLoading(false);
            return;
          }
          if (actionsProvider) actionsProvider.signIn(res);
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
            <Text style={styles.separatorText}>- oppure -</Text>
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
            {Platform.OS == 'ios' && 
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
            }
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
