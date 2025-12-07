import React from 'react';
import { useI18n } from '../providers/I18nProvider';

export function HeroSection() {
    const { t } = useI18n();

    return (
        <div className="px-4">
            <div className="w-full @container">
                <div
                    className="flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-center text-center px-4 py-10 md:px-16"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(10, 42, 91, 0.9) 0%, rgba(10, 42, 91, 0.6) 50%, rgba(10, 42, 91, 0.1) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCVTZvXimqIEi_lfJj8C0ZQePUR37-xGVPh9nJlaBrvTgi2DTt-Uqa3F2HEmj82VpD20mS-nlgq7KpnkGvWWNN034F202I99KiuzwxIMnHp4qiSnatMq0cgkyTfa1CydpZh2guLlhAKZkEgaFlPJAWQGwTgUIa9Idgybm51WADV07oh0YjT8p8wF51tPm8SV07a_FJKbI_cVSreGiSCC6MsBr7OvDgTAeg_ALiZWrT2xOe2GSjC1_DSJl5gpp9Li2YBXhrk2XqMIK8")`
                    }}
                >
                    <div className="flex flex-col gap-4 text-left max-w-xl">
                        <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
                            {t('hero_title', 'landing')}
                        </h1>
                        <h2 className="text-white/80 text-base font-normal leading-normal md:text-lg">
                            {t('hero_subtitle', 'landing')}
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-primary-hover text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors">
                            <span className="truncate">{t('request_demo')}</span>
                        </button>
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-surface hover:bg-surface-hover text-text-primary text-base font-bold leading-normal tracking-[0.015em] transition-colors border border-border-default">
                            <span className="truncate">{t('learn_more')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}