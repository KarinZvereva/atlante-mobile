import {tokenKey} from '../../constants';
import {LoginApiOutputData} from '../../interfaces';
import {Storage} from '../storage';
import {TokenDecoder} from './TokenDecoder';

export const AuthTokenManager = {
  getToken: async () => {
    const userToken = await Storage.getObject<LoginApiOutputData>(tokenKey);
    if (userToken) return userToken.token;
  },
  getRefreshToken: async () => {
    const userToken = await Storage.getObject<LoginApiOutputData>(tokenKey);
    if (userToken) return userToken.refreshToken;
  },
  getLoginDataObj: async () => {
    return await Storage.getObject<LoginApiOutputData>(tokenKey);
  },
  removeSavedToken: async () => {
    return await Storage.removeEntry(tokenKey);
  },
  saveTokenData: async (token: LoginApiOutputData) => {
    if (!(await Storage.storeObject(tokenKey, token))) {
      console.error('error when saving token on storage');
      return false;
    }
    return true;
  },
  updateTokenData: async (token: LoginApiOutputData) => {
    if (!(await Storage.updateObject(tokenKey, token))) {
      console.error('error when saving token on storage');
      return false;
    }
    return true;
  },
  decodeToken: (token?: string | null) => {
    if (!token) return undefined;
    return new TokenDecoder(token).token;
  },
  isExpiredToken: (token?: string | null) => {
    if (!token) return true;
    const tokenDecoded = new TokenDecoder(token).token;
    if (!tokenDecoded) return true;
    const now = Math.round(new Date().getTime() / 1000);
    return tokenDecoded.exp <= now;
  },
};
