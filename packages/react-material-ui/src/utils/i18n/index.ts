import i18next from 'i18next';
import {
  initReactI18next,
  useTranslation,
  getI18n,
  setI18n,
} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import locales from './locales';

// const DEFAULT_NAMESPACE = 'translation';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en-US',
    debug: true,
    resources: {
      'en-US': locales.en_US,
      'pt-BR': locales.pt_BR,
    },
    react: {
      bindI18nStore: 'added',
    },
  });

const i18nInstance = getI18n();
const addResource = i18nInstance.addResource;
const addResources = i18nInstance.addResources;
const addResourceBundle = i18nInstance.addResourceBundle;

export {
  useTranslation,
  addResource,
  addResources,
  addResourceBundle,
  setI18n,
  i18nInstance,
};
