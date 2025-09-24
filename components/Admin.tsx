import React, { useState } from 'react';
import { Resource } from '../types';
import { CATEGORIES } from '../constants';

interface AdminProps {
  resources: Resource[];
  onAddResource: (resource: Resource) => void;
  userAddedResources: Resource[];
  originalResources: Resource[];
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

const Admin: React.FC<AdminProps> = ({ resources, onAddResource, userAddedResources, originalResources }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState(CATEGORIES[2]);

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

  const handleClearLocal = () => {
    if (window.confirm("Are you sure you want to clear all locally added resources? This cannot be undone.")) {
      localStorage.removeItem('user-resources');
      window.location.reload();
    }
  };

  const handleGenerateFile = () => {
    const combined = [...userAddedResources, ...originalResources];
    const uniqueResourcesMap = new Map<number, Resource>();
    combined.forEach(res => {
        uniqueResourcesMap.set(res.id, res);
    });
    const finalResources = Array.from(uniqueResourcesMap.values()).sort((a, b) => a.id - b.id);

    const rawDataString = finalResources.map(r => `${r.id}- ${r.title}: ${r.url}`).join('\n');

    const fileContent = `import { Resource } from '../types';

const rawData = \`
${rawDataString}
\`;

// Function to extract domain from a URL
const getDomain = (url: string): string => {
  try {
    let fullUrl = url.trim();
    if (!fullUrl.startsWith('http')) {
      fullUrl = \`https://\${fullUrl}\`;
    }
    const domain = new URL(fullUrl).hostname;
    return domain.replace(/^www\\./, '');
  } catch (error) {
    const parts = url.split('/');
    if (parts.length > 0 && parts[0].includes('.')) {
      return parts[0].replace(/^www\\./, '');
    }
    console.error(\`Could not parse domain from URL: \${url}\`, error);
    return 'unknown domain';
  }
};

const getCategory = (title: string): string => {
  const lowerTitle = title.toLowerCase();

  const categoryKeywords: { [key: string]: string[] } = {
    'Recon & OSINT': ['recon', 'osint', 'enumeration', 'dork', 'footprinting', 'sub-domain', 'subdomain', 'information gathering'],
    'Exploitation & Pentesting': ['exploit', 'pentest', 'pentesting', 'penetration testing', 'vulnerability', 'injection', 'cve', 'rce', 'lfi', 'metasploit', 'privilege escalation'],
    'Web Security (WebSec)': ['xss', 'csrf', 'sql injection', 'ssrf', 'websec', 'web application', 'waf', 'burp', 'open redirection'],
    'Red Teaming & C2': ['red team', 'red-team', 'c2', 'command and control', 'cobalt strike', 'empire', 'pivoting', 'lateral movement', 'c&c'],
    'Windows Security': ['windows', 'active directory', 'powershell', 'uac', 'dll', 'ntds', 'regsvr32', 'applocker', 'wmic', 'wmi'],
    'Linux Security': ['linux', 'unix', 'selinux', 'kernel', 'sudo', 'cronjob'],
    'Malware Analysis & RE': ['malware', 'reverse engineering', 'reversing', 'shellcode', 'obfuscation', 'fuzzing', 'anubis', 'yara', 'backdoor'],
    'Wireless & Network': ['wifi', 'wi-fi', 'wireless', 'wpa', 'aircrack', 'network', 'wireshark', 'nmap', 'ssh', 'dns', 'smb', 'ftp', 'vnc'],
    'Cheatsheets & Resources': ['cheat sheet', 'cheatsheet', 'resources', 'list', 'awesome', 'guide', 'toolkit', 'wiki', 'payloads'],
  };
  
  const categoriesToCheck = [
    'Recon & OSINT',
    'Exploitation & Pentesting',
    'Web Security (WebSec)',
    'Red Teaming & C2',
    'Windows Security',
    'Linux Security',
    'Malware Analysis & RE',
    'Wireless & Network',
    'Cheatsheets & Resources',
  ];

  for (const category of categoriesToCheck) {
    if (categoryKeywords[category]) {
      for (const keyword of categoryKeywords[category]) {
        if (lowerTitle.includes(keyword)) {
          return category;
        }
      }
    }
  }

  return 'Other';
};

const parseResources = (data: string): Resource[] => {
  const lines = data.trim().split('\\n');
  const resources: Resource[] = [];
  const seenIds = new Set<number>();

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    
    const match = trimmedLine.match(/^(\\d+)-{1,2}\\s?/);
    if (!match) {
        console.warn(\`Line does not start with a number-hyphen pattern: "\${trimmedLine}"\`);
        continue;
    }
    
    const id = parseInt(match[1], 10);
    if (seenIds.has(id)) {
        // Skip duplicate IDs to avoid key errors in React
        continue;
    }
    seenIds.add(id);

    const content = trimmedLine.substring(match[0].length).trim();
    
    let splitIndex = content.lastIndexOf(':');
    while(splitIndex > -1) {
        const afterColon = content.substring(splitIndex + 1).trim();
        const potentialProtocol = content.substring(0, splitIndex).trim().slice(-5).toLowerCase();
        
        if (potentialProtocol.includes('http') || afterColon.length < 5) {
            splitIndex = content.lastIndexOf(':', splitIndex - 1);
        } else {
            break;
        }
    }

    if (splitIndex === -1) {
        console.warn(\`Could not reliably split title and URL: "\${trimmedLine}"\`);
        continue;
    }
    
    let title = content.substring(0, splitIndex).trim();
    let url = content.substring(splitIndex + 1).trim();

    if (title.startsWith(':')) {
      title = title.substring(1).trim();
    }
    if (!url) continue;

    const fullUrl = url.startsWith('http') || url.startsWith('//') ? url : \`https://\${url}\`;

    const resource: Resource = {
      id,
      title,
      url: fullUrl,
      domain: getDomain(url),
      category: getCategory(title),
    };
    resources.push(resource);
  }

  return resources;
};

const allResources: Resource[] = parseResources(rawData);

export default allResources;
`;

    const blob = new Blob([fileContent], { type: 'text/typescript' });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'resources.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
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
              Add Resource to Session
            </button>
          </div>
        </form>
      </div>

      {userAddedResources.length > 0 && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pending Additions ({userAddedResources.length})</h3>
            <div className="flex gap-2">
                <button
                onClick={handleGenerateFile}
                className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700"
                >
                Generate & Download `resources.ts`
                </button>
                <button
                onClick={handleClearLocal}
                className="px-4 py-2 bg-rose-500 text-white text-sm font-semibold rounded-lg hover:bg-rose-600"
                >
                Clear
                </button>
            </div>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            These links are saved in your browser. To make them permanent, click the "Generate" button and replace the existing <code>data/resources.ts</code> file in the project with the downloaded one.
          </p>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            {userAddedResources.map(resource => (
              <div key={resource.id} className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-sm">
                <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">{resource.id} - {resource.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">{resource.url}</p>
              </div>
            ))}
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
