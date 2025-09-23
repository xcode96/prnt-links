import React from 'react';
import { CATEGORIES } from '../constants';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  filteredCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount
}) => {
  return (
    <section className="py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <div className="relative flex-grow mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search resources by title or domain..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#1e1b4b]/50 border border-blue-800 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-roboto-mono"
            aria-label="Search resources"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="text-sm text-gray-400 text-center md:text-left font-roboto-mono">
          <p>Showing <span className="font-bold text-yellow-300">{filteredCount}</span> of <span className="font-bold text-yellow-300">{totalCount}</span></p>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-400 mb-3 font-orbitron uppercase tracking-wider">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-3 py-1.5 rounded-md transition-all duration-200 text-sm font-medium border-2 font-roboto-mono ${
                selectedCategory === category
                  ? 'bg-yellow-400 border-yellow-400 text-indigo-900 font-bold shadow-md shadow-yellow-400/20'
                  : 'text-blue-300 border-blue-900 bg-indigo-900/50 hover:bg-indigo-800/60 hover:border-blue-700'
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