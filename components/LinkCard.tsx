import React from 'react';
import { Resource } from '../types';

interface LinkCardProps {
  resource: Resource;
  description?: string;
  isLoadingDescription?: boolean;
}

const CATEGORY_COLORS: { [key: string]: { border: string; text: string; bg: string; domain: string; } } = {
  'Recon & OSINT':           { border: 'border-cyan-500',   text: 'text-cyan-400',   bg: 'bg-cyan-900/50',   domain: 'group-hover:text-cyan-400' },
  'Exploitation & Pentesting':{ border: 'border-fuchsia-500',text: 'text-fuchsia-400',bg: 'bg-fuchsia-900/50',domain: 'group-hover:text-fuchsia-400'},
  'Web Security (WebSec)':   { border: 'border-yellow-500', text: 'text-yellow-400', bg: 'bg-yellow-900/50', domain: 'group-hover:text-yellow-400' },
  'Red Teaming & C2':        { border: 'border-red-500',    text: 'text-red-400',    bg: 'bg-red-900/50',    domain: 'group-hover:text-red-400' },
  'Windows Security':        { border: 'border-blue-500',   text: 'text-blue-400',   bg: 'bg-blue-900/50',   domain: 'group-hover:text-blue-400' },
  'Linux Security':          { border: 'border-orange-500', text: 'text-orange-400', bg: 'bg-orange-900/50', domain: 'group-hover:text-orange-400' },
  'Malware Analysis & RE':   { border: 'border-rose-500',   text: 'text-rose-400',   bg: 'bg-rose-900/50',   domain: 'group-hover:text-rose-400' },
  'Wireless & Network':      { border: 'border-teal-500',   text: 'text-teal-400',   bg: 'bg-teal-900/50',   domain: 'group-hover:text-teal-400' },
  'Cheatsheets & Resources': { border: 'border-lime-500',   text: 'text-lime-400',   bg: 'bg-lime-900/50',   domain: 'group-hover:text-lime-400' },
  'Other':                   { border: 'border-indigo-500', text: 'text-indigo-400', bg: 'bg-indigo-900/50', domain: 'group-hover:text-indigo-400' },
};

const LinkCard: React.FC<LinkCardProps> = ({ resource, description, isLoadingDescription }) => {
  const colors = CATEGORY_COLORS[resource.category] || CATEGORY_COLORS['Other'];

  return (
    <div className={`flex flex-col bg-indigo-950/60 border ${colors.border}/50 rounded-lg overflow-hidden transition-all duration-300 h-full group hover:border-${colors.border.split('-')[1]}-500/100 hover:shadow-2xl hover:shadow-fuchsia-900/40 hover:-translate-y-1`}>
      <div className="p-5 flex-grow flex flex-col">
        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="focus:outline-none focus:ring-2 focus:ring-fuchsia-500 rounded-md block mb-3">
          <h3 className={`text-lg font-bold text-gray-100 group-hover:${colors.text} transition-colors duration-200 line-clamp-2`}>
            {resource.title}
          </h3>
        </a>
        <div className="text-sm text-gray-300 flex-grow font-roboto-mono">
          {isLoadingDescription && !description ? (
            <div className="space-y-2 animate-pulse mt-1">
              <div className="h-4 bg-indigo-800/50 rounded w-full"></div>
              <div className="h-4 bg-indigo-800/50 rounded w-5/6"></div>
              <div className="h-4 bg-indigo-800/50 rounded w-3/4"></div>
            </div>
          ) : (
            <p className="line-clamp-4 opacity-80">{description || 'No description available.'}</p>
          )}
        </div>
      </div>
      <div className={`bg-black/20 border-t ${colors.border}/50 px-5 py-3 flex justify-between items-center text-xs`}>
        <span className={`font-roboto-mono text-gray-500 truncate pr-2 ${colors.domain} transition-colors duration-200`}>
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