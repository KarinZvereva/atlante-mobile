import * as React from 'react';

export interface Auth {
  signIn: () => boolean;
  signOut: () => boolean;
}

export const AuthContext = React.createContext<any>({});
