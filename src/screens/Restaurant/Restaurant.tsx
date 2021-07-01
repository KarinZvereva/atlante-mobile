import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header} from '../../common/components/Header/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export function Restaurant(props: any) {
  return (
    <View style={styles.container}>
      <Header {...props} showName="Osti e ristori" />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Osti e ristori WIP</Text>
      </View>
    </View>
  );
}
