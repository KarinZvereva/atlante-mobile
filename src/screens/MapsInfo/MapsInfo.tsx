import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RoundImageButton} from '../../common/components/RoundImageButton';
import {icons, images} from '../../common/constants';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
    padding: 15,
  },
  logo: {
    height: 80,
    width: 80,
    resizeMode: 'center',
    position: 'absolute',
    top: 0,
  },
  centered_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info_row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginHorizontal: 25,
    marginVertical: 10,
    fontSize: 13,
  },
  divider: {
    marginHorizontal: 5,
  },
  info_row_text: {
    width: '100%',
    textAlignVertical: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
  bottom_text: {
    fontSize: 14,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    textAlign: 'center',
    alignContent: 'center',
    fontFamily: 'Novecentosanswide-Bold',
  },
  search_text: {
    fontSize: 14,
    fontFamily: 'Novecentosanswide-Bold',
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
});

export const MapsInfo = React.memo(() => {
  return (
    <View style={styles.page}>
      <View style={styles.centered_container}>
        <Image source={images.logo_calice} style={styles.logo} />
        <View style={styles.info_row}>
          <RoundImageButton borderRadius={20} image={icons.touch} />
          <View style={styles.divider}></View>
          <Text style={styles.info_row_text}>
            Premi all'interno del pop-up e visualizza la scheda della cantina
          </Text>
        </View>
        <View style={styles.info_row}>
          <RoundImageButton borderRadius={20} image={icons.touch} />
          <View style={styles.divider}></View>
          <Text style={styles.info_row_text}>
            Tieni premuto su un punto della mappa e visualizza le cantine nel
            raggio di 40 km
          </Text>
        </View>
        <View style={styles.info_row}>
          <Image
            source={icons.posizione}
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              resizeMode: 'contain',
            }}
          />
          <View style={styles.divider}></View>
          <Text style={styles.info_row_text}>
            Centra la mappa sulla tua posizione rilevata dal GPS
          </Text>
        </View>
        <View style={styles.info_row}>
          <Image
            source={icons.intorno}
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              resizeMode: 'contain',
            }}
          />
          <View style={styles.divider}></View>
          <Text style={styles.info_row_text}>
            Visualizza solo le cantine situate nel raggio di 40 km dalla tua
            posizione
          </Text>
        </View>
        <View style={styles.info_row}>
          <Image
            source={icons.cerca}
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              resizeMode: 'contain',
            }}
          />
          <View style={styles.divider}></View>
          <Text style={styles.info_row_text}>
            Ricerca e visualizza le cantine per nome, ove presente anche per
            vignaiolo
          </Text>
        </View>
        <View style={styles.info_row}>
          <Image
            source={icons.reload}
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              resizeMode: 'contain',
            }}
          />
          <View style={styles.divider}></View>
          <Text style={styles.info_row_text}>
            Effettua il reset/reload della mappa
          </Text>
        </View>
        <View style={styles.info_row}>
          <Image
            source={icons.clean_maps}
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              resizeMode: 'contain',
            }}
          />
          <View style={styles.divider}></View>
          <Text style={styles.info_row_text}>
            Nascondi le cantine sulla mappa
          </Text>
        </View>
        <Text style={styles.search_text}>
          Attenzione: la barra di ricerca è sensibile a maiuscole/minuscole
        </Text>
        <Text style={styles.bottom_text}>
          Per poter usufruire di alcune funzionalità della mappa è necessario
          che il GPS sia attivo.
        </Text>
      </View>
    </View>
  );
});
