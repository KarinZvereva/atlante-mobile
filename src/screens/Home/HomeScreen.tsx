import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import {ScreenHeader} from '../../common/ScreenHeader';
import Geolocation from '@react-native-community/geolocation'; 

const {width, height} = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export class HomeScreen extends Component<any, any> {
  static navigationOptions = {
    drawerLabel: 'Home',
  };

  handleButton = () => {
    this.props.navigation.navigate('JourneyScreen');
  };

  constructor(props: any) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition((position) => {
      var initialRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      this.setState({region: initialRegion})
    },
    (error) => console.log(JSON.stringify(error)),
    { enableHighAccuracy: true, timeout: 20000 });
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <MapView
          region={this.state.region}
          style={styles.map}
        />
        <ScreenHeader {...this.props} showName="Home" />
      </View>
    );
  }
}
