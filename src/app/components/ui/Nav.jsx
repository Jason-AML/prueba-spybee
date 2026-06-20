"use client";

import { useNavigation } from "@/app/hooks/useNavigation";
import { useAuth } from "@/context/AuthContext";
import { UserMenu } from "./UserMenu";
import { NavItem } from "./NavItem";
import Image from "next/image";

export const Nav = () => {
  const { navigationItems, isActive } = useNavigation();
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-[#15171B] border-b-[0.5px] border-[#2A2D32] flex items-center justify-between w-full mx-auto p-4">
      <div>
        <Image
          src="/logo_spybee.png"
          width={100}
          height={60}
          alt="logo spybee"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex gap-2">
          {navigationItems.map((item) => (
            <NavItem
              key={item.id}
              href={item.href}
              icon={item.icon}
              label={item.label}
              description={item.description}
              isActive={isActive(item.href)}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Notificaciones"
          className="text-[#8E9094] hover:text-[#85B7EB] transition-colors"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            notifications
          </span>
        </button>
        <UserMenu userName={user?.email?.split("@")[0] ?? "Usuario"} />
      </div>
    </nav>
  );
};
