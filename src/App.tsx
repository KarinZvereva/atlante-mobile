import React, {useEffect, useMemo, useReducer} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './screens/Home/Home';
import {Journey} from './screens/Journey/Journey';
import {Storage} from './common/storage';
import {AuthContext} from './common/auth/AuthContext';
import {Login} from './screens/Login';
import {tokenKey} from './common/constants';
import {
  AuthActionsType,
  AuthReducer,
  checkExpiredToken,
  InitialAuthState,
} from './common/auth';
import {LoginApiOutputData} from './common/interfaces';
import SplashScreen from 'react-native-splash-screen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const LoggedRoot = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Journey"
        component={Journey}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  const [state, dispatch] = useReducer(AuthReducer, InitialAuthState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await Storage.getObject<LoginApiOutputData>(tokenKey);
      } catch (e) {
        console.error(JSON.stringify(e));
        dispatch({type: AuthActionsType.SIGN_OUT});
        return;
      }

      if (!checkExpiredToken(userToken?.token))
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
        if (!(await Storage.storeObject(tokenKey, token)))
          console.error('error when saving token on storage');

        dispatch({
          type: AuthActionsType.SIGN_IN,
          token: token?.token,
          refreshToken: token?.refreshToken,
        });
      },
      signOut: () => {
        dispatch({type: AuthActionsType.SIGN_OUT});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{state, actionsProvider: authContext}}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            <Stack.Screen
              name="SignIn"
              component={Login}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen name="App" component={LoggedRoot} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
