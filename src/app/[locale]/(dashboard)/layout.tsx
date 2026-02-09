// "use client";

// import React, { useState } from "react";
// import { Sidebar } from "@/components/dashboard/Sidebar";
// import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile
//   const [isCollapsed, setIsCollapsed] = useState(false); // Desktop

//   return (
//     // h-screen + overflow-hidden empêche le body de scroller
//     <div className="flex h-screen bg-background-secondary overflow-hidden">
//       {/* Sidebar : Doit gérer sa propre hauteur ou être fixe */}
//       <Sidebar
//         isOpen={isSidebarOpen}
//         isCollapsed={isCollapsed}
//         toggleCollapse={() => setIsCollapsed(!isCollapsed)}
//         closeMobileMenu={() => setIsSidebarOpen(false)}
//       />

//       <div
//         className={`
//             flex flex-col flex-1 h-full transition-all duration-300 ease-in-out
//             ${isCollapsed ? "lg:pl-20" : "lg:pl-72"}
//         `}
//       >
//         {/* Header reste en haut du flex column */}
//         <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

//         {/* Main prend l'espace restant et scrolle indépendamment */}
//         <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8">
//           <div className="max-w-[1600px] mx-auto min-h-full">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// }








// app/[locale]/(dashboard)/layout.tsx
"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false); 
  const [isCollapsed, setIsCollapsed] = useState(false); 

  return (
    <div className="flex h-screen bg-background-secondary overflow-hidden">
<<<<<<< HEAD
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed} // <-- NOM CORRIGÉ ICI
        isMobileOpen={isMobileOpen}
        closeMobile={() => setIsMobileOpen(false)} // <-- NOM CORRIGÉ ICI
      />
=======
      {/* Sidebar : Doit gérer sa propre hauteur ou être fixe */}
      <Sidebar isCollapsed={isCollapsed} />
>>>>>>> 32336dc (envoi)

      <div
        className={`
            flex flex-col flex-1 h-full transition-all duration-300 ease-in-out
<<<<<<< HEAD
            ${isCollapsed ? "lg:pl-20" : "lg:pl-72"} 
=======
            ${isCollapsed ? "lg:pl-40" : "lg:pl-72"}
>>>>>>> 32336dc (envoi)
        `}
      >
        <DashboardHeader onMenuClick={() => setIsMobileOpen(true)} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8">
          <div className="max-w-[1600px] mx-auto min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}