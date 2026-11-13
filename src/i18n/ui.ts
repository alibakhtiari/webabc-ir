import { type SupportedLanguage, languages } from '@/types/language';
import { getDictionary } from './get-dictionary';
import { createTranslator } from './translate';

export interface UiTranslations {
  common: Record<string, string>;
  nav: Record<string, string>;
  footer: Record<string, string>;
}

export const getUiTranslations = async (lang: SupportedLanguage) => {
  const dictionary = await getDictionary(lang);
  return {
    t: createTranslator(dictionary),
    isRtl: languages[lang]?.direction === 'rtl',
    lang,
  };
};

export default getUiTranslations;
