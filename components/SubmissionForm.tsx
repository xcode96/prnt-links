import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { CloseIcon, LogoIcon } from './icons';

interface SubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
  ai: GoogleGenAI;
  categories: string[];
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ isOpen, onClose, ai, categories }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('Please enter a URL.');
      return;
    }
    setIsLoading(true);
    setError('');
    setIsAnalyzed(false);

    try {
      const prompt = `Analyze the content at the URL: ${url}. Based on the content, suggest a concise title, a one-sentence description, and choose the most appropriate category from this list: ${categories.join(', ')}.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              category: { type: Type.STRING, enum: categories }
            },
            required: ["title", "description", "category"]
          }
        }
      });
      
      const result = JSON.parse(response.text);
      setTitle(result.title || '');
      setDescription(result.description || '');
      setCategory(result.category || '');
      setIsAnalyzed(true);

    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Could not analyze the URL. Please check the link or try another one.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the data to a backend.
    // Here we'll just log it and close the modal.
    console.log("Submitted Resource:", { title, url, description, category });
    alert("Resource submitted for review! (Check console for details)");
    resetAndClose();
  };

  const resetAndClose = () => {
    setUrl('');
    setTitle('');
    setDescription('');
    setCategory('');
    setError('');
    setIsLoading(false);
    setIsAnalyzed(false);
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      aria-labelledby="submission-title"
      role="dialog"
      aria-modal="true"
      onClick={resetAndClose}
    >
      <div 
        className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg mx-4 border border-slate-200 dark:border-slate-800"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
                <LogoIcon className="w-6 h-6 text-cyan-500" />
                <h2 id="submission-title" className="text-xl font-bold text-slate-900 dark:text-white">Submit a Resource</h2>
            </div>
            <button onClick={resetAndClose} className="p-1 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full">
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Paste a URL and let our AI assistant analyze it and suggest the details.
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">URL</label>
                    <div className="flex space-x-2">
                        <input type="url" id="url" value={url} onChange={e => setUrl(e.target.value)} required placeholder="https://example.com/article" className="flex-grow bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-cyan-500 focus:border-cyan-500"/>
                        <button type="button" onClick={handleAnalyze} disabled={isLoading} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-sm font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-50">
                            {isLoading ? 'Analyzing...' : 'Analyze'}
                        </button>
                    </div>
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}
                
                {isAnalyzed && (
                  <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Suggested Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Suggested Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={3} className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm"></textarea>
                    </div>
                     <div>
                        <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Suggested Category</label>
                        <select id="category" value={category} onChange={e => setCategory(e.target.value)} required className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm">
                            <option value="">Select a category</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                  </div>
                )}
            </div>

            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 rounded-b-xl border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <button type="submit" disabled={!isAnalyzed} className="px-5 py-2.5 bg-cyan-500 text-white text-sm font-semibold rounded-lg hover:bg-cyan-600 disabled:bg-slate-400 disabled:cursor-not-allowed">
                    Submit for Review
                </button>
            </div>
        </form>

      </div>
    </div>
  );
};

export default SubmissionForm;
