// // 'use client';

// // import React from 'react';
// // import { useI18n } from '@/hooks/useI18n';

// // interface StepCardProps {
// //     number: number;
// //     title: string;
// //     description: string;
// // }

// // function StepCard({ number, title, description }: StepCardProps) {
// //     return (
// //         <div className="relative flex flex-col items-center gap-4">
// //             <div className="z-10 flex items-center justify-center size-16 rounded-full bg-primary text-white font-bold text-2xl border-4 border-background-secondary">
// //                 {number}
// //             </div>
// //             <h3 className="font-bold text-text-primary">{title}</h3>
// //             <p className="text-sm text-text-secondary text-center">{description}</p>
// //         </div>
// //     );
// // }

// // export function StepsSection() {
// //     const { t } = useI18n();

// //     return (
// //         <section className="px-4 py-10 bg-background-secondary rounded-xl">
// //             <div className="text-center">
// //                 <h2 className="text-3xl font-bold leading-tight tracking-[-0.015em] text-text-primary">
// //                     {t('steps_title', 'landing')}
// //                 </h2>
// //                 <p className="mt-2 text-text-secondary max-w-2xl mx-auto">
// //                     {t('steps_subtitle', 'landing')}
// //                 </p>
// //             </div>

// //             <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-center">
// //                 <div className="absolute top-1/2 left-0 w-full h-px bg-border-default hidden md:block" style={{ transform: 'translateY(-50%)', zIndex: 0 }}></div>

// //                 <StepCard
// //                     number={1}
// //                     title={t('step_1_title', 'landing')}
// //                     description={t('step_1_text', 'landing')}
// //                 />
// //                 <StepCard
// //                     number={2}
// //                     title={t('step_2_title', 'landing')}
// //                     description={t('step_2_text', 'landing')}
// //                 />
// //                 <StepCard
// //                     number={3}
// //                     title={t('step_3_title', 'landing')}
// //                     description={t('step_3_text', 'landing')}
// //                 />
// //             </div>
// //         </section>
// //     );
// // }









































// 'use client';

// import React, { useRef } from 'react';
// import { useI18n } from '@/hooks/useI18n';
// import { motion, useScroll, useTransform } from 'framer-motion';

// export function StepsSection() {
//   const { t } = useI18n();
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"]
//   });

//   const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

//   const steps = [
//     { number: 1, titleKey: 'step_1_title', descKey: 'step_1_text' },
//     { number: 2, titleKey: 'step_2_title', descKey: 'step_2_text' },
//     { number: 3, titleKey: 'step_3_title', descKey: 'step_3_text' }
//   ];

//   return (
//     <section ref={containerRef} className="py-32 bg-background-secondary relative overflow-hidden">
//       <div className="container mx-auto px-6 relative z-10">
        
//         <div className="mb-24 max-w-4xl">
//           <motion.h2 
//             initial={{ opacity: 0, x: -100 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-text-primary/20 to-transparent tracking-tighter select-none"
//           >
//             {t('steps_title', 'landing')}
//           </motion.h2>
//           <div className="-mt-8 ml-2 md:ml-4">
//             <p className="text-xl md:text-3xl text-primary font-bold tracking-widest uppercase">
//               {t('steps_subtitle', 'landing')}
//             </p>
//           </div>
//         </div>

//         <div className="relative max-w-4xl mx-auto">
//           {/* Ligne néon centrale */}
//           <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-border-default/30 rounded-full overflow-hidden">
//             <motion.div 
//               style={{ height: lineHeight }} 
//               className="w-full bg-gradient-to-b from-primary via-primary-hover to-success shadow-[0_0_20px_2px_rgba(var(--primary),0.5)]" 
//             />
//           </div>

//           {steps.map((step, idx) => (
//             <motion.div 
//               key={idx}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ margin: "-100px" }}
//               transition={{ duration: 0.5 }}
//               className="flex items-start gap-8 mb-24 last:mb-0 relative"
//             >
              
//               {/* Nœud central */}
//               <div className="relative z-20 flex-shrink-0">
//                 <div className="w-14 h-14 rounded-full bg-background border-4 border-primary shadow-[0_0_20px_rgba(var(--primary),0.5)] flex items-center justify-center">
//                   <span className="text-2xl font-black text-primary">{step.number}</span>
//                   <div className="absolute w-3 h-3 bg-primary rounded-full animate-ping" />
//                 </div>
//               </div>

//               {/* Contenu */}
//               <div className="flex-1 pt-2">
//                 <h3 className="text-2xl font-bold text-text-primary mb-3">
//                   {t(step.titleKey, 'landing')}
//                 </h3>
//                 <p className="text-text-secondary leading-relaxed">
//                   {t(step.descKey, 'landing')}
//                 </p>
//               </div>

//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }







'use client';

import React, { useRef } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { motion, useScroll, useTransform } from 'framer-motion';

export function StepsSection() {
  const { t } = useI18n();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    { number: 1, titleKey: 'step_1_title', descKey: 'step_1_text' },
    { number: 2, titleKey: 'step_2_title', descKey: 'step_2_text' },
    { number: 3, titleKey: 'step_3_title', descKey: 'step_3_text' }
  ];

  return (
    <section ref={containerRef} className="py-3 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* <div className="mb-16 max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-text-primary/20 to-transparent tracking-tighter select-none"
          >
            {t('steps_title', 'landing')}
          </motion.h2>
          <div className="-mt-4 ml-2 md:ml-4">
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
              {t('steps_subtitle', 'landing')}
            </p>
          </div>
        </div> */}



         <div className="mb-0 max-w-4xl">
           <motion.h2 
             initial={{ opacity: 0, x: -100 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="text-6xl md:text-19xl font-black text-transparent bg-clip-text bg-gradient-to-b from-text-primary/20 to-transparent tracking-tighter select-none"
           >
             {t('steps_title', 'landing')}
          </motion.h2>
           <div className="-mt-8 ml-2 md:ml-4">
             <p className="text-xl md:text-3xl text-primary font-bold tracking-widest uppercase">
               {t('steps_subtitle', 'landing')}
             </p>
           </div>
         </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Ligne néon centrale */}
          <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-border-default/30 rounded-full overflow-hidden">
            <motion.div 
              style={{ height: lineHeight }} 
              className="w-full bg-gradient-to-b from-primary via-primary-hover to-success shadow-[0_0_20px_2px_rgba(var(--primary),0.5)]" 
            />
          </div>

          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="flex items-start gap-8 mb-24 last:mb-0 relative"
            >
              
              {/* Nœud central */}
              <div className="relative z-20 flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-background border-4 border-primary shadow-[0_0_20px_rgba(var(--primary),0.5)] flex items-center justify-center">
                  <span className="text-2xl font-black text-primary">{step.number}</span>
                  <div className="absolute w-3 h-3 bg-primary rounded-full animate-ping" />
                </div>
              </div>

              {/* Contenu */}
              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-bold text-text-primary mb-3">
                  {t(step.titleKey, 'landing')}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {t(step.descKey, 'landing')}
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}