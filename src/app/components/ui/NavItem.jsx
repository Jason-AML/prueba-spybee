'use client';

import Link from 'next/link';

export const NavItem = ({ href, label, isActive, onClick }) => {
  return (
    <Link href={href}>
      <button
        onClick={onClick}
        className={`
          w-full px-4 py-3 cursor-pointer rounded-lg transition-all duration-200 ease-in-out
          flex items-center gap-3 text-left
          ${
            isActive
              ? 'bg-gray-700 text-white shadow-md'
              : 'text-[#4d4636] hover:text-[#765a00]'
          }
        `}
        aria-current={isActive ? 'page' : undefined}
        title={label}
      >
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{label}</p>
        </div>
      </button>
    </Link>
  );
};
