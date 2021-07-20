import React, {useState, useEffect} from 'react';
import {Winery} from '../../common/interfaces';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface IMarkerPopupProps {
  winery: Winery;
  style?: any;
  children?: any;
}

export const MarkerPopup = React.memo(({winery}: IMarkerPopupProps) => {
  const wineryTypeDescription = winery.type
    ? winery.type === 1
      ? 'Cantina'
      : winery.type === 2
      ? 'Vignaiolo Itinerante'
      : winery.type === 3
      ? 'Progetto'
      : winery.type === 6
      ? 'Posizione approssimativa'
      : 'Cantina'
    : 'Cantina';

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <Text
        style={{
          fontSize: 14,
          justifyContent: 'center',
          textAlign: 'center',
          fontFamily: 'Novecentosanswide-Normal',
        }}>
        --- {wineryTypeDescription} ---
      </Text>
      <Text
        style={{
          fontSize: 16,
          justifyContent: 'center',
          textAlign: 'center',
          fontFamily: 'Novecentosanswide-Normal',
        }}>
        {winery.name}
      </Text>
      {winery.vigneron && (
        <Text
          style={{
            fontSize: 16,
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'Novecentosanswide-Normal',
          }}>
          {winery.vigneron}
        </Text>
      )}
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            justifyContent: 'center',
            textAlign: 'center',
            color: '#2191b0',
          }}>
          Vedi ulteriori dettagli
        </Text>
      </TouchableOpacity>
    </View>
  );
});
