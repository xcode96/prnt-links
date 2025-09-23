import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { GoogleGenAI, Type, Chat } from "@google/genai";

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LinkCard from './components/LinkCard';
import ScrollToTop from './components/ScrollToTop';
import Pagination from './components/Pagination';
import Modal from './components/Modal';
import Dashboard from './components/Dashboard';
import ChatAssistant from './components/ChatAssistant';
import SubmissionForm from './components/SubmissionForm';
import { ChatIcon } from './components/icons';

import allResources from './data/resources';
import { Resource } from './types';
import { CATEGORIES } from './constants';

const ITEMS_PER_PAGE = 24;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const aiChatModel = ai.chats.create({ model: 'gemini-2.5-flash' });

const App: React.FC = () => {
  // Core State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // AI-Generated Content State
  const [descriptions, setDescriptions] = useState<Record<number, string>>({});
  const [tags, setTags] = useState<Record<number, string[]>>({});
  const [loadingDetails, setLoadingDetails] = useState<Record<number, boolean>>({});

  // UI & Feature State
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [savedItems, setSavedItems] = useState<Set<number>>(new Set());
  const [isDiscoverModalOpen, setIsDiscoverModalOpen] = useState(false);
  const [randomResource, setRandomResource] = useState<Resource | null>(null);
  const [view, setView] = useState<'Hub' | 'Dashboard'>('Hub');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

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

  // Saved Items Management
  useEffect(() => {
    try {
      const saved = localStorage.getItem('savedResources');
      if (saved) setSavedItems(new Set(JSON.parse(saved)));
    } catch (error) {
      console.error("Could not load saved resources:", error);
    }
  }, []);

  const toggleSaveItem = (id: number) => {
    setSavedItems(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(id)) newSaved.delete(id);
      else newSaved.add(id);
      localStorage.setItem('savedResources', JSON.stringify(Array.from(newSaved)));
      return newSaved;
    });
  };

  // Data Filtering & Pagination
  const filteredResources = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    
    let resources = selectedCategory === 'Saved'
      ? allResources.filter(r => savedItems.has(r.id))
      : selectedCategory === 'All'
        ? allResources
        : allResources.filter(r => r.category === selectedCategory);

    if (!normalizedQuery) return resources;

    return resources.filter(r => 
      r.title.toLowerCase().includes(normalizedQuery) ||
      r.domain.toLowerCase().includes(normalizedQuery) ||
      (tags[r.id] && tags[r.id].some(tag => `#${tag}`.includes(normalizedQuery)))
    );
  }, [selectedCategory, searchQuery, savedItems, tags]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);

  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredResources.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredResources]);

  // AI Content Generation
  const generateDetails = useCallback(async (resource: Resource) => {
    if (!resource || descriptions[resource.id] || loadingDetails[resource.id]) return;

    setLoadingDetails(prev => ({ ...prev, [resource.id]: true }));
    try {
      const prompt = `Analyze the cybersecurity resource titled "${resource.title}" and provide a concise, one-sentence description and 3-5 relevant keyword tags.`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              description: { type: Type.STRING },
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            }
          }
        }
      });

      const result = JSON.parse(response.text);
      if (result.description) setDescriptions(prev => ({ ...prev, [resource.id]: result.description }));
      if (result.tags) setTags(prev => ({ ...prev, [resource.id]: result.tags }));

    } catch (error) {
      console.error(`Failed to generate details for "${resource.title}":`, error);
      setDescriptions(prev => ({ ...prev, [resource.id]: 'Could not generate details for this resource.' }));
    } finally {
      setLoadingDetails(prev => ({ ...prev, [resource.id]: false }));
    }
  }, [descriptions, loadingDetails]);

  useEffect(() => {
    paginatedResources.forEach(generateDetails);
  }, [paginatedResources, generateDetails]);

  // Feature Handlers
  const handleDiscover = () => {
    if (filteredResources.length > 0) {
      const resource = filteredResources[Math.floor(Math.random() * filteredResources.length)];
      setRandomResource(resource);
      generateDetails(resource);
      setIsDiscoverModalOpen(true);
    }
  };

  const handleSendMessage = async (message: string): Promise<string> => {
    try {
      const response = await aiChatModel.sendMessage({ message });
      return response.text;
    } catch (error) {
      console.error("Chat error:", error);
      return "Sorry, I encountered an error. Please try again.";
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header theme={theme} toggleTheme={toggleTheme} view={view} setView={setView} />
        
        {view === 'Dashboard' && <Dashboard resources={allResources} />}
        
        {view === 'Hub' && (
          <>
            <Sidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onDiscover={handleDiscover}
              onSubmit={() => setIsSubmitOpen(true)}
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
                        tags={tags[resource.id]}
                        isLoadingDetails={loadingDetails[resource.id]}
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
                <div className="text-center text-slate-500 dark:text-slate-400 mt-16">
                  <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">No Results Found</h2>
                  <p className="mt-2 font-mono">Try adjusting your search or category filter.</p>
                </div>
              )}
            </main>
          </>
        )}
      </div>

      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-5 right-5 z-20 p-4 bg-cyan-500 text-white rounded-full shadow-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-slate-950 transition-all duration-300"
        aria-label="Open AI Chat Assistant"
      >
        <ChatIcon className="w-6 h-6" />
      </button>

      {randomResource && (
        <Modal 
          isOpen={isDiscoverModalOpen} 
          onClose={() => setIsDiscoverModalOpen(false)} 
          resource={randomResource}
          description={descriptions[randomResource.id]}
          isLoadingDescription={loadingDetails[randomResource.id]}
        />
      )}

      <ChatAssistant 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onSendMessage={handleSendMessage}
      />

      <SubmissionForm
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        ai={ai}
        categories={CATEGORIES.filter(c => c !== 'All' && c !== 'Saved')}
      />

    </div>
  );
};

export default App;
