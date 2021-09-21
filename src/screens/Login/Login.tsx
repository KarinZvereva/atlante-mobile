import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, View, ActivityIndicator, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {markerDefaultGreen} from '../../common/constants';
import {AuthContext, AuthDal} from '../../common/modules/auth';
import {styles} from './Login.styles';
import {LoginManager, Settings, AccessToken} from 'react-native-fbsdk-next';

export function Login(props: any) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {data, actionsProvider} = useContext(AuthContext);

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
                <Text style={styles.loginText}>Login</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
          <Text style={styles.separatorText}>- oppure -</Text>
          <LinearGradient
            colors={['#109bd9', '#0e5de3', '#0e12df']}
            style={styles.loginFbBtn}>
            <TouchableOpacity
              onPress={() => LoginFb()}
              disabled={!actionsProvider}>
              <View style={styles.loginBtnSubView}>
                <Text style={styles.loginText}>Login con Facebook</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
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
  );
}
