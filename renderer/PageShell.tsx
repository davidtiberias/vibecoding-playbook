// renderer/PageShell.tsx
import React, { useState, useEffect } from "react";
import type { PageContext } from "vike/types";
import { PageContextProvider } from "./usePageContext";
import { NAV_ITEMS, NavItem } from "../src/config/navigation";
import { getActiveView } from "../src/utils/navigation";

// --- Reusable Nav Components ---

const NavLink = ({
  item,
  isActive,
  isDark,
}: {
  item: NavItem;
  isActive: boolean;
  isDark: boolean;
}) => {
  const baseText = isDark
    ? "text-slate-400 hover:text-indigo-400"
    : "text-slate-600 hover:text-indigo-600";
  const activeBg = isDark
    ? "bg-slate-800 text-indigo-400 shadow-none ring-1 ring-slate-700"
    : "bg-white text-indigo-600 shadow-sm";

  return (
    <a
      href={`/vibecoding-playbook${item.href}`}
      className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${
        isActive ? activeBg : baseText
      }`}
    >
      {item.label}
    </a>
  );
};

const MobileNavBtn = ({
  item,
  isActive,
  isDark,
}: {
  item: NavItem;
  isActive: boolean;
  isDark: boolean;
}) => {
  const activeColor = isDark ? "text-indigo-400" : "text-indigo-600";
  const inactiveColor = isDark ? "text-slate-500" : "text-slate-400";

  return (
    <a
      href={`/vibecoding-playbook${item.href}`}
      className={`flex flex-col items-center gap-1 ${
        isActive ? activeColor : inactiveColor
      }`}
    >
      <span className="material-symbols-outlined">{item.icon}</span>
      <span className="text-[10px] font-bold uppercase">{item.label}</span>
    </a>
  );
};

export function PageShell({
  children,
  pageContext,
}: {
  children: React.ReactNode;
  pageContext: PageContext;
}) {
  const urlPathname =
    pageContext.urlPathname ??
    (typeof window !== "undefined" ? window.location.pathname : "/");
  const activeView = getActiveView(urlPathname);

  // --- THEME & LAYOUT LOGIC ---
  const isDark = activeView === "monetization";

  // Dynamic max-width for Monetization page vs others
  const containerWidthClass = isDark ? "max-w-7xl" : "max-w-7xl";
  const bgClass = isDark ? "bg-slate-950" : "bg-slate-50";
  const headerClass = isDark
    ? "bg-slate-950 border-slate-800"
    : "bg-white border-slate-200";
  const textClass = isDark ? "text-white" : "text-slate-900";
  const subTextClass = isDark ? "text-slate-500" : "text-slate-500";
  const navContainerClass = isDark
    ? "bg-slate-900 border-slate-800"
    : "bg-slate-100 border-slate-200";
  const footerClass = isDark
    ? "bg-slate-950 border-slate-800"
    : "bg-white border-slate-200";
  const mobileNavClass = isDark
    ? "bg-slate-900/90 border-slate-800"
    : "bg-white/90 border-slate-200";
  const footerTextClass = "text-slate-400";

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <div
          className={`min-h-screen flex flex-col relative transition-colors duration-500 ${bgClass}`}
        >
          {/* Header */}
          <header
            className={`border-b sticky top-0 z-50 transition-colors duration-500 ${headerClass}`}
          >
            <div
              className={`${containerWidthClass} mx-auto px-4 min-h-16 py-2 flex items-center justify-between transition-all duration-500`}
            >
              <a
                href="/vibecoding-playbook/"
                className="flex items-center gap-3 shrink-0"
              >
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                  <span className="material-symbols-outlined font-bold">
                    hub
                  </span>
                </div>
                <div>
                  <h1 className={`font-bold leading-tight ${textClass}`}>
                    Vibecoding Playbook
                  </h1>
                  <p
                    className={`text-xs font-medium tracking-tight ${subTextClass}`}
                  >
                    DOCUMENTATION V2.1
                  </p>
                </div>
              </a>

              {/* Desktop Navigation */}
              <nav
                className={`hidden md:flex items-center gap-1 p-1 rounded-lg border transition-colors duration-500 ${navContainerClass}`}
              >
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.id}
                    item={item}
                    isActive={activeView === item.id}
                    isDark={isDark}
                  />
                ))}
              </nav>
            </div>
          </header>

          {/* Main Content Area */}
          {children}

          {/* Mobile Navigation Bar */}
          <nav
            className={`md:hidden fixed bottom-4 left-4 right-4 backdrop-blur-md border p-2 rounded-2xl shadow-2xl flex items-center justify-around z-50 transition-colors duration-500 ${mobileNavClass}`}
          >
            {NAV_ITEMS.map((item) => (
              <MobileNavBtn
                key={item.id}
                item={item}
                isActive={activeView === item.id}
                isDark={isDark}
              />
            ))}
          </nav>

          {/* Footer - Updated with your specific content and dynamic classes */}
          <footer
            className={`py-3 border-t mt-12 transition-colors duration-500 ${footerClass}`}
          >
            <div className={`${containerWidthClass} mx-auto px-4 text-center`}>
              <p
                className={`${footerTextClass} text-xs font-medium tracking-wider uppercase`}
              >
                Built 99.99% with LLMs. My part? Vibe check.
              </p>
              <p
                className={`${footerTextClass} text-xs font-light tracking-wider uppercase`}
              >
                © 2025 DAVIDTIBERIAS. All rights reserved.
              </p>
            </div>
          </footer>

          {/* Floating Action Buttons - Updated with your specific classes */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`hidden sm:flex fixed bottom-24 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-[100] group ${
              showBackToTop
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10 pointer-events-none"
            }`}
            title="Back to Top"
          >
            <span className="material-symbols-outlined text-xl">
              arrow_upward
            </span>
          </button>

          {/* Portfolio Link */}
          <a
            href="https://davidtiberias.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-[100] group"
            title="Visit Portfolio"
          >
            <span className="material-symbols-outlined text-2xl">person</span>
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-slate-700">
              Visit David Tiberias
            </span>
          </a>
        </div>
      </PageContextProvider>
    </React.StrictMode>
  );
}
