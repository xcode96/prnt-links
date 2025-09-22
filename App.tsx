import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LinkCard from './components/LinkCard';
import ScrollToTop from './components/ScrollToTop';
import allResources from './data/resources';
import { Resource } from './types';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = useMemo(() => {
    return allResources.filter((resource: Resource) => {
      const categoryMatch = selectedCategory === 'All' || resource.category === selectedCategory;
      const searchMatch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || resource.domain.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-gradient-to-br from-[#0a0e1c] via-[#10142c] to-[#2c1a3b] text-gray-100 min-h-screen font-sans">
      <Header />
      <div className="flex flex-col md:flex-row">
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={allResources.length}
          filteredCount={filteredResources.length}
        />
        <main className="flex-1 p-4 md:p-8">
          {filteredResources.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredResources.map((resource) => (
                <LinkCard key={resource.id + resource.title} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 mt-16">
              <svg className="w-16 h-16 mb-4 text-cyan-400/30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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