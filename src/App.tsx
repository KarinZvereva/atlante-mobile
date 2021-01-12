import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {Text, StyleSheet, Image, View} from 'react-native';
import {Container, Content, Header, Body} from 'native-base';

import { HomeScreen } from './screens/Home/HomeScreen';
import { JourneyScreen } from './screens/Journey/JourneyScreen';
import { LoginScreen } from './screens/Login/LoginScreen';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  drawerHeader: {
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  drawerImage: {
    height: 50,
    width: 50,
    borderRadius: 75,
  },
});

const DrawerMenuContent: React.FC<any> = props => (
  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.drawerImage}
            source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
          />
          <Text
            style={{
              marginLeft: 20,
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            User name
          </Text>
        </View>
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
);

const MyDrawerNavigator = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
    },
    JourneyScreen: {
      screen: JourneyScreen, 
    },
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'HomeScreen',
    drawerBackgroundColor: 'white',
    drawerWidth: 200,
    contentComponent: DrawerMenuContent,
    contentOptions: {
      activeTintColor: '#2EB6AE',
      inactiveTintColor: '#939393',
    },
  },
);

const RootNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  AfterLogin: {
    screen: MyDrawerNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(RootNavigator);