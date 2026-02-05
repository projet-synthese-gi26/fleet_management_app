// 'use client';

// import React from 'react';
// import { useI18n } from '@/hooks/useI18n';

// interface BenefitCardProps {
//     icon: string;
//     title: string;
//     description: string;
// }

// function BenefitCard({ icon, title, description }: BenefitCardProps) {
//     return (
//         <div className="flex flex-col items-center text-center gap-3">
//             <div className="flex items-center justify-center size-14 rounded-full bg-success/20 text-success">
//                 <span className="material-symbols-outlined text-3xl">{icon}</span>
//             </div>
//             <h3 className="text-lg font-bold text-text-primary">{title}</h3>
//             <p className="text-text-secondary text-sm">{description}</p>
//         </div>
//     );
// }

// export function BenefitsSection() {
//     const { t } = useI18n();

//     return (
//         <section className="px-4 py-10" id="benefits">
//             <div className="text-center">
//                 <h2 className="text-3xl font-bold leading-tight tracking-[-0.015em] text-text-primary">
//                     {t('benefits_title', 'landing')}
//                 </h2>
//                 <p className="mt-2 text-text-secondary max-w-2xl mx-auto">
//                     {t('benefits_subtitle', 'landing')}
//                 </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
//                 <BenefitCard
//                     icon="local_gas_station"
//                     title={t('benefit_1_title', 'landing')}
//                     description={t('benefit_1_text', 'landing')}
//                 />
//                 <BenefitCard
//                     icon="shield"
//                     title={t('benefit_2_title', 'landing')}
//                     description={t('benefit_2_text', 'landing')}
//                 />
//                 <BenefitCard
//                     icon="verified_user"
//                     title={t('benefit_3_title', 'landing')}
//                     description={t('benefit_3_text', 'landing')}
//                 />
//             </div>
//         </section>
//     );
// }











































'use client';

import React, { useEffect, useRef } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { motion, useMotionValue, useSpring, useInView, useTransform } from 'framer-motion';

function AnimatedNumber({ value, suffix = "" }: { value: number, suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

export function BenefitsSection() {
  const { t } = useI18n();

  const benefits = [
    { icon: 'local_gas_station', titleKey: 'benefit_1_title', descKey: 'benefit_1_text', value: 30, suffix: '%' },
    { icon: 'shield', titleKey: 'benefit_2_title', descKey: 'benefit_2_text', value: 45, suffix: '%' },
    { icon: 'verified_user', titleKey: 'benefit_3_title', descKey: 'benefit_3_text', value: 99, suffix: '%' }
  ];

  return (
    <section id="benefits" className="py-24 bg-background relative overflow-hidden border-t border-border-default">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-success/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-4">
            {t('benefits_title', 'landing')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('benefits_subtitle', 'landing')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-10 h-70 rounded-3xl border border-border-default bg-surface/30 backdrop-blur-sm overflow-hidden group hover:border-success/30 transition-all flex flex-col items-center justify-center text-center shadow-lg"
            >
              <div className="absolute opacity-5 group-hover:opacity-10 transition-opacity transform scale-[3]">
                <span className="material-symbols-outlined text-9xl">{benefit.icon}</span>
              </div>

              <div className="relative z-10">
                <div className="mb-6 p-4 rounded-full bg-success/10 text-success mx-auto w-fit">
                  <span className="material-symbols-outlined text-4xl">{benefit.icon}</span>
                </div>
                
                <div className="text-5xl font-black text-text-primary mb-3">
                  <AnimatedNumber value={benefit.value} suffix={benefit.suffix} />
                </div>
                
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {t(benefit.titleKey, 'landing')}
                </h3>
                <p className="text-sm text-text-secondary">
                  {t(benefit.descKey, 'landing')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}