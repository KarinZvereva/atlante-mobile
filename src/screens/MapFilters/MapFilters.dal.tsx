import {Entities} from '../../common/constants';
import {entityDalFactory, IDalR} from '../../common/hoc/dalFactory';
import {GenericDalOperation} from '../../common/hoc/dalFactory/entityDalFactory.constants';
import {stringValue} from '../../common/interfaces';

export const provinceDal = entityDalFactory<stringValue, IDalR<stringValue>>({
  enableOperation: GenericDalOperation.READ,
  entityName: `${Entities.Wineries}/provinces`,
});

export const regionDal = entityDalFactory<stringValue, IDalR<stringValue>>({
  enableOperation: GenericDalOperation.READ,
  entityName: `${Entities.Wineries}/regions`,
});
