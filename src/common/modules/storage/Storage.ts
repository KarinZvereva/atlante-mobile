import AsyncStorage from '@react-native-community/async-storage';

export const Storage = {
  storeData: async (key: string, item: string) => {
    try {
      await AsyncStorage.setItem(key, item);
      return true;
    } catch (error) {
      console.error(JSON.stringify(error));
      return false;
    }
  },
  storeObject: async <T extends {}>(key: string, item: T) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error(JSON.stringify(error));
      return false;
    }
  },
  updateObject: async <T extends {}>(key: string, item: T) => {
    try {
      await AsyncStorage.mergeItem(key, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error(JSON.stringify(error));
      return false;
    }
  },
  getData: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value && value !== null) {
        return value;
      }
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  },
  getObject: async <T extends {}>(key: string): Promise<T | undefined> => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value && value !== null) {
        return JSON.parse(value) as T;
      }
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  },
  removeEntry: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(JSON.stringify(error));
      return false;
    }
  },
  removeEntries: async (keys: string[]) => {
    try {
      await AsyncStorage.multiRemove(keys);
      return true;
    } catch (error) {
      console.error(JSON.stringify(error));
      return false;
    }
  },
};
