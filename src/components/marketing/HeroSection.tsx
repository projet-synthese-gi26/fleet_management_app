// "use client";

// import React from "react";
// import { useI18n } from "@/hooks/useI18n";
// import { useAuth } from "@/contexts/AuthContext"; // Import
// import Link from "next/link";
// import { getDashboardRoute } from "@/lib/auth-utils"; // Import

// export function HeroSection() {
//   const { t, locale } = useI18n();
//   const { user, isAuthenticated, isLoading } = useAuth(); // Auth

//   const dashboardLink = getDashboardRoute(user, locale);

//   return (
//     <div className="px-4 mt-8">
//       <div className="w-full @container">
//         <div
//           className="flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-center text-center px-4 py-10 md:px-16"
//           style={{
//             backgroundImage: `linear-gradient(to right, rgba(10, 42, 91, 0.9) 0%, rgba(10, 42, 91, 0.6) 50%, rgba(10, 42, 91, 0.1) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCVTZvXimqIEi_lfJj8C0ZQePUR37-xGVPh9nJlaBrvTgi2DTt-Uqa3F2HEmj82VpD20mS-nlgq7KpnkGvWWNN034F202I99KiuzwxIMnHp4qiSnatMq0cgkyTfa1CydpZh2guLlhAKZkEgaFlPJAWQGwTgUIa9Idgybm51WADV07oh0YjT8p8wF51tPm8SV07a_FJKbI_cVSreGiSCC6MsBr7OvDgTAeg_ALiZWrT2xOe2GSjC1_DSJl5gpp9Li2YBXhrk2XqMIK8")`,
//           }}
//         >
//           <div className="flex flex-col gap-4 text-left max-w-xl">
//             <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
//               {t("hero_title", "landing")}
//             </h1>
//             <h2 className="text-white/80 text-base font-normal leading-normal md:text-lg">
//               {t("hero_subtitle", "landing")}
//             </h2>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             {!isLoading && (
//               <>
//                 {isAuthenticated ? (
//                   <Link
//                     href={dashboardLink}
//                     className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-success hover:bg-success-dark text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors gap-2"
//                   >
//                     <span>Accéder à mon Espace</span>
//                     <span className="material-symbols-outlined text-lg">
//                       arrow_forward
//                     </span>
//                   </Link>
//                 ) : (
//                   <Link
//                     href={`/${locale}/signup`} // Ou un lien vers une page de démo spécifique
//                     className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-primary-hover text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors"
//                   >
//                     <span className="truncate">
//                       {t("request_demo", "common")}
//                     </span>
//                   </Link>
//                 )}
//               </>
//             )}

//             <a
//               href="#features"
//               className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-surface hover:bg-surface-hover text-text-primary text-base font-bold leading-normal tracking-[0.015em] transition-colors border border-border-default"
//             >
//               <span className="truncate">{t("learn_more", "common")}</span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






























"use client";

import React from "react";
import { useI18n } from "@/hooks/useI18n";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { getDashboardRoute } from "@/lib/auth-utils";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";

export function HeroSection() {
  const { t, locale } = useI18n();
  const { user, isAuthenticated, isLoading } = useAuth();
  const dashboardLink = getDashboardRoute(user, locale);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background pt-20">
      
      {/* Grille de fond subtile */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Image de fond avec overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCVTZvXimqIEi_lfJj8C0ZQePUR37-xGVPh9nJlaBrvTgi2DTt-Uqa3F2HEmj82VpD20mS-nlgq7KpnkGvWWNN034F202I99KiuzwxIMnHp4qiSnatMq0cgkyTfa1CydpZh2guLlhAKZkEgaFlPJAWQGwTgUIa9Idgybm51WADV07oh0YjT8p8wF51tPm8SV07a_FJKbI_cVSreGiSCC6MsBr7OvDgTAeg_ALiZWrT2xOe2GSjC1_DSJl5gpp9Li2YBXhrk2XqMIK8")`
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-xl mb-8 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-primary">
              Fleet Management v2.0
            </span>
          </motion.div>

          {/* Titre */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground mb-8 leading-[1.1] drop-shadow-2xl"
          >
            {t("hero_title", "landing")}
          </motion.h1>
          
          {/* Sous-titre */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            {t("hero_subtitle", "landing")}
          </motion.p>
          
          {/* Boutons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <Link href={dashboardLink}>
                    <button className="h-16 px-10 rounded-full text-lg font-bold bg-gradient-to-r from-success to-success-dark text-white hover:opacity-90 hover:scale-105 transition-all shadow-[0_0_30px_-5px_rgba(var(--success),0.5)] flex items-center gap-3">
                      <span>Accéder à mon Espace</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                ) : (
                  <Link href={`/${locale}/signup`}>
                    <button className="h-16 px-10 rounded-full text-lg font-bold bg-gradient-to-r from-primary to-primary-hover text-white hover:opacity-90 hover:scale-105 transition-all shadow-[0_0_30px_-5px_rgba(var(--primary),0.5)]">
                      {t("request_demo", "common")}
                    </button>
                  </Link>
                )}
              </>
            )}

            <a href="#features">
              <button className="h-16 px-10 rounded-full text-lg font-medium border-2 border-border-default bg-background/50 hover:bg-surface backdrop-blur-lg transition-all flex items-center gap-2">
                <Play className="w-5 h-5 fill-current" />
                {t("learn_more", "common")}
              </button>
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}