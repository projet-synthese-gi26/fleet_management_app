"use client";

import React from 'react';
import { useI18n } from '@/hooks/useI18n';

interface AuthHeroStat {
  icon?: string;
  count?: string;
  label: string;
  description: string;
}

interface AuthHeroSectionProps {
  titleKey: string;
  descriptionKey: string;
  imageUrl: string;
  altText: string;
  stats?: AuthHeroStat[];
  imageOverlayClass?: string;
}

const AuthHeroSection: React.FC<AuthHeroSectionProps> = ({
  titleKey,
  descriptionKey,
  imageUrl,
  altText,
  stats,
  imageOverlayClass = "bg-gradient-to-b from-[rgba(30,58,138,0.3)] via-[rgba(30,58,138,0.5)] to-[rgba(15,23,42,0.7)]"
}) => {
  const { t } = useI18n();

  return (
    <div className="relative hidden w-full lg:flex lg:w-1/2 flex-col justify-center p-12 xl:p-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        data-alt={altText}
        style={{
          backgroundImage: `url("${imageUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 ${imageOverlayClass}`}></div>
      </div>

      {/* Content - Now centered vertically instead of at bottom */}
      <div className="relative z-10 flex flex-col gap-8 max-w-xl">
        <div className="flex flex-col gap-4">
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] xl:text-5xl">
            {t(titleKey, 'authPage')}
          </h1>
          <p className="text-white text-lg font-normal leading-relaxed">
            {t(descriptionKey, 'authPage')}
          </p>
        </div>

        {stats && stats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl bg-[rgba(15,23,42,0.5)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] p-4 shadow-lg transition-transform hover:scale-[1.02]"
              >
                {stat.icon && stat.icon === 'hub' ? (
                  <div className="bg-white/10 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                ) : stat.icon && stat.icon === 'local_shipping' ? (
                  <div className="bg-white/10 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  </div>
                ) : stat.icon && stat.icon === 'support_agent' ? (
                  <div className="bg-white/10 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                ) : (
                  stat.icon && <span className="material-symbols-outlined text-white text-3xl">{stat.icon}</span>
                )}
                <div className="flex flex-col">
                  {stat.count && <h3 className="text-white text-lg font-bold leading-tight">{stat.count} {t(stat.label, 'authPage')}</h3>}
                  {!stat.count && <h3 className="text-white text-lg font-bold leading-tight">{t(stat.label, 'authPage')}</h3>}
                  <p className="text-white/80 text-sm font-normal">{t(stat.description, 'authPage')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthHeroSection;