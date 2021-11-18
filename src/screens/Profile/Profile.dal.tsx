import {Entities, tokenKey, webApiBaseUrl} from '../../common/constants';
import {ProfileApiInputData, ProfileApiOutputData, ProfileDeleteApiInputData, ProfileDeleteApiOutputData, ProfileSettingsApiInputData, ProfileSettingsApiOutputData} from '../../common/interfaces/web-api';
import {useContext, useState, useRef} from 'react';
import {AuthContext, ITokenData, AuthTokenManager} from '../../common/modules/auth';

/**
 * 
 * @returns 
 */
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

/**
 * 
 * @returns 
 */
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

/**
 * 
 * @returns 
 */
const saveSettingsBuilder = () => <ProfileSettingsApiInputData, ProfileSettingsApiOutputData>(
  action: string, 
) => async (input: ProfileSettingsApiInputData, token : string): Promise<ProfileSettingsApiOutputData> => {
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
    return (await response.json()) as ProfileSettingsApiOutputData;
  } catch (err) {
    console.error(err);
    throw err;
  }  
};

/**
 * 
 * @returns 
 */
const loadSettingsBuilder = () => <ProfileSettingsApiInputData, ProfileSettingsApiOutputData>(
  action: string, 
) => async (token : string): Promise<ProfileSettingsApiOutputData> => {
  try {
    const response = await fetch(`${webApiBaseUrl}/${action}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });

    if (response.status === 404 || response.status === 422) { // custom error response format handling
      throw response.status;
    }
    else if (!response.ok) {
      throw response.statusText;
    }
    //console.log("return json settings")
    return (await response.json()) as ProfileSettingsApiOutputData;
  } catch (err) {
    throw err;
  }    
};

const profileBuilder = updateAccountBuilder();
const profileDeleteBuilder = deleteAccountBuilder();
const profileSaveSettingsBuilder = saveSettingsBuilder();
const profileLoadSettingsBuilder = loadSettingsBuilder();

export const ProfileDal = {
  update: profileBuilder<ProfileApiInputData, ProfileApiOutputData>('account/update'),
  delete: profileDeleteBuilder<ProfileDeleteApiInputData, ProfileDeleteApiOutputData>('account/delete'),
  saveSettings: profileSaveSettingsBuilder<ProfileSettingsApiInputData, ProfileSettingsApiOutputData>('account/settings'),
  loadSettings: profileLoadSettingsBuilder<ProfileSettingsApiInputData, ProfileSettingsApiOutputData>('account/settings'),
};

