import React, {useContext} from 'react';
import {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {AuthContext} from '../../common/modules/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export function LogOut() {
  const {actionsProvider} = useContext(AuthContext);

  useEffect(() => {
    if (actionsProvider) actionsProvider.signOut();
  }, [actionsProvider]);

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  );
}
