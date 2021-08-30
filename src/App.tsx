import React, {useEffect, useMemo, useReducer} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './screens/Home/Home';
import {Journey} from './screens/Journey/Journey';
import {AuthContext} from './common/modules/auth/AuthContext';
import {Login} from './screens/Login';
import {
  AuthActionsType,
  AuthReducer,
  AuthTokenManager,
  InitialAuthState,
} from './common/modules/auth';
import {LoginApiOutputData} from './common/interfaces';
import SplashScreen from 'react-native-splash-screen';
import {SignUp} from './screens/SignUp/SignUp';
import {WineriesMap} from './screens/WineriesMap';
import {LogOut} from './screens/LogOut/LogOut';
import {AccountRestore} from './screens/AccountRestore';
import {Restaurant} from './screens/Restaurant';
import {Info} from './screens/Info';
import {WineryDetail} from './screens/WineryDetails/WineryDetails';
import {MapsInfo} from './screens/MapsInfo';
import {SignupTerms} from './screens/SignUp/SignupTerms';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const drawerStyles = StyleSheet.create({
  drawer_label_text: {fontSize: 14, fontFamily: 'Novecentosanswide-Bold'},
  header_text: {fontFamily: 'Novecentosanswide-Bold'},
});

const PrivateNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: ({size}) => (
            <Image
              source={require('./assets/icon/home.png')}
              style={{height: size + 5, width: size + 5}}
            />
          ),
          drawerLabel: () => (
            <Text style={drawerStyles.drawer_label_text}>Home</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Wineries Map"
        component={WineriesMap}
        options={{
          headerShown: false,
          drawerIcon: ({size}) => (
            <Image
              source={require('./assets/icon/wineries_map.png')}
              style={{height: size + 5, width: size + 5}}
            />
          ),
          drawerLabel: () => (
            <Text style={drawerStyles.drawer_label_text}>Wineries Map</Text>
          ),
        }}
      />
      {/*<Drawer.Screen
        name="Journey"
        component={Journey}
        options={{
          headerShown: false,
          drawerIcon: ({size}) => (
            <Image
              source={require('./assets/icon/journey.png')}
              style={{height: size + 5, width: size + 5}}
            />
          ),
          drawerLabel: () => (
            <Text style={drawerStyles.drawer_label_text}>Journey</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Tavern"
        component={Restaurant}
        options={{
          headerShown: false,
          drawerIcon: ({size}) => (
            <Image
              source={require('./assets/icon/ristori.png')}
              style={{height: size + 5, width: size + 5}}
            />
          ),
          drawerLabel: () => (
            <Text style={drawerStyles.drawer_label_text}>Tavern</Text>
          ),
        }}
      />*/}
      <Drawer.Screen
        name="Info"
        component={Info}
        options={{
          headerShown: false,
          drawerIcon: ({size}) => (
            <Image
              source={require('./assets/icon/info.png')}
              style={{height: size + 5, width: size + 5}}
            />
          ),
          drawerLabel: () => (
            <Text style={drawerStyles.drawer_label_text}>Info</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={LogOut}
        options={{
          headerShown: false,
          drawerIcon: ({size}) => (
            <Image
              source={require('./assets/icon/logout.png')}
              style={{height: size + 5, width: size + 5}}
            />
          ),
          drawerLabel: () => (
            <Text style={drawerStyles.drawer_label_text}>Logout</Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  const [state, dispatch] = useReducer(AuthReducer, InitialAuthState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AuthTokenManager.getLoginDataObj();
      if (!AuthTokenManager.isExpiredToken(userToken?.token))
        dispatch({
          type: AuthActionsType.RESTORE_TOKEN,
          token: userToken?.token,
          refreshToken: userToken?.refreshToken,
        });
      else dispatch({type: AuthActionsType.SIGN_OUT});
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    if (!state.isLoading) setTimeout(() => SplashScreen.hide(), 3000);
  }, [state.isLoading]);

  const authContext = useMemo(
    () => ({
      signIn: async (token: LoginApiOutputData) => {
        const result = await AuthTokenManager.saveTokenData(token);
        if (result) {
          dispatch({
            type: AuthActionsType.SIGN_IN,
            token: token?.token,
            refreshToken: token?.refreshToken,
            userData: AuthTokenManager.decodeToken(token.token),
          });
        }
        return result;
      },
      signOut: async () => {
        const result = await AuthTokenManager.removeSavedToken();
        if (result) dispatch({type: AuthActionsType.SIGN_OUT});
        return result;
      },
      refresh: async (token: LoginApiOutputData) => {
        const result = await AuthTokenManager.updateTokenData(token);
        if (result) {
          dispatch({
            type: AuthActionsType.REFRESH_TOKEN,
            token: token?.token,
            refreshToken: token?.refreshToken,
            userData: AuthTokenManager.decodeToken(token.token),
          });
        }
        return result;
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{state, actionsProvider: authContext}}>
      {!state.isLoading && (
        <NavigationContainer>
          <Stack.Navigator>
            {state.userToken == null ? (
              <>
                <Stack.Screen
                  name="SignIn"
                  component={Login}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUp}
                  options={{
                    title: 'Registrati',
                    headerTitleStyle: {...drawerStyles.header_text},
                    headerLeft: () => (null),
                  }}
                />
                <Stack.Screen
                  name="SignupTerms"
                  component={SignupTerms}
                  options={{
                    title: 'Termini e condizioni di utilizzo',
                    headerTitleStyle: {...drawerStyles.header_text},
                  }}
                />
                <Stack.Screen
                  name="AccountRestore"
                  component={AccountRestore}
                  options={{
                    title: 'Recupera Account',
                    headerTitleStyle: {...drawerStyles.header_text},
                  }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="App"
                  component={PrivateNavigation}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="WineryDetails"
                  component={WineryDetail}
                  options={{
                    title: 'Dettagli cantina',
                    headerTitleStyle: {...drawerStyles.header_text},
                  }}
                />
                <Stack.Screen
                  name="MapsInfo"
                  component={MapsInfo}
                  options={{
                    title: 'Info utilizzo mappa',
                    headerTitleStyle: {...drawerStyles.header_text},
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </AuthContext.Provider>
  );
}
