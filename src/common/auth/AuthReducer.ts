import {AuthActionsType} from './auth.constants';
import {AuthActions, AuthState} from './auth.interfaces';

export const InitialAuthState: AuthState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  refreshToken: null,
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
        isLoading: false,
      };
    case AuthActionsType.SIGN_IN:
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
        refreshToken: action.refreshToken,
      };
    case AuthActionsType.SIGN_OUT:
      return {
        ...prevState,
        isLoading: false,
        isSignout: true,
        userToken: null,
        refreshToken: null,
      };
    case AuthActionsType.REFRESH_TOKEN:
      return {
        ...prevState,
        isLoading: false,
        userToken: action.token,
        refreshToken: action.refreshToken,
      };
    default:
      return {...prevState};
  }
};
