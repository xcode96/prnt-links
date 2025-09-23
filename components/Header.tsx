import React from 'react';
import { SunIcon, MoonIcon, ListIcon, DashboardIcon, LogoIcon } from './icons';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  view: 'Hub' | 'Dashboard';
  setView: (view: 'Hub' | 'Dashboard') => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, view, setView }) => {
  const NavButton: React.FC<{
    targetView: 'Hub' | 'Dashboard';
    children: React.ReactNode;
  }> = ({ targetView, children }) => {
    const isActive = view === targetView;
    return (
      <button
        onClick={() => setView(targetView)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ${
          isActive
            ? 'bg-cyan-500/10 text-cyan-500'
            : 'text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        {children}
      </button>
    );
  };

  return (
    <header className="py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-6">
           <div className="flex items-center space-x-2 text-slate-800 dark:text-white">
                <LogoIcon className="w-8 h-8 text-cyan-500" />
                <span className="text-xl font-bold">CyberSec Hub</span>
           </div>
           <nav className="hidden md:flex items-center space-x-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                <NavButton targetView="Hub"><ListIcon className="w-5 h-5" /><span>Hub</span></NavButton>
                <NavButton targetView="Dashboard"><DashboardIcon className="w-5 h-5" /><span>Dashboard</span></NavButton>
           </nav>
        </div>
        
        <div className="flex items-center">
            <button
                onClick={toggleTheme}
                className="relative p-2 w-16 h-9 flex items-center bg-slate-200 dark:bg-slate-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-slate-950 transition-colors duration-300"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
                <div
                className={`absolute left-1 top-1 w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                    theme === 'dark' ? 'translate-x-[28px]' : 'translate-x-0'
                }`}
                ></div>
                <div className="w-full flex justify-between px-1.5">
                <SunIcon className={`w-5 h-5 transition-colors duration-300 ${theme === 'light' ? 'text-yellow-500' : 'text-slate-400'}`} />
                <MoonIcon className={`w-5 h-5 transition-colors duration-300 ${theme === 'dark' ? 'text-cyan-400' : 'text-slate-500'}`} />
                </div>
            </button>
        </div>
      </div>
       <nav className="md:hidden flex items-center space-x-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg mt-4">
            <NavButton targetView="Hub"><ListIcon className="w-5 h-5" /><span>Hub</span></NavButton>
            <NavButton targetView="Dashboard"><DashboardIcon className="w-5 h-5" /><span>Dashboard</span></NavButton>
       </nav>
    </header>
  );
};

export default Header;
