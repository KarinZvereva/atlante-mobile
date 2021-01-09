import React, {Component} from 'react';
import {Text, View} from 'react-native';
import HeaderComponent from '../../component/Header';

export class JourneyScreen extends Component<any> {
  static navigationOptions = {
    drawerLabel: 'SecondScreen Name',
  };

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <HeaderComponent {...this.props} showName="Second Screen" />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Second Screen......!</Text>
        </View>
      </View>
    );
  }
}
