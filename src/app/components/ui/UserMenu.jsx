"use client";

import { useState } from "react";
import { signOut } from "@/services/auth/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      router.push("/login");
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
          <span className="material-symbols-outlined">person</span>
        </div>
        <span className="text-sm font-medium text-gray-700">{user?.email}</span>
        <span
          className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <button
            className="cursor-pointer w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={handleLogout}
          >
            {loading ? "Cerrando..." : "Cerrar Sesión"}
          </button>
        </div>
      )}
    </div>
  );
};
