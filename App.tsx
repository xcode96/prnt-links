import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LinkCard from './components/LinkCard';
import ScrollToTop from './components/ScrollToTop';
import Pagination from './components/Pagination';
import Modal from './components/Modal';
import allResources from './data/resources';
import { Resource } from './types';

const ITEMS_PER_PAGE = 24;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [descriptions, setDescriptions] = useState<Record<number, string>>({});
  const [loadingDescriptions, setLoadingDescriptions] = useState<Record<number, boolean>>({});
  
  // New features state
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [savedItems, setSavedItems] = useState<Set<number>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [randomResource, setRandomResource] = useState<Resource | null>(null);

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Saved items management
  useEffect(() => {
    try {
      const saved = localStorage.getItem('savedResources');
      if (saved) {
        setSavedItems(new Set(JSON.parse(saved)));
      }
    } catch (error) {
      console.error("Could not load saved resources:", error);
      setSavedItems(new Set());
    }
  }, []);

  const toggleSaveItem = (id: number) => {
    setSavedItems(prevSavedItems => {
      const newSavedItems = new Set(prevSavedItems);
      if (newSavedItems.has(id)) {
        newSavedItems.delete(id);
      } else {
        newSavedItems.add(id);
      }
      localStorage.setItem('savedResources', JSON.stringify(Array.from(newSavedItems)));
      return newSavedItems;
    });
  };

  const filteredResources = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();

    let resourcesToFilter = allResources;

    if (selectedCategory === 'Saved') {
      resourcesToFilter = allResources.filter(resource => savedItems.has(resource.id));
    } else if (selectedCategory !== 'All') {
      resourcesToFilter = allResources.filter(resource => resource.category === selectedCategory);
    }
    
    if (!normalizedSearchQuery) {
        return resourcesToFilter;
    }

    return resourcesToFilter.filter((resource: Resource) => {
      const searchMatch = resource.title.toLowerCase().includes(normalizedSearchQuery) || 
                          resource.domain.toLowerCase().includes(normalizedSearchQuery);
      return searchMatch;
    });
  }, [selectedCategory, searchQuery, savedItems]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);

  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredResources.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredResources]);

  const generateDescription = useCallback(async (resource: Resource) => {
    if (!resource || descriptions[resource.id] || loadingDescriptions[resource.id]) {
      return;
    }

    try {
      setLoadingDescriptions(prev => ({ ...prev, [resource.id]: true }));
      const prompt = `Provide a concise, one-sentence description for the following cybersecurity resource titled "${resource.title}". Focus on its primary purpose or content.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const descriptionText = response.text.trim();
      
      if (descriptionText) {
        setDescriptions(prev => ({ ...prev, [resource.id]: descriptionText }));
      }
    } catch (error) {
      console.error(`Failed to generate description for "${resource.title}":`, error);
      setDescriptions(prev => ({ ...prev, [resource.id]: 'Could not generate a description for this resource.' }));
    } finally {
      setLoadingDescriptions(prev => ({ ...prev, [resource.id]: false }));
    }
  }, [descriptions, loadingDescriptions]);

  useEffect(() => {
    for (const resource of paginatedResources) {
      generateDescription(resource);
    }
  }, [paginatedResources, generateDescription]);

  const handleDiscover = () => {
    if (filteredResources.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredResources.length);
      const resource = filteredResources[randomIndex];
      setRandomResource(resource);
      generateDescription(resource); // Pre-fetch description if not available
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onDiscover={handleDiscover}
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
                    description={descriptions[resource.id]}
                    isLoadingDescription={loadingDescriptions[resource.id]}
                    isSaved={savedItems.has(resource.id)}
                    onToggleSave={toggleSaveItem}
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
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 dark:text-slate-400 mt-16">
              <svg className="w-16 h-16 mb-4 text-sky-500/20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 font-orbitron">No Results Found</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400 font-roboto-mono">Try adjusting your search or category filter.</p>
            </div>
          )}
        </main>
      </div>
      <ScrollToTop />
      {randomResource && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          resource={randomResource}
          description={descriptions[randomResource.id]}
          isLoadingDescription={loadingDescriptions[randomResource.id]}
        />
      )}
    </div>
  );
};

export default App;