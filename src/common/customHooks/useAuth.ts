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

// Custom hook are functions that starts with the keyword "use"
export function useAuth() {
  /** Context */
  const {
    data: {userToken, userName, password},
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

  /** Effects */
  useEffect(() => {
    const checkCallback = async () => {
      if (AuthTokenManager.isExpiredToken(userToken)) {
        const token = await AuthTokenManager.getToken();
        if (AuthTokenManager.isExpiredToken(token)) {
          try {
            const refreshToken = await AuthTokenManager.getRefreshToken();
            let result = await AuthDal.refresh({token, refreshToken});

            // 1. refreshed
            if (result && result.token && result.refreshToken) {
              setNewToken(result);
              return;
            }

            // 2. not refreshed, try to login again if possible
            const credential =
              userName && password
                ? {userName, password}
                : await AuthCredentialManager.getCredential();

            if (credential) {
              result = await AuthDal.login(credential);
              if (result && result.token && result.refreshToken) {
                setNewToken(result);
                return;
              }
            }

            // 3. not possible, return undefined
            setNewToken(null);
          } catch (e) {
            console.error(JSON.stringify(e));
            setNewToken(null);
          }
        }
      }
    };

    // Define interval to run every 20 minutes
    const interval = setInterval(checkCallback, 60000);

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
