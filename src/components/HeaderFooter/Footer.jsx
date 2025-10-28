import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[rgb(21,24,33)] border-t border-cyan-400/30 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Behind the Browser */}
          <div className="flex items-center gap-2 text-gray-400 font-mono text-sm md:text-base">
            <span className="text-cyan-500/60">&lt;</span>
            <span className="text-gray-300 hover:text-cyan-400 transition-all cursor-default drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
              Behind the Browser
            </span>
            <span className="text-cyan-500/60">/&gt;</span>
            <span className="text-cyan-400 mx-2">@</span>
            <span className="text-cyan-500/60">&lt;</span>
            <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">
              {currentYear}
            </span>
            <span className="text-cyan-500/60">/&gt;</span>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-8 bg-cyan-400/20"></div>

          {/* CSE @ GITA */}
          <div className="flex items-center gap-2 text-gray-400 font-mono text-sm md:text-base">
            <span className="text-cyan-500/60">&lt;</span>
            <span className="text-cyan-400 font-bold drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">
              CSE
            </span>
            <span className="text-cyan-500/60">/&gt;</span>
            <span className="text-cyan-400 mx-2">@</span>
            <span className="text-cyan-500/60">&lt;</span>
            <span className="text-gray-300 hover:text-cyan-400 transition-all cursor-default drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
              GITA
            </span>
            <span className="text-cyan-500/60">/&gt;</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
