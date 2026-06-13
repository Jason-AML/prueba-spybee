'use client';

import { useState } from 'react';
import Link from 'next/link';
import { userMenuItems } from '@/app/config/navigationConfig';

export const UserMenu = ({ userName = 'Usuario' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
          {userName.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-gray-700">{userName}</span>
        <span className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {userMenuItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
