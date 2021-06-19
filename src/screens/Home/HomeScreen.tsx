import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import {ScreenHeader} from '../../common/ScreenHeader';
import Geolocation from '@react-native-community/geolocation';
import {COORDINATES_DELTA} from '../../constants/coordinates';

const {LATITUDE_DELTA, LONGITUDE_DELTA} = COORDINATES_DELTA;

const styles = StyleSheet.create({
  pageContainer: { 
    flex: 1, 
    flexDirection: 'column' 
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
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  componentDidMount() {
    const watchId = Geolocation.watchPosition(
      (position) => {
        console.debug(JSON.stringify(position));
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          watchId
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
    return (
      <View style={styles.pageContainer}>
        <MapView
          region={this.state.region}
          style={styles.map}
          showsUserLocation
          showsMyLocationButton></MapView>
        <ScreenHeader {...this.props} showName="Home" />
      </View>
    );
  }
}
