import i18next from 'i18next';
import { initReactI18next, useTranslation, getI18n } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import locales from './locales';

const namespaces = Object.keys(locales.en_US);

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en-US',
    debug: true,
    ns: ['translation', ...namespaces],
    resources: {
      'en-US': locales.en_US,
      'pt-BR': locales.pt_BR,
    },
    react: {
      bindI18nStore: 'added removed',
    },
  });

const reactI18n = getI18n();

const isInitialized = reactI18n['isInitialized'];

const appendStrings = reactI18n['addResources'];
const addLanguage = (lng: string, resources: any) => {
  namespaces.forEach((namespace) => {
    reactI18n.addResourceBundle(lng, namespace, resources[namespace], true);
  });
};

export { useTranslation, reactI18n, isInitialized, appendStrings, addLanguage };
