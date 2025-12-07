'use client';

import React, { useState } from 'react';
import { useI18n } from '@/hooks/useI18n';

export function ContactSection() {
    const { t } = useI18n();
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section className="px-4 py-10" id="contact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-surface p-8 rounded-xl border border-border-default shadow-sm">
                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-bold leading-tight tracking-[-0.015em] text-text-primary">
                        {t('contact_title', 'landing')}
                    </h2>
                    <p className="text-text-secondary">
                        {t('contact_text', 'landing')}
                    </p>

                    <div className="mt-4 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">phone</span>
                            <span className="text-text-primary">{t('contact_phone', 'landing')}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">mail</span>
                            <span className="text-text-primary">{t('contact_email', 'landing')}</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-md border border-border-default bg-background text-text-primary px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        placeholder={t('form_name', 'landing')}
                        type="text"
                        required
                    />
                    <input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full rounded-md border border-border-default bg-background text-text-primary px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        placeholder={t('form_company', 'landing')}
                        type="text"
                        required
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-md border border-border-default bg-background text-text-primary px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        placeholder={t('form_email', 'landing')}
                        type="email"
                        required
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full rounded-md border border-border-default bg-background text-text-primary px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                        placeholder={t('form_message', 'landing')}
                        rows={4}
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-primary-hover text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors"
                    >
                        <span className="truncate">{t('form_button', 'landing')}</span>
                    </button>
                </form>
            </div>
        </section>
    );
}