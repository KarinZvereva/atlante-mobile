import {AuthTokenManager} from '../auth';

const updateOptions = async (options: RequestInit) => {
  const token = await AuthTokenManager.getToken();
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
