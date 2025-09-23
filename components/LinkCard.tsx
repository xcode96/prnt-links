import React from 'react';
import { Resource } from '../types';
import { StarIcon } from './icons';

interface LinkCardProps {
  resource: Resource;
  description?: string;
  isLoadingDescription?: boolean;
  isSaved: boolean;
  onToggleSave: (id: number) => void;
}

const CATEGORY_COLORS: { [key: string]: { border: string; text: string; bg: string; } } = {
  'Recon & OSINT':           { border: 'border-cyan-500',   text: 'text-cyan-600 dark:text-cyan-400',     bg: 'bg-cyan-100 dark:bg-cyan-900/50' },
  'Exploitation & Pentesting':{ border: 'border-fuchsia-500',text: 'text-fuchsia-600 dark:text-fuchsia-400', bg: 'bg-fuchsia-100 dark:bg-fuchsia-900/50'},
  'Web Security (WebSec)':   { border: 'border-yellow-500', text: 'text-yellow-600 dark:text-yellow-400',   bg: 'bg-yellow-100 dark:bg-yellow-900/50' },
  'Red Teaming & C2':        { border: 'border-red-500',    text: 'text-red-600 dark:text-red-400',      bg: 'bg-red-100 dark:bg-red-900/50' },
  'Windows Security':        { border: 'border-blue-500',   text: 'text-blue-600 dark:text-blue-400',     bg: 'bg-blue-100 dark:bg-blue-900/50' },
  'Linux Security':          { border: 'border-orange-500', text: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/50' },
  'Malware Analysis & RE':   { border: 'border-rose-500',   text: 'text-rose-600 dark:text-rose-400',     bg: 'bg-rose-100 dark:bg-rose-900/50' },
  'Wireless & Network':      { border: 'border-teal-500',   text: 'text-teal-600 dark:text-teal-400',     bg: 'bg-teal-100 dark:bg-teal-900/50' },
  'Cheatsheets & Resources': { border: 'border-lime-500',   text: 'text-lime-600 dark:text-lime-400',     bg: 'bg-lime-100 dark:bg-lime-900/50' },
  'Other':                   { border: 'border-indigo-500', text: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/50' },
  'Saved':                   { border: 'border-amber-500', text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/50' },
};

const LinkCard: React.FC<LinkCardProps> = ({ resource, description, isLoadingDescription, isSaved, onToggleSave }) => {
  const colors = CATEGORY_COLORS[resource.category] || CATEGORY_COLORS['Other'];

  return (
    <div className={`flex flex-col bg-white dark:bg-slate-800/70 border-l-4 ${colors.border} rounded-r-lg shadow-md hover:shadow-xl transition-all duration-300 h-full group dark:shadow-slate-900/50`}>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-sm block pr-4 flex-1">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-200">
                {resource.title}
              </h3>
            </a>
            <button 
                onClick={() => onToggleSave(resource.id)}
                className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-amber-500 dark:hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-full transition-colors duration-200"
                aria-label={isSaved ? 'Unsave resource' : 'Save resource'}
            >
                <StarIcon className={`w-6 h-6 transition-all duration-200 ${isSaved ? 'text-amber-500 dark:text-amber-400 fill-current' : 'fill-transparent'}`} />
            </button>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400 flex-grow font-roboto-mono">
          {isLoadingDescription && !description ? (
            <div className="space-y-2 animate-pulse mt-1">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            </div>
          ) : (
            <p className="line-clamp-4">{description || 'No description available.'}</p>
          )}
        </div>
      </div>
      <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800/80 px-5 py-3 flex justify-between items-center text-xs">
        <span className="font-roboto-mono text-slate-500 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-200 truncate pr-2">
          {resource.domain}
        </span>
        <span className={`${colors.bg} ${colors.text} font-semibold py-1 px-2.5 rounded-md whitespace-nowrap`}>
          {resource.category}
        </span>
      </div>
    </div>
  );
};

export default LinkCard;