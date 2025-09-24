import React from 'react';
import { SunIcon, MoonIcon, LogoIcon, DashboardIcon, ListIcon } from './icons';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentView: 'hub' | 'dashboard';
  setCurrentView: (view: 'hub' | 'dashboard') => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, currentView, setCurrentView }) => {
  return (
    <header className="py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-6">
           <div className="flex items-center space-x-2 text-slate-800 dark:text-white">
                <LogoIcon className="w-8 h-8 text-cyan-500" />
                <span className="text-xl font-bold">CyberSec Hub</span>
           </div>
           <div className="hidden md:flex items-center space-x-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-lg">
                <button
                    onClick={() => setCurrentView('hub')}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-semibold transition-colors ${
                        currentView === 'hub' ? 'bg-white dark:bg-slate-950 shadow-sm text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-700/50'
                    }`}
                >
                    <ListIcon className="w-5 h-5"/>
                    <span>Hub</span>
                </button>
                 <button
                    onClick={() => setCurrentView('dashboard')}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-semibold transition-colors ${
                        currentView === 'dashboard' ? 'bg-white dark:bg-slate-950 shadow-sm text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-700/50'
                    }`}
                >
                    <DashboardIcon className="w-5 h-5"/>
                    <span>Dashboard</span>
                </button>
           </div>
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
    </header>
  );
};

export default Header;
