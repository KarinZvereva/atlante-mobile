import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import {Header} from '../../common/components/Header/Header';
import Geolocation from '@react-native-community/geolocation';
import {COORDINATES_DELTA} from '../../common/constants/coordinates';
import {Marker, Callout} from 'react-native-maps';
import {useState, useRef, useEffect} from 'react';
import {Winery} from '../../common/interfaces';
import {wineryDataDal} from './WineriesMap.dal';
import {nameof} from '../../utils';
import {markerDefaultGreen} from '../../common/constants';
import {MarkerPopup} from './MarkerPopup';

const {LATITUDE_DELTA, LONGITUDE_DELTA} = COORDINATES_DELTA;

const InitialRegion: Region = {
  latitude: 42.393368,
  longitude: 13.094724,
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
  onLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goToMyPositionButton: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 30,
    backgroundColor: '#d2d2d2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 20,
    right: 65,
    borderRadius: 30,
    backgroundColor: '#d2d2d2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchMapText: {
    minWidth: 240,
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
  },
});

export const WineryMap = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Winery[]>();
  const map = useRef<MapView>(null);

  useEffect(() => {
    setLoading(true);
    wineryDataDal
      .get({
        filter: `${nameof<Winery>('type')} = 1 OR ${nameof<Winery>(
          'type',
        )} = 2 OR ${nameof<Winery>('type')} = 3 OR ${nameof<Winery>(
          'type',
        )} = 6`,
      })
      .then((result) => {
        if (result && result.data) {
          setData(result.data.data || []);
        }
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });
  }, []);

  useEffect(() => {
    if (data && loading) {
      setLoading(false);
    }
  }, [data, loading]);

  const gotToMyLocation = () => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        if (map && map.current) {
          map.current.animateToRegion(
            {
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 1,
              longitudeDelta: 1,
            },
            2000,
          );
        }
      },
      (error) => console.log(JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  };

  return (
    <View style={styles.pageContainer}>
      <MapView
        initialRegion={InitialRegion}
        style={styles.map}
        ref={map}
        showsUserLocation={true}>
        {data &&
          data.map((d) => (
            <Marker
              key={d._id}
              coordinate={{
                latitude: d.location?.latitude || 0,
                longitude: d.location?.longitude || 0,
              }}
              icon={require('../../assets/icon/winery_marker.png')}>
              <Callout>
                <MarkerPopup winery={d} />
              </Callout>
            </Marker>
          ))}
      </MapView>
      <Header {...props} showName="Wineries Map" />
      {loading && (
        <View style={styles.onLoading}>
          <ActivityIndicator size="large" color={markerDefaultGreen} />
        </View>
      )}
      <TouchableOpacity
        onPress={() => gotToMyLocation()}
        style={styles.goToMyPositionButton}>
        <Image
          style={{width: 40, height: 40}}
          source={require('../../assets/icon/posizione.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchButton}>
        <Image
          style={{width: 40, height: 40}}
          source={require('../../assets/icon/cerca.png')}
        />
      </TouchableOpacity>
      <View style={styles.searchMapText}>
        <TextInput
          style={{width: '50%', color: 'white', textAlign: 'center'}}
          placeholder="Search"
          placeholderTextColor="#000000"
        />
      </View>
    </View>
  );
};
