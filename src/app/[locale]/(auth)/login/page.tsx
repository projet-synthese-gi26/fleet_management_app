"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";
import AuthHeroSection from "@/components/auth/AuthHeroSection";
import { Chrome } from "lucide-react"; // Import Chrome icon
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion"; // Nécessaire pour l'animation
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

const LoginPage = () => {
  const { t, locale } = useI18n();
  const { login, isLoading } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsShaking(false); // Reset

    try {
      await login({ identifier: email, password: password });
      toast.success("Connexion réussie !");
    } catch (err: any) {
      console.error(err);

      // Gestion spécifique 401 -> Secouer
      if (err.status === 401) {
        setIsShaking(true);
        toast.error("Identifiants incorrects", {
          description: "Email ou mot de passe invalide.",
        });
        // Reset shake after animation
        setTimeout(() => setIsShaking(false), 500);
      } else {
        toast.error(err.title || "Erreur", { description: err.detail });
      }
    }
  };

  const loginHeroProps = {
    titleKey: "heroTitle", // Using the updated key from i18n
    descriptionKey: "heroDetails", // Using the updated key from i18n
    imageUrl:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop", // Updated to new Unsplash URL
    altText:
      "Logistics truck driving on a highway in Cameroon with mountains in background",
    stats: [
      {
        icon: "local_shipping",
        count: t("loginHeroStat1Count", "authPage"),
        label: "loginHeroStat1Label",
        description: "loginHeroStat1Description",
      },
      {
        icon: "support_agent",
        count: t("loginHeroStat2Count", "authPage"),
        label: "loginHeroStat2Label",
        description: "loginHeroStat2Description",
      },
    ],
    imageOverlayClass:
      "bg-gradient-to-b from-[rgba(30,58,138,0.4)] via-[rgba(30,58,138,0.6)] to-[rgba(15,23,42,0.8)]",
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row overflow-hidden">
      {/* AuthHeroSection (left column) */}
      <AuthHeroSection {...loginHeroProps} />

      {/* Right column (form and footer) */}
      <div className="flex w-full lg:w-1/2 flex-col bg-background-light dark:bg-background-dark">
        <div className="flex h-full flex-col justify-center px-6 py-12 sm:px-12 xl:px-24">
          <motion.div
            className="mx-auto w-full max-w-md flex flex-col gap-8"
            animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Welcome/Subtitle section */}
            <div className="flex flex-col gap-2">
              <h2 className="text-[#0d131b] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                {t("loginTitle", "authPage")}
              </h2>
              <p className="text-[#4c6c9a] dark:text-slate-400 text-base font-normal">
                {t("loginSubtitle", "authPage")}
              </p>
            </div>

            {/* Login Form */}
            <form
              action="#"
              className="flex flex-col gap-5"
              method="POST"
              onSubmit={handleSubmit}
            >
              {/* Email field */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[#0d131b] dark:text-slate-200 text-sm font-medium leading-normal"
                  htmlFor="email"
                >
                  {t("emailLabel", "authPage")}
                </label>
                <input
                  className="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-[#0d131b] dark:text-white border border-[#cfd9e7] dark:border-slate-600 bg-surface-light dark:bg-surface-dark focus:border-primary focus:ring-1 focus:ring-primary h-12 placeholder:text-[#9aa2b1] p-[15px] text-base font-normal leading-normal transition-colors"
                  id="email"
                  placeholder={t("emailPlaceholder", "authPage")}
                  type="email"
                  value={email} // Binding
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {/* Password field */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-[#0d131b] dark:text-slate-200 text-sm font-medium leading-normal"
                  htmlFor="password"
                >
                  {t("passwordLabel", "authPage")}
                </label>
                <div className="relative flex w-full items-center rounded-lg">
                  <input
                    className="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-[#0d131b] dark:text-white border border-[#cfd9e7] dark:border-slate-600 bg-surface-light dark:bg-surface-dark focus:border-primary focus:ring-1 focus:ring-primary h-12 placeholder:text-[#9aa2b1] p-[15px] pr-12 text-base font-normal leading-normal transition-colors"
                    id="password"
                    placeholder={t("passwordPlaceholder", "authPage")}
                    type={passwordVisible ? "text" : "password"}
                    value={password} // Binding
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
              </div>
              {/* Remember me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-slate-600 dark:bg-surface-dark"
                    type="checkbox"
                  />
                  <span className="text-sm text-[#4c6c9a] dark:text-slate-400 group-hover:text-[#0d131b] dark:group-hover:text-slate-200 transition-colors">
                    {t("rememberMe", "authPage")}
                  </span>
                </label>
                <Link
                  className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                  href="#"
                >
                  {t("forgotPassword", "authPage")}
                </Link>
              </div>
              {/* Login Button */}
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full mt-2"
              >
                {t("loginButton", "authPage")}
              </Button>
            </form>

            {/* Or separator */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-[#cfd9e7] dark:border-slate-700"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">
                {t("orSeparator", "authPage")}
              </span>
              <div className="flex-grow border-t border-[#cfd9e7] dark:border-slate-700"></div>
            </div>

            {/* Continue with Google & Signup link */}
            <div className="flex flex-col gap-6">
              <button className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-[#cfd9e7] dark:border-slate-600 bg-white dark:bg-surface-dark h-12 px-5 text-[#0d131b] dark:text-white text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <Chrome className="w-5 h-5" />
                <span>{t("continueWithGoogle", "authPage")}</span>
              </button>
              <p className="text-center text-sm text-[#4c6c9a] dark:text-slate-400">
                {t("noAccount", "authPage")}{" "}
                <Link
                  className="text-primary font-semibold hover:text-primary-dark transition-colors ml-1"
                  href={`/${locale}/signup`}
                >
                  {t("signupLink", "authPage")}
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Footer */}
    </div>
  );
};

export default LoginPage;