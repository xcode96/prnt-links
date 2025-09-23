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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg mx-4 border border-slate-200 dark:border-slate-800"
        onClick={e => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 id="modal-title" className="text-xl font-bold text-slate-900 dark:text-white pr-8">
              {resource.title}
            </h2>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
              aria-label="Close modal"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-4 text-slate-600 dark:text-slate-400">
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
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 rounded-b-xl border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <p className="text-sm text-slate-500 font-mono truncate pr-4">{resource.domain}</p>
            <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-cyan-500 text-white text-sm font-semibold rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-slate-900 transition-colors"
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
