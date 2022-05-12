import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en/translation.json';
import pt from './pt/translation.json';

const lang = localStorage.getItem('@GoBarber:i18nLang');

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
  lng: lang || 'pt',
  fallbackLng: lang || 'pt',
  keySeparator: '.',
  interpolation: { escapeValue: false },
  debug: true,
});

const changeLanguage = (idiom: string): void => {
  localStorage.setItem('@GoBarber:i18nLang', idiom);
  i18n.changeLanguage(idiom);
};

export { i18n, changeLanguage };
