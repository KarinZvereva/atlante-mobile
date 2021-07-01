import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
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
});

export function Home(props: any) {
  return (
    <View style={styles.page}>
      <View>
        <Header {...props} showName="Home" />
      </View>
      <View style={styles.centered_container}>
        <Image
          source={require('../../assets/img/logo_calice.png')}
          style={{height: 240, width: 240, resizeMode: 'center'}}
        />
        <Text
          style={{
            fontSize: 21,
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'Novecento Sans',
          }}>
          Benvenuto
        </Text>
        <Text
          style={{
            fontSize: 21,
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'Novecento Sans',
            marginBottom: 40,
          }}>
          Bevitore Ramingo
        </Text>
        <Text
          style={{
            fontSize: 18,
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'Novecento Sans',
          }}>
          Resta in contatto con noi
        </Text>
        <Text
          style={{
            fontSize: 18,
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'Novecento Sans',
          }}>
          I nostri canali social
        </Text>
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
            marginBottom: 10,
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
