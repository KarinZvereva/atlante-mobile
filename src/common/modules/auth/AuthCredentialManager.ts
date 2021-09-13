import {credentialKey} from '../../constants';
import {LoginApiInputData} from '../../interfaces';
import EncryptedStorage from 'react-native-encrypted-storage';

export const AuthCredentialManager = {
  getCredential: async () => {
    try {   
      const cred = await EncryptedStorage.getItem(credentialKey);
      if (cred) {
        return <LoginApiInputData>JSON.parse(cred);        
      } else 
      return null;
    } catch (error) {
      console.error('error when retrieve credentials on storage');
      return null;
    }
  },
  removeSavedCredential: async () => {
    try {
      await EncryptedStorage.removeItem(credentialKey);
      return true;
    } catch (error) {
      console.error('error when remove credentials on storage', error);
      return false;
    }
  },
  saveCredentialData: async (credential: LoginApiInputData) => {
    try {
      await EncryptedStorage.setItem(credentialKey, JSON.stringify(credential));
      return true;
    } catch (error) {
      console.error('error when saving credentials on storage');
      return false;
    }
  },
  updateCredentialData: async (credential: LoginApiInputData) => {
    try {   
      const credential = await EncryptedStorage.getItem(credentialKey);
      if (credential !== undefined) {
        await EncryptedStorage.setItem(credentialKey, JSON.stringify(credential));
        return true;
      } else 
      return false;
    } catch (error) {
      console.error('error when update credentials on storage');
      return false;
    }
  },
  isExpiredCredential: (credential?: string | null) => { //future use
  },
};