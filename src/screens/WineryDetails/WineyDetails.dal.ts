import {Entities} from '../../common/constants';
import {entityDalFactory, IDalR} from '../../common/hoc/dalFactory';
import {GenericDalOperation} from '../../common/hoc/dalFactory/entityDalFactory.constants';
import {WineryLogoOutputData} from '../../common/interfaces';

export const wineryLogoDal = entityDalFactory<
  WineryLogoOutputData,
  IDalR<WineryLogoOutputData>
>({
  enableOperation: GenericDalOperation.READ,
  entityName: `${Entities.Wineries}/logo`,
  enableSchema: false,
});
