import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    minWidth: 120,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#C0C0C0',
  },
});

export function LoginScreen(props: any) {
  const [userName, setUserName] = useState('Username');
  const [password, setPassword] = useState('Password');
  const [isLoading, setLoading] = useState(false);

  // Initial loading
  useEffect(() => {
    let timer = setTimeout(() => SplashScreen.hide(), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Fake loading for simulating login processing
  useEffect(() => {
    let timer = isLoading
      ? setTimeout(() => props.navigation.replace('AfterLogin'), 3000)
      : undefined;
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading]);

  const handleLoginButton = () => {
    setLoading(true);
  };

  return (
    <View style={styles.container}>
      <Text>Login Form</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setUserName(text)}
        value={userName}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button onPress={handleLoginButton} title="Login" />
      {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );
}
