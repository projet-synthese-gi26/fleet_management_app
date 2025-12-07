import { Locale } from './config';

import enDictionary from '../../../public/locales/en.json';
import frDictionary from '../../../public/locales/fr.json';

export type Dictionary = typeof enDictionary;

export const clientDictionaries: Record<Locale, Dictionary> = {
    en: enDictionary,
    fr: frDictionary,
};

const serverDictionaries = {
    en: () => import('../../../public/locales/en.json').then((module) => module.default as Dictionary),
    fr: () => import('../../../public/locales/fr.json').then((module) => module.default as Dictionary),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
    return serverDictionaries[locale]();
};