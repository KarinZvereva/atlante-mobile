import { IDalBaseEntity } from "./entityDalFactory.interfaces";

export const DalDecorator = <T extends IDalBaseEntity, F> (dal: T, customCall: F): F & T => {
  return { ...dal, ...customCall };
};