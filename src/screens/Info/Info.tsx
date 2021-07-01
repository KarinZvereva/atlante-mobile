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

export function Info(props: any) {
  const {state} = useContext(AuthContext);
  const [given_name, setGivenName] = useState<string>();

  useEffect(() => {
    if (state && state.userData && !given_name)
      setGivenName(state.userData.nameid);
  }, [state]);

  return (
    <View style={styles.page}>
      <Header {...props} showName="Info" />
      <View style={styles.centered_container}>
        <Text>Info screen... Work in progress</Text>
      </View>
    </View>
  );
}
