import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import {Header} from '../../common/components/Header/Header';
import Geolocation from '@react-native-community/geolocation';
import {COORDINATES_DELTA} from '../../common/constants/coordinates';
import {useState} from 'react';
import {useEffect} from 'react';

const {LATITUDE_DELTA, LONGITUDE_DELTA} = COORDINATES_DELTA;

const InitialRegion: Region = {
  latitude: 45.78825,
  longitude: 13.4324,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export const WineryMap = (props: any) => {
  const [region, setRegion] = useState<Region>(InitialRegion);

  useEffect(() => {
    const id = Geolocation.watchPosition(
      (position) => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      },
      (error) => console.debug(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000},
    );

    return () => {
      try {
        Geolocation.stopObserving();
        Geolocation.clearWatch(id);
      } catch {}
    };
  }, []);

  return (
    <View style={styles.pageContainer}>
      <MapView region={region} style={styles.map} showsUserLocation></MapView>
      <Header {...props} showName="Winery Map" />
    </View>
  );
};
