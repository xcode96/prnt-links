import React from 'react';
import { CATEGORIES } from '../constants';
import { ShuffleIcon } from './icons';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onDiscover: () => void;
  totalCount: number;
  filteredCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onDiscover,
  totalCount,
  filteredCount
}) => {
  return (
    <section className="py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search resources by title or domain..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg py-3 pl-10 pr-4 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all font-roboto-mono"
            aria-label="Search resources"
          />
          <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex items-center space-x-4">
            <button
                onClick={onDiscover}
                className="flex-shrink-0 w-full md:w-auto flex items-center justify-center space-x-2 px-4 py-3 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-sky-300 hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors"
                aria-label="Discover a random resource"
                >
                <ShuffleIcon className="w-5 h-5" />
                <span>Discover</span>
            </button>
            <div className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left font-roboto-mono flex-shrink-0">
                <p>Showing <span className="font-bold text-sky-600 dark:text-sky-400">{filteredCount}</span> of <span className="font-bold text-sky-600 dark:text-sky-400">{totalCount}</span></p>
            </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 font-orbitron uppercase tracking-wider">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-3 py-1.5 rounded-md transition-all duration-200 text-sm font-medium border-2 font-roboto-mono ${
                selectedCategory === category
                  ? 'bg-sky-600 border-sky-600 text-white font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-600 dark:text-sky-200 border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/60 hover:border-slate-400 dark:hover:border-slate-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;