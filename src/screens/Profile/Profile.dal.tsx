import {Entities, tokenKey, webApiBaseUrl} from '../../common/constants';
import {ProfileApiInputData, ProfileApiOutputData, ProfileDeleteApiInputData, ProfileDeleteApiOutputData} from '../../common/interfaces/web-api';
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

const deleteAccountBuilder = () => <ProfileDeleteApiInputData, ProfileDeleteApiOutputData>(
  action: string, 
) => async (input: ProfileDeleteApiInputData, token : string): Promise<ProfileDeleteApiOutputData> => {
  try {
    const response = await fetch(`${webApiBaseUrl}/${action}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(input),
    });
    console.log(response)
    return (await response.json()) as ProfileDeleteApiOutputData;
  } catch (err) {
    console.error(err);
    throw err;
  }  
};

const profileBuilder = updateAccountBuilder();
const profileDeleteBuilder = deleteAccountBuilder();

export const ProfileDal = {
  update: profileBuilder<ProfileApiInputData, ProfileApiOutputData>('account/update'),
  delete: profileDeleteBuilder<ProfileDeleteApiInputData, ProfileDeleteApiOutputData>('account/delete'),
};

