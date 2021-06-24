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
import {AuthContext, AuthDal} from '../../common/auth';

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
    setLoading(true);
    AuthDal.login({userName, password})
      .then((res) => {
        if (actionsProvider) {
          actionsProvider.signIn(res).then(() => {
            setLoading(false);
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
    <View style={styles.container}>
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
        <TouchableOpacity>
          <Text style={{flex: 1, textAlign: 'center', color: '#2191b0'}}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.forgot_button}>
        <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
          <Text style={{flex: 1, textAlign: 'center', color: '#2191b0'}}>
            Not registered yet? Sign Up!
          </Text>
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={['#ce8a86', '#bd6665', '#a92a3f']}
        style={styles.loginBtn}>
        <View>
          <TouchableOpacity onPress={() => Login()}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {isLoading && <ActivityIndicator size="large" />}
      {isError && (
        <View>
          <Text>{error}</Text>
        </View>
      )}
    </View>
  );
}
