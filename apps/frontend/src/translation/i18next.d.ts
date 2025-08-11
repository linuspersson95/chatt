import type { TranslationSchema } from './locales/translationSchema';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: TranslationSchema;
  }
}
