import React from 'react';
import {Image, Text, View} from 'react-native';
import {RoundImageButton} from '../../common/components/RoundImageButton';
import {icons, images} from '../../common/constants';
import {mapsInfoStyles} from './MapsInfo.styles';

export const MapsInfo = React.memo(() => {
  return (
    <View style={mapsInfoStyles.page}>
      <View style={mapsInfoStyles.centered_container}>
        <Image source={images.logo_calice} style={mapsInfoStyles.logo} />
        <View style={mapsInfoStyles.info_row}>
          <RoundImageButton borderRadius={20} image={icons.touch} />
          <View style={mapsInfoStyles.divider}></View>
          <Text style={mapsInfoStyles.info_row_text}>
            Premi all'interno del pop-up e visualizza la scheda della cantina
          </Text>
        </View>
        <View style={mapsInfoStyles.info_row}>
          <RoundImageButton borderRadius={20} image={icons.touch} />
          <View style={mapsInfoStyles.divider}></View>
          <Text style={mapsInfoStyles.info_row_text}>
            Tieni premuto su un punto della mappa e visualizza le cantine nel
            raggio di 40 km
          </Text>
        </View>
        <View style={mapsInfoStyles.info_row}>
          <Image source={icons.posizione} style={mapsInfoStyles.info_image} />
          <View style={mapsInfoStyles.divider} />
          <Text style={mapsInfoStyles.info_row_text}>
            Centra la mappa sulla tua posizione rilevata dal GPS
          </Text>
        </View>
        <View style={mapsInfoStyles.info_row}>
          <Image source={icons.intorno} style={mapsInfoStyles.info_image} />
          <View style={mapsInfoStyles.divider} />
          <Text style={mapsInfoStyles.info_row_text}>
            Visualizza solo le cantine situate nel raggio di 40 km dalla tua
            posizione
          </Text>
        </View>
        <View style={mapsInfoStyles.info_row}>
          <Image source={icons.cerca} style={mapsInfoStyles.info_image} />
          <View style={mapsInfoStyles.divider} />
          <Text style={mapsInfoStyles.info_row_text}>
            Ricerca e visualizza le cantine per nome, ove presente anche per
            vignaiolo
          </Text>
        </View>
        <View style={mapsInfoStyles.info_row}>
          <Image source={icons.reload} style={mapsInfoStyles.info_image} />
          <View style={mapsInfoStyles.divider} />
          <Text style={mapsInfoStyles.info_row_text}>
            Effettua il reset/reload della mappa
          </Text>
        </View>
        <View style={mapsInfoStyles.info_row}>
          <Image source={icons.clean_maps} style={mapsInfoStyles.info_image} />
          <View style={mapsInfoStyles.divider}></View>
          <Text style={mapsInfoStyles.info_row_text}>
            Nascondi le cantine sulla mappa
          </Text>
        </View>
        <Text style={mapsInfoStyles.search_text}>
          Attenzione: la barra di ricerca è sensibile a maiuscole/minuscole
        </Text>
        <Text style={mapsInfoStyles.bottom_text}>
          Per poter usufruire di alcune funzionalità della mappa è necessario
          che il GPS sia attivo.
        </Text>
      </View>
    </View>
  );
});
