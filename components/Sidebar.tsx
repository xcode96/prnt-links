import React from 'react';
import { CATEGORIES } from '../constants';
import { ShuffleIcon, PlusIcon } from './icons';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onDiscover: () => void;
  onSubmit: () => void;
  totalCount: number;
  filteredCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onDiscover,
  onSubmit,
  totalCount,
  filteredCount
}) => {
  return (
    <section className="py-6 space-y-6 border-t border-b border-slate-200 dark:border-slate-800/50">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by title, domain, or #tag..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg py-3 pl-10 pr-4 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-mono text-sm"
            aria-label="Search resources"
          />
          <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="grid grid-cols-2 md:flex items-center gap-2 md:space-x-2">
            <button
                onClick={onSubmit}
                className="flex-shrink-0 w-full md:w-auto flex items-center justify-center space-x-2 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 border border-cyan-500 rounded-lg text-sm font-semibold text-white transition-colors"
                aria-label="Submit a new resource"
                >
                <PlusIcon className="w-5 h-5" />
                <span>Submit</span>
            </button>
             <button
                onClick={onDiscover}
                className="flex-shrink-0 w-full md:w-auto flex items-center justify-center space-x-2 px-4 py-3 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors"
                aria-label="Discover a random resource"
                >
                <ShuffleIcon className="w-5 h-5" />
                <span>Discover</span>
            </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 text-xs font-semibold font-mono ${
                selectedCategory === category
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                  : 'text-slate-600 dark:text-slate-300 bg-slate-200/60 dark:bg-slate-800/60 hover:bg-slate-300/60 dark:hover:bg-slate-700/60'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 text-left sm:text-right font-mono flex-shrink-0">
            <p>Showing <span className="font-bold text-cyan-600 dark:text-cyan-400">{filteredCount}</span> of <span className="font-bold text-cyan-600 dark:text-cyan-400">{totalCount}</span></p>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
