"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";
import AuthHeroSection from "@/components/auth/AuthHeroSection";
import { Chrome, Upload, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

// Regex simple pour email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUpPage = () => {
  const { t, locale } = useI18n();
  const { register, isLoading } = useAuth();

  // États du formulaire
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // État des erreurs de validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // États d'interface
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Fonction de validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = "Le prénom est requis.";
    if (!lastName.trim()) newErrors.lastName = "Le nom est requis.";

    if (!username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis.";
    } else if (username.length < 3) {
      newErrors.username = "Au moins 3 caractères.";
    }

    if (!phone.trim()) newErrors.phone = "Le téléphone est requis.";

    if (!email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = "Format d'email invalide.";
    }

    if (!role) newErrors.role = "Veuillez sélectionner un rôle.";

    if (!password) {
      newErrors.password = "Le mot de passe est requis.";
    } else if (password.length < 6) {
      newErrors.password = "Au moins 6 caractères.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs dans le formulaire.");
      return;
    }

    // Normalisation des rôles selon votre spec backend
    let backendRole = "FLEET_MANAGER";
    if (role === "admin") backendRole = "FLEET_ADMIN"; // ou ADMIN selon votre securité
    if (role === "driver") backendRole = "FLEET_DRIVER";

    try {
      await register({
        username,
        email,
        password,
        firstName,
        lastName,
        phone,
        roles: [backendRole],
        file: file || undefined,
      });

      toast.success("Compte créé avec succès ! Bienvenue.");
    } catch (err: any) {
      // DEBUG : Pour voir enfin le vrai contenu de l'erreur
      console.error("Détail de l'erreur reçue:", {
        status: err.status,
        title: err.title,
        detail: err.detail,
      });

      // L'intercepteur rejette maintenant un objet avec .status
      if (err.status === 409) {
        toast.error("Conflit", { description: err.detail });

        if (err.detail.toLowerCase().includes("email")) {
          setErrors((prev) => ({ ...prev, email: "Email déjà utilisé" }));
        } else {
          setErrors((prev) => ({
            ...prev,
            username: "Nom d'utilisateur déjà pris",
          }));
        }
      } else if (err.status === 400) {
        toast.error("Données invalides", { description: err.detail });
      } else {
        // Erreur générique provenant de l'intercepteur
        toast.error(err.title || "Erreur", {
          description: err.detail || "Une erreur inconnue est survenue",
        });
      }
    }
  };

  const signupHeroProps = {
    titleKey: "heroTitle",
    descriptionKey: "heroDetails",
    imageUrl:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop",
    altText: "Logistics truck driving on a highway",
    stats: [
      {
        icon: "hub",
        label: "signupHeroStatLabel",
        description: "signupHeroStatDescription",
      },
    ],
    imageOverlayClass:
      "bg-gradient-to-b from-[rgba(30,58,138,0.4)] via-[rgba(30,58,138,0.6)] to-[rgba(15,23,42,0.8)]",
  };

  // Helper pour les classes d'input en erreur
  const getInputClass = (fieldName: string) => `
    form-input flex w-full min-w-0 rounded-lg 
    ${
      errors[fieldName]
        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
        : "border-[#cfd9e7] dark:border-slate-600 focus:border-primary focus:ring-1 focus:ring-primary"
    }
    bg-surface-light dark:bg-surface-dark text-[#0d131b] dark:text-white 
    h-12 placeholder:text-[#9aa2b1] p-[15px] text-base font-normal transition-colors
  `;

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row overflow-hidden">
      <AuthHeroSection {...signupHeroProps} />

      <div className="flex w-full lg:w-1/2 flex-col bg-background-light dark:bg-background-dark h-screen overflow-y-auto">
        <div className="flex-grow flex flex-col justify-center px-6 py-12 sm:px-12 xl:px-24">
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
              {/* Nom et Prénom */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#0d131b] dark:text-slate-200">
                    Prénom
                  </label>
                  <input
                    className={getInputClass("firstName")}
                    placeholder="Jean"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName)
                        setErrors({ ...errors, firstName: "" });
                    }}
                  />
                  {errors.firstName && (
                    <span className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.firstName}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#0d131b] dark:text-slate-200">
                    Nom
                  </label>
                  <input
                    className={getInputClass("lastName")}
                    placeholder="Dupont"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName)
                        setErrors({ ...errors, lastName: "" });
                    }}
                  />
                  {errors.lastName && (
                    <span className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.lastName}
                    </span>
                  )}
                </div>
              </div>

              {/* Username & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#0d131b] dark:text-slate-200">
                    Nom d'utilisateur
                  </label>
                  <input
                    className={getInputClass("username")}
                    placeholder="jdupont"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (errors.username)
                        setErrors({ ...errors, username: "" });
                    }}
                  />
                  {errors.username && (
                    <span className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.username}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#0d131b] dark:text-slate-200">
                    Téléphone
                  </label>
                  <input
                    className={getInputClass("phone")}
                    placeholder="+237..."
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                  />
                  {errors.phone && (
                    <span className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[#0d131b] dark:text-slate-200 text-sm font-medium leading-normal"
                  htmlFor="email"
                >
                  {t("professionalEmailLabel", "authPage")}
                </label>
                <input
                  className={getInputClass("email")}
                  id="email"
                  placeholder={t("professionalEmailPlaceholder", "authPage")}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                />
                {errors.email && (
                  <span className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Role Select */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[#0d131b] dark:text-slate-200 text-sm font-medium leading-normal"
                  htmlFor="role"
                >
                  {t("roleLabel", "authPage")}
                </label>
                <div className="relative flex w-full items-center rounded-lg">
                  <select
                    className={`form-select flex w-full min-w-0 rounded-lg border h-12 p-[10px] pr-12 text-base font-normal transition-colors appearance-none 
                    ${errors.role ? "border-red-500 text-red-500" : "border-[#cfd9e7] dark:border-slate-600 text-[#0d131b] dark:text-white"} 
                    bg-surface-light dark:bg-surface-dark focus:border-primary focus:ring-1 focus:ring-primary`}
                    id="role"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                      if (errors.role) setErrors({ ...errors, role: "" });
                    }}
                  >
                    <option disabled value="">
                      {t("selectRolePlaceholder", "authPage")}
                    </option>
                    <option value="admin">{t("roleAdmin", "authPage")}</option>
                    <option value="driver">
                      {t("roleDriver", "authPage")}
                    </option>
                    <option value="manager">
                      {t("roleManager", "authPage")}
                    </option>
                  </select>
                  <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 px-3 flex items-center justify-center text-[#4c6c9a] dark:text-slate-400 pointer-events-none">
                    expand_more
                  </span>
                </div>
                {errors.role && (
                  <span className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.role}
                  </span>
                )}
              </div>

              {/* Photo Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#0d131b] dark:text-slate-200">
                  Photo de profil (Optionnel)
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer bg-surface-light dark:bg-surface-dark border border-[#cfd9e7] dark:border-slate-600 rounded-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition">
                    <Upload className="w-4 h-4 text-primary" />
                    <span className="text-sm text-text-primary">
                      Choisir un fichier
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                  {file && (
                    <span className="text-sm text-success truncate max-w-[200px]">
                      {file.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[#0d131b] dark:text-slate-200 text-sm font-medium leading-normal"
                  htmlFor="password"
                >
                  {t("passwordLabel", "authPage")}
                </label>
                <div className="relative flex w-full items-center rounded-lg">
                  <input
                    className={`${getInputClass("password")} pr-12`}
                    id="password"
                    placeholder={t("passwordSignupPlaceholder", "authPage")}
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors({ ...errors, password: "" });
                    }}
                  />
                  <button
                    className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-[#4c6c9a] dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {passwordVisible ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <span className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[#0d131b] dark:text-slate-200 text-sm font-medium leading-normal"
                  htmlFor="confirm-password"
                >
                  {t("confirmPasswordLabel", "authPage")}
                </label>
                <div className="relative flex w-full items-center rounded-lg">
                  <input
                    className={`${getInputClass("confirmPassword")} pr-12`}
                    id="confirm-password"
                    placeholder={t("confirmPasswordPlaceholder", "authPage")}
                    type={confirmPasswordVisible ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword)
                        setErrors({ ...errors, confirmPassword: "" });
                    }}
                  />
                  <button
                    className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-[#4c6c9a] dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {confirmPasswordVisible ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              {/* Signup Button */}
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full mt-4"
              >
                {t("signupButton", "authPage")}
              </Button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-[#cfd9e7] dark:border-slate-700"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase">
                {t("orSeparator", "authPage")}
              </span>
              <div className="flex-grow border-t border-[#cfd9e7] dark:border-slate-700"></div>
            </div>

            <button className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-[#cfd9e7] dark:border-slate-600 bg-white dark:bg-surface-dark h-12 px-5 text-[#0d131b] dark:text-white text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
              <Chrome className="w-5 h-5" />
              <span>{t("continueWithGoogle", "authPage")}</span>
            </button>
            <p className="text-center text-sm text-[#4c6c9a] dark:text-slate-400">
              {t("alreadyAccount", "authPage")}{" "}
              <Link
                className="font-bold text-primary hover:text-primary-dark transition-colors ml-1"
                href={`/${locale}/login`}
              >
                {t("loginLink", "authPage")}
              </Link>
            </p>
          </div>
        </div>
        <div className="p-6 flex flex-col sm:flex-row justify-center gap-6 text-center text-xs text-[#4c6c9a] dark:text-slate-500 mt-auto">
          <Link className="hover:text-primary transition-colors" href="#">
            {t("legalNotices", "common")}
          </Link>
          <Link className="hover:text-primary transition-colors" href="#">
            {t("privacy_policy", "common")}
          </Link>
          <span>{t("copyright", "common")}</span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
