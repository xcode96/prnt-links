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
    <aside className="w-full md:w-64 lg:w-72 bg-black/20 backdrop-blur-sm p-4 md:p-6 flex-shrink-0 md:h-screen md:sticky md:top-[117px]">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-black/30 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          aria-label="Search resources"
        />
        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <h2 className="text-lg font-semibold text-cyan-300 mb-3 font-mono">Categories</h2>
      <ul className="space-y-2">
        {CATEGORIES.map((category) => (
          <li key={category}>
            <button
              onClick={() => onSelectCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center text-xs text-gray-400">
        <p>Showing <span className="font-bold text-cyan-300">{filteredCount}</span> of <span className="font-bold text-cyan-300">{totalCount}</span> resources</p>
      </div>
    </aside>
  );
};

export default Sidebar;