import React from 'react';
import {Text, View} from 'react-native';
import {Header} from '../../common/components/Header/Header';

export function Journey(props: any) {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Header {...props} showName="Itinerari e viaggi" />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Itinerari e viaggi... Work in Progress!!!</Text>
      </View>
    </View>
  );
}
