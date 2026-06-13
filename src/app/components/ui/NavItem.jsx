'use client';

import Link from 'next/link';

export const NavItem = ({ href, icon, label, description, isActive, onClick }) => {
  return (
    <Link href={href}>
      <button
        onClick={onClick}
        className={`
          w-full px-4 py-3 rounded-lg transition-all duration-200 ease-in-out
          flex items-center gap-3 text-left
          ${
            isActive
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100'
          }
        `}
        aria-current={isActive ? 'page' : undefined}
        title={description}
      >
        <span className="text-xl shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{label}</p>
          <p className={`text-xs truncate ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
            {description}
          </p>
        </div>
      </button>
    </Link>
  );
};
