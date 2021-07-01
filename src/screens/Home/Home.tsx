import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Header} from '../../common/components/Header/Header';
import {AuthContext} from '../../common/modules/auth';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
  },
  centered_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function Home(props: any) {
  const {state} = useContext(AuthContext);
  const [given_name, setGivenName] = useState<string>();

  useEffect(() => {
    if (state && state.userData && !given_name)
      setGivenName(state.userData.nameid);
  }, [state]);

  return (
    <View style={styles.page}>
      <Header {...props} showName="Home" />
      <View style={styles.centered_container}>
        {!given_name && <Text>Welcome Wine Traveler!</Text>}
        {given_name && <Text>Welcome {given_name}!</Text>}
      </View>
    </View>
  );
}
