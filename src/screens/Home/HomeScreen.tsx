import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import {Header} from '../../common/components/Header/Header';
import Geolocation from '@react-native-community/geolocation';
import {COORDINATES_DELTA} from '../../common/constants/coordinates';

const {LATITUDE_DELTA, LONGITUDE_DELTA} = COORDINATES_DELTA;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

interface HomeScreenState {
  region: Region;
  watchId?: number;
}

export class HomeScreen extends Component<any, HomeScreenState> {
  static navigationOptions = {
    drawerLabel: 'Home',
  };

  constructor(props: any) {
    super(props);
    this.state = {
      region: {
        latitude: 45.78825,
        longitude: 13.4324,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  componentDidMount() {
    const watchId = Geolocation.watchPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          watchId,
        });
      },
      (error) => console.debug(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000},
    );
  }

  componentWillUnmount() {
    const {watchId} = this.state;
    if (watchId) {
      try {
        Geolocation.stopObserving();
        Geolocation.clearWatch(watchId);
      } catch {}
    }
  }

  render() {
    const {region} = this.state;
    return (
      <View style={styles.pageContainer}>
        <MapView region={region} style={styles.map} showsUserLocation></MapView>
        <Header {...this.props} showName="Home" />
      </View>
    );
  }
}
