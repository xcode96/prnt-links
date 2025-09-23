import React from 'react';
import { SunIcon, MoonIcon } from './icons';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="py-6 flex justify-between items-center border-b border-slate-200 dark:border-slate-800">
      <div className="text-left">
        <h1 className="text-3xl md:text-4xl font-bold font-orbitron tracking-wide text-slate-900 dark:text-white dark:text-glow">
          CyberSec Resource Hub
        </h1>
        <p className="text-slate-500 dark:text-sky-300 mt-2 text-base font-roboto-mono">
          A curated collection of cybersecurity knowledge.
        </p>
      </div>
      <button
        onClick={toggleTheme}
        className="relative p-2 w-16 h-9 flex items-center bg-slate-200 dark:bg-slate-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-900 transition-colors duration-300"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <div
          className={`absolute left-1 top-1 w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
            theme === 'dark' ? 'translate-x-[28px]' : 'translate-x-0'
          }`}
        ></div>
        <div className="w-full flex justify-between px-1.5">
           <SunIcon className={`w-5 h-5 transition-colors duration-300 ${theme === 'light' ? 'text-yellow-500' : 'text-slate-400'}`} />
           <MoonIcon className={`w-5 h-5 transition-colors duration-300 ${theme === 'dark' ? 'text-yellow-400' : 'text-slate-500'}`} />
        </div>
      </button>
    </header>
  );
};

export default Header;