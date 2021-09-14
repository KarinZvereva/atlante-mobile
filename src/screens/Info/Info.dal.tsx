import {Entities, tokenKey, webApiBaseUrl} from '../../common/constants';
import { entityUrlBuilder } from '../../common/hoc/dalFactory';
import {fetcher} from '../../common/modules/fetcher';
import queryString from 'query-string';

export interface CountApiOutputData {
  value: number;
}

export const infoCountCall = {
  count: async (filters: {region?: string; province?: string}) => {
    const url = `${entityUrlBuilder(Entities.Wineries)}/count${
      filters ? `?${queryString.stringify(filters, {skipEmptyString: true})}` : ''
    }`;
    try {
      const result = await fetcher(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await result.json();
      return data as CountApiOutputData;
    } catch (e) {
      console.error(JSON.stringify(e));
    }
  },
};