import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Header} from '../../common/components/Header/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
});

export function Home(props: any) {
  return (
    <View style={styles.container}>
      <Header {...props} showName="Home" />
    </View>
  );
}
