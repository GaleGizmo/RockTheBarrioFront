import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import glCommon from './locales/gl/common.json';
import glFaq from './locales/gl/faq.json';
import glPrivacy from './locales/gl/privacy.json';
import glTerms from './locales/gl/terms.json';
import esCommon from './locales/es/common.json';
import esFaq from './locales/es/faq.json';
import esPrivacy from './locales/es/privacy.json';
import esTerms from './locales/es/terms.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      gl: {
        common: glCommon,
        faq: glFaq,
        privacy: glPrivacy,
        terms: glTerms,
      },
      es: {
        common: esCommon,
        faq: esFaq,
        privacy: esPrivacy,
        terms: esTerms,
      },
    },
    defaultNS: 'common',
    fallbackLng: 'gl',
    supportedLngs: ['gl', 'es'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'rtb_lang',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
