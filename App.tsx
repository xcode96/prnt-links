import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LinkCard from './components/LinkCard';
import Pagination from './components/Pagination';
import Dashboard from './components/Dashboard';
import Modal from './components/Modal';
import SubmissionForm from './components/SubmissionForm';
import ChatAssistant from './components/ChatAssistant';
import ScrollToTop from './components/ScrollToTop';
import { ChatIcon } from './components/icons';

import allResources from './data/resources';
import { CATEGORIES } from './constants';
import { Resource } from './types';

const ITEMS_PER_PAGE = 24;

const App: React.FC = () => {
  // AI State
  const [ai, setAi] = useState<GoogleGenAI | null>(null);

  // Core State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [savedItems, setSavedItems] = useState<number[]>([]);
  
  // UI State
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentView, setCurrentView] = useState<'hub' | 'dashboard'>('hub');
  const [isDiscoverModalOpen, setIsDiscoverModalOpen] = useState(false);
  const [discoverResource, setDiscoverResource] = useState<Resource | null>(null);
  const [discoverDescription, setDiscoverDescription] = useState('');
  const [isLoadingDescription, setIsLoadingDescription] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // AI Initialization
  useEffect(() => {
    if (process.env.API_KEY) {
      try {
        const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
        setAi(genAI);
      } catch (error) {
        console.error("Failed to initialize GoogleGenAI:", error);
      }
    }
  }, []);

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
    const storedSavedItems = localStorage.getItem('savedItems');
    if (storedSavedItems) {
      setSavedItems(JSON.parse(storedSavedItems));
    }
  }, []);

  const toggleSaveItem = (id: number) => {
    const newSavedItems = savedItems.includes(id)
      ? savedItems.filter(savedId => savedId !== id)
      : [...savedItems, id];
    setSavedItems(newSavedItems);
    localStorage.setItem('savedItems', JSON.stringify(newSavedItems));
  };

  // Data Filtering & Pagination
  const filteredResources = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    
    let resources;
    if (selectedCategory === 'All') {
      resources = allResources;
    } else if (selectedCategory === 'Saved') {
      resources = allResources.filter(r => savedItems.includes(r.id));
    } else {
      resources = allResources.filter(r => r.category === selectedCategory);
    }

    if (!normalizedQuery) return resources;

    return resources.filter(r => 
      r.title.toLowerCase().includes(normalizedQuery) ||
      r.domain.toLowerCase().includes(normalizedQuery)
    );
  }, [selectedCategory, searchQuery, savedItems]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);

  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredResources.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredResources]);

  // Discover Feature
  const handleDiscover = useCallback(async () => {
    if (!ai) return;

    const randomIndex = Math.floor(Math.random() * allResources.length);
    const resource = allResources[randomIndex];
    setDiscoverResource(resource);
    setIsDiscoverModalOpen(true);
    setIsLoadingDescription(true);
    setDiscoverDescription('');

    try {
      const prompt = `Provide a concise, one-sentence summary for the following resource: "${resource.title}" from ${resource.url}.`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      setDiscoverDescription(response.text);
    } catch (error) {
      console.error("Failed to get description:", error);
      setDiscoverDescription("Could not load a description for this resource.");
    } finally {
      setIsLoadingDescription(false);
    }
  }, [ai]);

  // Chat Feature
  const handleSendMessage = useCallback(async (message: string) => {
    if (!ai) return "The AI assistant is not available right now.";
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: message,
        config: {
          systemInstruction: `You are a helpful cybersecurity assistant for the CyberSec Resource Hub. Your goal is to provide concise, accurate, and helpful information related to cybersecurity topics. You can also help users find resources within the hub by suggesting categories or search terms. The available categories are: ${CATEGORIES.filter(c => c !== 'All' && c !== 'Saved').join(', ')}.`,
        }
      });
      return response.text;
    } catch (error) {
      console.error("Chat error:", error);
      return "Sorry, I encountered an error. Please try again.";
    }
  }, [ai]);


  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header 
            theme={theme} 
            toggleTheme={toggleTheme} 
            currentView={currentView}
            setCurrentView={setCurrentView}
        />
        
        {currentView === 'hub' ? (
            <>
                <Sidebar
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    totalCount={allResources.length}
                    filteredCount={filteredResources.length}
                    onDiscover={handleDiscover}
                    onSubmit={() => setIsSubmitModalOpen(true)}
                />
                <main className="py-8">
                    {paginatedResources.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedResources.map((resource) => (
                            <LinkCard 
                            key={resource.id} 
                            resource={resource} 
                            isSaved={savedItems.includes(resource.id)}
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
        ) : (
            <Dashboard resources={allResources} />
        )}
      </div>
      
      {discoverResource && (
        <Modal 
            isOpen={isDiscoverModalOpen}
            onClose={() => setIsDiscoverModalOpen(false)}
            resource={discoverResource}
            description={discoverDescription}
            isLoadingDescription={isLoadingDescription}
        />
      )}

      {ai && (
        <SubmissionForm 
            isOpen={isSubmitModalOpen}
            onClose={() => setIsSubmitModalOpen(false)}
            ai={ai}
            categories={CATEGORIES.filter(c => c !== 'All' && c !== 'Saved')}
        />
      )}

      {ai && (
        <>
            <button
                onClick={() => setIsChatOpen(true)}
                className={`fixed bottom-5 right-5 z-40 p-4 bg-cyan-500 text-white rounded-full shadow-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-white dark:focus:ring-offset-slate-950 transition-all duration-300 transform ${isChatOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
                aria-label="Open AI chat assistant"
            >
                <ChatIcon className="w-6 h-6" />
            </button>
            <ChatAssistant
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                onSendMessage={handleSendMessage}
            />
        </>
      )}

      <ScrollToTop />
    </div>
  );
};

export default App;
