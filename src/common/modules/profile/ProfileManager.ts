import {credentialKey} from '../../constants';
import {LoginApiInputData} from '../../interfaces';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Platform } from 'react-native';
import { AuthContext } from '../auth';
import { useContext, useState } from 'react';
import { ProfileDal } from '../../../screens/Profile/Profile.dal';
import { useTranslation } from 'react-i18next';
import { setDefaultLang } from '../../../localization/i18n';
import { getDeviceLang } from '../../../localization/i18n';

export const ProfileManager = {

  loadUserSettings: async (token: string | null | undefined) => {

    console.log("loadUserSettings");
    var lan = getDeviceLang();

    if (token) {
      await ProfileDal.loadSettings(token)
      .then((result) => {
        if (result && result.success) {
          const data = result.data;
          console.log("loadUserSettings", data);
          lan = data?.language;
          //return getDeviceLang();
        } else if (result && !result.success) {
          lan =  getDeviceLang();
        }
      })
      .catch((err) => {
        if ( err === 404)  { // No user settings
          lan =  getDeviceLang();
        } else if ( err === 422) { // No User token
          throw ("error.profile.0007");
        } else {
          lan =  getDeviceLang();
        }
      })
    }
    return lan;
  }
};
