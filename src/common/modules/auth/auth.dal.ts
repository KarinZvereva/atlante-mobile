import {entityPostBuilder} from '../builders/entityPostBuilder';
import {Entities} from '../../constants';
import {LoginApiInputData, LoginApiOutputData} from '../../interfaces/web-api';

const authFetchBuilder = entityPostBuilder(Entities.Auth);

export const AuthDal = {
  login: authFetchBuilder<LoginApiInputData, LoginApiOutputData>('login'),
  refresh: authFetchBuilder<LoginApiInputData, LoginApiOutputData>('refresh'),
};
