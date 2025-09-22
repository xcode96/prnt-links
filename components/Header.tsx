import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-black/20 backdrop-blur-sm text-center p-6 border-b border-white/10 shadow-lg sticky top-0 z-10">
      <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500">
        CyberSec Resource Hub
      </h1>
      <p className="text-gray-400 mt-2 text-lg">
        Your personal nexus of cybersecurity knowledge.
      </p>
    </header>
  );
};

export default Header;