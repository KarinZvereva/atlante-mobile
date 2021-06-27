import {Entities} from '../../common/constants';
import {entityDalFactory, IDalCRUDSchema} from '../../common/hoc/dalFactory';
import {GenericDalOperation} from '../../common/hoc/dalFactory/entityDalFactory.constants';
import {Asset, Winery} from '../../common/interfaces';

export const mapDal = entityDalFactory<Winery, IDalCRUDSchema<Winery>>({
  enableOperation: GenericDalOperation.CRUD,
  entityName: Entities.Wineries,
  enableSchema: true,
});

export const markerDal = entityDalFactory<Asset, IDalCRUDSchema<Asset>>({
  enableOperation: GenericDalOperation.CRUD,
  entityName: Entities.Assets,
  enableSchema: true,
});
