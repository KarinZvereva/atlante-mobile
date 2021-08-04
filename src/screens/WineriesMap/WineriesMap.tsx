import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
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

const isAndroid = (Platform.OS === 'android');

export const WineriesMap = (props: IBaseRouteNavigationProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Winery[]>();
  const [search, setSearch] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<LatLng>();
  const map = useRef<MapView>(null);
  const navigation = useNavigation();

  const loadWineriesCallback = useCallback(
    (filters?: string) => {
      setLoading(true);
      if (data) setData(undefined);
      wineryDataDal
        .get({
          filter: filters
            ? `${wineryFilterBase} AND ${filters}`
            : wineryFilterBase,
          // pageNumber: 1,
          // pageSize: 60,
        })
        .then((result) => {
          if (result && result.data) {
            setData(result.data.data || []);
            setLoading(false);
            if (map && map.current)
              map.current.fitToCoordinates(
                result.data.data?.map((r) => ({
                  latitude: r.location?.latitude!,
                  longitude: r.location?.longitude!,
                })),
                {animated: true},
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
      (_error) => {
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
        showsCompass={true}
        zoomEnabled={!loading}
        scrollEnabled={!loading}
        pitchEnabled={!loading}
        rotateEnabled={!loading}>
        <>
          {data &&
            data.map((d, i) => (
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
      <Header {...props} showName="Wineries Map" />
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
      <TouchableOpacity style={wineriesMapStyles.searchMapText}>
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
