import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import {Header} from '../../common/components/Header/Header';
import Geolocation from '@react-native-community/geolocation';
import {COORDINATES_DELTA} from '../../common/constants/coordinates';
import {Marker, Callout} from 'react-native-maps';
import {useState} from 'react';
import {useEffect} from 'react';
import {Asset, Winery} from '../../common/interfaces';
import {wineryDal, markerDal, wineryDataDal} from './WineriesMap.dal';
import {nameof} from '../../utils';
import {ActivityIndicator} from 'react-native';
import {markerDefaultGreen} from '../../common/constants';

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
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const getMarkerIcon = (iconName?: string | null, markers?: Asset[]) => {
  const selectedAsset = markers?.find((m) => iconName === m.name);
  return (
    (selectedAsset && selectedAsset.base64Data) ||
    require('../../assets/icon/default.png')
  );
};

const MarkerPopup = ({winery}: {winery: Winery}) => {
  return (
    <View>
      <Text>{winery.name}</Text>
      <Text>{winery.vigneron}</Text>
      <Text>{winery.address}</Text>
      <Text>{winery.city}</Text>
      <Text>{winery.province}</Text>
      <Text>{winery.region}</Text>
    </View>
  );
};

// const id = Geolocation.watchPosition(
//   (position) => {
//     setRegion({
//       latitude: position.coords.latitude,
//       longitude: position.coords.longitude,
//       latitudeDelta: LATITUDE_DELTA,
//       longitudeDelta: LONGITUDE_DELTA,
//     });
//   },
//   (error) => console.debug(JSON.stringify(error)),
//   {enableHighAccuracy: true, timeout: 20000},
// );

// return () => {
//   try {
//     Geolocation.clearWatch(id);
//   } catch {}
// };

export const WineryMap = (props: any) => {
  const [region, setRegion] = useState<Region>(InitialRegion);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Winery[]>();
  const [markers, setMarker] = useState<Asset[]>();

  useEffect(() => {
    setLoading(true);
    markerDal
      .get()
      .then((result) => {
        if (result && result.data) {
          setMarker(result.data.data || []);
        }
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });

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
    if (data && markers && loading) {
      setLoading(false);
    }
  }, [data, markers, loading]);

  return (
    <View style={styles.pageContainer}>
      {data && (
        <MapView
          initialRegion={InitialRegion}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}>
          {data &&
            markers &&
            data.map((d) => (
              <Marker
                key={d._id}
                coordinate={{
                  latitude: d.location?.latitude || 0,
                  longitude: d.location?.longitude || 0,
                }}
                image={require('../../assets/icon/default.png')}>
                <Callout>
                  <MarkerPopup winery={d} />
                </Callout>
              </Marker>
            ))}
        </MapView>
      )}
      <Header {...props} showName="Winery Map" />
      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={markerDefaultGreen} />
        </View>
      )}
    </View>
  );
};
