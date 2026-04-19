'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { motion, useMotionValue, useSpring, useInView, useTransform } from 'framer-motion';
import { healthService, PublicStats } from '@/services/health.service';

function AnimatedNumber({ value, suffix = "" }: { value: number, suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false }); // false pour ré-animer lors du refresh
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
  const [stats, setStats] = useState<PublicStats | null>(null);

  const fetchStats = async () => {
    try {
      const data = await healthService.getPublicStats();
      setStats(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des stats publiques:", error);
    }
  };

  useEffect(() => {
    // Premier appel immédiat
    fetchStats();

    // Rafraîchissement automatique toutes les 60 secondes
    const interval = setInterval(fetchStats, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Mapping des données backend vers la structure d'affichage
  const benefits = [
    { 
        icon: 'business', 
        title: "Entreprises", 
        desc: "Partenaires nous faisant confiance", 
        value: stats?.activeManagers || 0, 
        suffix: '' 
    },
    { 
        icon: 'hub', 
        title: "Flottes", 
        desc: "Réseaux de transport actifs", 
        value: stats?.totalFleets || 0, 
        suffix: '' 
    },
    { 
        icon: 'local_shipping', 
        title: "Véhicules", 
        desc: "Unités suivies en temps réel", 
        value: stats?.managedVehicles || 0, 
        suffix: '+' 
    },
    { 
        icon: 'groups', 
        title: "Chauffeurs", 
        desc: "Conducteurs certifiés", 
        value: stats?.totalDrivers || 0, 
        suffix: '' 
    }
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

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-8 rounded-3xl border border-border-default bg-surface/30 backdrop-blur-sm overflow-hidden group hover:border-primary/30 transition-all flex flex-col items-center justify-center text-center shadow-lg"
            >
              <div className="relative z-10">
                <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary mx-auto w-fit">
                  <span className="material-symbols-outlined text-3xl">{benefit.icon}</span>
                </div>
                
                <div className="text-4xl font-black text-text-primary mb-2">
                  <AnimatedNumber value={benefit.value} suffix={benefit.suffix} />
                </div>
                
                <h3 className="text-sm font-bold text-text-primary mb-1 uppercase tracking-wider">
                  {benefit.title}
                </h3>
                <p className="text-xs text-text-secondary">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}