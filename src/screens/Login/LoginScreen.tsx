import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 40,
    height: 256,
    width: 256,
  },
  inputView: {
    backgroundColor: '#FFC0CB',
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
    backgroundColor: '#FF1493',
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export function LoginScreen() {
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);

  // Initial loading
  useEffect(() => {
    let timer = setTimeout(() => SplashScreen.hide(), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {}, [isLoading]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/img/logo.png')}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username..."
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUserName(username)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.loginBtn}>
        <TouchableOpacity>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
