'use client';

import { usePathname } from 'next/navigation';
import { navigationItems } from '@/app/config/navigationConfig';

export const useNavigation = () => {
  const pathname = usePathname();

  const isActive = (itemHref) => {
    return pathname === itemHref || pathname.startsWith(itemHref + '/');
  };

  const getCurrentItem = () => {
    return navigationItems.find((item) => isActive(item.href));
  };

  return {
    navigationItems,
    pathname,
    isActive,
    getCurrentItem,
  };
};
