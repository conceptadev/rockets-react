import type { i18n as I18n } from 'i18next';

import i18n from 'i18next';
import { initReactI18next, useTranslation, setI18n } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import locales from './locales';

i18n
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

export type { I18n };

export { i18n, useTranslation, setI18n };
