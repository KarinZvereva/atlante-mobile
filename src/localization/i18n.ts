import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {Platform, NativeModules} from 'react-native';

import translationEN from './en/translation.json';
import translationIT from './it/translation.json';

export const resources = {
  en: {translation: translationEN},
  it: {translation: translationIT},
};

export const getDeviceLang = () => {
  const appLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  return appLanguage.search(/-|_/g) !== -1
    ? appLanguage.slice(0, 2)
    : appLanguage;
};

i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLang(),
  debug: false,
  fallbackLng: 'en',
  supportedLngs: ['it', 'en'],
  load: 'languageOnly',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
}),
  (err: any, t: any) => {
    if (err)
      console.error(
        'error while initialising i18next ::: ' + JSON.stringify(err),
      );
  };
