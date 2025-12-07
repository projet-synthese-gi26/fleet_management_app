import { I18nProvider } from "../../components/providers/I18nProvider";
import { Locale } from '../../lib/i18n/config';

export default function LocaleLayout({children, params,}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    return (
        <I18nProvider initialLocale={params.locale as Locale}>
            {children}
        </I18nProvider>
    );
}