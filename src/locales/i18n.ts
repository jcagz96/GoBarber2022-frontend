import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en/translation.json';
import pt from './pt/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
  lng: 'pt',
  fallbackLng: 'pt',
  keySeparator: '.',
  interpolation: { escapeValue: false },
  debug: true,
});

export default i18n;