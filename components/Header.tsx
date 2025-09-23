import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center border-b border-fuchsia-500/30">
       <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-fuchsia-800 to-blue-600 opacity-25 blur-3xl"></div>
        <h1 className="relative text-4xl md:text-5xl font-bold font-orbitron tracking-wider text-white text-glow">
          CyberSec Resource Hub
        </h1>
      </div>
      <p className="text-blue-300 mt-4 text-lg font-roboto-mono">
        Your personal nexus of cybersecurity knowledge.
      </p>
    </header>
  );
};

export default Header;