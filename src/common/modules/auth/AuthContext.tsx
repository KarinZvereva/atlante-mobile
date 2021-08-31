import * as React from 'react';
import {AuthContextData} from './auth.interfaces';
import {InitialAuthState} from './AuthReducer';

export const AuthContext = React.createContext<AuthContextData>({
  data: {...InitialAuthState},
});
