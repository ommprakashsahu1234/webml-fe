import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-[rgb(21,24,33)] border-b border-cyan-400/30 shadow-[0_4px_20px_rgba(6,182,212,0.15)]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              {/* <span className="text-cyan-400 font-mono text-lg md:text-xl">&lt;</span> */}
              <svg 
                className="w-6 h-6 md:w-8 md:h-8 inline-block text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] group-hover:drop-shadow-[0_0_15px_rgba(6,182,212,1)] transition-all" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              {/* <span className="text-cyan-400 font-mono text-lg md:text-xl">/&gt;</span> */}
            </div>
            <h1 className="text-lg md:text-2xl font-bold font-mono text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] group-hover:drop-shadow-[0_0_20px_rgba(6,182,212,1)] transition-all">
              Behind The Browser Camp 2025
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {!isHomePage && (
              <Link
                to="/"
                className="text-gray-300 hover:text-cyan-400 transition-all font-mono hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
              >
                <span className="text-cyan-500/60">&lt;</span>Home<span className="text-cyan-500/60">/&gt;</span>
              </Link>
            )}
            <Link
              to="/register"
              className="relative px-6 py-2 border-2 border-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-bold font-mono rounded transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:border-cyan-300 group overflow-hidden"
            >
              <span className="flex items-center gap-2 relative z-10">
                <span className="text-cyan-500/80">&lt;</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Register
                <span className="text-cyan-500/80">/&gt;</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-cyan-400 hover:text-cyan-300 transition-colors hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-cyan-400/30 pt-4 animate-fadeIn bg-[rgb(15,18,25)] rounded p-4 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            {!isHomePage && (
              <Link
                to="/"
                className="text-gray-300 hover:text-cyan-400 transition-all text-center font-mono hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-cyan-500/60">&lt;</span>Home<span className="text-cyan-500/60">/&gt;</span>
              </Link>
            )}
            <Link
              to="/register"
              className="px-6 py-2 border-2 border-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-bold font-mono rounded text-center transition-all hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-cyan-500/80">&lt;</span> Register <span className="text-cyan-500/80">/&gt;</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
