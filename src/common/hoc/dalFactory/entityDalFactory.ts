// import Axios, { AxiosError } from "axios";
import {
  IDalFactoryOptions,
  ServerError,
  ILookupRepositoryDTO,
  IDalBaseEntity,
  ServerResponse,
  ILookupResultDTO,
} from './entityDalFactory.interfaces';
import {webApiBaseUrl} from '../../constants';
import {ServerError400} from './entityDalFactory.interfaces';
import {
  GenericDalOperation,
  HTTPStatusCode,
} from './entityDalFactory.constants';
import {deleteItem} from '../../interfaces';
import queryString from 'query-string';
import {fetcher} from '../../modules/fetcher';

/**
 * Base url builder factory, return url string with given web api entity
 * @param entityName Name of the entity which will form web api end point url
 * @returns url string for web api call
 */
export const entityUrlBuilder = (entityName: string) =>
  `${webApiBaseUrl}/${entityName}`;

/**
 * catch error callback used inside the method of DAL Object created inside
 * the Dal Factory
 * @param error
 */
export const catchErrorClbk = (error: any): ServerError => {
  const err = error;
  if (err && err.response && err.response.data) {
    if (err.response.status === 400) {
      const err400 = err.response.data as ServerError400;
      const errori = [];
      let title = err400.title;
      if (err400.errors) {
        for (const key in err400.errors) {
          if (Object.prototype.hasOwnProperty.call(err400.errors, key)) {
            const element = err400.errors[key];
            errori.push(element.join(' - '));
          }
        }
      } else {
        const stringa = (err.response.data as unknown) as string;
        if (stringa && stringa.length) {
          title = stringa;
        }
      }
      return {
        httpStatusCode: 400,
        userMessage: title,
        internalMessage: errori.join(' '),
        tips: err400.type,
      };
    }
    if (err.response.status === 500) {
      return {
        httpStatusCode: 500,
        userMessage: (err.response.data as unknown) as string,
        internalMessage: '',
        tips: '',
      };
    }
    const error = err.response.data as ServerError;
    return {...error, httpStatusCode: err.response.status};
  }
  throw err;
};

/**
 * Factory function which creates full CRUD DAL for accessing web api
 * CRUD method on a specified entity.
 * @param options specifies the entity for the DAL and enable the dal CRUD operation
 * @returns Dal Object for accessing backend CRUD web api
 */
export const entityDalFactory = <T, TOut extends IDalBaseEntity>(
  options: IDalFactoryOptions,
): TOut => {
  const entityName = options.entityName;
  const dal: any = {entityName};

  const get = async <TRes = ILookupResultDTO<T>>(
    filters?: ILookupRepositoryDTO,
  ): Promise<ServerResponse<TRes>> => {
    try {
      const url = `${entityUrlBuilder(entityName)}${
        filters ? `?${queryString.stringify(filters)}` : ''
      }`;
      const result = await fetcher(url);
      const data: TRes = await result.json();
      return {data};
    } catch (error) {
      return {error};
    }
  };

  if (!!(options.enableOperation & GenericDalOperation.READ_FILTER))
    dal.get = get;

  const getById = async (id: number | string): Promise<ServerResponse<T>> => {
    try {
      const result = await fetcher(
        `${entityUrlBuilder(entityName)}${id !== '' ? `/${id}` : ''}`,
      );
      const data: T = await result.json();
      return {data};
    } catch (error) {
      return {error};
    }
  };

  if (!!(options.enableOperation & GenericDalOperation.READ_BY_ID))
    dal.getById = getById;

  const create = async (item: T): Promise<T | undefined> => {
    try {
      const result = await fetcher(`${entityUrlBuilder(entityName)}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      return await result.json();
    } catch (error) {
      console.error(JSON.stringify(error));
      return undefined;
    }
  };

  if (!!(options.enableOperation & GenericDalOperation.CREATE))
    dal.create = create;

  const update = async (
    id: number | string,
    item: T,
  ): Promise<boolean | undefined> => {
    try {
      const result = await fetcher(
        `${entityUrlBuilder(entityName)}${id !== '' ? `/${id}` : ''}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        },
      );
      return result.status === HTTPStatusCode.NoContent;
    } catch (error) {
      console.error(JSON.stringify(error));
      return undefined;
    }
  };

  if (!!(options.enableOperation & GenericDalOperation.UPDATE))
    dal.update = update;

  const del = async (
    id: number | string,
    hash: number,
  ): Promise<boolean | ServerError> => {
    try {
      const result = await fetcher(
        `${entityUrlBuilder(entityName)}/${id}/${hash}`,
        {
          method: 'DELETE',
        },
      );
      return result.status === HTTPStatusCode.NoContent;
    } catch (error) {
      return catchErrorClbk(error);
    }
  };

  const dels = async (data: deleteItem[]): Promise<boolean | ServerError> => {
    try {
      const result = await fetcher(`${entityUrlBuilder(entityName)}/`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          data.map((r) => ({id: r.id.toString(), hash: r.hash})),
        ),
      });
      return result.status === HTTPStatusCode.NoContent;
    } catch (error) {
      return catchErrorClbk(error);
    }
  };

  if (!!(options.enableOperation & GenericDalOperation.DELETE)) {
    dal.delete = del;
    dal.deletes = dels;
  }

  const schema = async (schemaUrl?: string) => {
    try {
      const url = schemaUrl
        ? `${webApiBaseUrl}/${schemaUrl}`
        : `${entityUrlBuilder(entityName)}/schema`;
      const result = await fetcher(url);
      const data = await result.json();
      return {data};
    } catch (error) {
      console.error(error);
      return catchErrorClbk(error);
    }
  };

  if (options.enableSchema) dal.schema = schema;

  return {...dal};
};
