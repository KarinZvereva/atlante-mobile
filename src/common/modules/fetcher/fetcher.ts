import {AuthDal, AuthTokenManager} from '../auth';

const updateOptions = async (options: RequestInit) => {
  let token = await AuthTokenManager.getToken();
  if (AuthTokenManager.isExpiredToken(token)) {
    try {
      const refreshToken = await AuthTokenManager.getRefreshToken();
      const refreshResult = await AuthDal.refresh({token, refreshToken});
      if (refreshResult && refreshResult.token && refreshResult.refreshToken) {
        await AuthTokenManager.updateTokenData(refreshResult);
        token = refreshResult.token;
      }
    } catch (e) {
      console.error(JSON.stringify(e));
    }
  }

  const update = {...options};
  if (token) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return update;
};

export async function fetcher(url: RequestInfo, options?: RequestInit) {
  const optionsWithAuth = options ? await updateOptions(options) : undefined;
  return fetch(url, optionsWithAuth);
}
