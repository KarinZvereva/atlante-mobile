import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
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
import {LoginDal} from './Login.dal';
import {AuthContext} from '../../common/context';

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
    backgroundColor: '#659a4a',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    //backgroundColor: '#1B5D28',
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export function Login() {
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {signIn} = React.useContext(AuthContext);

  // Initial loading
  useEffect(() => {
    let timer = setTimeout(() => SplashScreen.hide(), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const Login = () => {
    setLoading(true);
    LoginDal.login({userName, password})
      .then((res) => {
        console.log('login success!');
        console.log(`token: ${res}`);
        signIn(res);
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
      <Image
        style={styles.image}
        source={require('../../assets/img/login_logo.jpeg')}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username..."
          placeholderTextColor="#fff"
          onChangeText={(value) => setUserName(value)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password..."
          placeholderTextColor="#fff"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <LinearGradient
        colors={['#ce8a86', '#bd6665', '#a92a3f']}
        style={styles.loginBtn}>
        <View>
          <TouchableOpacity onPress={() => Login()}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {isLoading && <ActivityIndicator size="small" />}
      {isError && (
        <View>
          <Text>{error}</Text>
        </View>
      )}
    </View>
  );
}
