export interface ITokenHeader {
  headers: {
    Authorization: string
  }
}

export interface IAuthenticationProps {
  tokenHeader: ITokenHeader
}

export interface IUserIdentity {
  username: string,
  password: string,
}

export interface IUserInfo {
  username: string | null,
  first_name?: string | null,
  email?: string | null,
}

export interface LoginHistory {
  fromLogin?: boolean;
}