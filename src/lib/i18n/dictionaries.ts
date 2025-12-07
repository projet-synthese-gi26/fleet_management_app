import { Locale } from './config';

const dictionaries = {
    en: () => import('../../../public/locales/en.json').then((module) => module.default),
    fr: () => import('../../../public/locales/fr.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale]();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;