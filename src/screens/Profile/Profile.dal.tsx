import {Entities, tokenKey, webApiBaseUrl} from '../../common/constants';
import {ProfileApiInputData, ProfileApiOutputData} from '../../common/interfaces/web-api';
import {useContext, useState, useRef} from 'react';
import {AuthContext, ITokenData, AuthTokenManager} from '../../common/modules/auth';

const updateAccountBuilder = () => <ProfileApiInputData, ProfileApiOutputData>(
  action: string, 
) => async (input: ProfileApiInputData, token : string): Promise<ProfileApiOutputData> => {
  try {
    const response = await fetch(`${webApiBaseUrl}/${action}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(input),
    });
    return (await response.json()) as ProfileApiOutputData;
  } catch (err) {
    console.error(err);
    throw err;
  }  
};

const profileBuilder = updateAccountBuilder();

export const ProfileDal = {
  update: profileBuilder<ProfileApiInputData, ProfileApiOutputData>('account/update'),
};

