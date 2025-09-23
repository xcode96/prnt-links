import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LinkCard from './components/LinkCard';
import ScrollToTop from './components/ScrollToTop';
import Pagination from './components/Pagination';
import allResources from './data/resources';
import { Resource } from './types';

const ITEMS_PER_PAGE = 24;

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredResources = useMemo(() => {
    // Normalize search query for case-insensitive and whitespace-agnostic matching.
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();

    return allResources.filter((resource: Resource) => {
      // A resource must match the selected category.
      // 'All' is a special case that matches every category.
      const categoryMatch = selectedCategory === 'All' || resource.category === selectedCategory;

      // A resource must also match the search query.
      // An empty search query is considered a match for all resources because `String.prototype.includes('')` returns true.
      const searchMatch = resource.title.toLowerCase().includes(normalizedSearchQuery) || 
                          resource.domain.toLowerCase().includes(normalizedSearchQuery);

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);

  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredResources.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredResources]);


  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={allResources.length}
          filteredCount={filteredResources.length}
        />
        <main className="py-8">
          {paginatedResources.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedResources.map((resource) => (
                  <LinkCard key={resource.id + resource.title} resource={resource} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 mt-16">
              <svg className="w-16 h-16 mb-4 text-emerald-400/20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-300">No Results Found</h2>
              <p className="mt-2 text-gray-400">Try adjusting your search or category filter.</p>
            </div>
          )}
        </main>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default App;
