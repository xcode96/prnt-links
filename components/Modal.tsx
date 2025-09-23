import React from 'react';
import { Resource } from '../types';
import { CloseIcon, ExternalLinkIcon } from './icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: Resource;
  description?: string;
  isLoadingDescription?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, resource, description, isLoadingDescription }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="relative bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-lg mx-4 border border-slate-200 dark:border-slate-700"
        onClick={e => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 id="modal-title" className="text-xl font-bold text-slate-900 dark:text-white font-orbitron pr-8">
              {resource.title}
            </h2>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
              aria-label="Close modal"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-4 text-slate-600 dark:text-slate-400 font-roboto-mono">
            {isLoadingDescription ? (
              <div className="space-y-2 animate-pulse mt-1">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
              </div>
            ) : (
              <p>{description || 'No description available.'}</p>
            )}
          </div>
        </div>
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-b-lg border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <p className="text-sm text-slate-500 font-roboto-mono truncate pr-4">{resource.domain}</p>
            <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-800 transition-colors"
            >
            Visit Link
            <ExternalLinkIcon className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
