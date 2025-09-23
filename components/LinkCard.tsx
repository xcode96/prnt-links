import React from 'react';
import { Resource } from '../types';

interface LinkCardProps {
  resource: Resource;
  description?: string;
  isLoadingDescription?: boolean;
}

const LinkCard: React.FC<LinkCardProps> = ({ resource, description, isLoadingDescription }) => {
  return (
    <div className="flex flex-col bg-gray-800 border border-gray-700 rounded-lg overflow-hidden transition-all duration-300 h-full group hover:border-emerald-500/80 hover:shadow-2xl hover:shadow-emerald-900/40 hover:-translate-y-1">
      <div className="p-5 flex-grow flex flex-col">
        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md block mb-3">
          <h3 className="text-lg font-bold text-gray-100 group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2">
            {resource.title}
          </h3>
        </a>
        <div className="text-sm text-gray-400 flex-grow">
          {isLoadingDescription && !description ? (
            <div className="space-y-2 animate-pulse mt-1">
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          ) : (
            <p className="line-clamp-4">{description || 'No description available.'}</p>
          )}
        </div>
      </div>
      <div className="bg-gray-800/50 border-t border-gray-700 px-5 py-3 flex justify-between items-center text-xs">
        <span className="font-mono text-gray-500 truncate pr-2 group-hover:text-emerald-500 transition-colors duration-200">
          {resource.domain}
        </span>
        <span className="bg-gray-700 text-emerald-400 font-semibold py-1 px-2.5 rounded-full whitespace-nowrap">
          {resource.category}
        </span>
      </div>
    </div>
  );
};

export default LinkCard;