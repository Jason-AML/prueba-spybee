'use client';


import { UserMenu } from './UserMenu';

export const Header = ({ title = 'Dashboard', onMenuToggle }) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 h-16">
        {/* Botón de menú móvil y título */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>

        {/* Menú de usuario */}
        <UserMenu userName="Admin" />
      </div>
    </header>
  );
};
