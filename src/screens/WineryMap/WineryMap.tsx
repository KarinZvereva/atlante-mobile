import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import {Header} from '../../common/components/Header/Header';
import Geolocation from '@react-native-community/geolocation';
import {COORDINATES_DELTA} from '../../common/constants/coordinates';
import {Marker} from 'react-native-maps';
import {useState} from 'react';
import {useEffect} from 'react';
import {Asset, Winery} from '../../common/interfaces';
import {mapDal, markerDal} from './WineriesMap.dal';
import {nameof} from '../../utils';

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
});

const getMarkerIcon = (iconName: string, markers: Asset[]) => {
  const selectedAsset = markers.find((m) => iconName === m.name);
  return (
    (selectedAsset && selectedAsset.base64Data) ||
    require('../../assets/icon/default.png')
  );
};

export const WineryMap = (props: any) => {
  const [region, setRegion] = useState<Region>(InitialRegion);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Winery[]>();
  const [markers, setMarker] = useState<Asset[]>();

  useEffect(() => {
    setLoading(true);
    // markerDal
    //   .get()
    //   .then((result) => {
    //     console.log(result);
    //     if (result && result.data) {
    //       setMarker(result.data.data || []);
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(JSON.stringify(e));
    //   });

    mapDal
      .get({
        filter: `${nameof<Winery>('type')} = 1 OR ${nameof<Winery>(
          'type',
        )} = 2 OR ${nameof<Winery>('type')} = 3 OR ${nameof<Winery>(
          'type',
        )} = 6`,
      })
      .then((result) => {
        console.log(result);
        if (result && result.data) {
          setData(result.data.data || []);
        }
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });

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
    //     Geolocation.stopObserving();
    //     Geolocation.clearWatch(id);
    //   } catch {}
    // };
  }, []);

  useEffect(() => {
    if (data && loading) {
      setLoading(false);
    }
  }, [data, loading]);

  return (
    <View style={styles.pageContainer}>
      {data && (
        <MapView region={region} style={styles.map} showsUserLocation={true}>
          {data.map((d, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: d.location?.latitude || 0,
                longitude: d.location?.longitude || 0,
              }}
              title={d.name || undefined}
              description={d.vigneron || undefined}
            />
          ))}
        </MapView>
      )}
      <Header {...props} showName="Winery Map" />
    </View>
  );
};
