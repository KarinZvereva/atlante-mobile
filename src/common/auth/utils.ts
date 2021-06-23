import {TokenDecoder} from './TokenDecoder';

export const checkExpiredToken = (tok?: string | null): boolean => {
  if (!tok) return true;
  const token = new TokenDecoder(tok).token;
  if (!token) return true;
  const now = Math.round(new Date().getTime() / 1000);
  return token.exp <= now;
};
