import React, { useState } from 'react';
import { Resource } from '../types';
import { CATEGORIES } from '../constants';

interface AdminProps {
  resources: Resource[];
  onAddResource: (resource: Resource) => void;
  userAddedResources: Resource[];
}

const getDomain = (url: string): string => {
  try {
    let fullUrl = url.trim();
    if (!fullUrl.startsWith('http')) {
      fullUrl = `https://${fullUrl}`;
    }
    const domain = new URL(fullUrl).hostname;
    return domain.replace(/^www\./, '');
  } catch (error) {
    return 'invalid url';
  }
};

const Admin: React.FC<AdminProps> = ({ resources, onAddResource, userAddedResources }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState(CATEGORIES[2]);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url || !category) {
      alert('Please fill all fields.');
      return;
    }

    const nextId = Math.max(0, ...resources.map(r => r.id)) + 1;
    const newResource: Resource = {
      id: nextId,
      title,
      url,
      category,
      domain: getDomain(url),
    };
    
    onAddResource(newResource);
    setTitle('');
    setUrl('');
    setCategory(CATEGORIES[2]);
  };

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearLocal = () => {
    if (window.confirm("Are you sure you want to clear all locally added resources? This cannot be undone.")) {
      localStorage.removeItem('user-resources');
      window.location.reload();
    }
  };
  
  return (
    <div className="py-8 space-y-8">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Admin Panel - Add New Resource</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
            <input 
              type="text" 
              id="title" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
              placeholder="e.g., Awesome Hacking Tool" 
              className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">URL</label>
            <input 
              type="url" 
              id="url" 
              value={url} 
              onChange={e => setUrl(e.target.value)} 
              required 
              placeholder="https://example.com/tool" 
              className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <select 
              id="category" 
              value={category} 
              onChange={e => setCategory(e.target.value)} 
              required 
              className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm"
            >
              {CATEGORIES.filter(c => c !== 'All' && c !== 'Saved').map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full px-5 py-2.5 bg-cyan-500 text-white text-sm font-semibold rounded-lg hover:bg-cyan-600"
            >
              Add Resource
            </button>
          </div>
        </form>
      </div>

      {userAddedResources.length > 0 && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pending Additions ({userAddedResources.length})</h3>
            <button
              onClick={handleClearLocal}
              className="px-3 py-1 bg-rose-500 text-white text-xs font-semibold rounded-md hover:bg-rose-600"
            >
              Clear Local Additions
            </button>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            These links are saved in your browser. To make them permanent for everyone, a developer must add the code snippets below to the <code>data/resources.ts</code> file.
          </p>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {userAddedResources.map(resource => {
              const codeSnippet = `${resource.id}- ${resource.title}: ${resource.url}`;
              return (
                <div key={resource.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{resource.title}</p>
                  <div className="mt-2 flex items-center bg-slate-200 dark:bg-slate-900 p-2 rounded-md font-mono text-xs text-slate-700 dark:text-slate-300">
                    <pre className="flex-grow overflow-x-auto"><code>{codeSnippet}</code></pre>
                    <button 
                      onClick={() => handleCopy(codeSnippet, resource.id)}
                      className="ml-4 px-3 py-1 text-xs font-semibold rounded bg-cyan-500 text-white hover:bg-cyan-600 flex-shrink-0 transition-colors"
                    >
                      {copiedId === resource.id ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

       <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">All Resources ({resources.length})</h3>
          <div className="max-h-96 overflow-y-auto">
            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {[...resources].sort((a, b) => b.id - a.id).map(resource => (
                <li key={resource.id} className="py-3">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{resource.id} - {resource.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{resource.url}</p>
                </li>
              ))}
            </ul>
          </div>
       </div>
    </div>
  );
};

export default Admin;