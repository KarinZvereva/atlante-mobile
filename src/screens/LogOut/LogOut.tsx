import React, {useContext} from 'react';
import {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {AuthContext} from '../../common/modules/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function LogOut() {
  const {actionsProvider} = useContext(AuthContext);

  useEffect(() => {
    if (actionsProvider) actionsProvider.signOut();
  }, [actionsProvider]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}
