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
      className="block bg-black/20 border border-white/10 rounded-lg p-4 transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 group"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors">
            {resource.title}
          </h3>
          <p className="text-xs text-gray-400 mt-2">{resource.domain}</p>
        </div>
        <svg className="w-4 h-4 text-gray-500 group-hover:text-cyan-300 transition-colors ml-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </a>
  );
};

export default LinkCard;