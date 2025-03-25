import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './en.json';
import viTranslation from './vi.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      vi: { translation: viTranslation },
    },
    lng: 'en', // ngôn ngữ mặc định
    fallbackLng: 'en',
    interpolation: { escapeValue: false } // React đã xử lý việc escape
  });

export default i18n;
