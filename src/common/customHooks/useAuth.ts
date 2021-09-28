import {useContext, useEffect, useState} from 'react';
import {AuthContext, AuthDal, AuthTokenManager} from '../modules/auth';

// Custom hook are functions that starts with the keyword "use"
export function useAuth() {
  const {data, actionsProvider} = useContext(AuthContext);
  const [isLogged, setIsLogged] = useState<boolean>(
    !data.isLoading && data.userToken !== undefined && data.userToken !== null,
  );

  useEffect(() => {
    const checkCallback = async () => {
      const token = await AuthTokenManager.getToken();
      if (AuthTokenManager.isExpiredToken(token)) {
        try {
          const refreshToken = await AuthTokenManager.getRefreshToken();
          const refreshResult = await AuthDal.refresh({token, refreshToken});
          if (
            refreshResult &&
            refreshResult.token &&
            refreshResult.refreshToken
          ) {
            await actionsProvider?.refresh(refreshResult);
            setIsLogged(true);
          } else {
            actionsProvider?.signOut();
            setIsLogged(false);
          }
        } catch (e) {
          console.error(JSON.stringify(e));
          actionsProvider?.signOut();
          setIsLogged(false);
        }
      }
    };

    // Define interval to run every 20 minutes
    const interval = setInterval(checkCallback, 1200000);

    // Clean up function
    return () => clearInterval(interval);
  }, []);

  return isLogged;
}
