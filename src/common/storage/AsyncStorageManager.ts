import AsyncStorage from '@react-native-community/async-storage';

export const StorageManager = {
  storeData: async (key: string, item: string) => {
    try {
      await AsyncStorage.setItem(key, item);
      return true;
    } catch (error) {
      console.error(JSON.stringify(error));
      return false;
    }
  },
  retrieveData: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value && value !== null) {
        return value;
      }
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  },
};
