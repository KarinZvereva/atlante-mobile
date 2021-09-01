import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {icons} from '../../constants';

export interface HeaderProps {
  route: any;
  navigation: any;
  showName: string;
  extraButtons?: React.ReactNode[];
}

export function Header(props: HeaderProps) {
  const {navigation, showName, extraButtons} = props;
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
            source={icons.hambuger_menu}
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
            fontFamily: 'Novecentosanswide-Bold',
            fontSize: 16,
          }}>
          {showName}
        </Text>
      </View>
      {extraButtons && extraButtons.length > 0 && (
        <View
          style={{
            flexDirection: 'row-reverse',
            height: 50,
            position: 'absolute',
            right: 10,
            alignContent: 'center',
          }}>
          {extraButtons.map((e) => e)}
        </View>
      )}
    </LinearGradient>
  );
}
