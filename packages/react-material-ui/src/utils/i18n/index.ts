import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import locales from './locales';

const resources = {
  'en-US': locales.en_US,
  'pt-BR': locales.pt_BR,
};

const languages: string[] = Object.keys(resources);

i18n.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'en-US',
  debug: true,
  resources,
});

export { i18n, useTranslation, languages };
