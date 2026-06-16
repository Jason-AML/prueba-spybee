'use client';

import { useNavigation } from '@/app/hooks/useNavigation';
import { NavItem } from './NavItem';
import Image from 'next/image';

export const Sidebar = ({ isOpen = true }) => {
  const { navigationItems, isActive } = useNavigation();

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen bg-white border-r border-gray-200 shadow-sm
        transition-all duration-300 ease-in-out z-40
        overflow-hidden flex flex-col
        ${isOpen ? 'w-64' : 'w-0'}
         md:sticky md:w-64 md:left-auto md:top-auto
      `}
    >
      {/* Header de la sidebar */}
      <div className="p-6 border-b border-gray-200 shrink-0">
        <Image
        src="/logo_spybee.webp"
        alt="Logo spybee"
        width={100}
        height={100}
        />
        <p className="text-xs text-gray-500 mt-1">Dashboard Control</p>
      </div>

      {/* Items de navegación */}
      <nav className="p-4 space-y-2 overflow-y-auto flex-1">
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
      </nav>

      {/* Footer de la sidebar */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 shrink-0">
        <p className="text-xs text-gray-500 text-center">v1.0.0</p>
      </div>
    </aside>
  );
};
