export type Association = 0 | 1 | 2 | 4 | 8 | 16 | 32; // int32
/**
 * DeleteItem DTO for bulk operations
 */
export interface DeleteItemDto {
  /**
   * Id
   */
  id?: null;
  /**
   * Hash
   */
  hash?: number; // int32
}
export type EntityExtraFlags = 0 | 1 | 2 | 4 | 8 | 16; // int32
export type EntityStatus = 0 | 10 | 20 | 30 | 40; // int32
export type ExtraServices = 0 | 1 | 2; // int32

/**
 * Facebook login DTO for authenticate on web api
 */
export interface FacebookLoginInputData {
  /**
   * Facebook auth token
   */
  facebookToken: string;
}
export interface GeoCoordinate {
  latitude?: number; // double
  longitude?: number; // double
}

export interface Journey {
  _id: string;
  title?: string | null;
  description?: string | null;
  descriptions?: LocalizedJourneyData[] | null;
  hasStages?: boolean | null;
  hash?: number; // int32
}

export interface LocalizedJourneyData {
  title?: string | null;
  descriptions?: string | null;
  language?: string | null;
}

export interface JourneyStage {
  _id: string;
  journeyId?: string | null;
  pointOfInterestId?: string | null;
  wineryId?: string | null;
  day?: number; // int32
  stageDayOrdering?: number; // int32
  name?: string | null;
  description?: string | null;
  distance?: null | number; // int32
  travelTime?: TimeSpan;
  journeyData?: Journey | null;
  wineryData?: Winery | null;
  pointOfInterestData?: PointOfInterest | null;
  hash?: number; // int32
}

/**
 * DTO Input for Authentication Manager Object
 */
export interface LoginApiInputData {
  userName?: string | null;
  password?: string | null;
}
/**
 * Login API client response
 */
export interface LoginApiOutputData {
  /**
   * JWT Token string encoded
   */
  token?: string | null;
  /**
   * Refresh token, used to generate
   * new JWT Token when the previous token
   * expires.
   */
  refreshToken?: string | null;
}
export interface PointOfInterest {
  _id: string;
  progressiveIdentifier?: number; // int32
  name?: string | null;
  city?: string | null;
  region?: string | null;
  province?: string | null;
  country?: string | null;
  type?: PointOfInterestType /* int32 */;
  location?: GeoCoordinate;
  hash?: number; // int32
}

export type PointOfInterestType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; // int32
/**
 * Refresh API Request Body Object
 */
export interface RefreshApiInputData {
  /**
   * Expired JWT Token
   */
  token?: string | null;
  /**
   * Related Refresh Token (valid)
   */
  refreshToken?: string | null;
}
/**
 * Register Api Input DTO
 */
export interface RegisterApiInputData {
  userData?: User;
  /**
   * Captcha token for validating registration request
   */
  captcha?: string | null;
}

/**
 * Register Api Output DTO
 */
 export interface RegisterApiOutputData {
  /**
   * Result success registration request
   */
  success?: boolean | null;
  errors?: string | null;
  available?: boolean | null;
}

/**
 * Restore Api Input DTO
 */
 export interface RestoreApiInputData {
  email?: string;
  /**
   * Captcha token for validating restore request
   */
  captcha?: string | null;
}

/**
 * Restore Api Output DTO
 */
 export interface RestoreApiOutputData {
  /**
   * Result success restore request
   */
  success?: boolean | null;
  message?: string | null;
}

/**
 * Check data for Register Api Input DTO
 */
 export interface CheckRegisterApiInputData {
  data?: string;
  what?: number; // int32
}

/**
 * Check data for Register Api Output DTO
 */
 export interface CheckRegisterApiOutputData {
  available?: boolean;
  error?: boolean;
  is_active?: boolean;
}


/**
 * Update Profile Api Input DTO
 */
 export interface ProfileApiInputData {
  userData?: User;
  /**
   * Captcha token for validating registration request
   */
  captcha?: string | null;
}

/**
 * Update Profile Api Output DTO
 */
 export interface ProfileApiOutputData {
  /**
   * Result success registration request
   */
  success?: boolean | null;
  message?: string | null;
}

/**
 * Delete Profile Api Input DTO
 */
 export interface ProfileDeleteApiInputData {
  /**
   * Captcha token for validating registration request
   */
  captcha?: string;
}

/**
 * Delete Profile Api Output DTO
 */
 export interface ProfileDeleteApiOutputData {
  /**
   * Result success delete request
   */
  success?: boolean | null;
  message?: string | null;
}





export interface TimeSpan {
  readonly ticks?: number; // int64
  readonly days?: number; // int32
  readonly hours?: number; // int32
  readonly milliseconds?: number; // int32
  readonly minutes?: number; // int32
  readonly seconds?: number; // int32
  readonly totalDays?: number; // double
  readonly totalHours?: number; // double
  readonly totalMilliseconds?: number; // double
  readonly totalMinutes?: number; // double
  readonly totalSeconds?: number; // double
}

export interface User {
  _id: string;
  userName: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  role?: string | null;
  isActive?: boolean;
  registeredOn?: string; // date-time
  fromFacebook?: boolean;
  isConfirmed?: boolean;
  hash?: number; // int32
}

export interface Winery {
  _id: string;
  progressiveIdentifier?: number; // int32
  name?: string | null;
  name2?: string | null;
  subName1?: string | null;
  subName2?: string | null;
  vigneron?: string | null;
  address?: string | null;
  city?: string | null;
  region?: string | null;
  province?: string | null;
  country?: string | null;
  webSite?: string | null;
  email?: string | null;
  telephone?: string | null;
  note?: string | null;
  services?: ExtraServices /* int32 */;
  wineryAssociations?: Association /* int32 */;
  type?: WineryType /* int32 */;
  status?: EntityStatus /* int32 */;
  extraFlags?: EntityExtraFlags /* int32 */;
  location?: GeoCoordinate;
  logo?: string;
  hash?: number; // int32
}

export interface WineryDataOutputData extends Winery {
  hasLogo?: boolean | null;
}

export enum AssetType {
  Unknown = 0,
  GenericIcon = 1,
  GenericImage = 2,
  WineriesMarker = 3,
  PoisMarker = 4,
}

export interface Asset {
  _id: string;
  name?: string;
  type?: AssetType;
  base64Data?: string;
  hash?: number;
}

export interface Version {
  major: number;
  minor: number;
  build: number;
  revision: number;
  majorRevision: number;
  minorRevision: number;
}

export interface FormSchema {
  _id: string;
  schemaName?: string | null;
  schemas?: string | null;
  uiSchema?: string | null;
  schemaVersion?: Version;
  previousVersions?: FormSchemaPreviousVersion;
}

export interface FormSchemaPreviousVersion {
  schemas?: string | null;
  uiSchema?: string | null;
  schemaVersion?: Version;
}

export interface WineryLogoOutputData {
  wineryId: string;
  logo?: string | null;
  lastUpdated?: string | null;
}

export enum WineryType {
  Not_Natural = 0,
  Winery = 1,
  Vigneron_Itinerant = 2,
  Wine_Project = 3,
  Future = 4,
  Missing_Data = 5,
  Wrong_Position = 6,
  No_Cellar = 7,
  Not_Exists_Anymore = 8,
  Something_Strange = 9,
}
