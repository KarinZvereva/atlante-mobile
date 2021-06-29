import {Entities} from '../../common/constants';
import {
  entityDalFactory,
  IDalCRUDSchema,
  IDalR,
} from '../../common/hoc/dalFactory';
import {GenericDalOperation} from '../../common/hoc/dalFactory/entityDalFactory.constants';
import {Asset, Winery, WineryLogoOutputData} from '../../common/interfaces';

export const wineryDal = entityDalFactory<Winery, IDalCRUDSchema<Winery>>({
  enableOperation: GenericDalOperation.CRUD,
  entityName: Entities.Wineries,
  enableSchema: true,
});

export const wineryDataDal = entityDalFactory<Winery, IDalR<Winery>>({
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

export const markerDal = entityDalFactory<Asset, IDalCRUDSchema<Asset>>({
  enableOperation: GenericDalOperation.CRUD,
  entityName: Entities.Assets,
  enableSchema: true,
});
