import {AbsDecoder} from '../../utils/AbsDecoder';
import {ITokenData} from './auth.interfaces';

export class TokenDecoder extends AbsDecoder<string, ITokenData | undefined> {
  constructor(token?: string) {
    const decodeFn = (tok: string): ITokenData | undefined => {
      try {
        var jwtDecode = require('jwt-decode');
        return jwtDecode(tok) as ITokenData;
      } catch (err) {
        console.error(`Decoded token error: ${err}!`);
      }
      return undefined;
    };
    super(decodeFn, token || '');
    if (!token) console.error(`Provided token is empty!`);
  }

  /**
   * It gets decoded token
   * @returns ITokenData
   */
  public get token(): ITokenData | undefined {
    return this.DecodedData;
  }
}
