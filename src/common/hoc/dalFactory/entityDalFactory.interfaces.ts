import {GenericDalOperation} from './entityDalFactory.constants';
import {entityDalFactory} from '.';
import {deleteItem} from '../../interfaces';
import {Entities} from '../../constants';

/** Custom interface for Server error returing value */
export interface ServerError {
  httpStatusCode: number;
  userMessage: string;
  internalMessage: string;
  errorCode?: number;
  tips: string;
}

// la risposta 400 è diversa dalle altre
export interface ServerError400 {
  errors: {[p: string]: string[]};
  status: 400;
  title: string;
  traceId: string;
  type: string;
}

export interface ServerResponse<T> {
  data?: T;
  error?: any;
}

export enum LookupFilterOperation {
  Contains,
  StartsWith,
  EndsWith,
  Equals,
  Less,
  LessOrEquals,
  More,
  MoreOrEquals,
}

export enum LookupSortingDirection {
  Asc,
  Desc,
}

/** LookupRepositoryDTO not exported from swagger schema definition */
export interface ILookupRepositoryDTO {
  pageNumber?: number;
  pageSize?: number;
  filter?: string;
  orderBy?: string;
}

export interface IExportDataFilters {
  type: 'csv';
  filter?: string;
  orderBy?: string;
}

/** LookupResultDTO not exported from swagger schema definition */
export interface ILookupResultDTO<T> {
  data?: T[] | null;
  totalRecords: number; // int64
  totalPages: number; // int64
}

// Dal Interface for base single operation

/** Base Interface for DAL object */
export interface IDalBaseEntity {
  /** Entity which DAL operates, is used to build the end point URL */
  entityName: Entities;
  /** Used to block call for manual debounce */
  getCancelToken(): IDalCancelToken;
}

/** Interface for DAL object which enables GET operation with filters */
export interface IDalReadFilter<T> extends IDalBaseEntity {
  /** Crud GET operation with filter query string */
  get: <TRes = ILookupResultDTO<T>>(
    filters?: ILookupRepositoryDTO,
  ) => Promise<ServerResponse<TRes>>;
}

/** Interface for DAL object which enables GET operation on single ID of object */
export interface IDalReadById<T> extends IDalBaseEntity {
  /** Crud GET operation with single ID url */
  getById: (id: number | string) => Promise<ServerResponse<T>>;
}

/** Interface for DAL object which enables POST operation */
export interface IDalC<T> extends IDalBaseEntity {
  /** Crud POST operation with single item */
  create: (item: T) => Promise<T | ServerError>;
}

/** Interface for DAL object which enables PUT operation */
export interface IDalU<T> extends IDalBaseEntity {
  /** Crud PUT operation with single item */
  update: (id: number | string, item: T) => Promise<boolean | ServerError>;
}

/** Interface for DAL object which enables DELETE operation */
export interface IDalD extends IDalBaseEntity {
  /** Crud DELETE operation with single item */
  delete: (id: number | string, hash: number) => Promise<boolean | ServerError>;
  deletes: (rows: deleteItem[]) => Promise<boolean | ServerError>;
}

// Dal interface composition
export interface IDalR<T> extends IDalReadFilter<T>, IDalReadById<T> {}

export interface IDalCU<T> extends IDalC<T>, IDalU<T> {}

export interface IDalCRU<T> extends IDalR<T>, IDalCU<T> {}

export interface IDalCRUD<T> extends IDalCRU<T>, IDalD {}

export interface IDalCRUDSchema<T> extends IDalCRUD<T> {
  schema: (schemaUrl?: string) => Promise<ServerResponse<any>>;
}

export interface IDalCRUDSchemaWithExport<T> extends IDalCRUDSchema<T> {
  exportData: (filters: IExportDataFilters) => Promise<void>;
}

/** Input options for configuring the DAL Factory */
export interface IDalFactoryOptions {
  /** Enums which specifies which operation enable to the created DAL object */
  enableOperation: GenericDalOperation;
  /** Name of the entity which the DAL should operate */
  entityName: Entities | string;
  /** Enable schema call */
  enableSchema?: boolean;
  /** Enable export call */
  enableExport?: boolean;
}

export interface IDalCancelToken {}

export const entityDalFactoryR = <T>(entityName: Entities) =>
  entityDalFactory<T, IDalR<T>>({
    enableOperation: GenericDalOperation.READ,
    entityName,
  });
