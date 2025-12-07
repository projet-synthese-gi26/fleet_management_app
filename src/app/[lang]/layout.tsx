import { locales, Locale } from '../../i18n/config';
import { ReactNode } from 'react';

export async function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

export default function LangLayout({
                                       children,
                                       params,
                                   }: {
    children: ReactNode;
    params: { lang: Locale };
}) {
    return children;
}