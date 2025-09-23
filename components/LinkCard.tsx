import React from 'react';
import { Resource } from '../types';

interface LinkCardProps {
  resource: Resource;
}

const LinkCard: React.FC<LinkCardProps> = ({ resource }) => {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gray-800/50 border border-gray-700/80 rounded-lg p-4 transition-all duration-300 hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 group"
    >
      <div className="flex justify-between items-start h-full">
        <div className="flex flex-col flex-1">
          <h3 className="text-base font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors flex-grow">
            {resource.title}
          </h3>
          <p className="text-xs text-gray-400 mt-2 flex-shrink-0">{resource.domain}</p>
        </div>
        <svg className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors ml-2 flex-shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </a>
  );
};

export default LinkCard;
