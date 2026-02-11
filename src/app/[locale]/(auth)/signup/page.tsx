"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";
import AuthHeroSection from "@/components/auth/AuthHeroSection";
import { Upload, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUpPage = () => {
  const { t, locale } = useI18n();
  const { register, isLoading } = useAuth();

  const [step, setStep] = useState(1);

  // États du formulaire
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(""); // Contiendra FLEET_MANAGER, FLEET_DRIVER, etc.
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = t("errorFirstNameRequired", "authPage");
    if (!lastName.trim()) newErrors.lastName = t("errorLastNameRequired", "authPage");
    if (!username.trim()) {
      newErrors.username = t("errorUsernameRequired", "authPage");
    } else if (username.length < 3) {
      newErrors.username = t("errorUsernameShort", "authPage");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!phone.trim()) newErrors.phone = t("errorPhoneRequired", "authPage");
    if (!email.trim()) {
      newErrors.email = t("errorEmailRequired", "authPage");
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = t("errorEmailInvalid", "authPage");
    }
    if (!role) newErrors.role = t("errorRoleRequired", "authPage");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!password) {
      newErrors.password = t("errorPasswordRequired", "authPage");
    } else if (password.length < 6) {
      newErrors.password = t("errorPasswordShort", "authPage");
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = t("errorPasswordsMismatch", "authPage");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep3()) return;

    try {
      await register({
        username,
        email,
        password,
        firstName,
        lastName,
        phone,
        roles: [role as any], // Utilise directement la valeur du select (FLEET_MANAGER, etc.)
        file: file || undefined,
      });
      toast.success(t("signupSuccess", "authPage"));
    } catch (err: any) {
      if (err.status === 409) {
        if (err.detail.toLowerCase().includes("email")) {
          setErrors((prev) => ({ ...prev, email: t("errorEmailTaken", "authPage") }));
          setStep(2);
        } else {
          setErrors((prev) => ({ ...prev, username: t("errorUsernameTaken", "authPage") }));
          setStep(1);
        }
      } else {
        toast.error(err.title || "Erreur", { description: err.detail });
      }
    }
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const prevStep = () => setStep(step > 1 ? step - 1 : 1);

  const getInputClass = (fieldName: string) => `
    form-input flex w-full min-w-0 rounded-lg 
    ${errors[fieldName] ? "border-red-500 focus:border-red-500" : "border-[#cfd9e7] dark:border-slate-600 focus:border-primary"}
    bg-surface-light dark:bg-surface-dark text-[#0d131b] dark:text-white 
    h-12 placeholder:text-[#9aa2b1] p-[15px] text-base font-normal transition-colors
  `;

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row overflow-hidden">
      <AuthHeroSection 
        titleKey="heroTitle" 
        descriptionKey="heroDetails" 
        imageUrl="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop"
        altText="Logistics truck"
        stats={[{ icon: "hub", label: "signupHeroStatLabel", description: "signupHeroStatDescription" }]}
      />

      <div className="flex w-full lg:w-1/2 flex-col bg-background-light dark:bg-background-dark">
        <div className="flex-grow flex flex-col justify-center px-6 sm:px-12 xl:px-24">
          <div className="mx-auto w-full max-w-md flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-[#0d131b] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                {t("signupTitle", "authPage")}
              </h2>
              <p className="text-[#4c6c9a] dark:text-slate-400 text-base font-normal">
                {t("signupSubtitle", "authPage")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#0d131b] dark:text-slate-200">{t("firstNameLabel", "authPage")}</label>
                      <input className={getInputClass("firstName")} placeholder={t("firstNamePlaceholder", "authPage")} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      {errors.firstName && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.firstName}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#0d131b] dark:text-slate-200">{t("lastNameLabel", "authPage")}</label>
                      <input className={getInputClass("lastName")} placeholder={t("lastNamePlaceholder", "authPage")} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      {errors.lastName && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.lastName}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0d131b] dark:text-slate-200">{t("usernameLabel", "authPage")}</label>
                    <input className={getInputClass("username")} placeholder={t("usernamePlaceholder", "authPage")} value={username} onChange={(e) => setUsername(e.target.value)} />
                    {errors.username && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.username}</span>}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0d131b] dark:text-slate-200">{t("phoneLabel", "authPage")}</label>
                    <input className={getInputClass("phone")} placeholder={t("phonePlaceholder", "authPage")} value={phone} onChange={(e) => setPhone(e.target.value)} />
                    {errors.phone && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.phone}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#0d131b] dark:text-slate-200 text-sm font-medium leading-normal">{t("professionalEmailLabel", "authPage")}</label>
                    <input className={getInputClass("email")} placeholder={t("professionalEmailPlaceholder", "authPage")} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#0d131b] dark:text-slate-200 text-sm font-medium leading-normal">{t("roleLabel", "authPage")}</label>
                    <div className="relative flex w-full items-center rounded-lg">
                      <select
                        className={`form-select flex w-full min-w-0 rounded-lg border h-12 p-[10px] pr-12 text-base font-normal transition-colors appearance-none 
                        ${errors.role ? "border-red-500 text-red-500" : "border-[#cfd9e7] dark:border-slate-600 text-[#0d131b] dark:text-white"} 
                        bg-surface-light dark:bg-surface-dark focus:border-primary focus:ring-1 focus:ring-primary`}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option disabled value="">{t("selectRolePlaceholder", "authPage")}</option>
                        <option value="FLEET_MANAGER">{t("roleManager", "authPage")}</option>
                        <option value="FLEET_DRIVER">{t("roleDriver", "authPage")}</option>
                        <option value="FLEET_ADMIN">{t("roleAdmin", "authPage")}</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 px-3 text-[#4c6c9a] pointer-events-none">expand_more</span>
                    </div>
                    {errors.role && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.role}</span>}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0d131b] dark:text-slate-200">{t("profilePictureLabel", "authPage")}</label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer bg-surface-light dark:bg-surface-dark border border-[#cfd9e7] dark:border-slate-600 rounded-lg px-4 py-2 hover:bg-gray-100 transition">
                        <Upload className="w-4 h-4 text-primary" />
                        <span className="text-sm text-text-primary">{t("chooseFile", "common")}</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      </label>
                      {file && <span className="text-sm text-success truncate max-w-[200px]">{file.name}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[#0d131b] dark:text-slate-200 text-sm font-medium leading-normal">{t("passwordLabel", "authPage")}</label>
                    <div className="relative flex w-full items-center rounded-lg">
                      <input className={`${getInputClass("password")} pr-12`} placeholder={t("passwordSignupPlaceholder", "authPage")} type={passwordVisible ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                      <button className="absolute right-0 px-3 text-[#4c6c9a]" type="button" onClick={togglePasswordVisibility}>
                        <span className="material-symbols-outlined text-[20px]">{passwordVisible ? "visibility_off" : "visibility"}</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[#0d131b] dark:text-slate-200 text-sm font-medium leading-normal">{t("confirmPasswordLabel", "authPage")}</label>
                    <div className="relative flex w-full items-center rounded-lg">
                      <input className={`${getInputClass("confirmPassword")} pr-12`} placeholder={t("confirmPasswordPlaceholder", "authPage")} type={confirmPasswordVisible ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                      <button className="absolute right-0 px-3 text-[#4c6c9a]" type="button" onClick={toggleConfirmPasswordVisibility}>
                        <span className="material-symbols-outlined text-[20px]">{confirmPasswordVisible ? "visibility_off" : "visibility"}</span>
                      </button>
                    </div>
                    {errors.confirmPassword && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.confirmPassword}</span>}
                  </div>
                </>
              )}

              <div className="flex gap-4">
                {step > 1 && <Button onClick={prevStep} type="button" className="w-full mt-4" variant="outline">{t("back", "common")}</Button>}
                {step < 3 ? (
                  <Button onClick={nextStep} type="button" className="w-full mt-4">{t("next", "common")}</Button>
                ) : (
                  <Button type="submit" isLoading={isLoading} className="w-full mt-4">{t("signupButton", "authPage")}</Button>
                )}
              </div>
            </form>

            <p className="text-center text-sm text-[#4c6c9a] dark:text-slate-400">
              {t("alreadyAccount", "authPage")}{" "}
              <Link className="font-bold text-primary hover:text-primary-dark transition-colors ml-1" href={`/${locale}/login`}>{t("loginLink", "authPage")}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;