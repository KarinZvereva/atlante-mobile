import React from 'react';
import { Text, View, Button } from 'react-native';

export function LoginScreen(props: any) {
  const handleLoginButton = () => {
    props.navigation.replace('AfterLogin');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>LoginScreen......!</Text>
      <Button onPress={handleLoginButton} title="Open AfterLogin" />
    </View>
  );
}
