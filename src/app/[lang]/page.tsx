import { getDictionary } from '../../i18n/dictionaries';
import { Locale } from '../../i18n/config';
import LandingContent from '../../components/LandingContent';

export default async function HomePage({ params }: { params: { lang: Locale } }) {
    const dict = await getDictionary(params.lang);

    return <LandingContent dict={dict} lang={params.lang} />;
}

