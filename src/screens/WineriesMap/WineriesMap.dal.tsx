import {Entities} from '../../common/constants';
import {
  entityDalFactory,
  entityUrlBuilder,
  IDalCRUDSchema,
  IDalR,
} from '../../common/hoc/dalFactory';
import {GenericDalOperation} from '../../common/hoc/dalFactory/entityDalFactory.constants';
import {
  Winery,
  WineryDataOutputData,
  WineryLogoOutputData,
} from '../../common/interfaces';
import {fetcher} from '../../common/modules/fetcher';
import queryString from 'query-string';
import {DalDecorator} from '../../common/hoc/dalFactory/entityDalCustomCallDecorator';

export const wineryDal = entityDalFactory<Winery, IDalCRUDSchema<Winery>>({
  enableOperation: GenericDalOperation.CRUD,
  entityName: Entities.Wineries,
  enableSchema: true,
});

const wineryDataDalBase = entityDalFactory<Winery, IDalR<Winery>>({
  enableOperation: GenericDalOperation.READ,
  entityName: `${Entities.Wineries}/data`,
  enableSchema: false,
});

export const wineryLogoDal = entityDalFactory<
  WineryLogoOutputData,
  IDalR<WineryLogoOutputData>
>({
  enableOperation: GenericDalOperation.READ,
  entityName: `${Entities.Wineries}/logo`,
  enableSchema: false,
});

const wineriesCustomCall = {
  around: async (filters: {lat: number; lon: number; radius: number}) => {
    const url = `${entityUrlBuilder(wineryDataDal.entityName)}/around${
      filters ? `?${queryString.stringify(filters)}` : ''
    }`;

    try {
      const result = await fetcher(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = (await result.json()) as WineryDataOutputData[];
      return {data};
    } catch (e) {
      console.error(JSON.stringify(e));
    }
  },
};

export const wineryDataDal = DalDecorator(
  wineryDataDalBase,
  wineriesCustomCall,
);
