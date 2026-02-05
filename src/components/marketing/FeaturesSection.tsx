// 'use client';

// import React, { useState } from 'react';
// import { useI18n } from '@/hooks/useI18n';

// interface FeatureCardProps {
//     icon: string;
//     title: string;
//     description: string;
//     highlighted?: boolean;
//     onClick?: () => void;
// }

// function FeatureCard({ icon, title, description, highlighted = false, onClick }: FeatureCardProps) {
//     return (
//         <div
//             onClick={onClick}
//             className={`flex flex-1 gap-4 rounded-lg p-4 flex-col transition-all cursor-pointer ${
//                 highlighted
//                     ? 'border-2 border-primary bg-surface shadow-lg'
//                     : 'border border-border-default bg-surface hover:shadow-md hover:border-primary/30'
//             }`}
//         >
//             <span className={`material-symbols-outlined text-3xl transition-colors ${
//                 highlighted ? 'text-primary' : 'text-text-secondary'
//             }`}>
//                 {icon}
//             </span>
//             <div className="flex flex-col gap-1">
//                 <h3 className={`text-base font-bold leading-tight transition-colors ${
//                     highlighted ? 'text-primary' : 'text-text-primary'
//                 }`}>
//                     {title}
//                 </h3>
//                 <p className="text-text-secondary text-sm font-normal leading-normal">{description}</p>
//             </div>
//         </div>
//     );
// }

// export function FeaturesSection() {
//     const { t } = useI18n();
//     const [selectedFeature, setSelectedFeature] = useState(1); // 1 = Géorepérage par défaut

//     const features = [
//         {
//             id: 0,
//             icon: 'gps_fixed',
//             titleKey: 'feature_1_title',
//             descKey: 'feature_1_text'
//         },
//         {
//             id: 1,
//             icon: 'notifications_active',
//             titleKey: 'feature_2_title',
//             descKey: 'feature_2_text'
//         },
//         {
//             id: 2,
//             icon: 'route',
//             titleKey: 'feature_3_title',
//             descKey: 'feature_3_text'
//         },
//         {
//             id: 3,
//             icon: 'analytics',
//             titleKey: 'feature_4_title',
//             descKey: 'feature_4_text'
//         }
//     ];

//     return (
//         <section className="flex flex-col gap-10 px-4 py-10 bg-background-secondary rounded-xl" id="features">
//             <div className="flex flex-col gap-4">
//                 <h2 className="text-3xl font-bold leading-tight tracking-[-0.015em] max-w-2xl text-text-primary">
//                     {t('solution_section_title', 'landing')}
//                 </h2>
//                 <p className="text-text-secondary text-base font-normal leading-normal max-w-2xl">
//                     {t('solution_section_subtitle', 'landing')}
//                 </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {features.map((feature) => (
//                     <FeatureCard
//                         key={feature.id}
//                         icon={feature.icon}
//                         title={t(feature.titleKey, 'landing')}
//                         description={t(feature.descKey, 'landing')}
//                         highlighted={selectedFeature === feature.id}
//                         onClick={() => setSelectedFeature(feature.id)}
//                     />
//                 ))}
//             </div>
//         </section>
//     );
// }



'use client';

import React, { useRef } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

function TiltCard({ feature }: { feature: any }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = (e.clientX - rect.left) * 20;
    const mouseY = (e.clientY - rect.top) * 20;
    
    const rX = (mouseY / height - 10) * -1;
    const rY = mouseX / width - 10;
    
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transform }}
      className="relative h-full w-full rounded-3xl bg-surface/50 border border-border-default p-8 group cursor-pointer"
    >
      <div 
        style={{ transform: "translateZ(50px)" }} 
        className="relative h-full flex flex-col items-center justify-center text-center p-6"
      >
        <div className="mb-6 p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg">
          <span className="material-symbols-outlined text-4xl">{feature.icon}</span>
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
      </div>

      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-transparent to-primary-hover/20 pointer-events-none" />
    </motion.div>
  );
}

export function FeaturesSection() {
  const { t } = useI18n();

  const features = [
    { id: 0, icon: 'gps_fixed', titleKey: 'feature_1_title', descKey: 'feature_1_text' },
    { id: 1, icon: 'notifications_active', titleKey: 'feature_2_title', descKey: 'feature_2_text' },
    { id: 2, icon: 'route', titleKey: 'feature_3_title', descKey: 'feature_3_text' },
    { id: 3, icon: 'analytics', titleKey: 'feature_4_title', descKey: 'feature_4_text' }
  ];

  return (
    <section id="features" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-24 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-text-primary mb-6">
            {t('solution_section_title', 'landing')}
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {t('solution_section_subtitle', 'landing')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="h-[400px]">
              <TiltCard feature={{
                icon: feature.icon,
                title: t(feature.titleKey, 'landing'),
                description: t(feature.descKey, 'landing')
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}