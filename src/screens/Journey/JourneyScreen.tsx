import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Header} from '../../common/components/Header/Header';

export class JourneyScreen extends Component<any> {
  static navigationOptions = {
    drawerLabel: 'Journey',
  };

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Header {...this.props} showName="Itinerari e viaggi" />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Itinerari e viaggi... Work in Progress!!!</Text>
        </View>
      </View>
    );
  }
}
