"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "../ui/Sidebar";
import { Header } from "../ui/Header";

export const DashboardLayout = ({ children, pageTitle = "Dashboard" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const body = document.body;
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateBodyScroll = () => {
      if (isSidebarOpen && mediaQuery.matches) {
        body.classList.add("overflow-hidden");
      } else {
        body.classList.remove("overflow-hidden");
      }
    };

    updateBodyScroll();
    mediaQuery.addEventListener?.("change", updateBodyScroll);

    return () => {
      body.classList.remove("overflow-hidden");
      mediaQuery.removeEventListener?.("change", updateBodyScroll);
    };
  }, [isSidebarOpen]);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen relative">
      {/* Overlay para móvil cuando sidebar está abierto */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar + Main Content Wrapper */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Contenedor principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header title={pageTitle} onMenuToggle={handleMenuToggle} />
          {/* Contenido principal */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};
