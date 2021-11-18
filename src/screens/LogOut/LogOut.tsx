import React, {useContext} from 'react';
import {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {markerDefaultGreen} from '../../common/constants';
import {AuthContext} from '../../common/modules/auth';
import { setDefaultLang } from '../../localization/i18n';

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
    setDefaultLang();
    if (actionsProvider) actionsProvider.signOut();
  }, [actionsProvider]);

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color={markerDefaultGreen} />
    </View>
  );
}
