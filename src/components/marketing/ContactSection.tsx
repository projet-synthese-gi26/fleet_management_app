// 'use client';

// import React, { useState } from 'react';
// import { useI18n } from '@/hooks/useI18n';

// export function ContactSection() {
//     const { t } = useI18n();
//     const [formData, setFormData] = useState({
//         name: '',
//         company: '',
//         email: '',
//         message: ''
//     });

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log('Form submitted:', formData);
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     return (
//         <section className="px-4 py-10" id="contact">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-surface p-8 rounded-xl border border-border-default shadow-sm">
//                 <div className="flex flex-col gap-4">
//                     <h2 className="text-3xl font-bold leading-tight tracking-[-0.015em] text-text-primary">
//                         {t('contact_title', 'landing')}
//                     </h2>
//                     <p className="text-text-secondary">
//                         {t('contact_text', 'landing')}
//                     </p>

//                     <div className="mt-4 flex flex-col gap-4">
//                         <div className="flex items-center gap-3">
//                             <span className="material-symbols-outlined text-primary">phone</span>
//                             <span className="text-text-primary">{t('contact_phone', 'landing')}</span>
//                         </div>
//                         <div className="flex items-center gap-3">
//                             <span className="material-symbols-outlined text-primary">mail</span>
//                             <span className="text-text-primary">{t('contact_email', 'landing')}</span>
//                         </div>
//                     </div>
//                 </div>

//                 <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                     <input
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="w-full rounded-md border border-border-default bg-background text-text-primary px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
//                         placeholder={t('form_name', 'landing')}
//                         type="text"
//                         required
//                     />
//                     <input
//                         name="company"
//                         value={formData.company}
//                         onChange={handleChange}
//                         className="w-full rounded-md border border-border-default bg-background text-text-primary px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
//                         placeholder={t('form_company', 'landing')}
//                         type="text"
//                         required
//                     />
//                     <input
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="w-full rounded-md border border-border-default bg-background text-text-primary px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
//                         placeholder={t('form_email', 'landing')}
//                         type="email"
//                         required
//                     />
//                     <textarea
//                         name="message"
//                         value={formData.message}
//                         onChange={handleChange}
//                         className="w-full rounded-md border border-border-default bg-background text-text-primary px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
//                         placeholder={t('form_message', 'landing')}
//                         rows={4}
//                         required
//                     ></textarea>
//                     <button
//                         type="submit"
//                         className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-primary-hover text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors"
//                     >
//                         <span className="truncate">{t('form_button', 'landing')}</span>
//                     </button>
//                 </form>
//             </div>
//         </section>
//     );
// }



'use client';

import React, { useState } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { motion } from 'framer-motion';
import { Send, Loader2, Mail, User, Building, MessageSquare } from 'lucide-react';

export function ContactSection() {
  const { t } = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-6">
            {t('contact_title', 'landing')}
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            {t('contact_text', 'landing')}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface/30 backdrop-blur-xl border border-border-default rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-hover to-success" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors w-5 h-5" />
                <input 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('form_name', 'landing')}
                  className="w-full h-14 bg-background border border-border-default pl-12 pr-4 rounded-2xl text-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-primary placeholder:text-text-secondary/50"
                  required 
                />
              </div>
              
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors w-5 h-5" />
                <input 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('form_email', 'landing')}
                  className="w-full h-14 bg-background border border-border-default pl-12 pr-4 rounded-2xl text-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-primary placeholder:text-text-secondary/50"
                  required 
                />
              </div>
            </div>
            
            <div className="relative group">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors w-5 h-5" />
              <input 
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={t('form_company', 'landing')}
                className="w-full h-14 bg-background border border-border-default pl-12 pr-4 rounded-2xl text-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-primary placeholder:text-text-secondary/50"
              />
            </div>
            
            <div className="relative group">
              <MessageSquare className="absolute left-4 top-6 text-text-secondary group-focus-within:text-primary transition-colors w-5 h-5" />
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('form_message', 'landing')}
                className="w-full min-h-[180px] bg-background border border-border-default pl-12 pr-4 pt-5 pb-4 rounded-2xl text-lg resize-none focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-primary placeholder:text-text-secondary/50"
                required 
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full h-14 text-lg font-bold rounded-2xl bg-gradient-to-r from-primary to-primary-hover text-white hover:opacity-90 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.5)] hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Envoi en cours...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <Send className="w-5 h-5" />
                  {t('form_button', 'landing')}
                </span>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}


