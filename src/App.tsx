import React, {useEffect, useMemo, useReducer, useRef} from 'react';
import {AppState, AppStateStatus, Image, StyleSheet, Text} from 'react-native';
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
  AuthDal,
} from './common/modules/auth';
import {
  LoginApiInputData,
  LoginApiOutputData,
  ProfileSettingsApiOutputData,
  UserSettings,
} from './common/interfaces';
import SplashScreen from 'react-native-splash-screen';
import {SignUp} from './screens/SignUp/SignUp';
import {WineriesMap} from './screens/WineriesMap';
import {LogOut} from './screens/LogOut/LogOut';
import {AccountRestore} from './screens/AccountRestore';
//import {Restaurant} from './screens/Restaurant';
import {Info} from './screens/Info';
import {WineryDetail} from './screens/WineryDetails/WineryDetails';
import {MapInfo} from './screens/MapInfo';
import {InitialMapState, MapReducer} from './common/modules/map/MapReducer';
import {MapContext} from './common/modules/map/MapContext';
//import {MapActionsType} from './common/modules/map/map.constants';
import {MapTypes} from 'react-native-maps';
import {MapSettings} from './screens/MapSettings/MapSettings';
import {Profile} from './screens/Profile';
import {
  IMapExtraFilterData,
  MapActionChangeConfiguration,
  MapActionChangeExtraFilter,
} from './common/modules/map/map.interface';
import {MapFilters} from './screens/MapFilters';
import './localization/i18n';
import {IServerError} from './common/modules/builders/entityPostBuilder';
import {useTranslation} from 'react-i18next';
import {ProfileManager} from './common/modules/profile';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const drawerStyles = StyleSheet.create({
  drawer_label_text: {fontSize: 14, fontFamily: 'Novecentosanswide-Bold'},
  header_text: {fontFamily: 'Novecentosanswide-Bold'},
});

const PrivateNavigation = () => {
  const {t} = useTranslation();
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
            <Text style={drawerStyles.drawer_label_text}>{t('menu.home')}</Text>
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
            <Text style={drawerStyles.drawer_label_text}>{t('menu.map')}</Text>
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
            <Text style={drawerStyles.drawer_label_text}>
              {t('menu.project')}
            </Text>
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
            <Text style={drawerStyles.drawer_label_text}>
              {t('menu.profile')}
            </Text>
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
            <Text style={drawerStyles.drawer_label_text}>
              {t('menu.logout')}
            </Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  const [authState, authDispatch] = useReducer(AuthReducer, InitialAuthState);
  const [mapState, mapDispatch] = useReducer(MapReducer, InitialMapState);
  const appState = useRef(AppState.currentState);
  const {i18n} = useTranslation();

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AuthTokenManager.getLoginDataObj();
      const credential = await AuthCredentialManager.getCredential();

      if (!AuthTokenManager.isExpiredToken(userToken?.token)) {
        const language = await ProfileManager.loadUserSettings(
          userToken?.token,
        );

        console.log('Lanhuage: ', language);
        i18n.changeLanguage(language);
        authDispatch({
          type: AuthActionsType.RESTORE_TOKEN,
          token: userToken?.token,
          refreshToken: userToken?.refreshToken,
        });
        authDispatch({
          type: AuthActionsType.USER_SETTINGS,
          settings: {language} as UserSettings,
        });
      } else if (credential != null)
        authDispatch({
          type: AuthActionsType.RESTORE_CREDENTIAL,
          userName: credential?.userName,
          password: credential?.password,
        });
      else authDispatch({type: AuthActionsType.SIGN_OUT});
    };

    const subscription = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        AuthTokenManager.getLoginDataObj().then((userToken) => {
          if (userToken) {
            if (AuthTokenManager.isExpiredToken(userToken?.token)) {
              AuthDal.refresh(userToken)
                .then((refreshResult) => {
                  const {token, refreshToken} =
                    refreshResult as LoginApiOutputData;
                  if (token && refreshToken) {
                    authActionProvider.refresh({token, refreshToken});
                    return;
                  }

                  const {status} = refreshResult as IServerError;
                  if (status >= 400) {
                    AuthCredentialManager.getCredential().then((credential) => {
                      if (credential)
                        AuthDal.login(credential).then((r) => {
                          const {token: tok, refreshToken: refTok} =
                            r as LoginApiOutputData;
                          if (tok && refTok)
                            authActionProvider.signIn({
                              token: tok,
                              refreshToken: refTok,
                            });
                        });
                    });
                  }
                })
                .catch((e) => {
                  console.error(JSON.stringify(e));
                });
            }
          }
        });
      }

      appState.current = nextAppState;
    };

    bootstrapAsync();
    AppState.addEventListener('change', subscription);
    return () => {
      AppState.removeEventListener('change', subscription);
    };
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
        const resultCredential =
          await AuthCredentialManager.removeSavedCredential();
        if (result && resultCredential)
          authDispatch({type: AuthActionsType.SIGN_OUT});
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
        const result = await AuthCredentialManager.saveCredentialData(
          credential,
        );
        if (result)
          authDispatch({
            type: AuthActionsType.RESTORE_CREDENTIAL,
            userName: credential?.userName,
            password: credential?.password,
          });
        return result;
      },
      settings: async (lang: ProfileSettingsApiOutputData) => {
        authDispatch({
          type: AuthActionsType.USER_SETTINGS,
          settings: lang.data,
        });
        return true;
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
        data: string | boolean | IMapExtraFilterData,
      ) => {
        mapDispatch({type: what, payload: data});
      },
    }),
    [],
  );

  const {t} = useTranslation();

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
                      title: t('login_standard.title'),
                      headerTitleStyle: {...drawerStyles.header_text},
                    }}
                  />
                  <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{
                      title: t('signup.title'),
                      headerTitleStyle: {...drawerStyles.header_text},
                      headerLeft: () => null,
                    }}
                  />
                  <Stack.Screen
                    name="AccountRestore"
                    component={AccountRestore}
                    options={{
                      title: t('account_restore.title'),
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
                      title: t('winery_details.title'),
                      headerTitleStyle: {...drawerStyles.header_text},
                    }}
                  />
                  <Stack.Screen
                    name="MapsInfo"
                    component={MapInfo}
                    options={{
                      title: t('map_info.title'),
                      headerTitleStyle: {...drawerStyles.header_text},
                    }}
                  />
                  <Stack.Screen
                    name="MapSettings"
                    component={MapSettings}
                    options={{
                      title: t('map_settings.title'),
                      headerTitleStyle: {...drawerStyles.header_text},
                    }}
                  />
                  <Stack.Screen
                    name="MapFilters"
                    component={MapFilters}
                    options={{
                      title: t('map_filters.title'),
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
