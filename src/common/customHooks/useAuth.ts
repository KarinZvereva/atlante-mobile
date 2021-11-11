import {useCallback, useContext, useEffect, useState} from 'react';
import {LoginApiOutputData} from '../interfaces';
import {
  AuthContext,
  AuthCredentialManager,
  AuthDal,
  AuthTokenManager,
} from '../modules/auth';

const isDefined = (s?: string | null) =>
  s !== undefined && s !== null && s.length > 0;

const {isExpiredToken, getToken, getRefreshToken} = AuthTokenManager;

// Custom hook are functions that starts with the keyword "use"
export function useAuth() {
  /** Context */
  const {
    data: {userToken},
    actionsProvider,
  } = useContext(AuthContext);

  /** States */
  const [isLogged, setIsLogged] = useState<boolean>(isDefined(userToken));
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
        if (result && result.token && result.refreshToken) {
          setNewToken(result);
          return;
        }

        // 2. not refreshed, try to login again
        const credential = await AuthCredentialManager.getCredential();
        if (credential) {
          result = await AuthDal.login(credential);
          if (result && result.token && result.refreshToken) {
            setNewToken(result);
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
    // Define interval to run
    const interval = setInterval(tokenCheckCallback, 60000);

    // Clean up function
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    newToken !== undefined && notifyAuthRedux(newToken);
  }, [newToken]);

  return isLogged;
}
