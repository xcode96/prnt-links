import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center space-x-4 mt-12 font-roboto-mono">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-indigo-900/50 border border-blue-900 rounded-lg text-sm font-medium text-blue-300 hover:bg-indigo-800/60 hover:border-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Go to previous page"
      >
        Previous
      </button>

      <span className="text-sm text-gray-400">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-indigo-900/50 border border-blue-900 rounded-lg text-sm font-medium text-blue-300 hover:bg-indigo-800/60 hover:border-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Go to next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;