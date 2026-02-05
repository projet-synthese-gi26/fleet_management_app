

// "use client";

// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useI18n } from "@/hooks/useI18n";
// import { useAuth } from "@/contexts/AuthContext";
// import {
// LayoutDashboard, Map, Truck, Users, Route, Bell,
// Settings, LogOut, ChevronLeft, Car, MapPin, Building2,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// interface SidebarProps {
// isOpen: boolean;
// isCollapsed: boolean;
// toggleCollapse: () => void;
// closeMobileMenu: () => void;
// }

// const MENU_ITEMS = [
// { icon: LayoutDashboard, labelKey: "dashboard", path: "/dashboard" },
// { icon: Building2, labelKey: "fleets", path: "/dashboard/fleets" },
// { icon: Map, labelKey: "live_map", path: "/dashboard/map" },
// { icon: Truck, labelKey: "vehicles", path: "/dashboard/vehicles" },
// { icon: Users, labelKey: "drivers", path: "/dashboard/drivers" },
// { icon: Route, labelKey: "trips", path: "/dashboard/trips" },
// { icon: MapPin, labelKey: "geofencing", path: "/admin/geofencing" },
// { icon: Bell, labelKey: "alerts", path: "/dashboard/alerts" },
// { icon: Settings, labelKey: "settings", path: "/dashboard/settings" },
// ];

// export function Sidebar({ isOpen, isCollapsed, toggleCollapse, closeMobileMenu }: SidebarProps) {
// const { locale, t } = useI18n();
// const { logout } = useAuth();
// const pathname = usePathname();
// const sidebarW = isCollapsed ? 80 : 260;

// return (
// <>
// {/* Mobile overlay */}
// <AnimatePresence>
// {isOpen && (
// <motion.div
// initial={{ opacity: 0 }}
// animate={{ opacity: 1 }}
// exit={{ opacity: 0 }}
// onClick={closeMobileMenu}
// className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
// />
// )}
// </AnimatePresence>


// {/* Sidebar */}
//   <motion.aside
//     initial={{ x: -260 }}
//     animate={{ x: isOpen || window.innerWidth >= 1024 ? 0 : -260 }}
//     className={[
//       'fixed inset-y-0 left-0 z-30 flex flex-col',
//       'bg-surface border-r border-border-default shadow-xl',
//       'transition-all duration-300',
//       isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
//     ].join(' ')}
//     style={{
//       width: sidebarW,
//       transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)',
//     }}
//   >
//     {/* Header Logo */}
//     <div className="h-16 flex items-center justify-between px-4 border-b border-border-default shrink-0 bg-gradient-to-r from-primary/5 to-transparent">
//       <div className="flex items-center gap-3 overflow-hidden">
//         <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shrink-0 shadow-lg">
//           <Car size={20} className="text-white" />
//         </div>
//         <motion.span
//           initial={{ opacity: 0 }}
//           animate={{ opacity: isCollapsed ? 0 : 1 }}
//           transition={{ duration: 0.2 }}
//           className="text-base font-bold text-text-primary tracking-tight whitespace-nowrap"
//           style={{
//             maxWidth: isCollapsed ? 0 : 160,
//             overflow: 'hidden',
//           }}
//         >
//           Fleet<span className="text-primary">Control</span>
//         </motion.span>
//       </div>
      
//       {/* Collapse toggle (desktop) */}
//       <button
//         onClick={toggleCollapse}
//         className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-200"
//       >
//         <ChevronLeft
//           size={18}
//           style={{
//             transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
//             transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
//           }}
//         />
//       </button>
//     </div>

//     {/* Navigation */}
//     <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
//       {MENU_ITEMS.map((item, index) => {
//         const href = `/${locale}${item.path}`;
//         const active = pathname === href || pathname.startsWith(href + '/');
//         const Icon = item.icon;
        
//         return (
//           <motion.div
//             key={item.path}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: index * 0.05 }}
//           >
//             <Link
//               href={href}
//               onClick={closeMobileMenu}
//               title={isCollapsed ? t(item.labelKey, 'dashboard') : undefined}
//               className={[
//                 'flex items-center h-11 rounded-xl transition-all duration-200 group relative',
//                 isCollapsed ? 'justify-center px-0' : 'gap-3 px-3',
//                 active
//                   ? 'bg-gradient-to-r from-primary to-primary-hover text-white shadow-lg shadow-primary/20'
//                   : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover',
//               ].join(' ')}
//             >
//               {/* Active indicator */}
//               {active && !isCollapsed && (
//                 <motion.div
//                   layoutId="activeTab"
//                   className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 />
//               )}
              
//               <Icon
//                 size={20}
//                 className={[
//                   'shrink-0 transition-all duration-200',
//                   active ? 'text-white' : 'text-text-secondary group-hover:text-primary',
//                 ].join(' ')}
//               />
              
//               <motion.span
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: isCollapsed ? 0 : 1 }}
//                 transition={{ duration: 0.2 }}
//                 className={[
//                   'text-sm font-medium whitespace-nowrap overflow-hidden',
//                   active ? 'text-white' : 'text-text-primary',
//                 ].join(' ')}
//                 style={{
//                   maxWidth: isCollapsed ? 0 : 160,
//                 }}
//               >
//                 {t(item.labelKey, 'dashboard')}
//               </motion.span>

//               {/* Hover tooltip for collapsed state */}
//               {isCollapsed && (
//                 <div className="absolute left-full ml-2 px-3 py-2 bg-surface border border-border-default rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
//                   <span className="text-sm font-medium text-text-primary">
//                     {t(item.labelKey, 'dashboard')}
//                   </span>
//                   <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-surface border-l border-t border-border-default rotate-45" />
//                 </div>
//               )}
//             </Link>
//           </motion.div>
//         );
//       })}
//     </nav>

//     {/* Footer - Logout */}
//     <div className="px-3 pb-4 pt-3 border-t border-border-default shrink-0">
//       <button
//         onClick={() => {
//           logout();
//           closeMobileMenu();
//         }}
//         title={isCollapsed ? t('logout', 'common') : undefined}
//         className={[
//           'flex items-center w-full h-11 rounded-xl transition-all duration-200 group relative',
//           'text-text-secondary hover:text-error hover:bg-error/10',
//           isCollapsed ? 'justify-center px-0' : 'gap-3 px-3',
//         ].join(' ')}
//       >
//         <LogOut size={20} className="shrink-0 group-hover:translate-x-1 transition-transform" />
        
//         <motion.span
//           initial={{ opacity: 0 }}
//           animate={{ opacity: isCollapsed ? 0 : 1 }}
//           transition={{ duration: 0.2 }}
//           className="text-sm font-medium whitespace-nowrap overflow-hidden"
//           style={{
//             maxWidth: isCollapsed ? 0 : 160,
//           }}
//         >
//           {t('logout', 'common')}
//         </motion.span>

//         {/* Tooltip */}
//         {isCollapsed && (
//           <div className="absolute left-full ml-2 px-3 py-2 bg-surface border border-border-default rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
//             <span className="text-sm font-medium text-error">
//               {t('logout', 'common')}
//             </span>
//             <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-surface border-l border-t border-border-default rotate-45" />
//           </div>
//         )}
//       </button>
//     </div>

//     {/* Version badge (collapsed state) */}
//     {isCollapsed && (
//       <div className="pb-3 flex justify-center">
//         <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
//       </div>
//     )}
//   </motion.aside>

//   <style jsx global>{`
//     .custom-scrollbar::-webkit-scrollbar {
//       width: 6px;
//     }
//     .custom-scrollbar::-webkit-scrollbar-track {
//       background: transparent;
//     }
//     .custom-scrollbar::-webkit-scrollbar-thumb {
//       background: var(--border-default);
//       border-radius: 3px;
//     }
//     .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//       background: var(--text-secondary);
//     }
//   `}</style>
// </>

// );
// }

// "use client";

// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useI18n } from "@/hooks/useI18n";
// import {
//   LayoutDashboard,
//   Map,
//   Truck,
//   Users,
//   Route,
//   Bell,
//   Settings,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   Car,
//   MapPin,
//   Building2,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// interface SidebarProps {
//   isOpen: boolean; // Pour le mobile
//   isCollapsed: boolean; // Pour le mode réduit (desktop)
//   toggleCollapse: () => void;
//   closeMobileMenu: () => void;
// }

// const MENU_ITEMS = [
//   { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
//   { icon: Building2, label: "Mes Flottes", path: "/dashboard/fleets" }, // AJOUTER CECI
//   { icon: Map, label: "Live Map", path: "/dashboard/map" },
//   { icon: Truck, label: "Vehicles", path: "/dashboard/vehicles" },
//   { icon: Users, label: "Drivers", path: "/dashboard/drivers" },
//   { icon: Route, label: "Trips", path: "/dashboard/trips" }, // Vérifier si le fichier existe
//   { icon: MapPin, label: "Geofencing", path: "/admin/geofencing" },
//   { icon: Bell, label: "Alerts", path: "/dashboard/alerts" },
//   { icon: Settings, label: "Settings", path: "/dashboard/settings" },
// ];

// export function Sidebar({
//   isOpen,
//   isCollapsed,
//   toggleCollapse,
//   closeMobileMenu,
// }: SidebarProps) {
//   const { locale } = useI18n();
//   const pathname = usePathname();

//   const sidebarClasses = //         fixed inset-y-0 left-0 z-30 flex flex-col  //         bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-2xl  //         transition-all duration-300 ease-in-out //         ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} //         ${isCollapsed ? "lg:w-20" : "lg:w-72"} //         w-72 //    ;

//   return (
//     <>
//       {/* Overlay Mobile */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={closeMobileMenu}
//             className="fixed inset-0 bg-black/50 z-20 lg:hidden"
//           />
//         )}
//       </AnimatePresence>

//       <aside className={sidebarClasses}>
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-blue-700">
//           {!isCollapsed ? (
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white/10 rounded-lg">
//                 <span className="text-xl font-bold">FleetControl</span>
//               </div>
//             </div>
//           ) : (
//             <div className="w-full flex justify-center">
//               <div className="p-2 bg-white/10 rounded-lg">
//                 <Car className="w-6 h-6" />
//               </div>
//             </div>
//           )}

//           <button
//             onClick={toggleCollapse}
//             className="hidden lg:block p-1.5 rounded-lg hover:bg-white/10 transition-colors text-blue-200"
//           >
//             {isCollapsed ? (
//               <ChevronRight size={20} />
//             ) : (
//               <ChevronLeft size={20} />
//             )}
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
//           {MENU_ITEMS.map((item) => {
//             const href = /${locale}${item.path};
//             const isActive =
//               pathname === href || pathname.startsWith(href + "/");
//             const Icon = item.icon;

//             return (
//               <Link
//                 key={item.path}
//                 href={href}
//                 onClick={closeMobileMenu}
//                 className={//                                     flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 //                                     ${ //                                       isActive //                                         ? "bg-blue-700 text-white shadow-lg" //                                         : "text-blue-100 hover:text-white hover:bg-blue-700/50" //                                     } //                                     ${isCollapsed ? "justify-center" : ""} //                                }
//                 title={isCollapsed ? item.label : ""}
//               >
//                 <Icon
//                   className={w-5 h-5 ${ //                     isActive ? "text-white" : "text-blue-200" //                   }}
//                 />
//                 {!isCollapsed && (
//                   <span className="font-medium text-sm">{item.label}</span>
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer / Déconnexion */}
//         <div className="p-4 border-t border-blue-700 bg-blue-900/50">
//           <button
//             className={//                         flex items-center gap-3 w-full px-3 py-2.5 rounded-lg  //                         text-blue-100 hover:text-white hover:bg-blue-700/50 transition-colors //                         ${isCollapsed ? "justify-center" : ""} //                    }
//           >
//             <LogOut className="w-5 h-5" />
//             {!isCollapsed && (
//               <span className="text-sm font-medium">Déconnexion</span>
//             )}
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }




// "use client";

// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useI18n } from "@/hooks/useI18n";
// import {
//   LayoutDashboard, Map, Truck, Users, Route, Bell,
//   Settings, LogOut, ChevronLeft, Car, MapPin, Building2,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// interface SidebarProps {
//   isOpen: boolean;
//   isCollapsed: boolean;
//   toggleCollapse: () => void;
//   closeMobileMenu: () => void;
// }

// const MENU_ITEMS = [
//   { icon: LayoutDashboard, label: "Dashboard",   path: "/dashboard" },
//   { icon: Building2,       label: "Mes Flottes", path: "/dashboard/fleets" },
//   { icon: Map,             label: "Live Map",    path: "/dashboard/map" },
//   { icon: Truck,           label: "Vehicles",    path: "/dashboard/vehicles" },
//   { icon: Users,           label: "Drivers",     path: "/dashboard/drivers" },
//   { icon: Route,           label: "Trips",       path: "/dashboard/trips" },
//   { icon: MapPin,          label: "Geofencing",  path: "/admin/geofencing" },
//   { icon: Bell,            label: "Alerts",      path: "/dashboard/alerts" },
//   { icon: Settings,        label: "Settings",    path: "/dashboard/settings" },
// ];

// export function Sidebar({ isOpen, isCollapsed, toggleCollapse, closeMobileMenu }: SidebarProps) {
//   const { locale } = useI18n();
//   const pathname  = usePathname();
//   const sidebarW  = isCollapsed ? 80 : 260;

//   return (
//     <>
//       {/* Mobile overlay */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             onClick={closeMobileMenu}
//             className="fixed inset-0 bg-black/25 backdrop-blur-sm z-20 lg:hidden"
//           />
//         )}
//       </AnimatePresence>

//       {/* Sidebar shell /}
//       <aside
//         className={[
//           'fixed inset-y-0 left-0 z-30 flex flex-col bg-white border-r border-slate-100',
//           'shadow-[4px_0_24px_-4px_rgba(0,0,0,.08)]',
//           isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
//         ].join(' ')}
//         style={{
//           width: sidebarW,
//           transition: 'width 280ms cubic-bezier(.4,0,.2,1), transform 280ms cubic-bezier(.4,0,.2,1)',
//         }}
//       >
//         {/ Logo row */}
//         <div className="h-16 flex items-center justify-between px-3 border-b border-slate-100 shrink-0">
//           <div className="flex items-center gap-2.5 overflow-hidden">
//             <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
//               <Car size={17} className="text-white" />
//             </div>
//             <span
//               className="text-[13px] font-bold text-slate-800 tracking-tight whitespace-nowrap"
//               style={{
//                 opacity: isCollapsed ? 0 : 1,
//                 maxWidth: isCollapsed ? 0 : 160,
//                 overflow: 'hidden',
//                 transition: 'opacity 200ms ease, max-width 280ms cubic-bezier(.4,0,.2,1)',
//               }}
//             >
//               FleetControl
//             </span>
//           </div>
//           <button
//             onClick={toggleCollapse}
//             className="hidden lg:flex w-6 h-6 items-center justify-center rounded-lg text-slate-300 hover:text-slate-500 hover:bg-slate-100 transition-colors"
//           >
//             <ChevronLeft
//               size={15}
//               style={{
//                 transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
//                 transition: 'transform 280ms cubic-bezier(.4,0,.2,1)',
//               }}
//             />
//           </button>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
//           {MENU_ITEMS.map((item) => {
//             const href   = /${locale}${item.path};
//             const active = pathname === href || pathname.startsWith(href + '/');
//             const Icon   = item.icon;
//             return (
//               <Link
//                 key={item.path} href={href} onClick={closeMobileMenu}
//                 title={isCollapsed ? item.label : undefined}
//                 className={[
//                   'flex items-center h-10 px-2.5 rounded-xl transition-all duration-200 group',
//                   isCollapsed ? 'justify-center' : 'gap-3',
//                   active ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50',
//                 ].join(' ')}
//               >
//                 <Icon size={18} className={['shrink-0 transition-colors', active ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'].join(' ')} />
//                 <span
//                   className="text-[13px] font-medium whitespace-nowrap overflow-hidden"
//                   style={{
//                     opacity: isCollapsed ? 0 : 1,
//                     maxWidth: isCollapsed ? 0 : 140,
//                     transition: 'opacity 180ms ease, max-width 280ms cubic-bezier(.4,0,.2,1)',
//                   }}
//                 >
//                   {item.label}
//                 </span>
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="px-2 pb-3 pt-2 border-t border-slate-100 shrink-0">
//           <button
//             className={['flex items-center w-full h-10 px-2.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200', isCollapsed ? 'justify-center' : 'gap-3'].join(' ')}
//             title={isCollapsed ? 'Déconnexion' : undefined}
//           >
//             <LogOut size={18} className="shrink-0" />
//             <span
//               className="text-[13px] font-medium whitespace-nowrap overflow-hidden"
//               style={{ opacity: isCollapsed ? 0 : 1, maxWidth: isCollapsed ? 0 : 140, transition: 'opacity 180ms ease, max-width 280ms cubic-bezier(.4,0,.2,1)' }}
//             >
//               Déconnexion
//             </span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }













// "use client";

// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useI18n } from "@/hooks/useI18n";
// import { useAuth } from "@/contexts/AuthContext";
// import {
// LayoutDashboard, Map, Truck, Users, Route, Bell,
// Settings, LogOut, ChevronLeft, Car, MapPin, Building2,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// interface SidebarProps {
// isOpen: boolean;
// isCollapsed: boolean;
// toggleCollapse: () => void;
// closeMobileMenu: () => void;
// }

// const MENU_ITEMS = [
// { icon: LayoutDashboard, labelKey: "dashboard", path: "/dashboard" },
// { icon: Building2, labelKey: "fleets", path: "/dashboard/fleets" },
// { icon: Map, labelKey: "live_map", path: "/dashboard/map" },
// { icon: Truck, labelKey: "vehicles", path: "/dashboard/vehicles" },
// { icon: Users, labelKey: "drivers", path: "/dashboard/drivers" },
// { icon: Route, labelKey: "trips", path: "/dashboard/trips" },
// { icon: MapPin, labelKey: "geofencing", path: "/admin/geofencing" },
// { icon: Bell, labelKey: "alerts", path: "/dashboard/alerts" },
// { icon: Settings, labelKey: "settings", path: "/dashboard/settings" },
// ];

// export function Sidebar({ isOpen, isCollapsed, toggleCollapse, closeMobileMenu }: SidebarProps) {
// const { locale, t } = useI18n();
// const { logout } = useAuth();
// const pathname = usePathname();
// const sidebarW = isCollapsed ? 80 : 260;

// return (
// <>
// {/* Mobile overlay */}
// <AnimatePresence>
// {isOpen && (
// <motion.div
// initial={{ opacity: 0 }}
// animate={{ opacity: 1 }}
// exit={{ opacity: 0 }}
// onClick={closeMobileMenu}
// className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
// />
// )}
// </AnimatePresence>

// {/* Sidebar */}
//   <motion.aside
//     initial={{ x: -260 }}
//     animate={{ x: isOpen || window.innerWidth >= 1024 ? 0 : -260 }}
//     className={[
//       'fixed inset-y-0 left-0 z-30 flex flex-col',
//       'bg-surface border-r border-border-default shadow-xl',
//       'transition-all duration-300',
//       isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
//     ].join(' ')}
//     style={{
//       width: sidebarW,
//       transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)',
//     }}
//   >
//     {/* Header Logo */}
//     <div className="h-16 flex items-center justify-between px-4 border-b border-border-default shrink-0 bg-gradient-to-r from-primary/5 to-transparent">
//       <div className="flex items-center gap-3 overflow-hidden">
//         <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shrink-0 shadow-lg">
//           <Car size={20} className="text-white" />
//         </div>
//         <motion.span
//           initial={{ opacity: 0 }}
//           animate={{ opacity: isCollapsed ? 0 : 1 }}
//           transition={{ duration: 0.2 }}
//           className="text-base font-bold text-text-primary tracking-tight whitespace-nowrap"
//           style={{
//             maxWidth: isCollapsed ? 0 : 160,
//             overflow: 'hidden',
//           }}
//         >
//           Fleet<span className="text-primary">Control</span>
//         </motion.span>
//       </div>
      
//       {/* Collapse toggle (desktop) */}
//       <button
//         onClick={toggleCollapse}
//         className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-200"
//       >
//         <ChevronLeft
//           size={18}
//           style={{
//             transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
//             transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
//           }}
//         />
//       </button>
//     </div>

//     {/* Navigation */}
//     <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
//       {MENU_ITEMS.map((item, index) => {
//         const href = `/${locale}${item.path}`;
//         const active = pathname === href || pathname.startsWith(href + '/');
//         const Icon = item.icon;
        
//         return (
//           <motion.div
//             key={item.path}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: index * 0.05 }}
//           >
//             <Link
//               href={href}
//               onClick={closeMobileMenu}
//               title={isCollapsed ? t(item.labelKey, 'dashboard') : undefined}
//               className={[
//                 'flex items-center h-11 rounded-xl transition-all duration-200 group relative',
//                 isCollapsed ? 'justify-center px-0' : 'gap-3 px-3',
//                 active
//                   ? 'bg-gradient-to-r from-primary to-primary-hover text-white shadow-lg shadow-primary/20'
//                   : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover',
//               ].join(' ')}
//             >
//               {/* Active indicator */}
//               {active && !isCollapsed && (
//                 <motion.div
//                   layoutId="activeTab"
//                   className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 />
//               )}
              
//               <Icon
//                 size={20}
//                 className={[
//                   'shrink-0 transition-all duration-200',
//                   active ? 'text-white' : 'text-text-secondary group-hover:text-primary',
//                 ].join(' ')}
//               />
              
//               <motion.span
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: isCollapsed ? 0 : 1 }}
//                 transition={{ duration: 0.2 }}
//                 className={[
//                   'text-sm font-medium whitespace-nowrap overflow-hidden',
//                   active ? 'text-white' : 'text-text-primary',
//                 ].join(' ')}
//                 style={{
//                   maxWidth: isCollapsed ? 0 : 160,
//                 }}
//               >
//                 {t(item.labelKey, 'dashboard')}
//               </motion.span>

//               {/* Hover tooltip for collapsed state */}
//               {isCollapsed && (
//                 <div className="absolute left-full ml-2 px-3 py-2 bg-surface border border-border-default rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
//                   <span className="text-sm font-medium text-text-primary">
//                     {t(item.labelKey, 'dashboard')}
//                   </span>
//                   <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-surface border-l border-t border-border-default rotate-45" />
//                 </div>
//               )}
//             </Link>
//           </motion.div>
//         );
//       })}
//     </nav>

//     {/* Footer - Logout */}
//     <div className="px-3 pb-4 pt-3 border-t border-border-default shrink-0">
//       <button
//         onClick={() => {
//           logout();
//           closeMobileMenu();
//         }}
//         title={isCollapsed ? t('logout', 'common') : undefined}
//         className={[
//           'flex items-center w-full h-11 rounded-xl transition-all duration-200 group relative',
//           'text-text-secondary hover:text-error hover:bg-error/10',
//           isCollapsed ? 'justify-center px-0' : 'gap-3 px-3',
//         ].join(' ')}
//       >
//         <LogOut size={20} className="shrink-0 group-hover:translate-x-1 transition-transform" />
        
//         <motion.span
//           initial={{ opacity: 0 }}
//           animate={{ opacity: isCollapsed ? 0 : 1 }}
//           transition={{ duration: 0.2 }}
//           className="text-sm font-medium whitespace-nowrap overflow-hidden"
//           style={{
//             maxWidth: isCollapsed ? 0 : 160,
//           }}
//         >
//           {t('logout', 'common')}
//         </motion.span>

//         {/* Tooltip */}
//         {isCollapsed && (
//           <div className="absolute left-full ml-2 px-3 py-2 bg-surface border border-border-default rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
//             <span className="text-sm font-medium text-error">
//               {t('logout', 'common')}
//             </span>
//             <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-surface border-l border-t border-border-default rotate-45" />
//           </div>
//         )}
//       </button>
//     </div>

//     {/* Version badge (collapsed state) */}
//     {isCollapsed && (
//       <div className="pb-3 flex justify-center">
//         <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
//       </div>
//     )}
//   </motion.aside>

//   <style jsx global>{`
//     .custom-scrollbar::-webkit-scrollbar {
//       width: 6px;
//     }
//     .custom-scrollbar::-webkit-scrollbar-track {
//       background: transparent;
//     }
//     .custom-scrollbar::-webkit-scrollbar-thumb {
//       background: var(--border-default);
//       border-radius: 3px;
//     }
//     .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//       background: var(--text-secondary);
//     }
//   `}</style>
// </>

// );
// }









"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, Map, Truck, Users, Route, Bell,
  Settings, LogOut, ChevronLeft, Car, MapPin, Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  closeMobileMenu: () => void;
}

const MENU_ITEMS = [
  { icon: LayoutDashboard, labelKey: "dashboard", path: "/dashboard" },
  { icon: Building2, labelKey: "fleets", path: "/dashboard/fleets" },
  { icon: Map, labelKey: "live_map", path: "/dashboard/map" },
  { icon: Truck, labelKey: "vehicles", path: "/dashboard/vehicles" },
  { icon: Users, labelKey: "drivers", path: "/dashboard/drivers" },
  { icon: Route, labelKey: "trips", path: "/dashboard/trips" },
  { icon: MapPin, labelKey: "geofencing", path: "/admin/geofencing" },
  { icon: Bell, labelKey: "alerts", path: "/dashboard/alerts" },
  { icon: Settings, labelKey: "settings", path: "/dashboard/settings" },
];

export function Sidebar({ isOpen, isCollapsed, toggleCollapse, closeMobileMenu }: SidebarProps) {
  const { locale, t } = useI18n();
  const { logout } = useAuth();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const sidebarW = isCollapsed ? 80 : 260;

  // Détection mobile et auto-fermeture
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // Fermer la sidebar automatiquement sur mobile quand on réduit l'écran
      if (mobile && isOpen) {
        const sidebarElement = document.querySelector('aside');
        if (sidebarElement) {
          sidebarElement.style.transform = 'translateX(-260px)';
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Fermer la sidebar quand on clique à l'extérieur sur mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.querySelector('aside');
      const target = e.target as HTMLElement;
      
      if (isMobile && isOpen && sidebar && !sidebar.contains(target)) {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen, closeMobileMenu]);

  // Fonction pour déterminer si un item est actif
  const isItemActive = (itemPath: string) => {
    const fullPath = `/${locale}${itemPath}`;
    // Pour le dashboard, on vérifie que c'est exactement le chemin (pas les sous-pages)
    if (itemPath === "/dashboard") {
      return pathname === fullPath || pathname === `/${locale}/dashboard`;
    }
    // Pour les autres items, on vérifie si le chemin commence par le path
    return pathname.startsWith(fullPath) || pathname === fullPath;
  };

  // Fermer la sidebar sur mobile quand on clique sur un lien
  const handleLinkClick = () => {
    if (isMobile) {
      closeMobileMenu();
    }
  };

  return (
    <>
      {/* Mobile overlay - sans floutage */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: (isOpen || !isMobile) ? 0 : -sidebarW,
          width: sidebarW
        }}
        transition={{ 
          x: { type: "spring", stiffness: 300, damping: 30 },
          width: { duration: 0.3, ease: "easeInOut" }
        }}
        className={`
          fixed inset-y-0 left-0 z-30 flex flex-col
          bg-surface border-r border-border-default shadow-xl
          ${isMobile ? 'lg:hidden' : 'hidden lg:flex'}
        `}
        style={{
          width: sidebarW,
        }}
      >
        {/* Header Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border-default shrink-0 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shrink-0 shadow-lg">
              <Car size={20} className="text-white" />
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: isCollapsed ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="text-base font-bold text-text-primary tracking-tight whitespace-nowrap"
              style={{
                opacity: isCollapsed ? 0 : 1,
                width: isCollapsed ? 0 : 'auto',
                overflow: 'hidden',
              }}
            >
              Fleet<span className="text-primary">Control</span>
            </motion.span>
          </div>
          
          {/* Collapse toggle (desktop) et close button (mobile) */}
          <div className="flex items-center gap-2">
            {isMobile ? (
              <button
                onClick={closeMobileMenu}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <ChevronLeft size={18} />
              </button>
            ) : (
              <button
                onClick={toggleCollapse}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <ChevronLeft
                  size={18}
                  className="transition-transform duration-300"
                  style={{
                    transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {MENU_ITEMS.map((item, index) => {
            const href = `/${locale}${item.path}`;
            const active = isItemActive(item.path);
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={href}
                  onClick={handleLinkClick}
                  title={isCollapsed ? t(item.labelKey, 'dashboard') : undefined}
                  className={`
                    flex items-center h-11 rounded-xl transition-all duration-200 group relative
                    ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'}
                    ${active
                      ? 'bg-gradient-to-r from-primary to-primary-hover text-white shadow-lg shadow-primary/20'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                    }
                  `}
                >
                  {/* Active indicator - uniquement quand actif ET non réduit */}
                  {active && !isCollapsed && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <Icon
                    size={20}
                    className={`
                      shrink-0 transition-all duration-200
                      ${active ? 'text-white' : 'text-text-secondary group-hover:text-primary'}
                    `}
                  />
                  
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: isCollapsed ? 0 : 1,
                      width: isCollapsed ? 0 : 'auto'
                    }}
                    transition={{ duration: 0.2 }}
                    className={`
                      text-sm font-medium whitespace-nowrap overflow-hidden
                      ${active ? 'text-white' : 'text-text-primary'}
                    `}
                  >
                    {t(item.labelKey, 'dashboard')}
                  </motion.span>

                  {/* Hover tooltip pour état réduit */}
                  {isCollapsed && !isMobile && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-surface border border-border-default rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                      <span className="text-sm font-medium text-text-primary">
                        {t(item.labelKey, 'dashboard')}
                      </span>
                      <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-surface border-l border-t border-border-default rotate-45" />
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer - Logout */}
        <div className="px-3 pb-4 pt-3 border-t border-border-default shrink-0">
          <button
            onClick={() => {
              logout();
              closeMobileMenu();
            }}
            title={isCollapsed ? t('logout', 'common') : undefined}
            className={`
              flex items-center w-full h-11 rounded-xl transition-all duration-200 group relative
              text-text-secondary hover:text-error hover:bg-error/10
              ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'}
            `}
          >
            <LogOut size={20} className="shrink-0 group-hover:translate-x-1 transition-transform" />
            
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isCollapsed ? 0 : 1,
                width: isCollapsed ? 0 : 'auto'
              }}
              transition={{ duration: 0.2 }}
              className="text-sm font-medium whitespace-nowrap overflow-hidden"
            >
              {t('logout', 'common')}
            </motion.span>

            {/* Tooltip pour état réduit */}
            {isCollapsed && !isMobile && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-surface border border-border-default rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                <span className="text-sm font-medium text-error">
                  {t('logout', 'common')}
                </span>
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-surface border-l border-t border-border-default rotate-45" />
              </div>
            )}
          </button>
        </div>

        {/* Version badge (collapsed state) */}
        {isCollapsed && (
          <div className="pb-3 flex justify-center">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          </div>
        )}
      </motion.aside>

      {/* Style pour le scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border-default);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--text-secondary);
        }
      `}</style>
    </>
  );
}