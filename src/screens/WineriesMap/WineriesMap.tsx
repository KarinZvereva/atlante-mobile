import React, {useContext} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import MapView, {LatLng, Region} from 'react-native-maps';
import {Header} from '../../common/components/Header/Header';
import Geolocation from '@react-native-community/geolocation';
import {COORDINATES_DELTA} from '../../common/constants/coordinates';
import {Marker, Callout} from 'react-native-maps';
import {useState, useRef, useEffect} from 'react';
import {
  IBaseRouteNavigationProps,
  Winery,
  WineryType,
} from '../../common/interfaces';
import {wineryDataDal} from './WineriesMap.dal';
import {nameof} from '../../utils';
import {icons, markerDefaultGreen} from '../../common/constants';
import {WineryPopup} from './WineryPopup';
import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {wineriesMapStyles} from './WineriesMap.styles';
import {MapsCallout} from './MapsCallout';
import {MapContext} from '../../common/modules/map/MapContext';

const {LATITUDE_DELTA, LONGITUDE_DELTA} = COORDINATES_DELTA;

const InitialRegion: Region = {
  latitude: 42.393368,
  longitude: 13.094724,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const wineryFilterBase: string = `(${nameof<Winery>(
  'type',
)} = 1 OR ${nameof<Winery>('type')} = 2 OR ${nameof<Winery>(
  'type',
)} = 3 OR ${nameof<Winery>('type')} = 6)`;

const isAndroid = Platform.OS === 'android';

export const WineriesMap = (props: IBaseRouteNavigationProps) => {
  // State
  const [loading, setLoading] = useState<boolean>(false);
  const [wineries, setWineries] = useState<Winery[]>();
  const [search, setSearch] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<LatLng>();

  // Context
  const {
    data: {mapsType, searchAroundMeRadius, searchAroundPointRadius},
  } = useContext(MapContext);

  // Ref
  const map = useRef<MapView>(null);

  // Navigation
  const navigation = useNavigation();

  const loadWineriesCallback = useCallback(
    (filters?: string) => {
      setLoading(true);
      if (wineries) setWineries(undefined);
      wineryDataDal
        .get({
          filter: filters
            ? `${wineryFilterBase} AND ${filters}`
            : wineryFilterBase,
        })
        .then((result) => {
          if (result && result.data) {
            setWineries(result.data.data || []);
            setLoading(false);
            if (map && map.current)
              map.current.fitToCoordinates(
                result.data.data?.map((r) => ({
                  latitude: r.location?.latitude!,
                  longitude: r.location?.longitude!,
                })),
                {
                  animated: true,
                  edgePadding: {bottom: 10, left: 10, right: 10, top: 10},
                },
              );
          } else {
            if (result.error) console.error(JSON.stringify(result.error));
            Alert.alert(`Nessuna cantina trovata!`);
            setLoading(false);
          }
        })
        .catch((_e) => {
          Alert.alert(
            `Connessione con il server non riuscita, riprova in seguito!`,
          );
          setLoading(false);
        });
    },
    [wineries],
  );

  const loadWineriesFromCoordinates = useCallback(
    ({latitude, longitude}: LatLng, radius: number = 40) => {
      setLoading(true);
      if (wineries) setWineries(undefined);
      wineryDataDal
        .around({
          lat: latitude,
          lon: longitude,
          radius,
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
            setWineries(res);
            setLoading(false);
            if (map && map.current)
              map.current.fitToCoordinates(
                res.map((r) => ({
                  latitude: r.location?.latitude!,
                  longitude: r.location?.longitude!,
                })),
                {
                  animated: true,
                  edgePadding: {bottom: 10, left: 10, right: 10, top: 10},
                },
              );
          } else {
            setLoading(false);
          }
        })
        .catch(() => {
          Alert.alert(
            `Connessione con il server non riuscita, riprova in seguito!`,
          );
          setLoading(false);
        });
    },
    [wineries, map],
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
        loadWineriesFromCoordinates(
          {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
          searchAroundMeRadius,
        );
      },
      (_error) => {
        Alert.alert(`Errore nel recupero della posizione con il GPS!`);
      },
      {enableHighAccuracy: true},
    );
  }, [loadWineriesFromCoordinates]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        loadWineriesFromCoordinates(
          {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
          120,
        );
      },
      (_error) => {
        loadWineriesCallback();
      },
      {enableHighAccuracy: true},
    );
  }, []);

  useEffect(() => {
    if (selectedPosition)
      loadWineriesFromCoordinates(selectedPosition, searchAroundPointRadius);
  }, [selectedPosition]);

  return (
    <View style={wineriesMapStyles.pageContainer}>
      <MapView
        initialRegion={InitialRegion}
        style={wineriesMapStyles.map}
        ref={map}
        showsUserLocation={true}
        onLongPress={(event) => {
          setSelectedPosition(event.nativeEvent.coordinate);
        }}
        mapType={mapsType}
        showsCompass={true}
        zoomEnabled={!loading}
        scrollEnabled={!loading}
        pitchEnabled={!loading}
        rotateEnabled={!loading}>
        <>
          {wineries &&
            wineries.map((d, i) => (
              <Marker
                key={d._id}
                coordinate={{
                  latitude: d.location?.latitude || 0,
                  longitude: d.location?.longitude || 0,
                }}
                icon={isAndroid ? icons.winery_marker : null}
                image={isAndroid ? null : icons.winery_marker}
                tracksViewChanges={false}>
                <Callout
                  tooltip={true}
                  onPress={() =>
                    navigation.navigate('WineryDetails', {winery: d})
                  }>
                  <MapsCallout>
                    <WineryPopup winery={d} />
                  </MapsCallout>
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
      <Header
        {...props}
        showName="Mappa Cantine"
        extraButtons={[
          <View
            key="b1"
            style={{
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('MapSettings')}>
              <Image
                source={icons.ingranaggio_piccolo}
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: 5,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>,
          <View
            key="b2"
            style={{
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginRight: 5,
            }}>
            <Image
              source={icons.filtri_piccolo}
              style={{
                width: 25,
                height: 25,
                marginLeft: 5,
                resizeMode: 'contain',
              }}
            />
          </View>,
        ]}
      />
      {loading && (
        <View style={wineriesMapStyles.onLoading}>
          <ActivityIndicator size="large" color={markerDefaultGreen} />
        </View>
      )}
      <TouchableOpacity
        style={wineriesMapStyles.infoMapsButton}
        onPress={() => navigation.navigate('MapsInfo')}
        disabled={loading}>
        <Image
          style={{width: 40, height: 40, resizeMode: 'contain'}}
          source={icons.info_map}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={wineriesMapStyles.reloadButton}
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
        style={wineriesMapStyles.cleanButton}
        onPress={() => {
          setWineries(undefined);
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
        style={wineriesMapStyles.goToMyPositionButton}>
        <Image
          style={{width: 40, height: 40}}
          source={require('../../assets/icon/posizione.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => filterWithMyPosition()}
        style={wineriesMapStyles.filterMyPositionButton}
        disabled={loading}>
        <Image
          style={{width: 40, height: 40}}
          source={require('../../assets/icon/intorno.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={wineriesMapStyles.searchButton}
        onPress={() => {
          search !== ''
            ? loadWineriesCallback(
                `(${nameof<Winery>(
                  'name',
                )}.Contains('${search.trim()}') OR ${nameof<Winery>(
                  'name2',
                )}.Contains('${search.trim()}') OR ${nameof<Winery>(
                  'vigneron',
                )}.Contains('${search.trim()}'))`,
              )
            : loadWineriesCallback();
        }}
        disabled={loading}>
        <Image
          style={{width: 40, height: 40}}
          source={require('../../assets/icon/cerca.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={wineriesMapStyles.searchMapText}>
        <TextInput
          placeholder="... cerca"
          placeholderTextColor="#000000"
          onChangeText={(value) => setSearch(value)}
          editable={!loading}
          value={search}
          style={{fontFamily: 'Novecentosanswide-Normal'}}
        />
      </TouchableOpacity>
    </View>
  );
};
