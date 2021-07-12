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
import MapView, {LatLng, Region} from 'react-native-maps';
import {Header} from '../../common/components/Header/Header';
import Geolocation from '@react-native-community/geolocation';
import {COORDINATES_DELTA} from '../../common/constants/coordinates';
import {Marker, Callout} from 'react-native-maps';
import {useState, useRef, useEffect} from 'react';
import {Winery, WineryType} from '../../common/interfaces';
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
    bottom: 20,
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
    right: 65,
    borderRadius: 30,
    backgroundColor: '#d2d2d2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reloadButton: {
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
  cleanButton: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 70,
    right: 65,
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
    right: 110,
    borderRadius: 30,
    backgroundColor: '#d2d2d2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchMapText: {
    width: screenWidth - 20 - 155,
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
  const [selectedPosition, setSelectedPosition] = useState<LatLng>();
  const [markerRefs, setMarkerRefs] = useState<React.RefObject<Marker>[]>([]);
  const map = useRef<MapView>(null);

  const loadWineriesCallback = useCallback(
    (filters?: string) => {
      setLoading(true);
      if (data) setData(undefined);
      wineryDataDal
        .get({
          filter: filters
            ? `${wineryFilterBase} AND ${filters}`
            : wineryFilterBase,
          pageNumber: 1,
          pageSize: 30,
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
    },
    [data],
  );

  const loadWineriesFromCoordinates = useCallback(
    ({latitude, longitude}: LatLng) => {
      setLoading(true);
      if (data) setData(undefined);
      wineryDataDal
        .around({
          lat: latitude,
          lon: longitude,
          radius: 40,
        })
        .then((result) => {
          if (result && result.data) {
            const res = result.data.filter(
              (w) =>
                w.type === WineryType.Winery ||
                w.type === WineryType.Vigneron_Itinerant ||
                w.type === WineryType.Wine_Project ||
                w.type === WineryType.Wrong_Position,
            );
            setData(res);
            setLoading(false);
            if (map && map.current)
              map.current.fitToCoordinates(
                res.map((r) => ({
                  latitude: r.location?.latitude!,
                  longitude: r.location?.longitude!,
                })),
                {animated: true},
              );
          }
        })
        .catch(() => {
          Alert.alert(
            `Connessione con il server non riuscita, riprova in seguito!`,
          );
          setLoading(false);
        });
    },
    [data, map],
  );

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
        loadWineriesFromCoordinates({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      (error) => {
        console.error(JSON.stringify(error));
        Alert.alert(`Errore nel recupero della posizione con il GPS!`);
      },
      {enableHighAccuracy: true},
    );
  }, [loadWineriesFromCoordinates]);

  useEffect(() => {
    loadWineriesCallback();
  }, []);

  useEffect(() => {
    if (selectedPosition) loadWineriesFromCoordinates(selectedPosition);
  }, [selectedPosition]);

  useEffect(() => {
    if (data && data.length > 0) {
      setMarkerRefs((markerRefs) => {
        return Array(data.length)
          .fill(1)
          .map(
            (_, i) =>
              markerRefs[i] || React.createRef<React.RefObject<Marker>>(),
          );
      });
    } else setMarkerRefs([]);
  }, [data]);

  return (
    <View style={styles.pageContainer}>
      <MapView
        initialRegion={InitialRegion}
        style={styles.map}
        ref={map}
        showsUserLocation={true}
        onLongPress={(event) => {
          setSelectedPosition(event.nativeEvent.coordinate);
        }}>
        <>
          {data &&
            data.map((d, i) => (
              <Marker
                key={d._id}
                coordinate={{
                  latitude: d.location?.latitude || 0,
                  longitude: d.location?.longitude || 0,
                }}
                icon={require('../../assets/icon/winery_marker.png')}
                ref={markerRefs[i]}
                onPress={() => {
                  setTimeout(() => {
                    markerRefs[i].current?.hideCallout();
                    markerRefs[i].current?.showCallout();
                  }, 400);
                }}>
                <Callout>
                  <MarkerPopup winery={d} />
                </Callout>
              </Marker>
            ))}
          {selectedPosition && (
            <Marker
              key={'Selected_position'}
              coordinate={{
                latitude: selectedPosition.latitude,
                longitude: selectedPosition.longitude,
              }}
            />
          )}
        </>
      </MapView>
      <Header {...props} showName="Wineries Map" />
      {loading && (
        <View style={styles.onLoading}>
          <ActivityIndicator size="large" color={markerDefaultGreen} />
        </View>
      )}
      <TouchableOpacity
        style={styles.reloadButton}
        onPress={() => {
          loadWineriesCallback();
        }}
        disabled={loading}>
        <Image
          style={{width: 40, height: 40}}
          source={require('../../assets/icon/reload.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cleanButton}
        onPress={() => {
          setData(undefined);
          setSelectedPosition(undefined);
        }}
        disabled={loading}>
        <Image
          style={{width: 40, height: 40}}
          source={require('../../assets/icon/clean_map.png')}
        />
      </TouchableOpacity>
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
        disabled={loading}>
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
        disabled={loading}>
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
