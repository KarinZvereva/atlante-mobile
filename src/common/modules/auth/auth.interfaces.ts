import {LoginApiOutputData} from '../../interfaces';
import {AuthActionsType} from './auth.constants';

export interface AuthActionsProvider {
  signIn: (loginOutput: LoginApiOutputData) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  refresh: (data: LoginApiOutputData) => Promise<boolean>;
}

export interface AuthContextData {
  data: AuthState;
  actionsProvider?: AuthActionsProvider;
}

export interface AuthActions {
  type: AuthActionsType;
  token?: string | null;
  refreshToken?: string | null;
  userData?: ITokenData | null;
}

export interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  userToken?: string | null;
  refreshToken?: string | null;
  userData?: ITokenData | null;
}

/**
 * Interfaces of decoded auth token provided by login fase
 * JWT STANDARD -> https://tools.ietf.org/html/rfc7519
 */
export interface ITokenData {
  /**
   * Username of logged user. This unique name is used to open SignalR channel.
   */
  unique_name: string;
  /**
   * Second name of current logged user
   */
  family_name: string;
  /**
   * First name of current logged user
   */
  given_name: string;
  /**
   * UserId of current logged user
   */
  nameid: string;
  /**
   * Email of the logged user
   */
  email: string;
  /**
   * Profile of current logged user
   */
  profile: string;
  /**
   * Role of current logged user
   */
  role: string;
  /**
   * [Not before] the token cannot be used before specified time of creation. The value must be a NumericDate.
   */
  nbf: number;
  /**
   * Expiration time of token. The value must be a NumericDate.
   */
  exp: number;
  /**
   * Time at which the JWT was issued. The value must be a NumericDate.
   */
  iat: number;
  /**
   * 	Principal that issued the JWT.
   */
  iss: string;
  /**
   * Recipients that the JWT is intended for. Each principal intended to process the JWT must identify itself with a value in the audience claim. If the principal processing the claim does not identify itself with a value in the aud claim when this claim is present, then the JWT must be rejected.
   */
  aud: string;
}
