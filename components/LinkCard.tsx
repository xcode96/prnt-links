import React from 'react';
import { Resource } from '../types';
import { StarIcon } from './icons';

interface LinkCardProps {
  resource: Resource;
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
  'Saved':                   'bg-slate-500'
};

const LinkCard: React.FC<LinkCardProps> = ({ resource, isSaved, onToggleSave }) => {
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
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-yellow-500 dark:hover:text-yellow-400 rounded-full transition-colors"
                aria-label={isSaved ? 'Unsave resource' : 'Save resource'}
            >
                <StarIcon className={`w-5 h-5 ${isSaved ? 'fill-current text-yellow-400' : ''}`} />
            </button>
        </div>

        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-sm block flex-grow">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200">
            {resource.title}
          </h3>
        </a>
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
