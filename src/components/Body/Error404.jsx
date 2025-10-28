import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Err404() {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Random glitch effect
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[rgb(15,18,25)] relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Moving Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>

        {/* Floating Code Symbols */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 text-cyan-400/20 text-6xl font-mono animate-float">&lt;/&gt;</div>
          <div className="absolute top-40 right-32 text-purple-400/20 text-5xl font-mono animate-float delay-300">{ }</div>
          <div className="absolute bottom-32 left-40 text-pink-400/20 text-4xl font-mono animate-float delay-500">[ ]</div>
          <div className="absolute bottom-20 right-20 text-green-400/20 text-5xl font-mono animate-float delay-700">( )</div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* 404 Text with Glitch Effect */}
        <div className="relative mb-8">
          <h1 
            className={`text-9xl md:text-[200px] font-bold font-mono transition-all duration-200 ${
              glitchActive ? 'glitch' : ''
            }`}
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.5))'
            }}
          >
            404
          </h1>
          {/* Glitch Layers */}
          {glitchActive && (
            <>
              <h1 
                className="absolute top-0 left-0 w-full text-9xl md:text-[200px] font-bold font-mono text-cyan-400 opacity-70"
                style={{ transform: 'translate(-3px, -3px)' }}
              >
                404
              </h1>
              <h1 
                className="absolute top-0 left-0 w-full text-9xl md:text-[200px] font-bold font-mono text-pink-400 opacity-70"
                style={{ transform: 'translate(3px, 3px)' }}
              >
                404
              </h1>
            </>
          )}
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-500/60">&lt;</span>
            Page Not Found
            <span className="text-cyan-500/60">/&gt;</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-lg font-mono max-w-2xl mx-auto">
            <span className="text-cyan-500/60">// </span>
            Oops! The page you're looking for seems to have been deleted, moved, or never existed in the first place.
          </p>
        </div>

        {/* Animated Robot/Terminal Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 border-4 border-cyan-400 rounded-lg bg-[rgb(21,24,33)]/60 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.4)] animate-bounce-slow">
              <svg className="w-16 h-16 md:w-20 md:h-20 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            {/* Pulsing Dots */}
            <div className="absolute -top-2 -right-2 flex gap-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="group relative px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold font-mono text-sm md:text-lg rounded-lg border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-cyan-200/80">&lt;</span>
              Go Home
              <span className="text-cyan-200/80">/&gt;</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group relative px-8 py-3 md:px-10 md:py-4 bg-[rgb(21,24,33)]/60 border-2 border-purple-400 text-purple-400 font-bold font-mono text-sm md:text-lg rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:bg-purple-500/10 transition-all backdrop-blur-md"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-purple-400/80">&lt;</span>
              Go Back
              <span className="text-purple-400/80">/&gt;</span>
            </span>
          </button>
        </div>

        {/* Fun Message */}
        <div className="mt-12 text-gray-500 font-mono text-xs md:text-sm">
          <p className="mb-2">
            <span className="text-green-500/60">// </span>
            Error Code: <span className="text-pink-400">ERR_PAGE_NOT_FOUND</span>
          </p>
          <p>
            <span className="text-green-500/60">// </span>
            Suggestion: <span className="text-cyan-400">Try checking the URL or return to homepage</span>
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float.delay-300 {
          animation-delay: 300ms;
        }

        .animate-float.delay-500 {
          animation-delay: 500ms;
        }

        .animate-float.delay-700 {
          animation-delay: 700ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }

        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .glitch {
          animation: glitch-skew 0.2s ease-in-out;
        }

        @keyframes glitch-skew {
          0% {
            transform: skew(0deg);
          }
          25% {
            transform: skew(-2deg);
          }
          50% {
            transform: skew(2deg);
          }
          75% {
            transform: skew(-1deg);
          }
          100% {
            transform: skew(0deg);
          }
        }
      `}</style>
    </div>
  );
}
