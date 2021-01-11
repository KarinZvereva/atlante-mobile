import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Text, View, Button} from 'react-native';

export function LoginScreen(props: any) {
  const handleLoginButton = () => {
    props.navigation.replace('AfterLogin');
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Login</Text>
      <Button onPress={handleLoginButton} title="Open AfterLogin" />
    </View>
  );
}
