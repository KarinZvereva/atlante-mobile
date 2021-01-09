/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { HomeScreen } from './screens/Home/Home';
import { JourneyScreen } from './screens/Journey/Journey';
import { LoginScreen } from './screens/Login/Login';

import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {Text, StyleSheet, Image, View} from 'react-native';
import {Container, Content, Header, Body} from 'native-base';

// header in drawer
const CustomDrawerContentComponent = (props: any) => (
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
    FirstScreen: {
      screen: HomeScreen,
    },
    SecondScreen: {
      screen: JourneyScreen,
    },
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'FirstScreen',
    drawerBackgroundColor: 'white',
    drawerWidth: 200,
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: '#2EB6AE',
      inactiveTintColor: '#939393',
    },
  },
);

const RootNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    //navigationBarStyle: {navBarHidden: true},
    navigationOptions: {
      headerShown: false,
    },
  },
  AfterLogin: {
    screen: MyDrawerNavigator,
    // navigationBarStyle: {navBarHidden: true},
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(RootNavigator);

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

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// declare const global: { HermesInternal: null | {} };

// const App = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;
