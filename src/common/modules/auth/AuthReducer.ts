import {AuthActionsType} from './auth.constants';
import {AuthActions, AuthState} from './auth.interfaces';

export const InitialAuthState: AuthState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  refreshToken: null,
  userData: null,
  userName: null,
  password: null,
};

export const AuthReducer: React.Reducer<AuthState, AuthActions> = (
  prevState: AuthState,
  action: AuthActions,
) => {
  switch (action.type) {
    case AuthActionsType.RESTORE_TOKEN:
      return {
        ...prevState,
        userToken: action.token,
        refreshToken: action.refreshToken,
        userData: action.userData,
        isLoading: false,
      };
    case AuthActionsType.SIGN_IN:
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
        refreshToken: action.refreshToken,
        userData: action.userData,
      };
    case AuthActionsType.SIGN_OUT:
      return {
        ...prevState,
        isLoading: false,
        isSignout: true,
        userToken: null,
        refreshToken: null,
        userData: null,
        userName: null,
        password: null,
      };
    case AuthActionsType.REFRESH_TOKEN:
      return {
        ...prevState,
        isLoading: false,
        userToken: action.token,
        refreshToken: action.refreshToken,
        userData: action.userData,
      };
    case AuthActionsType.RESTORE_CREDENTIAL: 
      return {
        ...prevState,
        userName: action.userName,
        password: action.password,
        isLoading: false,
      }; 
    case AuthActionsType.USER_SETTINGS: 
      return {
        ...prevState,

        settings: action.settings,
        isLoading: false,
      };
    default:
      return {...prevState};
  }
};
