import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 border-b border-gray-700/50">
       <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-gray-900 blur-3xl"></div>
        <h1 className="relative text-4xl md:text-5xl font-bold font-mono tracking-wider text-emerald-400">
          CyberSec Resource Hub
        </h1>
      </div>
      <p className="text-gray-400 mt-3 text-lg">
        Your personal nexus of cybersecurity knowledge.
      </p>
    </header>
  );
};

export default Header;
