import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

export function Header(props: any) {
  const {navigation, showName} = props;
  return (
    <View
      style={{flexDirection: 'row', height: 50, backgroundColor: '#2EB6AE'}}>
      <TouchableOpacity
        style={{marginLeft: 10, alignContent: 'center', alignSelf: 'center'}}
        onPress={() => {
          navigation.openDrawer();
        }}>
        <Image
          source={{
            uri:
              'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png',
          }}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: 'blue',
          alignContent: 'center',
          alignSelf: 'center',
          marginLeft: 20,
        }}>
        {showName}
      </Text>
    </View>
  );
}
