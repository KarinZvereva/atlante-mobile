import React, {useEffect, useMemo, useReducer} from 'react';
import {Image} from 'react-native';
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
import {WineryMap} from './screens/WineryMap/WineryMap';
import {LogOut} from './screens/LogOut/LogOut';
import {AccountRestore} from './screens/AccountRestore/AccountRestore';
import {Restaurant} from './screens/Restaurant/Restaurant';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const LoggedRoot = () => {
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
              style={{height: size, width: size}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Winery Map"
        component={WineryMap}
        options={{
          headerShown: false,
          drawerIcon: ({size}) => (
            <Image
              source={require('./assets/icon/wineries_map.png')}
              style={{height: size, width: size}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Journey"
        component={Journey}
        options={{
          headerShown: false,
          drawerIcon: ({size}) => (
            <Image
              source={require('./assets/icon/journey.png')}
              style={{height: size, width: size}}
            />
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
              style={{height: size, width: size}}
            />
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
              style={{height: size, width: size}}
            />
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
    if (!state.isLoading) SplashScreen.hide();
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
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen
                  name="AccountRestore"
                  component={AccountRestore}
                />
              </>
            ) : (
              <Stack.Screen
                name="App"
                component={LoggedRoot}
                options={{headerShown: false}}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </AuthContext.Provider>
  );
}
