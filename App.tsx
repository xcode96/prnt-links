import React, { useState, useMemo, useEffect } from 'react';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LinkCard from './components/LinkCard';
import Pagination from './components/Pagination';

import allResources from './data/resources';

const ITEMS_PER_PAGE = 24;

const App: React.FC = () => {
  // Core State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // UI State
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Theme Management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // Data Filtering & Pagination
  const filteredResources = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    
    let resources = selectedCategory === 'All'
        ? allResources
        : allResources.filter(r => r.category === selectedCategory);

    if (!normalizedQuery) return resources;

    return resources.filter(r => 
      r.title.toLowerCase().includes(normalizedQuery) ||
      r.domain.toLowerCase().includes(normalizedQuery)
    );
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
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header theme={theme} toggleTheme={toggleTheme} />
        
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedResources.map((resource) => (
                    <LinkCard 
                    key={resource.id} 
                    resource={resource} 
                    />
                ))}
                </div>
                <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                />
            </>
            ) : (
            <div className="text-center text-slate-500 dark:text-slate-400 mt-16">
                <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">No Results Found</h2>
                <p className="mt-2 font-mono">Try adjusting your search or category filter.</p>
            </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default App;
