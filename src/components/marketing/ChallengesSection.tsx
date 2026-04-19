// 'use client';

// import React from 'react';
// import { useI18n } from '@/hooks/useI18n';

// interface ProblemItemProps {
//     title: string;
//     description: string;
// }

// interface SolutionItemProps {
//     title: string;
//     description: string;
// }

// function ProblemItem({ title, description }: ProblemItemProps) {
//     return (
//         <li className="flex items-start gap-3">
//             <span className="material-symbols-outlined text-error mt-1">cancel</span>
//             <div>
//                 <h4 className="font-semibold text-text-primary">{title}</h4>
//                 <p className="text-sm text-text-secondary">{description}</p>
//             </div>
//         </li>
//     );
// }

// function SolutionItem({ title, description }: SolutionItemProps) {
//     return (
//         <li className="flex items-start gap-3">
//             <span className="material-symbols-outlined text-success mt-1">check_circle</span>
//             <div>
//                 <h4 className="font-semibold text-text-primary">{title}</h4>
//                 <p className="text-sm text-text-secondary">{description}</p>
//             </div>
//         </li>
//     );
// }

// export function ChallengesSection() {
//     const { t } = useI18n();

//     return (
//         <section className="flex flex-col gap-8 px-4 py-10" id="challenges">
//             <div className="text-center">
//                 <h2 className="text-3xl font-bold leading-tight tracking-[-0.015em] text-text-primary">
//                     {t('challenges_title', 'landing')}
//                 </h2>
//                 <p className="mt-2 text-text-secondary max-w-2xl mx-auto">
//                     {t('challenges_subtitle', 'landing')}
//                 </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
//                 <div className="bg-surface rounded-xl border border-border-default p-6 shadow-sm">
//                     <h3 className="text-xl font-bold text-error mb-4">
//                         {t('section_problems', 'landing')}
//                     </h3>
//                     <ul className="space-y-4">
//                         <ProblemItem
//                             title={t('problem_1_title', 'landing')}
//                             description={t('problem_1_text', 'landing')}
//                         />
//                         <ProblemItem
//                             title={t('problem_2_title', 'landing')}
//                             description={t('problem_2_text', 'landing')}
//                         />
//                         <ProblemItem
//                             title={t('problem_3_title', 'landing')}
//                             description={t('problem_3_text', 'landing')}
//                         />
//                     </ul>
//                 </div>

//                 <div className="bg-surface rounded-xl border border-border-default p-6 shadow-sm">
//                     <h3 className="text-xl font-bold text-success mb-4">
//                         {t('section_solution', 'landing')}
//                     </h3>
//                     <ul className="space-y-4">
//                         <SolutionItem
//                             title={t('solution_1_title', 'landing')}
//                             description={t('solution_1_text', 'landing')}
//                         />
//                         <SolutionItem
//                             title={t('solution_2_title', 'landing')}
//                             description={t('solution_2_text', 'landing')}
//                         />
//                         <SolutionItem
//                             title={t('solution_3_title', 'landing')}
//                             description={t('solution_3_text', 'landing')}
//                         />
//                     </ul>
//                 </div>
//             </div>
//         </section>
//     );
// }



'use client';

import React from 'react';
import { useI18n } from '@/hooks/useI18n';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProblemItemProps {
  title: string;
  description: string;
  index: number;
}

interface SolutionItemProps {
  title: string;
  description: string;
  index: number;
}

function ProblemItem({ title, description, index }: ProblemItemProps) {
  return (
    <motion.li 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-start gap-4 group"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-error/10 flex items-center justify-center group-hover:bg-error/20 transition-colors">
        <XCircle className="w-5 h-5 text-error" />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-text-primary mb-1 group-hover:text-error transition-colors">{title}</h4>
        <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
      </div>
    </motion.li>
  );
}

function SolutionItem({ title, description, index }: SolutionItemProps) {
  return (
    <motion.li 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-start gap-4 group"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
        <CheckCircle2 className="w-5 h-5 text-success" />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-text-primary mb-1 group-hover:text-success transition-colors">{title}</h4>
        <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
      </div>
    </motion.li>
  );
}

export function ChallengesSection() {
  const { t } = useI18n();

  return (
    <section className="py-32 bg-background relative overflow-hidden" id="challenges">
      {/* Fond dégradé subtil */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-error/5 to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-4">
            {t('challenges_title', 'landing')}
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            {t('challenges_subtitle', 'landing')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          
          {/* Colonne Problèmes */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-error/10 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-surface/50 backdrop-blur-sm rounded-3xl border border-error/20 p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-error" />
                </div>
                <h3 className="text-2xl font-black text-error">
                  {t('section_problems', 'landing')}
                </h3>
              </div>
              <ul className="space-y-6">
                <ProblemItem
                  index={0}
                  title={t('problem_1_title', 'landing')}
                  description={t('problem_1_text', 'landing')}
                />
                <ProblemItem
                  index={1}
                  title={t('problem_2_title', 'landing')}
                  description={t('problem_2_text', 'landing')}
                />
                <ProblemItem
                  index={2}
                  title={t('problem_3_title', 'landing')}
                  description={t('problem_3_text', 'landing')}
                />
              </ul>
            </div>
          </motion.div>

          {/* Flèche centrale (desktop uniquement) */}
          {/* <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-16 h-16 rounded-full bg-primary/10 backdrop-blur-xl border-2 border-primary flex items-center justify-center shadow-lg">
              <ArrowRight className="w-8 h-8 text-primary animate-pulse" />
            </div>
          </div> */}

          {/* Colonne Solutions */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-success/10 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-surface/50 backdrop-blur-sm rounded-3xl border border-success/20 p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-2xl font-black text-success">
                  {t('section_solution', 'landing')}
                </h3>
              </div>
              <ul className="space-y-6">
                <SolutionItem
                  index={0}
                  title={t('solution_1_title', 'landing')}
                  description={t('solution_1_text', 'landing')}
                />
                <SolutionItem
                  index={1}
                  title={t('solution_2_title', 'landing')}
                  description={t('solution_2_text', 'landing')}
                />
                <SolutionItem
                  index={2}
                  title={t('solution_3_title', 'landing')}
                  description={t('solution_3_text', 'landing')}
                />
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
