import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {Header} from '../../common/components/Header/Header';
import {AuthContext} from '../../common/modules/auth';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
  },
  centered_container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 21,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecento Sans',
  },
  subtitle: {
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecento Sans',
  },
});

export function Home(props: any) {
  const handlePress = useCallback(async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  return (
    <View style={styles.page}>
      <View>
        <Header {...props} showName="Home" />
      </View>
      <View style={styles.centered_container}>
        <Image
          source={require('../../assets/img/logo_calice.png')}
          style={{height: 180, width: 180, resizeMode: 'center'}}
        />
        <Text style={styles.title}>Benvenuto</Text>
        <Text style={[styles.title, {marginBottom: 40}]}>Bevitore Ramingo</Text>
        <Text style={styles.subtitle}>Resta in contatto con noi</Text>
        <Text style={styles.subtitle}>I nostri canali social</Text>
        <View style={{flexDirection: 'row', margin: 40}}>
          <Image
            source={require('../../assets/icon/facebook-ico.png')}
            style={{height: 60, width: 60, resizeMode: 'center'}}
          />
          <Image
            source={require('../../assets/icon/instagram-ico.png')}
            style={{
              height: 60,
              width: 60,
              resizeMode: 'center',
              marginRight: 20,
              marginLeft: 20,
            }}
          />
          <Image
            source={require('../../assets/icon/youtube-ico.png')}
            style={{height: 60, width: 60, resizeMode: 'center'}}
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'Novecento Sans',
            marginBottom: 40,
          }}>
          Visita il blog dell'atlante
        </Text>
        <TouchableOpacity
          style={{
            height: 60,
            width: 60,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
          }}
          onPress={() => {
            handlePress('https://atlantevignaiolinaturali.wordpress.com/');
          }}>
          <Image
            source={require('../../assets/icon/web.png')}
            style={{height: 60, width: 60, resizeMode: 'center', margin: 20}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
