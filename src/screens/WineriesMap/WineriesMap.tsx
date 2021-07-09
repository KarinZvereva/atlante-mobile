import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Dimensions,
  Alert,
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
import {useCallback} from 'react';

const {LATITUDE_DELTA, LONGITUDE_DELTA} = COORDINATES_DELTA;
const {width: screenWidth} = Dimensions.get('window');

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
    top: 70,
    right: 20,
    borderRadius: 30,
    backgroundColor: '#d2d2d2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterMyPositionButton: {
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
    width: screenWidth - 20 - 115,
    height: 40,
    borderRadius: 15,
    borderColor: 'rgba(150, 150, 150, 1)',
    borderWidth: 2,
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(210, 210, 210, 0.8)',
  },
});

const wineryFilterBase: string = `(${nameof<Winery>(
  'type',
)} = 1 OR ${nameof<Winery>('type')} = 2 OR ${nameof<Winery>(
  'type',
)} = 3 OR ${nameof<Winery>('type')} = 6)`;

export const WineriesMap = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Winery[]>();
  const [search, setSearch] = useState<string>('');
  const map = useRef<MapView>(null);

  const loadWineriesCallback = useCallback((filters?: string) => {
    setLoading(true);
    if (data) setData(undefined);
    wineryDataDal
      .get({
        filter: filters
          ? `${wineryFilterBase} AND ${filters}`
          : wineryFilterBase,
      })
      .then((result) => {
        if (result && result.data) {
          setData(result.data.data || []);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error(JSON.stringify(e));
        Alert.alert(
          `Connessione con il server non riuscita, uscire e riprova in seguito con una miglior connessione!`,
        );
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadWineriesCallback();
  }, []);

  const gotToMyLocation = useCallback(() => {
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
      (error) => {
        console.error(JSON.stringify(error));
        Alert.alert(`Errore nel recupero della posizione con il GPS!`);
      },
      {enableHighAccuracy: true},
    );
  }, [map]);

  const filterWithMyPosition = useCallback(() => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        setLoading(true);
        if (data) setData(undefined);
        wineryDataDal
          .around({
            lat: coords.latitude,
            lon: coords.longitude,
            radius: 10,
          })
          .then((result) => {
            if (result && result.data) {
              setData(result.data || []);
              setLoading(false);
            }
          })
          .catch((e) => {
            console.error(JSON.stringify(e));
            Alert.alert(
              `Connessione con il server non riuscita, uscire e riprova in seguito con una miglior connessione!`,
            );
            setLoading(false);
          });
      },
      (error) => {
        console.error(JSON.stringify(error));
        Alert.alert(`Errore nel recupero della posizione con il GPS!`);
      },
      {enableHighAccuracy: true},
    );
  }, []);

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
      <TouchableOpacity
        onPress={() => filterWithMyPosition()}
        style={styles.filterMyPositionButton}
        disabled={!loading}>
        <Image
          style={{width: 40, height: 40}}
          source={require('../../assets/icon/intorno.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          search !== ''
            ? loadWineriesCallback(
                `(${nameof<Winery>(
                  'name',
                )}.Contains('${search}') OR ${nameof<Winery>(
                  'name2',
                )}.Contains('${search}') OR ${nameof<Winery>(
                  'vigneron',
                )}.Contains('${search}'))`,
              )
            : loadWineriesCallback();
        }}
        disabled={!loading}>
        <Image
          style={{width: 40, height: 40}}
          source={require('../../assets/icon/cerca.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchMapText}>
        <TextInput
          placeholder="... cerca"
          placeholderTextColor="#000000"
          onChangeText={(value) => setSearch(value)}
          editable={!loading}
          value={search}
        />
      </TouchableOpacity>
    </View>
  );
};
