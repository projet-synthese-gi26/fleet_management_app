"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';
import AuthHeroSection from '@/components/auth/AuthHeroSection';
import { Chrome } from 'lucide-react';

const SignUpPage = () => {
    const { t, locale } = useI18n();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError(t('passwordMismatch', 'authPage'));
            alert(t('passwordMismatch', 'authPage'));
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert(t('signupSuccess', 'authPage'));
        } catch (err: any) {
            setError(err.message || t('signupError', 'authPage'));
            alert(err.message || t('signupError', 'authPage'));
        }
    };

    const signupHeroProps = {
        titleKey: 'heroTitle',
        descriptionKey: 'heroDetails',
        imageUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop",
        altText: "Logistics truck driving on a highway in Cameroon with mountains in background",
        stats: [
            { icon: 'hub', label: 'signupHeroStatLabel', description: 'signupHeroStatDescription' },
        ],
        imageOverlayClass: "bg-gradient-to-b from-[rgba(30,58,138,0.4)] via-[rgba(30,58,138,0.6)] to-[rgba(15,23,42,0.8)]"
    };

    return (
        <div className="flex min-h-screen w-full flex-col lg:flex-row overflow-hidden">
            {/* Left side - Hero Section */}
            <div className="relative hidden w-full lg:flex lg:w-1/2 flex-col justify-center p-12 xl:p-20 overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url("https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[rgba(30,58,138,0.4)] via-[rgba(30,58,138,0.6)] to-[rgba(15,23,42,0.8)]"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col gap-8 max-w-xl">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] xl:text-5xl">
                            {t('heroTitle', 'authPage')}
                        </h1>
                        <p className="text-white text-lg font-normal leading-relaxed">
                            {t('heroDetails', 'authPage')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4">
                        <div className="flex items-center gap-4 rounded-xl bg-[rgba(15,23,42,0.5)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] p-4 shadow-lg">
                            <div className="bg-white/10 p-2 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-white text-lg font-bold leading-tight">{t('signupHeroStatLabel', 'authPage')}</h3>
                                <p className="text-white/80 text-sm font-normal">{t('signupHeroStatDescription', 'authPage')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right column (form and footer) */}
            <div className="flex w-full lg:w-1/2 flex-col bg-background-light dark:bg-background-dark">
                <div className="flex-grow flex flex-col justify-center px-6 py-12 sm:px-12 xl:px-24">
                    <div className="mx-auto w-full max-w-md flex flex-col gap-6">
                        {/* Title/Subtitle section */}
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[#0d131b] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                                {t('signupTitle', 'authPage')}
                            </h2>
                            <p className="text-[#4c6c9a] dark:text-slate-400 text-base font-normal">
                                {t('signupSubtitle', 'authPage')}
                            </p>
                        </div>

                        {/* Signup Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4" method="POST">
                            {/* Full Name field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[#0d131b] dark:text-slate-200 text-sm font-medium leading-normal" htmlFor="name">
                                    {t('fullNameLabel', 'authPage')}
                                </label>
                                <input
                                    className="form-input flex w-full min-w-0 rounded-lg text-[#0d131b] dark:text-white border border-[#cfd9e7] dark:border-slate-600 bg-surface-light dark:bg-surface-dark focus:border-primary focus:ring-1 focus:ring-primary h-12 placeholder:text-[#9aa2b1] p-[15px] text-base font-normal transition-colors"
                                    id="name"
                                    placeholder={t('fullNamePlaceholder', 'authPage')}
                                    required
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            {/* Professional Email field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[#0d131b] dark:text-slate-200 text-sm font-medium leading-normal" htmlFor="email">
                                    {t('professionalEmailLabel', 'authPage')}
                                </label>
                                <input
                                    className="form-input flex w-full min-w-0 rounded-lg text-[#0d131b] dark:text-white border border-[#cfd9e7] dark:border-slate-600 bg-surface-light dark:bg-surface-dark focus:border-primary focus:ring-1 focus:ring-primary h-12 placeholder:text-[#9aa2b1] p-[15px] text-base font-normal transition-colors"
                                    id="email"
                                    placeholder={t('professionalEmailPlaceholder', 'authPage')}
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {/* Role Select */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[#0d131b] dark:text-slate-200 text-sm font-medium leading-normal" htmlFor="role">
                                    {t('roleLabel', 'authPage')}
                                </label>
                                <div className="relative flex w-full items-center rounded-lg">
                                    <select
                                        className="form-select flex w-full min-w-0 rounded-lg text-[#0d131b] dark:text-white border border-[#cfd9e7] dark:border-slate-600 bg-surface-light dark:bg-surface-dark focus:border-primary focus:ring-1 focus:ring-primary h-12 p-[10px] pr-12 text-base font-normal transition-colors appearance-none"
                                        id="role"
                                        required
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option disabled value="">{t('selectRolePlaceholder', 'authPage')}</option>
                                        <option value="admin">{t('roleAdmin', 'authPage')}</option>
                                        <option value="driver">{t('roleDriver', 'authPage')}</option>
                                        <option value="manager">{t('roleManager', 'authPage')}</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 px-3 flex items-center justify-center text-[#4c6c9a] dark:text-slate-400 pointer-events-none">expand_more</span>
                                </div>
                            </div>
                            {/* Password field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[#0d131b] dark:text-slate-200 text-sm font-medium leading-normal" htmlFor="password">
                                    {t('passwordLabel', 'authPage')}
                                </label>
                                <div className="relative flex w-full items-center rounded-lg">
                                    <input
                                        className="form-input flex w-full min-w-0 rounded-lg text-[#0d131b] dark:text-white border border-[#cfd9e7] dark:border-slate-600 bg-surface-light dark:bg-surface-dark focus:border-primary focus:ring-1 focus:ring-primary h-12 placeholder:text-[#9aa2b1] p-[15px] pr-12 text-base font-normal transition-colors"
                                        id="password"
                                        placeholder={t('passwordSignupPlaceholder', 'authPage')}
                                        required
                                        type={passwordVisible ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-[#4c6c9a] dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">{passwordVisible ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                            </div>
                            {/* Confirm Password field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[#0d131b] dark:text-slate-200 text-sm font-medium leading-normal" htmlFor="confirm-password">
                                    {t('confirmPasswordLabel', 'authPage')}
                                </label>
                                <div className="relative flex w-full items-center rounded-lg">
                                    <input
                                        className="form-input flex w-full min-w-0 rounded-lg text-[#0d131b] dark:text-white border border-[#cfd9e7] dark:border-slate-600 bg-surface-light dark:bg-surface-dark focus:border-primary focus:ring-1 focus:ring-primary h-12 placeholder:text-[#9aa2b1] p-[15px] pr-12 text-base font-normal transition-colors"
                                        id="confirm-password"
                                        placeholder={t('confirmPasswordPlaceholder', 'authPage')}
                                        required
                                        type={confirmPasswordVisible ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button
                                        className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-[#4c6c9a] dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">{confirmPasswordVisible ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                            </div>
                            {/* Signup Button */}
                            <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-primary-dark text-white text-base font-bold leading-normal tracking-[0.015em] shadow-sm transition-all active:scale-[0.98] mt-2" type="submit">
                                {t('signupButton', 'authPage')}
                            </button>
                            {error && (
                                <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                            )}
                        </form>

                        {/* Or separator */}
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-[#cfd9e7] dark:border-slate-700"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase">{t('orSeparator', 'authPage')}</span>
                            <div className="flex-grow border-t border-[#cfd9e7] dark:border-slate-700"></div>
                        </div>

                        {/* Continue with Google & Login link */}
                        <button className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-[#cfd9e7] dark:border-slate-600 bg-white dark:bg-surface-dark h-12 px-5 text-[#0d131b] dark:text-white text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                            <Chrome className="w-5 h-5" />
                            <span>{t('continueWithGoogle', 'authPage')}</span>
                        </button>
                        <p className="text-center text-sm text-[#4c6c9a] dark:text-slate-400">
                            {t('alreadyAccount', 'authPage')}{' '}
                            <Link className="font-bold text-primary hover:text-primary-dark transition-colors ml-1" href={`/${locale}/login`}>
                                {t('loginLink', 'authPage')}
                            </Link>
                        </p>
                    </div>
                </div>
                {/* Footer */}
                <div className="p-6 flex flex-col sm:flex-row justify-center gap-6 text-center text-xs text-[#4c6c9a] dark:text-slate-500 mt-auto">
                    <Link className="hover:text-primary transition-colors" href="#">{t('legalNotices', 'common')}</Link>
                    <Link className="hover:text-primary transition-colors" href="#">{t('privacy_policy', 'common')}</Link>
                    <span>{t('copyright', 'common')}</span>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;