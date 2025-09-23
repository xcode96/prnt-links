import React from 'react';
import { Resource } from '../types';
import { StarIcon } from './icons';

interface LinkCardProps {
  resource: Resource;
  description?: string;
  tags?: string[];
  isLoadingDetails?: boolean;
  isSaved: boolean;
  onToggleSave: (id: number) => void;
}

const CATEGORY_COLORS: { [key: string]: string } = {
  'Recon & OSINT':           'bg-cyan-500',
  'Exploitation & Pentesting':'bg-fuchsia-500',
  'Web Security (WebSec)':   'bg-yellow-500',
  'Red Teaming & C2':        'bg-red-500',
  'Windows Security':        'bg-blue-500',
  'Linux Security':          'bg-orange-500',
  'Malware Analysis & RE':   'bg-rose-500',
  'Wireless & Network':      'bg-teal-500',
  'Cheatsheets & Resources': 'bg-lime-500',
  'Other':                   'bg-indigo-500',
  'Saved':                   'bg-amber-500',
};

const LinkCard: React.FC<LinkCardProps> = ({ resource, description, tags, isLoadingDetails, isSaved, onToggleSave }) => {
  const categoryColor = CATEGORY_COLORS[resource.category] || CATEGORY_COLORS['Other'];

  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full group">
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
            <div className="flex-1 pr-4">
                 <span className={`inline-block w-3 h-0.5 ${categoryColor} mr-2`}></span>
                 <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{resource.category}</span>
            </div>
            <button 
                onClick={() => onToggleSave(resource.id)}
                className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-amber-500 dark:hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-full transition-colors duration-200"
                aria-label={isSaved ? 'Unsave resource' : 'Save resource'}
            >
                <StarIcon className={`w-6 h-6 transition-all duration-200 ${isSaved ? 'text-amber-500 dark:text-amber-400 fill-current' : ''}`} />
            </button>
        </div>

        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-sm block flex-grow">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200 mb-2">
            {resource.title}
          </h3>
          <div className="text-sm text-slate-600 dark:text-slate-400 flex-grow font-sans">
            {isLoadingDetails ? (
              <div className="space-y-2 animate-pulse mt-1">
                <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-full"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-5/6"></div>
              </div>
            ) : (
              <p className="line-clamp-3">{description || 'No description available.'}</p>
            )}
          </div>
        </a>

        <div className="mt-4">
             {isLoadingDetails && !tags ? (
                <div className="flex flex-wrap gap-2 animate-pulse">
                    <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700/50 rounded-full"></div>
                    <div className="h-5 w-20 bg-slate-200 dark:bg-slate-700/50 rounded-full"></div>
                </div>
             ) : (
                <div className="flex flex-wrap gap-2">
                {tags?.map(tag => (
                    <span key={tag} className="bg-slate-100 dark:bg-slate-800/80 text-cyan-700 dark:text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full font-mono">
                        #{tag}
                    </span>
                ))}
                </div>
             )}
        </div>
      </div>
      <div className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 px-5 py-3 flex justify-between items-center text-xs rounded-b-xl">
        <span className="font-mono text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200 truncate pr-2">
          {resource.domain}
        </span>
      </div>
    </div>
  );
};

export default LinkCard;
