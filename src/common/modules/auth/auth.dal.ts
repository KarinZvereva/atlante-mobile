import {entityPostBuilder} from '../builders/entityPostBuilder';
import {Entities} from '../../constants';
import {LoginApiInputData, LoginApiOutputData, 
  RegisterApiInputData, RegisterApiOutputData,
  CheckRegisterApiInputData, CheckRegisterApiOutputData} from '../../interfaces/web-api';

const authFetchBuilder = entityPostBuilder(Entities.Auth);

export const AuthDal = {
  login: authFetchBuilder<LoginApiInputData, LoginApiOutputData>('login'),
  refresh: authFetchBuilder<LoginApiInputData, LoginApiOutputData>('refresh'),
  register: authFetchBuilder<RegisterApiInputData, RegisterApiOutputData>('register'),
  checkRegister: authFetchBuilder<CheckRegisterApiInputData, CheckRegisterApiOutputData>('check_user_data'),
};