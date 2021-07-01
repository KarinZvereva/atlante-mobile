import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export function Header(props: any) {
  const {navigation, showName} = props;
  return (
    <LinearGradient
      colors={['#2fcc5b', '#018727']}
      style={{flexDirection: 'row', height: 50}}>
      <View style={{flexDirection: 'row', height: 50}}>
        <TouchableOpacity
          style={{marginLeft: 10, alignContent: 'center', alignSelf: 'center'}}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Image
            source={require('../../../assets/icon/hamburger_icon.png')}
            style={{
              width: 25,
              height: 25,
              marginLeft: 5,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            alignContent: 'center',
            alignSelf: 'center',
            marginLeft: 20,
            fontFamily: 'Novecento',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {showName}
        </Text>
      </View>
    </LinearGradient>
  );
}
