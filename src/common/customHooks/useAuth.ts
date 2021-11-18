import {useCallback, useContext, useEffect, useState} from 'react';
import {LoginApiOutputData} from '../interfaces';
import {
  AuthContext,
  AuthCredentialManager,
  AuthDal,
  AuthTokenManager,
} from '../modules/auth';

const isNotEmpty = (s?: string | null) =>
  s !== undefined && s !== null && s.length > 0;

const {isExpiredToken, getToken, getRefreshToken} = AuthTokenManager;

/**
 * useAuth custom hook
 * Check with a periodic interval that the user JWT Token
 * is valid and if not will try to refresh or login again
 * automatically (and will update the store and the contex)
 * @returns true if token is valid, false otherwise
 */
export function useAuth() {
  /** Context */
  const {
    data: {userToken},
    actionsProvider,
  } = useContext(AuthContext);

  /** States */
  const [isLogged, setIsLogged] = useState<boolean>(isNotEmpty(userToken));
  const [newToken, setNewToken] = useState<LoginApiOutputData | null>();

  /** Callbacks */
  const notifyAuthRedux = useCallback(
    (token: LoginApiOutputData | null) => {
      if (token) {
        actionsProvider?.refresh(token).then((r) => r && setIsLogged(true));
      } else if (token === null) {
        actionsProvider?.signOut().then((r) => r && setIsLogged(false));
      }
    },
    [actionsProvider],
  );

  const tokenCheckCallback = useCallback(async () => {
    const token = await getToken();
    if (isExpiredToken(token)) {
      try {
        // 1. try to refreshed
        const refreshToken = await getRefreshToken();
        let result = await AuthDal.refresh({token, refreshToken});
        if (result && (result as LoginApiOutputData).token) {
          setNewToken(result as LoginApiOutputData);
          return;
        }

        // 2. not refreshed, try to login again
        const credential = await AuthCredentialManager.getCredential();
        if (credential) {
          result = await AuthDal.login(credential);
          if (result && (result as LoginApiOutputData).token) {
            setNewToken(result as LoginApiOutputData);
            return;
          }
        }

        // 3. not possible, unset token for authentication
        setNewToken(null);
      } catch (e) {
        console.error(JSON.stringify(e));
        setNewToken(null);
      }
    }
  }, []);

  /** Effects */
  useEffect(() => {
    const interval = setInterval(tokenCheckCallback, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    newToken !== undefined && notifyAuthRedux(newToken);
  }, [newToken]);

  return isLogged;
}
