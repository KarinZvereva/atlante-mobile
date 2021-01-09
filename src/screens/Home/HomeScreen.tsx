import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import {ScreenHeader} from '../../common/ScreenHeader';

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
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onRegionChange(region: Region) {
    this.setState({region});
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
