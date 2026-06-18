"use client";

import { useNavigation } from "@/app/hooks/useNavigation";
import { UserMenu } from "./UserMenu";
import { NavItem } from "./NavItem";
import Image from "next/image";
export const Nav = () => {
  const { navigationItems, isActive } = useNavigation();
  return (
    
      <nav className="sticky top-0 z-50 bg-surface/80  backdrop-blur-xl flex items-center justify-between w-full  mx-auto p-4">
        <div className="text-headline-md font-headline-md font-semibold text-on-surface">
          <Image
          src="/logo_spybee.png"
          width={100}
          height={60}
          alt="logo spybee"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex  gap-2">
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
          <button className="material-symbols-outlined text-[#4d4636] hover:text-[#765a00] transition-colors">
            notifications
          </button>
          <UserMenu userName="Admin" />
        </div>
      </nav>
  );
};
