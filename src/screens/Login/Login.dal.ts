import {webApiBaseUrl} from '../../common/constants';
import {
  LoginApiInputData,
  LoginApiOutputData,
} from '../../common/interfaces/web-api';

export const LoginDal = {
  login: async (data: LoginApiInputData) => {
    try {
      const response = await fetch(`${webApiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return (await response.json()) as LoginApiOutputData;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
