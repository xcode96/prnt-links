import React, { useMemo } from 'react';
import { Resource } from '../types';
import { CATEGORIES } from '../constants';

interface DashboardProps {
  resources: Resource[];
}

const StatCard: React.FC<{ title: string; value: string | number; }> = ({ title, value }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</h3>
    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{value}</p>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ resources }) => {
  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    const relevantCategories = CATEGORIES.filter(c => c !== 'All' && c !== 'Saved');
    
    relevantCategories.forEach(cat => counts[cat] = 0);

    resources.forEach(resource => {
      if (counts[resource.category] !== undefined) {
        counts[resource.category]++;
      }
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

  }, [resources]);

  const totalResources = resources.length;
  const uniqueDomains = new Set(resources.map(r => r.domain)).size;
  const maxCount = Math.max(...categoryCounts.map(c => c.count), 1);

  return (
    <div className="py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Resources" value={totalResources} />
        <StatCard title="Unique Domains" value={uniqueDomains} />
        <StatCard title="Total Categories" value={categoryCounts.length} />
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Resources by Category</h2>
        <div className="space-y-4">
          {categoryCounts.map(({ name, count }) => (
            <div key={name} className="flex items-center">
              <div className="w-1/4 text-sm font-semibold text-slate-600 dark:text-slate-300 truncate pr-2">{name}</div>
              <div className="w-3/4 flex items-center">
                <div className="flex-grow bg-slate-200 dark:bg-slate-800 rounded-full h-4 mr-4">
                  <div
                    className="bg-cyan-500 h-4 rounded-full"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  ></div>
                </div>
                <div className="w-10 text-right text-sm font-mono font-medium text-slate-500 dark:text-slate-400">{count}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
