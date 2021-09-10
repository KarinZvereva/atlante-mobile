import React, {useEffect, useMemo, useReducer} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './screens/Home/Home';
//import {Journey} from './screens/Journey/Journey';
import {AuthContext} from './common/modules/auth/AuthContext';
import {Login, LoginStandard} from './screens/Login';
import {
  AuthActionsType,
  AuthReducer,
  AuthTokenManager,
  InitialAuthState,
  AuthCredentialManager,
} from './common/modules/auth';
import {LoginApiInputData, LoginApiOutputData} from './common/interfaces';
import SplashScreen from 'react-native-splash-screen';
import {SignUp} from './screens/SignUp/SignUp';
import {WineriesMap} from './screens/WineriesMap';
import {LogOut} from './screens/LogOut/LogOut';
import {AccountRestore} from './screens/AccountRestore';
//import {Restaurant} from './screens/Restaurant';
import {Info} from './screens/Info';
import {WineryDetail} from './screens/WineryDetails/WineryDetails';
import {MapInfo} from './screens/MapInfo';
import {SignupTerms} from './screens/SignUp/SignupTerms';
import {InitialMapState, MapReducer} from './common/modules/map/MapReducer';
import {MapContext} from './common/modules/map/MapContext';
import {MapActionsType} from './common/modules/map/map.constants';
import {MapTypes} from 'react-native-maps';
import {MapSettings} from './screens/MapSettings/MapSettings';
import {Profile} from './screens/Profile';
import {
  MapActionChangeConfiguration,
  MapActionChangeExtraFilter,
} from './common/modules/map/map.interface';
import {MapFilters} from './screens/MapFilters';

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
            <Text style={drawerStyles.drawer_label_text}>Mappa Cantine</Text>
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
        name="Progetto"
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
            <Text style={drawerStyles.drawer_label_text}>Il Progetto</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Profilo"
        component={Profile}
        options={{
          headerShown: false,
          drawerIcon: ({size}) => (
            <Image
              source={require('./assets/icon/profilo.png')}
              style={{height: size + 5, width: size + 5}}
            />
          ),
          drawerLabel: () => (
            <Text style={drawerStyles.drawer_label_text}>Profilo utente</Text>
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
  const [authState, authDispatch] = useReducer(AuthReducer, InitialAuthState);
  const [mapState, mapDispatch] = useReducer(MapReducer, InitialMapState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AuthTokenManager.getLoginDataObj();
      const credential = await AuthCredentialManager.getCredential();
      
      if (!AuthTokenManager.isExpiredToken(userToken?.token))
        authDispatch({
          type: AuthActionsType.RESTORE_TOKEN,
          token: userToken?.token,
          refreshToken: userToken?.refreshToken,
        });
      else if (credential != null) 
        authDispatch({
          type: AuthActionsType.RESTORE_CREDENTIAL,
          userName: credential?.userName,
          password: credential?.password,
        });
      else authDispatch({type: AuthActionsType.SIGN_OUT});
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    if (!authState.isLoading) setTimeout(() => SplashScreen.hide(), 3000);
  }, [authState.isLoading]);

  const authActionProvider = useMemo(
    () => ({
      signIn: async (token: LoginApiOutputData) => {
        const result = await AuthTokenManager.saveTokenData(token);
        if (result) {
          authDispatch({
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
        const resultCredential = await AuthCredentialManager.removeSavedCredential();
        if (result && resultCredential) authDispatch({type: AuthActionsType.SIGN_OUT});
        return result;
      },
      refresh: async (token: LoginApiOutputData) => {
        const result = await AuthTokenManager.updateTokenData(token);
        if (result)
          authDispatch({
            type: AuthActionsType.REFRESH_TOKEN,
            token: token?.token,
            refreshToken: token?.refreshToken,
            userData: AuthTokenManager.decodeToken(token.token),
          });
        return result;
      },
      credentialIn: async (credential: LoginApiInputData) => {
        const result = await AuthCredentialManager.saveCredentialData(credential);
        if (result)
          authDispatch({
            type: AuthActionsType.RESTORE_CREDENTIAL,
            userName: credential?.userName,
            password: credential?.password,
          });
        return result;
      },
    }),
    [],
  );

  const mapActionProvider = useMemo(
    () => ({
      changeConfiguration: async (
        what: MapActionChangeConfiguration,
        data: MapTypes | number,
      ) => {
        mapDispatch({type: what, payload: data});
      },
      changeExtraFilter: async (
        what: MapActionChangeExtraFilter,
        data: string | boolean,
      ) => {
        mapDispatch({type: what, payload: data});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider
      value={{data: authState, actionsProvider: authActionProvider}}>
      <MapContext.Provider
        value={{data: mapState, actionProvider: mapActionProvider}}>
        {!authState.isLoading && (
          <NavigationContainer>
            <Stack.Navigator>
              {authState.userToken == null ? (
                <>
                  <Stack.Screen
                    name="SignIn"
                    component={Login}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="LoginStandard"
                    component={LoginStandard}
                    options={{
                      title: 'Login NaTourWine',
                      headerTitleStyle: {...drawerStyles.header_text},
                    }}
                  />
                  <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{
                      title: 'Registrati',
                      headerTitleStyle: {...drawerStyles.header_text},
                      headerLeft: () => null,
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
                    component={MapInfo}
                    options={{
                      title: 'Info utilizzo mappa',
                      headerTitleStyle: {...drawerStyles.header_text},
                    }}
                  />
                  <Stack.Screen
                    name="MapSettings"
                    component={MapSettings}
                    options={{
                      title: 'Impostazioni mappa',
                      headerTitleStyle: {...drawerStyles.header_text},
                    }}
                  />
                  <Stack.Screen
                    name="MapFilters"
                    component={MapFilters}
                    options={{
                      title: 'Filtri aggiuntivi mappa',
                      headerTitleStyle: {...drawerStyles.header_text},
                    }}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </MapContext.Provider>
    </AuthContext.Provider>
  );
}
