export enum AuthActionsType {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  RESTORE_TOKEN = 'RESTORE_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export enum UserAuthenticationMode {
  FACEBOOK = 'from_facebook',
  SERVER = 'from_server',
}
