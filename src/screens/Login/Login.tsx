import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {markerDefaultGreen} from '../../common/constants';
import {AuthContext, AuthDal} from '../../common/modules/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 20,
    height: 320,
    width: 320,
    resizeMode: 'contain',
  },
  inputView: {
    backgroundColor: markerDefaultGreen,
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
    fontFamily: 'Novecento Sans',
  },
  forgot_button: {
    height: 45,
    borderRadius: 30,
    width: '70%',
    alignItems: 'center',
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecento Sans',
  },
});

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

  return (
    <View style={styles.container}>
      {!isLoading && (
        <>
          <Image
            style={styles.image}
            source={require('../../assets/img/login_logo.jpeg')}
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
              secureTextEntry
              onChangeText={(value) => setPassword(value)}
            />
          </View>
          <View style={styles.forgot_button}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('AccountRestore')}>
              <Text style={{flex: 1, textAlign: 'center', color: '#2191b0'}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.forgot_button}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignUp')}>
              <Text style={{flex: 1, textAlign: 'center', color: '#2191b0'}}>
                Not registered yet? Sign Up!
              </Text>
            </TouchableOpacity>
          </View>
          <LinearGradient
            colors={['#ce8a86', '#bd6665', '#a92a3f']}
            style={styles.loginBtn}>
            <View>
              <TouchableOpacity
                onPress={() => Login()}
                disabled={!actionsProvider}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
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
