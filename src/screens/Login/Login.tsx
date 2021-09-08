import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {markerDefaultGreen, tokenKey} from '../../common/constants';
import {AuthContext, AuthDal} from '../../common/modules/auth';
import {styles} from './Login.styles';
import {LoginManager, Settings, AccessToken} from 'react-native-fbsdk-next';

export function Login(props: any) {
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {actionsProvider} = useContext(AuthContext);

  const Login = () => {
    if (!userName || !password) {
      setError('Username o password non inseriti');
      setIsError(true);
      return;
    }

    setError('');
    setIsError(false);
    setLoading(true);
    AuthDal.login({userName, password})
      .then((res) => {
        if (!res.token || !res.refreshToken) {
          setError('Dati errati');
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
  };

  /**
   *
   * @returns
   */
  const LoginFb = () => {
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
  };

  return (
    <View style={styles.container}>
      {!isLoading && (
        <>
          <Image
            style={styles.image}
            source={require('../../assets/img/login_logo.png')}
          />
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Username"
              placeholderTextColor="#ffffff"
              onChangeText={(value) => setUserName(value)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#ffffff"
              secureTextEntry={true}
              onChangeText={(value) => setPassword(value)}
            />
          </View>
          <View style={styles.forgot_button}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('AccountRestore')}>
              <Text style={styles.linkText}>Password dimenticata?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.forgot_button}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignUp')}>
              <Text style={styles.linkText}>
                Non hai un utente? Registrati!
              </Text>
            </TouchableOpacity>
          </View>
          <LinearGradient
            colors={['#ce8a86', '#bd6665', '#a92a3f']}
            style={styles.loginBtn}>
            <TouchableOpacity
              onPress={() => Login()}
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
